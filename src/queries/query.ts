import { gql } from '@apollo/client'

// サーバーからとる
export const GET_USERS = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) {
      id
      name
      created_at
    }
  }
`

// apolloclientにおける状態管理で詳しく扱う
// クライアントのキャッシュからとる
// これが実行された時、GraphQLのクライアントサイドにあるキャッシュをみにいく
// →さまざまなコンポーネントに保存されているデータに自由にアクセスできる
export const GET_USERS_LOCAL = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) @client {
      id
      name
      created_at
    }
  }
`

// getstaticpathsで使う
export const GET_USERIDS = gql`
  query GetUserIds {
    users(order_by: { created_at: desc }) {
      id
    }
  }
`

// 特定のidでプロフィールが見れるようなgetstaticpathsで使う
export const GET_USERBY_ID = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`

// ユーザーの新規作成
export const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    insert_users_one(object: { name: $name }) {
      id
      name
      created_at
    }
  }
`

// ユーザーの削除
export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`

// ユーザーの編集
export const UPDATE_USER = gql`
  mutation UpdateUser($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      created_at
    }
  }
`
