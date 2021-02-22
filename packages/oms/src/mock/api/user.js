const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    id: 1,
    avatar: 'https://gitee.com/daodao97/asset/raw/master/imgs/WechatIMG9.jpeg',
    name: 'SuperAdmin',
    role_ids: [1],
    resource: []
  },
  'editor-token': {
    id: 2,
    avatar: 'https://gitee.com/daodao97/asset/raw/master/imgs/WechatIMG9.jpeg',
    name: 'NormalEditor',
    role_ids: [1],
    resource: []
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: options => {
      const { username, ticket } = options.params
      if (ticket) {
        return {
          code: 0,
          payload: tokens['admin']
        }
      }
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 0,
        payload: token
      }
    }
  },

  // get user info
  {
    url: '/user/info.*',
    type: 'get',
    response: options => {
      const { token } = options.params
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 0,
        payload: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 0,
        payload: 'success'
      }
    }
  }
]
