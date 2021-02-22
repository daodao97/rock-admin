<template>
  <div>
    <v-chart :options="options1" />
    <v-form :form-items="items" :components="comps" />
  </div>
</template>

<script>
import { markRaw } from 'vue'
import { defineComponent } from 'vue'
import { options1 } from './data'
import { VForm, VChart } from 'oms'
import MyInput from './MyInput.vue'
export default defineComponent({
  name: 'Test',
  components: { VForm, VChart },
  data() {
    console.log(this.$store.state)
    return {
      options1,
      comps: {
        'my-input': markRaw(MyInput)
      },
      items: [
        {
          type: 'input',
          label: 'test',
          field: 'test'
        },
        {
          type: 'my-input',
          label: 'custom',
          field: 'test'
        }
      ]
    }
  }
})
</script>
