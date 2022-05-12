import { makeVar } from '@apollo/client'

type Task = {
  title: string
}

// 複数のタスクをstateで管理する
export const todoVar = makeVar<Task[]>([])
