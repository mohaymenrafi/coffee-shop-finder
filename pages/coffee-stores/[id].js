import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import cls from 'classnames';
import axios from 'axios';
import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffe-store';
import { StoreContext } from '../../StoreContext/storeContext';
import { fetcher, isEmpty } from '../../utils';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoresById = coffeeStores.find(
    (store) => store.id === params.id
  );
  return {
    props: {
      coffeeStore: findCoffeeStoresById || {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store) => ({
    params: { id: store.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

/* eslint-disable react/destructuring-assignment  */
/* eslint-disable  react-hooks/exhaustive-deps */
/* eslint-disable  react-hooks/rules-of-hooks */
/* eslint-disable  no-shadow */
export default function CoffeeStore(initialProps) {
  const router = useRouter();
  const { id } = router.query;
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const {
    state: { coffeeStoresNearme },
  } = useContext(StoreContext);

  const handleCreateCoffeeSotre = async (store) => {
    try {
      const { id, name, imgUrl, neighborhood, address } = store;
      const response = await fetch('/api/createcoffeestore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgUrl,
          neighborhood: neighborhood[0] || '',
          address,
        }),
      });
      await response.json();
    } catch (err) {
      console.error('Error on handleCreateCoffee Store', { err });
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStoresNearme.length > 0) {
        const fetchedNear = coffeeStoresNearme.find((store) => store.id === id);
        if (fetchedNear) {
          setCoffeeStore(fetchedNear);
          handleCreateCoffeeSotre(fetchedNear);
        }
      }
    } else {
      handleCreateCoffeeSotre(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStoresNearme]);

  // info destructure
  const {
    address = '',
    name = '',
    imgUrl = '',
    neighborhood = '',
  } = coffeeStore;

  const [voting, setVoting] = useState(0);
  console.log(id);
  const { data } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setVoting(data[0].voting);
    }
  }, [data]);

  // Loading
  if (router.isFallback) {
    return (
      <div style={{ height: '100vh' }}>
        <h2>Loading Store ...</h2>
      </div>
    );
  }
  // vote button function
  const handleUpvoteButton = async () => {
    try {
      const response = await axios.put('/api/updateVoting', { id });
      const result = await response.data;
      if (result && result.length > 0) {
        const updateVote = voting + 1;
        setVoting(updateVote);
      }
    } catch (err) {
      console.error('Error in handleUpvote', { err });
    }
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <main>
        {imgUrl ? (
          <div className={styles.container}>
            <div className={styles.col1}>
              <div className={styles.backToHomeLink}>
                <Link href="/" passHref>
                  <a type="button">← Back to home</a>
                </Link>
              </div>
              <div className={styles.nameWrapper}>
                <h1 className={styles.name}>{name}</h1>
              </div>
              <Image
                src={imgUrl}
                className={styles.storeImg}
                width={600}
                height={360}
              />
            </div>

            <div className={cls('glass', styles.col2)}>
              <div className={styles.iconWrapper}>
                <Image width={24} height={24} src="/static/icons/places.svg" />
                <p className={styles.text}>{address}</p>
              </div>
              {neighborhood && (
                <div className={styles.iconWrapper}>
                  <Image
                    width={24}
                    height={24}
                    src="/static/icons/nearMe.svg"
                  />
                  <p className={styles.text}>{neighborhood}</p>
                </div>
              )}
              <div className={styles.iconWrapper}>
                <Image width={24} height={24} src="/static/icons/star.svg" />
                <p className={styles.text}>{voting}</p>
              </div>
              <button
                type="button"
                className={styles.upvoteButton}
                onClick={handleUpvoteButton}
              >
                Up Vote
              </button>
            </div>
          </div>
        ) : (
          <div style={{ height: '100vh' }}>
            <h2>Loading Store ...</h2>
          </div>
        )}
      </main>
    </div>
  );
}
