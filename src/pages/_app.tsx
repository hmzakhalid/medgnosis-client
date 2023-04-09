import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { api } from "@/utils/api";
import Head from "next/head";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>MedGnosis</title>
        <meta
          name="description"
          content="Decentralized Federated Learning for Medical Diagnosis"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "Poppins, sans-serif",
          colors: {
            'cardBG': ['rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)', 'rgb(75 85 99 / 0.25)'],
          }
          
        }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
