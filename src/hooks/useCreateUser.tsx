import { useMutation } from '@apollo/client'
import { ComponentProps, useCallback } from 'react'
import { useState } from 'react'
import { CREATE_USER } from 'src/queries/query'
import { CreateUserMutation } from 'src/types/generated/graphql'

export const useCreateUser = () => {
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')

  const [insert_users_one, { error }] = useMutation<CreateUserMutation>(
    CREATE_USER,
    {
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
    }
  )

  const handleTextChange: ComponentProps<'input'>['onChange'] = useCallback(
    (e) => {
      setText(e.target.value)
    },
    []
  )

  const handleUsernameChange: ComponentProps<'input'>['onChange'] = useCallback(
    (e) => {
      setUsername(e.target.value)
    },
    []
  )

  const printHelloMsg = useCallback(() => console.log('hello'), [])

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await insert_users_one({
          variables: { name: username },
        })
      } catch {
        alert(error.message)
      }
      setUsername('')
    },
    [username]
  )

  return {
    text,
    username,
    handleSubmit,
    printHelloMsg,
    handleTextChange,
    handleUsernameChange,
  }
}
