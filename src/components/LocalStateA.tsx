//入力フォームやサブミットボタンを設置し、新しくタスクを登録できるような、todoVarを更新していくコンポーネント
// currentTargetとtargetの違いを詳しく復習
// eの型を復習→前使った手法
// todoVarの更新方法がよくわからない

import { useReactiveVar } from '@apollo/client'
import { todoVar } from 'cache'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { useState } from 'react'
import { VFC } from 'react'

export const LocalStateA: VFC = () => {
  const [input, setInput] = useState('')
  const todos = useReactiveVar(todoVar)

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault()
    todoVar([...todoVar(), { title: input }])
    setInput('')
  }

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => (
        <p key={index} className="mb-3 y-1">
          {task.title}
        </p>
      ))}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="New Task?"
          className="mb-3 px-3 py-2 border border-gray-300"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none"
          type="submit"
        >
          ADD
        </button>
      </form>
      <Link href="/local-state-b">
        <a>NEXT</a>
      </Link>
    </>
  )
}
