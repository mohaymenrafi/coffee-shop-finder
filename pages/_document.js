import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            link="/fonts/IBMPlexSans-Bold.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            link="/fonts/IBMPlexSans-SemiBold.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            link="/fonts/IBMPlexSans-Regular.ttf"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <NextScript />
          <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
