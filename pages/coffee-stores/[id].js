import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import cls from 'classnames';
import coffeeStoreData from '../../data/coffee-stores.json';
import styles from '../../styles/coffee-store.module.css';

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoreData.find(
        (store) => store.id === parseInt(params.id)
      ),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoreData.map((store) => ({
    params: {
      id: store.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({ coffeeStore }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  const { address, name, neighbourhood, imgUrl } = coffeeStore;
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
                <button type="button">back to home</button>
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
            <div className={styles.iconWrapper}>
              <Image width={24} height={24} src="/static/icons/nearMe.svg" />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
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
