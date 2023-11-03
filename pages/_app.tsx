//import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    {/* <SessionProvider session={session} /> */}
    <div>
      <Head>
        <title>Book Store - Software development course</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
