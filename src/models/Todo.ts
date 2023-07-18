
export enum TodoStatusType {
  COMPLETED = "completed",
  IN_PROGRESS = "in progress",
  PENDING = "pending"
} 
export interface Todo {
  task_id: string,
  name: string,
  description: string,
  state: TodoStatusType
}
export type TodoNoTaskId = Omit<Todo, "task_id">
export type TodoTaskId = Pick<Todo, "task_id">
