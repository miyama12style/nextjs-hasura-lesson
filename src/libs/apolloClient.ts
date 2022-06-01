// Next.jsとhasuraを連携させる
// createApolloClientでapolloインスタンスや、initializeApolloでクライアントサイドとサーバーサイドを切り分ける初期化に関する処理を作成

import fetch from 'cross-fetch'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://basic-hsura-lesson.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
      fetch, // Server URL (must be absolute)
    }),
    cache: new InMemoryCache({
      typePolicies: {
        query_root: {
          queryType: true,
        },
        mutation_root: {
          mutationType: true,
        },
      },
    }),
  })
}

export const initializeApollo = () => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // For SSG and SSR always create a new Apollo Client
  // サーバーサイドの処理 毎回apolloClientを返さないといけない
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  // クライアントサイドの処理 一回実行したらいい
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
