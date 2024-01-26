import React, {useEffect, useState} from 'react';
import {Layout} from '../components'
import Head from 'next/head';
import Script from 'next/script';


import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
