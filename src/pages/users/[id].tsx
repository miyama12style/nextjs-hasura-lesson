import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Layout } from 'src/layouts'
import { initializeApollo } from 'src/libs/apolloClient'
import { GET_USERBY_ID, GET_USERIDS } from 'src/queries/query'
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from 'src/types/generated/graphql'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  })

  const ids = data.users?.map((user) => `/users/${user.id}`)

  //この書き方でもいい
  // const paths = data.users?.map((user) => ({
  //   params: {
  //     id: user.id,
  //   },
  // }))

  console.log(data)

  return {
    paths: ids,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  {
    user: {
      __typename?: 'users'
    } & Pick<Users, 'id' | 'name' | 'created_at'>
  },
  { id: string }
> = async (ctx) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: ctx.params.id },
  })

  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1,
  }
}

type Props = {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
}

const UserDetail: NextPage<Props> = (props) => {
  if (!props.user) {
    return <Layout title="User Detail LoadingPage">Loading...</Layout>
  }

  return (
    <Layout title={props.user.name}>
      <p className="text-xl font-bold">User Detail</p>
      <p className="m-4">
        {`ID :`}
        {props.user.id}
      </p>
      <p className="mb-4 text-xl font-bold">{props.user.name}</p>
      <p className="mb-12">{props.user.created_at}</p>
      <Link href="/hasura-ssg">
        <a className="mt-6" data-testid="back-to-main">Back</a>
      </Link>
    </Layout>
  )
}

export default UserDetail
