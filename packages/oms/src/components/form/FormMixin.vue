<script>
export default {
  name: 'FormMixin',
  inject: ['formData'],
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    field: {
      type: String,
      default: '',
      required: true
    },
    props: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change', 'input'],
  data() {
    return {
      localValue: this.$props.value
    }
  },
  watch: {
    value(val) {
      this.localValue = val
    }
  },
  methods: {
    onInput(field, value) {
      this.$emit('input', value, field)
    },
    onChange(field, value) {
      this.$emit('change', value, field)
    }
  }
}
</script>
