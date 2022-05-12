import { NextPage } from 'next'
import { Layout } from 'src/layouts'
import { LocalStateA } from 'src/components/LocalStateA'

const LocalStatePageA: NextPage = () => {
  return (
    <Layout title="Local State A">
      <LocalStateA />
    </Layout>
  )
}

export default LocalStatePageA
