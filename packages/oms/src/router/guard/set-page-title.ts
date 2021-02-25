import { Router } from 'vue-router'
import store from '../../store'
import { cloneDeep } from 'lodash'

export default function(router: Router) {
  router.beforeEach(async(to, form, next) => {
    const settings = store.state.settings
    let title = settings.title
    cloneDeep(to.matched).reverse().forEach((item, index) => {
      if (index < 2 && item.meta && item.meta.title) {
        title = item.meta.title + '-' + title
      }
    })
    document.title = title
    next()
  })
}
