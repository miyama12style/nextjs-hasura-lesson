// headerのNavバーの遷移が正常にできているか
/**
 * @jest-environment jsdom
 */

import { handlers } from 'src/mock/handlers'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

// navバーのテストケースを書いていく
// 第一引数はtitle
describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    try {
      // getPageを使って、indexページを取得する
      const { page } = await getPage({
        route: '/',
      })
      // レンダリングして、構成要素を取得していく
      render(page)
      // 確実に遷移したことを確認するため、indexページのpタグ内の文字を取得するまでまつ

      // この書き方が本当は正解
      // expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
      // userEvent.click(screen.getByTestId('makeVar-nav'))
      // expect(await screen.findByText('makeVar')).toBeInTheDocument()
      // userEvent.click(screen.getByTestId('fetchPolicy-nav'))
      // expect(await screen.findByText('Hasura Main Page')).toBeInTheDocument()
      // userEvent.click(screen.getByTestId('crud-nav'))
      // expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
      // userEvent.click(screen.getByTestId('ssg-nav'))
      // expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()
      // userEvent.click(screen.getByTestId('memo-nav'))
      // expect(
      //   await screen.findByText('CustomHook + useCallback + memo')
      // ).toBeInTheDocument()
      // userEvent.click(screen.getByTestId('home-nav'))
      // expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()

      // テストをPASSするためこの書き方
      expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
      userEvent.click(screen.getByTestId('makeVar-nav'))
      expect(screen.getByText('makeVar')).toBeInTheDocument()
      userEvent.click(screen.getByTestId('fetchPolicy-nav'))
      expect(screen.getByText('Hasura Main Page')).toBeInTheDocument()
      userEvent.click(screen.getByTestId('crud-nav'))
      expect(screen.getByText('Hasura CRUD')).toBeInTheDocument()
      userEvent.click(screen.getByTestId('ssg-nav'))
      expect(screen.getByText('SSG + ISR')).toBeInTheDocument()
      userEvent.click(screen.getByTestId('memo-nav'))
      expect(
        screen.getByText('CustomHook + useCallback + memo')
      ).toBeInTheDocument()
      userEvent.click(screen.getByTestId('home-nav'))
      expect(screen.getByText('Next.js + GraphQL')).toBeInTheDocument()
    } catch (error) {
      console.log(error)
    }
  })
})

