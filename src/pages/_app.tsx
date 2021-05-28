import Head from 'next/head'
import { getYear } from 'date-fns'
import { ThemeProvider } from '@emotion/react'
import { theme } from 'theme'
import { AppProps } from 'next/app'
import 'styles/globals.css'
import 'styles/markdown.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>HTML Renderer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="Copyright"
          content={`Copyright © Phil Scott ${getYear(
            new Date(),
          )}. All Rights Reserved.`}
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
