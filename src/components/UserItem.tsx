// ユーザー情報と更新と削除を行うコンポーネント

import { memo } from 'react'
import { Dispatch, SetStateAction, VFC } from 'react'
import { DeleteUserMutationFn, Users } from 'src/types/generated/graphql'

type Props = {
  user: { __typename?: 'users' } & Pick<Users, 'id' | 'name' | 'created_at'>
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string
      name: string
    }>
  >
  delete_users_by_pk: DeleteUserMutationFn
}

export const UserItem: VFC<Props> = memo(function userItem(props) {
  console.log('rendering')

  return (
    <div>
      <span>{props.user.name}</span>
      <span>{props.user.created_at}</span>
      <button
        className="mx-1 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl focus:outline-none"
        data-testid={`edit-${props.user.id}`}
        onClick={() => props.setEditedUser(props.user)}
      >
        Edit
      </button>
      <button
        className="mr-1 py-1 px-3 text-white bg-pink-600 hover:bg-pink-700 rounded-2xl focus:outline-none"
        data-testid={`delete-${props.user.id}`}
        onClick={async () =>
          await props.delete_users_by_pk({
            variables: {
              id: props.user.id,
            },
          })
        }
      >
        Delete
      </button>
    </div>
  )
})
