import { theme as proTheme } from '@chakra-ui/pro-theme'
import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '@fontsource/inter/variable.css'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
  colors: {
    ...baseTheme.colors,
    brand: {
      100: "#FFE30A",
      // ...
      900: "#1a202c",

    },
  },
    fonts: {
      heading: "'Inter', -apple-system, system-ui, sans-serif",
      body: "'Inter', -apple-system, system-ui, sans-serif",
    },
    ...proTheme,
})
  
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
