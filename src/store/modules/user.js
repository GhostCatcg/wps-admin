import {
  login,
  logout,
  getAvatar
} from '@/api/user'
import {
  bannerTypeList
} from '@/api/public'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter,
  router
} from '@/router'

import {
  MessageBox,
  Message
} from 'element-ui'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    slideshowType: [],
    user: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_SLIDESHOWTYPE: (state, data) => {
    state.slideshowType = data
  },
  SET_USER: (state, data) => {
    state.user = data
  }

}

const actions = {
  // user login
  // commit 自身    userInfo 账号密码
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        pwd: password
      }).then(response => {
        console.log(response)
        const {
          data
        } = response
        commit('SET_USER', data.data.user)
        commit('SET_TOKEN', data.data.token)
        localStorage.setItem("pic", data.data.user.pic); // 存入浏览器缓存


        setToken(data.data.token)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取头像
  getHeadAvatar({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      var data = localStorage.getItem("pic");
      const config = {
        data: {
          key: data,
        },
      };
      getAvatar(config.data).then(response => {
        // console.log('获取头像', response)
        commit('SET_NAME', 'yes')
        commit('SET_AVATAR', response.data.data.url)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getAvatar(state.token).then(response => {

        const {
          data
        } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', 'yes')
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取轮播类型
  async getSlideshowType({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      bannerTypeList().then(response => {
        commit('SET_SLIDESHOWTYPE', response.data.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
