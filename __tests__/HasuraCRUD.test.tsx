// useQueryで取得したデータがちゃんとレンダリングされているか
// deleteボタンとeditボタンが存在するか
// をテストしていく

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

describe('HasuraCrudのテスト', () => {
  it('hasuraCRUDページのレンダリング', async () => {
    const { page } = await getPage({
      route: '/hasura-crud',
    })
    render(page)
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2022-05-06T10:41:04.365422+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-64293d80-ca56-7cb6-f00a-ae0699b4385d')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-64293d80-ca56-7cb6-f00a-ae0699b4385d')
    ).toBeTruthy()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2022-05-06T10:41:21.08985+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-fcd77df9-cb0e-7876-eb4a-782e01ff16cb')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-fcd77df9-cb0e-7876-eb4a-782e01ff16cb')
    ).toBeTruthy()
    expect(screen.getByText('Test user C')).toBeInTheDocument()
    expect(
      screen.getByText('2022-05-06T10:41:26.729478+00:00')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('edit-9dce62aa-86e4-b29b-06f9-15d138fd85be')
    ).toBeTruthy()
    expect(
      screen.getByTestId('delete-9dce62aa-86e4-b29b-06f9-15d138fd85be')
    ).toBeTruthy()
  })
})
