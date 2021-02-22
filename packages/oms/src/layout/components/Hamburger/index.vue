<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <v-icon :class="{ 'is-active': isActive }" name="ra-leftalignment" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-click'],
  methods: {
    toggleClick() {
      this.$emit('toggle-click')
    }
  }
}
</script>
