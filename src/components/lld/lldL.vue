<template>
<div>
	<!-- 导航头 -->
	<x-header>待出库列表<router-link slot="overwrite-left" to="/home">首页</router-link>
	<x-button mini plain slot="right" @click.native="refresh">刷新</x-button>
	</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>
	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :title="v.需方":link="'/lldc/'+v.需" is-link>
	    <span class="iqty">{{v.数}}</span>
	  </cell>
	</group>
</div>
</template>

<script>
import { XHeader, Search, Group, Cell, debounce, XButton } from 'vux'
export default {
  components: {	XHeader, Search, Group, Cell, XButton },
  data () {
    return {
		txt: '',
		list: [],
    }
  },
  methods: {
  	getdata: debounce(()=>{this.refresh()},500),
	refresh() {
		this.$http.get(this.$store.state.apiPath+'app.未发销售?s=' + this.txt)
		.then(r => { this.list=r.data })
		.catch(e => { console.log(e) })
	}
  },
  activated() {
  	this.refresh()
  }
}
</script>
