import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // <SessionProvider session={session}>
      <Head>
        <title>Book Store - Software development course</title>
      </Head>
      <Component {...pageProps} />
    // </SessionProvider>
  );
}
