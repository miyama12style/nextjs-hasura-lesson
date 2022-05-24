import { ReactNode, VFC } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title: string
}

const LinkData = [
  {
    title: 'Home',
    link: '/',
    testId: 'home-nav',
  },
  {
    title: 'makeVar',
    link: '/local-state-a',
    testId: 'makeVar-nav',
  },
  {
    title: 'fetchPolicy(Hasura)',
    link: '/hasura-main',
    testId: 'fetchPolicy-nav',
  },
  {
    title: 'CRUD(Hasura)',
    link: '/hasura-crud',
    testId: 'crud-nav',
  },
  {
    title: 'SSG+ISR(Hasura)',
    link: '/hasura-ssg',
    testId: 'ssg-nav',
  },
  {
    title: 'custom hook + memo',
    link: '/hooks-memo',
    testId: 'memo-nav',
  },
]

export const Layout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono">
      <Head>{props.title}</Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              {LinkData.map((data) => (
                <Link href={data.link} key={data.link}>
                  <a
                    data-testid={data.testId}
                    className="text-gray-300 hover:text-gray-700 px-3 py-2 rounded"
                  >
                    {data.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {props.children}
      </main>
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a className="flex items-center" href="">
          Powered by
          <img src="/vercel.svg" alt="Vercel logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
