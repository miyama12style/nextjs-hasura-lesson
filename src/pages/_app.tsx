import 'src/styles/globals.css'
import { AppProps } from 'next/app'

// hasuraと連携させるため
import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from 'src/libs/apolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  // クライアントを作成
  const client = initializeApollo()

  return (
    // どんなコンポーネントでも使えるように
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
