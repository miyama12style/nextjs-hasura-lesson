// useQueryでユーザー情報を取得して表示しているのをちゃんとレンダリングしているかテストする
// useQueryのgetUsersをテストで実行すると、mockで定義しているテストデータが返ってくるのでそれを使用する

/**
 * @jest-environment jsdom
 */

import { handlers } from 'src/mock/handlers'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import 'setimmediate'

//next-page-testerを使う場合は、最初に初期化する必要がある
initTestHelpers()

// テストのモックサーバーを立てる
const server = setupServer(...handlers)

beforeAll(() => {
  // サーバーを起動
  server.listen()
})
afterEach(() => {
  // 各テストが終了したら、サーバーをリセットして、
  server.resetHandlers()
  // testing-libraryをcleanupする
  cleanup()
})
afterAll(() => {
  // テストが終了したら、サーバーを閉じる
  server.close()
})

describe('Hasura Fetch Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    const { page } = await getPage({
      route: '/hasura-main',
    })
    render(page)
    expect(await screen.findByText('Hasura Main Page')).toBeInTheDocument()
    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
  })
})
