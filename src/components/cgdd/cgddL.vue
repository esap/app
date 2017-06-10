<template>
<div>
	<!-- 导航头 -->
	<x-header>
	  <span>采购订单列表</span>
	  <router-link to="/cgddc" slot="right">+新建</router-link>
	</x-header>
	<!-- 搜索 -->
	<search v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :link="'/cgddr/'+v.号" is-link>
		<span slot="icon" class="type-pink">{{v.号}}</span>
		<div slot="after-title" class="nb">
	        <span>{{v.供方}}</span>
		    <div class="lastRe">日期：{{v.日期}}</div>
	    </div>
	    <span slot="value" class="iqty">{{v.需代表}}</span>
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
		this.$http.get(this.$store.state.apiPath+'all?a=订&w=类&s=采购' + this.txt+'&w=contxt&o=日期 desc')
		.then(r => { if(r.data.length) this.list=r.data })
		.catch(e => { console.log(e) })
	},500),
  },
  activated() {
  	this.getdata()
  }
}
</script>
