import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Layout } from 'src/layouts'
import { initializeApollo } from 'src/libs/apolloClient'
import { GET_USERS } from 'src/queries/query'
import { GetUsersQuery, Users } from 'src/types/generated/graphql'

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  })

  return {
    props: { users: data.users },
    revalidate: 30,
  }
}

type Props = {
  users: { __typename?: 'users' } & Pick<Users, 'id' | 'name' | 'created_at'>[]
}

const HasuraSSG: NextPage<Props> = (props) => {
  return (
    <Layout title="Hasura SSG">
      <p className="mb-3 font-bold">SSG + ISR</p>
      {props.users?.map((user) => (
        <Link href={`/users/${user.id}`} key={user.id}>
          <a className="my-1 cursor-pointer" data-testid={`link-${user.id}`}>
            {user.name}
          </a>
        </Link>
      ))}
    </Layout>
  )
}

export default HasuraSSG
