// hasuraにqueryを投げてデータを取得する

import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { Layout } from 'src/layouts'
import { GET_USERS } from 'src/queries/query'
import { GetUsersQuery } from 'src/types/generated/graphql'

const FetchMain = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'network-only',
  })

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

  console.log(data.users)

  return (
    <>
      <Layout title="Hasura fetchPolicy">
        <p className="mb-6 font-bold">Hasura Main Page</p>
        {data.users?.map((user) => (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        ))}
        <Link href="/hasura-sub">
          <a className="mt-6">Next</a>
        </Link>
      </Layout>
    </>
  )
}

export default FetchMain
