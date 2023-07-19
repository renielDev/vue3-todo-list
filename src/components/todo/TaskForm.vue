<script setup lang="ts">
import { TodoStatusType, type Todo, type TodoNoTaskId } from '@/models/Todo';
import { reactive, unref } from 'vue';
import FormFieldLabel from '@/components/FormFieldLabel.vue';

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
  <div class="task-form">
    <h3 class="green">{{ data.id ? "Edit": "Add" }} Task</h3>
    <FormFieldLabel for="name" label="Name">
      <input type="text" name="name" v-model="data.form.name">
    </FormFieldLabel>
    <FormFieldLabel for="description" label="Description">
      <textarea name="description" :rows="4" v-model="data.form.description" />
    </FormFieldLabel>
    <div class="task-form--buttons">
      <button @click="onSubmit" class="btn btn--transparent">Save</button>
      <button v-if="data.id" class="btn btn--transparent btn-cancel" @click="clearForm">Cancel</button>
    </div>
  </div>
</template>

<style scoped lang="scss">

h3 {
  font-size: 2.5rem;
}
.task-form {
  margin-top: 15px;
  padding: 20px;
  &--buttons {
    display: flex;
    justify-content: end;
    .btn-cancel {
      margin-left: 8px;
    }
  }
  
}
</style>