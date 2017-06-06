<template>
<div>
  <!-- 导航头 -->
  <x-header title="账号信息"></x-header>

  <group title="用户">      
    <cell v-if="avatar" title="头像">
      <img :src="avatar" width="50px" alt="用户头像" />   
    </cell> 
    <cell title="账号" :value="userId"></cell>    
    <cell title="用户名" :value="userName"></cell>
	<cell title="部门" :value="dept"></cell>
    <!-- <mt-button @click.native="showMetheName">showMetheName</mt-button> -->
    <!-- <mt-button @click.native="setCookie">setCookie</mt-button> -->
    <!-- <mt-button @click.native="clearCookies">clearCookie</mt-button> -->
    <x-button v-if="!logined" type="primary" @click.native="bindWx">绑定微信</x-button>
  </group>
  <group v-if="!logined" title="ES用户">      
    <x-input title="ES账号" placeholder="填入ES账号" v-model="form.user"></x-input>
    <x-input title="ES密码" type="password" placeholder="填入ES密码" v-model="psw"></x-input>
    <x-button type="primary" @click.native="doLogin">绑定ES账号</x-button>
  </group>

  <footbar>
    <x-button v-if="logined" type="warn" @click.native="refreshCookies">取消绑定</x-button>
  </footbar>
  <loading v-model="loading" text="绑定中..."></loading>
</div>
</template>

<script>
import { Picker, Cell, XHeader, XInput, XButton, Group, Loading, cookie } from 'vux'
import md5 from 'md5'
import footbar from './common/footbar'
export default {
  components: { Picker, Cell, XHeader, XInput, XButton, Group, Loading, footbar },
  data() {
    return {
      psw:'',
      form:{user:''},
      loading:false
    }
  },
  computed: {
  logined(){
    return (this.userId != '' || this.userId==undefined) ? true : false
  },
  userId(){ return this.$cookie.get("esap_user") || '' },
  avatar(){ return this.$cookie.get("esap_avatar") || '' },
  userName(){ return decodeURI(this.$cookie.get("esap_username") || '')  },
  dept(){ return decodeURI(this.$cookie.get("esap_userdept") || '')  },
  },
  methods: {
    bindWx() {
      window.location.href="/oauth2"
    },  	
    doLogin() {
      this.loading=true
      this.form.pwd=md5(this.psw)
      let apiUrl=this.$store.state.apiPath + 'login'
      this.$http.post(apiUrl, this.form)
      .then(r => {
        if (r.data.result) { 
          cookie.set("esap_user", r.data.msg[0].userlogin)
          cookie.set("esap_username", r.data.msg[0].dispName)
          window.location.href="/me"
        } else {
          this.$vux.toast.show({ text: '绑定失败,'+r.data.errmsg, type: 'cancel', time: 2000 })
        }
        this.loading=false
      })
      .catch(e => {
        this.$vux.toast.show({ text: '绑定失败,'+e, type: 'cancel', time: 2000 })
        this.loading=false
      })          
    },
  	refreshCookies(){
  		this.clearCookies()
	    window.location.href="/me"	
  	},
	setCookie(){
		this.$cookie.set("esap_username",'test')
		console.log(document.cookie) 
	},
	clearCookies() {
		var keys=document.cookie.match(/[^ =;]+(?=\=)/g)
	    if (keys) {
	        for (var i =  keys.length; i--;)
	            this.$cookie.delete(keys[i])
	    }  
	},
	showMetheName() {
		MessageBox('提示', decodeURI(this.$cookie.get("esap_username")))
		console.log(decodeURI(this.$cookie.get("esap_username")))
		console.log(this.$cookie.get("esap_username"))
	}
  }
}
</script>
