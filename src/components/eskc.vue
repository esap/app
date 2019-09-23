<template>
<div>
	<!-- 导航头 -->
	<x-header>库存查询</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索物料描述,例如:手机"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :title="v.名">
		<span slot="icon" :class="['type-green', {'type-pink':v.属性=='自制'}]">{{v.属性}}</span>
	    <span class="font-pink">{{v.数}}</span>
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
		txt: "",
		list: [],
		showData: {}
    }
  },
  methods: {
	getdata: debounce(function() {
		if (!this.txt) return
		this.$http.get(this.$store.state.apiPath+'vlbq?db=esap2&w=名&o=属性&s=' + this.txt)
		.then(r => { this.list=r.data.data[0] })
		.catch(e => { console.log(e) })
	},500),
	getMsg(v) {
		this.showData = v
	},
  },
  activated(){
    this.getdata()
  },
}
</script>
