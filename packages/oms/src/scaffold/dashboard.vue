<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hi {{ name }}.</div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
    admin() {
      return this.$store.state.settings
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.moduleList {
  margin: 20px 0;

  .moduleCard {
    cursor: pointer;
  }
}
</style>
