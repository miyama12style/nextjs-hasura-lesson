/**
 * @jest-environment jsdom
 */

import { cleanup, render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from 'src/mock/handlers'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

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

describe('hasuraSSGのdetailページのテスト', () => {
  it('hasuraSSGのdetailページのレンダリングとページ遷移', async () => {
    const { page } = await getPage({
      route: '/users/64293d80-ca56-7cb6-f00a-ae0699b4385d',
    })
    render(page)
    expect(await screen.findByText('User Detail')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2022-05-06T10:41:04.365422+00:00')
    ).toBeInTheDocument()
    userEvent.click(screen.getByTestId('back-to-main'))
    expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()
    userEvent.click(
      screen.getByTestId('link-fcd77df9-cb0e-7876-eb4a-782e01ff16cb')
    )
    expect(await screen.findByText('User Detail')).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
  })
})
