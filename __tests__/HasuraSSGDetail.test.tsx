/**
 * @jest-environment jsdom
 */

import { cleanup, render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from 'src/mock/handlers'
import '@testing-library/jest-dom/extend-expect'

initTestHelpers()

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

describe('hasuraSSGのdetailページのテスト', () => {
  it('hasuraSSGのdetailページのレンダリングとページ遷移', async () => {
    const { page } = await getPage({
      route: '/users/64293d80-ca56-7cb6-f00a-ae0699b4385d',
    })
    render(page)
    expect(await screen.findByText('User Detail')).toBeInTheDocument()
  })
})
