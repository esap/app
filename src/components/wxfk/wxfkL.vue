<template>
<div>
	<!-- 导航头 -->
	<x-header>反馈列表<router-link slot="overwrite-left" to="/home">首页</router-link>
	  <router-link to="/wxfkc" slot="right">+新建</router-link>
	</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :title="v.contxt" :link="'/wxfkr/'+v.id" is-link>
		<span slot="icon" class="type-pink">{{v.id}}</span>
	    <div slot="after-title" class="lastRe">日期：{{v.cDate}}</div>
	    <span class="iqty">{{v.rel}}</span>
	  </cell>
	</group>
</div>
</template>

<script>
import { XHeader, Search, Group, Cell, debounce } from 'vux'
export default {
  components: {	XHeader, Search, Group, Cell },
  data () {
    return {
		txt: '',
		list: [],
    }
  },
  methods: {
  	getdata: debounce(function() {
		this.$http.get(this.$store.state.apiPath+'wxfkl?s=' + this.txt+'&w=contxt&o=cdate desc')
		.then(r => { if (r.data.length) this.list=r.data })
		.catch(e => { console.log(e) })
	},500),
  },
  activated() {
  	this.getdata()
  }
}
</script>
