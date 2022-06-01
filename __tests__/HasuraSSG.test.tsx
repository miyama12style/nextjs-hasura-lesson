import { cleanup, render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from 'src/mock/handlers'
import '@testing-library/jest-dom/extend-expect'

process.env.NEXT_PUBLIC_HASURA_URL="https://basic-hsura-lesson.hasura.app/v1/graphql"


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

describe('hasuraSSGのテストです', () => {
  it('hasuraSSGのレンダリングのテスト', async () => {
    const { page } = await getPage({
      route: '/hasura-ssg',
    })
    render(page)
    expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(screen.getByText('Test user C')).toBeInTheDocument()
  })
})
