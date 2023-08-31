import Head from "next/head";
import { PropsWithChildren } from "react";
import { StyledEngineProvider } from "@mui/material";
import { Providers } from "@/lib/shared/application/adapter/provider";

export default function mainLayout({children}: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Imgur Gallery</title>
      </Head>
      <StyledEngineProvider injectFirst>
        <Providers>
          { children }
        </Providers>
      </StyledEngineProvider>
    </>
  )
}
