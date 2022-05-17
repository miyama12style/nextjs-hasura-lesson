import { VFC } from 'react'
import { useCreateUser } from 'src/hooks/useCreateUser'
import { CreateUserChild } from './CreateUserChild'

export const CreateUser: VFC = () => {
  const {
    text,
    username,
    handleSubmit,
    printMsg,
    handleTextChange,
    handleUsernameChange,
  } = useCreateUser()

  console.log('CreateUser render')

  return (
    <>
      <p className="mb-3 font-bold">CustomHook + useCallback + memo</p>
      <div className="mb-3 flex flex-col justify-center items-center">
        <label>Text</label>
        <input
          type="text"
          onChange={handleTextChange}
          value={text}
          className="py-2 px-3 border border-gray-300"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <label>Username</label>
        <input
          type="text"
          onChange={handleUsernameChange}
          value={username}
          className="mb-3 py-2 px-3 border border-gray-300"
          placeholder="New User ?"
        />
        <button
          type="submit"
          disabled={!username}
          className="disabled:opacity-40 mb-3 py-2 my-3 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none"
        >
          Submit
        </button>
      </form>
      <CreateUserChild printMsg={printMsg} handleSubmit={handleSubmit} />
    </>
  )
}
