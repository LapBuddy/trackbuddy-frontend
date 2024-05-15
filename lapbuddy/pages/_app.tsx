
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    return (
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
  );
  }
