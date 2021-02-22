const createNotice = (noticeTitle, noticeOptions, cb) => {
  const note = new Notification(noticeTitle, noticeOptions)

  note.onclick = event => {
    event.preventDefault()

    if (typeof cb === 'function') cb()
  }
}

const notify = () => {
  // 先检查浏览器是否支持
  if (!('Notification' in window)) {
    alert('该浏览器不支持桌面通知，请使用或升级 Chrome 浏览器')
    return () => {}
  }

  const defaultNoticeTitle = ''
  const defaultNoticeOptions = {
    requireInteraction: true,
    icon: 'http://oms.com/favicon.ico'
  }

  /**
   * 消息通知
   * @param {Object|String} msg e.g. { title: '消息标题', body: '消息内容' } | '消息内容'
   */
  return msg => {
    const isObjMsg = typeof msg === 'object'
    const noticeTitle = isObjMsg ? msg.title : defaultNoticeTitle
    const message = isObjMsg ? msg.body : msg
    const noticeOptions = {
      ...defaultNoticeOptions,
      body: message
    }

    // 检查用户是否同意接受通知
    if (Notification.permission === 'granted') {
      createNotice(noticeTitle, noticeOptions)
    } else if (Notification.permission !== 'denied') {
      // 否则我们需要向用户获取权限
      Notification.requestPermission(status => {
        // 如果用户同意，就可以向他们发送通知
        if (status === 'granted') {
          createNotice(noticeTitle, noticeOptions)
        }
      })
    }
  }
}

export default notify()
