import Head from "next/head";
import { PropsWithChildren } from "react";
import { StyledEngineProvider } from "@mui/material";
import { Providers } from "@/lib/shared/application/adapter/provider";

export default function mainLayout({children}: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Imgur Gallery</title>
        {/*<link rel="preconnect" href="https://fonts.googleapis.com" />*/ }
        {/*<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />*/ }
        {/*<link*/ }
        {/*  rel="stylesheet"*/ }
        {/*  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"*/ }
        {/*/>*/ }
      </Head>
      <StyledEngineProvider injectFirst>
        <Providers>
          { children }
        </Providers>
      </StyledEngineProvider>
    </>
  )
}
