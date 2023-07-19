<script setup lang="ts">
import { TodoStatusType, type Todo, type TodoNoTaskId } from '@/models/Todo';
import { reactive, unref } from 'vue';

const emit = defineEmits(['create', 'update'])
const INITIAL_DATA: TodoNoTaskId = {
  name: '',
  description: '',
  state: TodoStatusType.PENDING
}

const data = reactive<{
  id?: string | null,
  form: TodoNoTaskId
}>({
  id: null, 
  form: {...INITIAL_DATA}
})

const clearForm = () => {
  data.form = {...INITIAL_DATA}
  data.id = null
}

const onCreate = () => {
  emit('create', data.form)
  clearForm()
}
const onUpdate = () => {
  emit('update', data.id, data.form)
  clearForm()
}
const onSubmit = () => {
  data.id ? onUpdate(): onCreate()
}
const setTask = (todo: Todo) => {
  data.form = {...todo}
  data.id = todo.task_id
}

defineExpose({
  setTask
})

</script>
<template>
  <div>
    <label for="name">Name:</label>
    <input type="text" name="name" v-model="data.form.name">
  </div>
  <div>
    <label for="description">Description:</label>
    <textarea name="description" v-model="data.form.description" />
  </div>
  <div>
    <button @click="onSubmit">{{ data.id ? "update": "create" }}</button>
    <button v-if="data.id" @click="clearForm">cancel</button>
  </div>
</template>