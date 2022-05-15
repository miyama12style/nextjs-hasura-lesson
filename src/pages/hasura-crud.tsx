// hasuraとCRUDの連携
// ユーザの新規作成、更新、削除

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { ComponentProps, useState } from 'react'
import { Layout } from 'src/layouts'
import {
  CREATE_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
} from 'src/queries/query'
import {
  CreateUserMutation,
  DeleteUserMutation,
  GetUsersQuery,
  UpdateUserMutation,
} from 'src/types/generated/graphql'
import { UserItem } from 'src/components/UserItem'

const HasuraCrud: NextPage = () => {
  // ユーザーの編集用にstateを作成する
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })

  const { data, loading, error } = useQuery<GetUsersQuery>(GET_USERS)
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    // {}のなかはデータのフィールド名
    update(cache, { data: { insert_users_one } }) {
      cache.modify({
        fields: {
          // 第一引数はexistion + 更新するテーブル名 toReferenceはapolloの機能
          users(existingUsers, { toReference }) {
            return [toReference, ...existingUsers]
          },
        },
      })
    },
  })
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          // readFieldはapolloの機能
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault()
    // ユーザーの更新
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } catch (error: any) {
        alert(error.message)
      }
      // ユーザーの新規作成
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch {
        alert(error.message)
      }
    }
    setEditedUser({ id: '', name: '' })
  }

  if (error) {
    return (
      <Layout title="error happen">
        <p>{error.message}</p>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout title="loading now">
        <p>Loading now ...</p>
      </Layout>
    )
  }

  if (!data && !loading) {
    return (
      <Layout title="empty">
        <p>data is empty</p>
      </Layout>
    )
  }

  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
          value={editedUser.name}
          placeholder="New User ?"
          className="py-2 px-3 border border-gray-300"
        />
        <button
          type="submit"
          disabled={!editedUser.name}
          test-id="new"
          className="disabled:opacity-40 mb-3 py-2 my-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>
      {/* ここにユーザー情報を展開 */}
      {data.users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          setEditedUser={setEditedUser}
          delete_users_by_pk={delete_users_by_pk}
        />
      ))}
    </Layout>
  )
}

export default HasuraCrud
