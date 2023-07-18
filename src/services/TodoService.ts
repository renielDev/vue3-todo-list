import axios from '@/vendors/axios'
import { type Todo, type TodoNoTaskId, type TodoTaskId } from '@/models/Todo'


export const getTasks = () => {
  return axios.get<Todo[]>('/tasks/all')
}

export const deleteTask = (taskId: string) => {
  return axios.delete<TodoTaskId>(`/tasks/${taskId}`)
}

export const updateTask = (taskId: string, task: Todo) => {
  return axios.put<TodoTaskId>(`/tasks/${taskId}`, task)
}

export const createTask = (task: TodoNoTaskId) => {
  return axios.post<TodoTaskId>('/tasks/', task )
}