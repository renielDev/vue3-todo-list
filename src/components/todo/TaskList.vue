<script setup lang="ts">
import type { Todo } from '@/models/Todo';
import {deleteTask, getTasks} from '@/services/TodoService'
import { onMounted, ref } from 'vue';

const emit = defineEmits(['select'])

const tasks = ref<Todo[]>()

onMounted(() => {
  loadTasks()
})

const loadTasks = async () => {
  const { data } = await getTasks()
  tasks.value = data 
}

const onDelete = async (taskId: string) => {
  await deleteTask(taskId)
  tasks.value = tasks.value?.filter((task) => task.task_id !== taskId)
}

const onSelect = (todo: Todo) => emit('select', todo)

defineExpose({
  loadTasks
})
</script>

<template>
  <ul>
    <li v-for="task in tasks">
      {{ task.name }} - 
      <button @click="onDelete(task.task_id)">remove</button>
      <button @click="onSelect(task)">edit</button>
    </li>
  </ul>
</template>