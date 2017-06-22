<template>
<div>
	<!-- 导航头 -->
	<x-header>待办事宜
	  <x-button mini plain slot="right" @click.native="refresh">刷新</x-button>
	</x-header>
	
	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :title="v.wiDesc">
	    <span slot="icon" class="type-pink">{{v.UserName}}</span>
	  </cell>
	</group>
	<cell v-if="!userName">您尚未绑定账号或登陆</cell>
</div>
</template>

<script>
import { XHeader, Group, Cell, debounce, XButton } from 'vux'
export default {
  components: {	XHeader, Group, Cell, XButton },
  data () {
    return {
		list: [],
    }
  },
  computed:{
  	userName(){
  		return decodeURI(this.$cookie.get("esap_username") || '')   	
	},
  },
  methods: {
  	getdata: debounce(function(){this.refresh()},500),
	refresh() {
		this.$http.get(this.$store.state.apiPath+'dbsy?user='+this.userName)
		.then(r => { this.list=r.data })
		.catch(e => { console.log(e) })
	}
  },
  activated() {
  	this.refresh()
  }
}
</script>
