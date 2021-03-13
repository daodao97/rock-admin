<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hi {{ name }}.</div>
  </div>
  <VButton v-bind="b1" />
  <VButton v-bind="b2" />
  <VButton v-bind="b3" />
  <VButtonGroup :buttons="buttons" />
</template>
<script>
import { mapGetters } from 'vuex'
import VButton from '../components/button/VButton.vue'
import VButtonGroup from '../components/button/VButtonGroup.vue'

export default {
  name: 'Dashboard',
  components: { VButton, VButtonGroup },
  data() {
    return {
      buttons: [
        {
          type: 'jump',
          text: '跳转',
          target: 'http://github.com/daodao97',
          props: {
            type: 'primary',
            circle: true
            // icon: 'el-icon-edit'
          }
        },
        {
          type: 'api',
          text: '删除',
          target: '/user/{id}',
          metaData: {
            id: 1
          },
          extra: {
            method: 'POST'
          }
        },
        {
          type: 'form',
          text: '表单',
          target: '/user/form',
          extra: {
            formItems: [
              { type: 'input', lable: 'xxx' }
            ]
          },
          // container: 'drawer',
          beforeCloseContainer() {
            console.log(1111)
            return true
          }
        }
      ],
      b1: {
        type: 'jump',
        text: '跳转',
        target: 'http://github.com/daodao97',
        props: {
          type: 'primary',
          circle: true
          // icon: 'el-icon-edit'
        }
      },
      b2: {
        type: 'api',
        text: '删除',
        target: '/user/{id}',
        metaData: {
          id: 1
        },
        extra: {
          method: 'POST'
        }
      },
      b3: {
        type: 'form',
        text: '表单',
        target: '/user/form',
        extra: {
          formItems: [
            { type: 'input', lable: 'xxx' }
          ]
        },
        // container: 'drawer',
        beforeCloseContainer() {
          console.log(1111)
          return true
        }
      }
    }
  },
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
