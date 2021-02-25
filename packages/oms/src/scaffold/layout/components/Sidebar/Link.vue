<template>
  <component :is="compType(to)" v-bind:="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import {isExternal} from '../../../../utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    newTab: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    compType(url) {
      if (isExternal(url) || this.newTab) {
        return 'a'
      } else {
        return 'router-link'
      }
    },
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      if (this.newTab) {
        const routeData = this.$router.resolve(url)
        return {
          is: 'a',
          href: routeData.href,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
