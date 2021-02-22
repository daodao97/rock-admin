<template>
  <v-icon :name="meta.icon || 'el-icon-menu'" />
  <span class="menu-content">{{ meta.title }}</span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuContent',
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          icon: '',
          title: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  }
}
</script>
