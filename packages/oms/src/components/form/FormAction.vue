<template>
  <el-form-item
      v-if="formOptions.submitButton.show || formOptions.cancelButton.show"
  >
    <el-button
        v-if="formOptions.submitButton.show"
        v-bind="formOptions.submitButton"
        @click="action('submit')"
    >{{ formOptions.submitButton.text }}
    </el-button>
    <el-button
        v-if="formOptions.cancelButton.show"
        v-bind="formOptions.cancelButton"
        @click="action('cancel')"
    >{{ formOptions.cancelButton.text }}
    </el-button>
  </el-form-item>
</template>
<script lang="ts">
export default {
  name: 'FormAction',
  props: {
    formOptions: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ['submit', 'cancel'],
  methods: {
    action(type) {
      this.$emit(type)
    }
  }
}
</script>
