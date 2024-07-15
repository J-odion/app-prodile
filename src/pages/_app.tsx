import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import HEAD from "next/head";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { NextPage } from "next";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "../../context/auth.context";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <HEAD>
        <title>Prodile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </HEAD>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#29D"
            initialPosition={0.3}
            crawlSpeed={200}
            crawl={true}
            easing="ease"
            height={3}
            showSpinner={true}
            shadow="0 0 10px rgba(0, 0, 0, 0.3)"
          />
          <Toaster />
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
