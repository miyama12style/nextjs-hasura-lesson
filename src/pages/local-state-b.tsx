import { NextPage } from 'next'
import { Layout } from 'src/layouts'
import { LocalStateB } from 'src/components/LocalStateB'

const LocalStatePageB: NextPage = () => {
  return (
    <Layout title="Local State B">
      <LocalStateB />
    </Layout>
  )
}

export default LocalStatePageB
