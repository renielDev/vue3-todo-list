<script setup lang="ts">
import TaskForm from '@/components/todo/TaskForm.vue';
import TaskList from '@/components/todo/TaskList.vue';
import { ref } from 'vue'
import type { Todo } from '@/models/Todo';
import { createTask, updateTask } from '@/services/TodoService';

const tasks = ref<InstanceType<typeof TaskList> | null>(null)
const taskForm = ref<InstanceType<typeof TaskForm> | null>(null)

const onCreate = async (form: Todo) => {
  await createTask(form)
  tasks.value?.loadTasks()
}
const onUpdate = async (id: string, form:Todo) => {
  await updateTask(id, form)
  tasks.value?.loadTasks()
}
const onSelect = (todo:Todo) => {
  taskForm.value?.setTask(todo)
}
</script>

<template>
  <TaskList ref="tasks" @select="onSelect"/>
  <TaskForm ref="taskForm" @create="onCreate" @update="onUpdate"/>
</template>