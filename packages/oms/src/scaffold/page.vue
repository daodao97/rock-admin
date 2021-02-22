<template>
  <div v-for="(item, index) in schemas" :key="'section-' + index">
    <component :is="item.type" v-bind="item.props || {}" v-on="item.event || {}" />
  </div>
</template>
<script>
export default {
  name: 'PageRender',
  data() {
    return {
      schemas: this.$route.meta.pageSchema || []
    }
  }
}
</script>
