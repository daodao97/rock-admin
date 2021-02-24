export default [
  {
    type: 'get',
    url: '/system/config',
    response: () => {
      return {
        code: 0,
        payload: {
          navBarNotice: '远程配置的导航顶部提示信息',
          logo: 'https://gitee.com/daodao97/asset/raw/master/imgs/logo.png'
        }
      }
    }
  },
  {
    type: 'post',
    url: '/upload',
    response: () => {
      return {
        'code': 0,
        'message': '操作成功',
        'payload': {
          'path': '1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg',
          'url': 'http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg',
          'key': 'file',
          'size': 94624,
          'width': 800,
          'height': 800
        }
      }
    }
  }
]
