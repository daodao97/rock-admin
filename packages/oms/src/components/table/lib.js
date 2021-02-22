import store from '../../store'
import _ from 'lodash'

export function getPageTitle(matched, withBase = true) {
  let title = withBase ? store.state.settings.title : ''
  _.cloneDeep(matched).reverse().forEach((item, index) => {
    if (index < 2 && item.meta.title) {
      title = item.meta.title + (title ? '-' + title : title)
    }
  })
  return title
}
