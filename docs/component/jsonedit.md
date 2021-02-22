```vue-demo
<template>
  <v-json v-model="json" />
</template>
<script>
export default {
    data() {
        return {
            json: {
                saveApi: "/save",
                formItems: [
                    {
                        field: "test",
                        label: "字段1",
                        type: "input"
                    }
                ]
            }
        }
    }
}
</script>
```
