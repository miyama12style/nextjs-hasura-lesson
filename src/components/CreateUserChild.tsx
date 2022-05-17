// CreateUserのuseCallbackの挙動を確かめるためのコンポーネント

import { ComponentProps, memo } from 'react'
import { VFC } from 'react'

type Props = {
  printMsg: () => void
  handleSubmit: ComponentProps<'form'>['onSubmit']
}

export const CreateUserChild: VFC<Props> = memo((props) => {
  return (
    <>
      {console.log('CreateUserChild render')}
      <p>CreateUser Child Component</p>
      <button
        className="disabled:opacity-40 mb-3 py-2 my-3 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none"
        onClick={props.printMsg}
      >
        Hello Click
      </button>
    </>
  )
})
