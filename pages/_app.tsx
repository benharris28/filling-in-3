import { theme as proTheme } from '@chakra-ui/pro-theme'
import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app'
import { AirtableUserProvider } from "@/contexts/UserDataContext";
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
    components: {
      Link: {
        baseStyle: {
          textDecoration: 'none',
        },
        defaultProps: {
          textDecoration: 'none',
        },
      },
    },
    ...proTheme,
})
  
  return (
    <UserProvider>
    <ChakraProvider theme={theme}>
    <AirtableUserProvider>
      <Component {...pageProps} />
    </AirtableUserProvider>
    </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
