import store from '../../store'
import { cloneDeep } from 'lodash'
import { RouteRecordRaw } from 'vue-router'

export function getPageTitle(matched: RouteRecordRaw[], withBase = true) {
  let title = withBase ? store.state.settings.title : ''
  cloneDeep(matched).reverse().forEach((item, index) => {
    if (index < 2 && item.meta?.title) {
      title = item.meta.title + (title ? '-' + title : title)
    }
  })
  return title
}
