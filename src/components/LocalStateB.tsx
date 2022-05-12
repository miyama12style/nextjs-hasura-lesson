// 更新されたtodoVarを読みに行く、Reduxチックなことができる
// todoVarから取得したデータを表示するコンポーネント

import { useReactiveVar } from '@apollo/client'
import { todoVar } from 'cache'
import Link from 'next/link'
import { VFC } from 'react'

export const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar)

  return (
    <>
      {todos?.map((title, index) => (
        <p key={index} className="mb-3">
          {title}
        </p>
      ))}
      <Link href="local-state-a">
        <a>BACK</a>
      </Link>
    </>
  )
}
