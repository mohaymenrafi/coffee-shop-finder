import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import cls from 'classnames';
import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffe-store';
import { isEmpty } from '../../utils';
import { StoreContext } from '../../StoreContext/storeContext';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((store) => store.id === params.id) || {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store) => ({
    params: { id: store.id },
  }));
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(initialProps) {
  const router = useRouter();
  const {
    state: { coffeeStoresNearme },
  } = useContext(StoreContext);
  /* eslint-disable react/destructuring-assignment  */
  /* eslint-disable  react-hooks/exhaustive-deps */
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const { id } = router.query;
  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStoresNearme.length) {
        const fetchedNear = coffeeStoresNearme.find((store) => store.id === id);
        setCoffeeStore(fetchedNear);
      }
    }
  }, [id]);
  if (router.isFallback) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  const { address, name, imgUrl, neighborhood } = coffeeStore;
  const handleUpvoteButton = () => {
    console.log('upvote button');
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <main>
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
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
              }
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
                <Image width={24} height={24} src="/static/icons/nearMe.svg" />
                <p className={styles.text}>{neighborhood}</p>
              </div>
            )}
            <div className={styles.iconWrapper}>
              <Image width={24} height={24} src="/static/icons/star.svg" />
              <p className={styles.text}>1</p>
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
      </main>
    </div>
  );
}
