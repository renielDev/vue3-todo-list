<script setup lang="ts">
const props = defineProps<{
  label: string,
  for?: string,
}>()
</script>

<template>
  <div class="form-field--container">
    <label :for="props.for" class="form-field--label">{{ props.label }}</label>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.form-field {
  &--container {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
  &--label {
    margin-bottom: 5px;
    color: white;
  }
}
</style>