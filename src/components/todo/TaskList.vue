<script setup lang="ts">
import { TodoStatusType, type Todo } from '@/models/Todo';
import {deleteTask, getTasks, updateTask} from '@/services/TodoService'
import { onMounted, ref, type HtmlHTMLAttributes, computed } from 'vue';

const emit = defineEmits(['select'])

const tasks = ref<Todo[]>()
const activeTasks = computed(() => {
  const _tasks = (tasks?.value || [])
  return _tasks.filter((task:Todo) => [TodoStatusType.IN_PROGRESS, TodoStatusType.PENDING].includes(task.state))
})

const completedTasks = computed(() => {
  const _tasks = (tasks?.value || [])
  return _tasks.filter((task:Todo) => TodoStatusType.COMPLETED === task.state)
})

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

const onUpdate = async (target:HTMLInputElement, task:Todo) => {
  await updateTask(task.task_id, { ...task, state: target.value as TodoStatusType })
}

const onSelect = (todo: Todo) => emit('select', todo)

const onMarkAsComplete = async (task: Todo) => {
  await updateTask(task.task_id, {...task, state: TodoStatusType.COMPLETED})
  loadTasks()
}

defineExpose({
  loadTasks
})
</script>

<template>
  <ul class="tasks">
    <li class="tasks--item-divider">Completed Task</li>
    <li v-for="task in completedTasks" class="tasks--item">
      <h4 class="tasks--item-name green">
        {{ task.name }} 
      </h4>
      <p class="tasks--item-description">{{ task.description }}</p>
      <div class="tasks--item-actions">
        <span></span>
        <span class="tasks--item-actions-buttons">
          <button @click="onDelete(task.task_id)" class="btn btn--error btn--small">remove</button>
        </span>
      </div>
    </li>
    <li class="tasks--item-divider">Active Task</li>
    <li v-for="task in activeTasks" class="tasks--item">
      <h4 class="tasks--item-name">
        {{ task.name }} 
      </h4>
      <p class="tasks--item-description">{{ task.description }}</p>
      <div class="tasks--item-actions">
        <select v-model="task.state" @change="onUpdate($event.target as HTMLInputElement, task)">
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span class="tasks--item-actions-buttons">
          <button @click="onSelect(task)" class="btn btn--default btn--small">edit</button>
          <button @click="onDelete(task.task_id)" class="btn btn--error btn--small">remove</button>
          <button @click="onMarkAsComplete(task)" class="btn btn--primary btn--small">complete</button>
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

  &--item-divider {
    padding: 5px 10px;
    background: #262525;
    text-align: center;
    font-size: 1.2rem;
    color: white;
  }

  &--item-name {
    font-size: 1.2rem;
    color: white;

    &.green {
      color: hsla(160, 100%, 37%, 1);
    }
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