// mockServiceWorkerでテストを書いてく

// mswはRESTとGraphQLどちらも対応している
import { graphql } from 'msw'

// queryに対するレスポンスを書いていく
export const handlers = [
  // 第一引数にqueryのフィールド名→apolloClientなどを使って、アプリのコード内でGetUsersを呼んでいるところが、handlersで定義したテスト用のデータに置き換わってくれる

  // userの情報を取ってくる
  graphql.query('GetUsers', (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typename: 'users',
            id: '64293d80-ca56-7cb6-f00a-ae0699b4385d',
            name: 'Test user A',
            created_at: '2022-05-06T10:41:04.365422+00:00',
          },
          {
            __typename: 'users',
            id: 'fcd77df9-cb0e-7876-eb4a-782e01ff16cb',
            name: 'Test user B',
            created_at: '2022-05-06T10:41:21.08985+00:00',
          },
          {
            __typename: 'users',
            id: '9dce62aa-86e4-b29b-06f9-15d138fd85be',
            name: 'Test user C',
            created_at: '2022-05-06T10:41:26.729478+00:00',
          },
        ],
      })
    )
  }),

  //getStaticPathsで使われているquery
  graphql.query('GetUserIDs', (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typename: 'users',
            id: '64293d80-ca56-7cb6-f00a-ae0699b4385d',
          },
          {
            __typename: 'users',
            id: 'fcd77df9-cb0e-7876-eb4a-782e01ff16cb',
          },
          {
            __typename: 'users',
            id: '9dce62aa-86e4-b29b-06f9-15d138fd85be',
          },
        ],
      })
    )
  }),

  // このqueryは引数としてIDを受け取って、一致するものを返す
  graphql.query('GetUserByID', (req, res, ctx) => {
    // 渡されたIDを格納する
    const { id } = req.variables

    if (id === '64293d80-ca56-7cb6-f00a-ae0699b4385d') {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: 'users',
            id: '64293d80-ca56-7cb6-f00a-ae0699b4385d',
            name: 'Test user A',
            created_at: '2022-05-06T10:41:04.365422+00:00',
          },
        })
      )
    }
    if (id === 'fcd77df9-cb0e-7876-eb4a-782e01ff16cb') {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: 'users',
            id: 'fcd77df9-cb0e-7876-eb4a-782e01ff16cb',
            name: 'Test user B',
            created_at: '2022-05-06T10:41:21.08985+00:00',
          },
        })
      )
    }
    if (id === '9dce62aa-86e4-b29b-06f9-15d138fd85be') {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: 'users',
            id: '9dce62aa-86e4-b29b-06f9-15d138fd85be',
            name: 'Test user C',
            created_at: '2022-05-06T10:41:26.729478+00:00',
          },
        })
      )
    }
  }),
]
