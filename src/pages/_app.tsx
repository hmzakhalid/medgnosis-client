import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, type ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { api } from "@/utils/api";
import Head from "next/head";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Notifications />
        <ModalsProvider>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
