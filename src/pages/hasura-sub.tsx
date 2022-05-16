// キャッシュにアクセスして、サーバーにはアクセスしないデータフェッチ

import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from 'src/layouts'
import { GET_USERS_LOCAL } from 'src/queries/query'
import { GetUsersQuery } from 'src/types/generated/graphql'

const FetchSub: NextPage = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)

  if (error) {
    return (
      <Layout title="error happen">
        <p>{error.message}</p>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout title="loading now">
        <p>Loading now ...</p>
      </Layout>
    )
  }

  if (!data && !loading) {
    return (
      <Layout title="empty">
        <p>data is empty</p>
      </Layout>
    )
  }

  return (
    <Layout title="fetch sub">
      <p className="mb-6 font-bold">Hasura Sub Page</p>
      {data.users?.map((user) => (
        <p key={user.id} className="my-1">
          {user.name}
        </p>
      ))}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  )
}

export default FetchSub
