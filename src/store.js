import Vue from 'vue' 
import Vuex from 'vuex'
import { AjaxPlugin } from 'vux'

Vue.use(Vuex);
Vue.use(AjaxPlugin)

export default new Vuex.Store({
  state: {
    apiPath: process.env.NODE_ENV === 'production' ? "/api2/" : "http://localhost:9090/api2/",
    api2Path: process.env.NODE_ENV === 'production' ? "/api2/" : "http://localhost:9090/api2/",
    esPath: process.env.NODE_ENV === 'production' ? "/es/" : "http://localhost:9090/es/",
    appUrl: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:9090/",
    userName:'test',
    errMsg:'',
    loading:false
  },
  getters: {
    isLogin: s => !!s.userName,
    isAdmin: s => s.userName=="Admin",
  },
  mutations: {
    setUserName(state, v) {
      state.userName=v;
    }
  },
  actions: {  
    doLogin({ commit, state }, apiParam) {
      state.loading=true;
      let apiUrl=state.esPath + 'login';
      Vue.http.post(apiUrl, apiParam)
      .then(r => {
        if (r.data.result) { 
          commit('setUserName', r.data.msg);          
          window.location.href="/me"
        } else {
          state.errMsg=r.data.errmsg
        }
        state.loading=false; 
      })
      .catch(e => {
        if (state.loading) {
          commit('setUserName', ''); 
          state.loading=false;     
        }     
       })        
    },
    outlogin( { commit }) {
      commit('setUserName', ''); 
    }
  }
})