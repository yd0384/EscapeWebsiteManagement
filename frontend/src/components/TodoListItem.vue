<template>
    <b-list-group-item>
        {{ todo.text }}
        <button @click="$emit('remove', todo.id)">
        X
        </button>
    </b-list-group-item>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>