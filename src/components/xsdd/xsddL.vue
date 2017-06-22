<template>
<div>
	<!-- 导航头 -->
	<x-header>销售订单列表<router-link slot="overwrite-left" to="/home">首页</router-link>
	  <router-link to="/xsddc" slot="right">+新建</router-link>
	</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :link="'/xsddr/'+v.id" is-link>
		<span slot="icon" class="type-pink">{{v.需方}}</span>
		<div slot="after-title">{{v.供方}}
		    <div class="lastRe">日期：{{v.日期}}</div>
	    </div>
	    <span class="iqty">{{v.需代表}}</span>
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
		this.$http.get(this.$store.state.apiPath+'all?a=订&w=类&s=销售&w2=需方&s2='+this.txt+'&o=日期 desc')
		.then(r => { if(r.data.length) this.list=r.data })
		.catch(e => { console.log(e) })
	},500),
  },
  activated() {
  	this.getdata()
  }
}
</script>
