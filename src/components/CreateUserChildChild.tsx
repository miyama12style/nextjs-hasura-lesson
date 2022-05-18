import { memo, VFC } from 'react'

type Props = {
  printHelloHelloMsg: () => void
}

export const CreateUserChildChild: VFC<Props> = memo((props) => {
  return (
    <div>
      <button
        className="disabled:opacity-40 mb-3 py-2 my-3 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none"
        onClick={props.printHelloHelloMsg}
      >
        Hello Hello click
      </button>
    </div>
  )
})
