import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';

import { StoreProvider } from '../components/store';
import NavBar from '../components/NavBar';
import Container from 'react-bootstrap/Container';
import style from './app.module.css';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StoreProvider>
      <div className={style.appBG}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <NavBar></NavBar>

        <Container className={style.appContainer}>
          <Component {...pageProps} />
        </Container>
      </div>
    </StoreProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
