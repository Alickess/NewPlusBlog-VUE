import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:sessionStorage.getItem("token"),
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
    authorities:sessionStorage.getItem("authorities"),
  },
  mutations: {
    //set
    SET_TOKEN:(state, token) => {
      state.token=token
      sessionStorage.setItem("token",token)
    },
    SET_USERINFO:(state, userInfo) => {
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    SET_AUTHORITIES:(state, authorities) => {
      state.authorities=authorities
      sessionStorage.setItem("authorities",authorities)
    },
    //remove
    REMOVE_INFO:state => {
      state.token=''
      state.userInfo={}
      state.authorities=[]
      sessionStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
      sessionStorage.setItem("authorities",'')
    }
  },
  getters:{
    //get
    getUser:state => {
      return state.userInfo
    },
    getAuthorities:state => {
      return state.authorities
    }
  },
  actions: {
  },
  modules: {
  }
})
