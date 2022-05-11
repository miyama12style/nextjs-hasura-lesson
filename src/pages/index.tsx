import { Layout } from 'src/layouts'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <Layout title="Home">
        <p className="text-3xl font-bold">Next.js + GraphQL</p>
      </Layout>
    </div>
  )
}

export default Home
