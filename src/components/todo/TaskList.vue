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
  <ul class="tasks">
    <li v-for="task in tasks" class="tasks--item">
      <h4 class="tasks--item-name">
        {{ task.name }} 
      </h4>
      <p class="tasks--item-description">{{ task.description }}</p>
      <div class="tasks--item-actions">
        <select>
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span class="tasks--item-actions-buttons">
          <button @click="onSelect(task)" class="btn btn--default">edit</button>
          <button @click="onDelete(task.task_id)" class="btn btn--error">remove</button>
        </span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">

.tasks {
  list-style: none;
  padding-left: 0;

  h4 {
    line-height: 1.5rem;
  }

  &--item-name {
    font-size: 1.2rem;
    color: white;
  }

  &--item {
    padding: 7px 10px;
    border-bottom: 0.5px solid #666666;

    &:hover {
      background-color: #0e3e29;
      border-color: #0e3e29;
      cursor: pointer;
    }
  }

  &--item-actions {
    display: flex;
    justify-content: space-between;

    &-buttons .btn {
      margin: 0px 3px;
    }
  }

}
</style>