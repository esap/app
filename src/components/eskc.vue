<template>
<div>
	<!-- 导航头 -->
	<x-header>库存查询</x-header>
	<!-- 搜索 -->
	<search v-model="txt" @on-change="getdata" placeholder="搜索物料描述,例如:手机"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" is-link @click.native="getMsg(v)">
		<span slot="icon" :class="['type-green', {'type-pink':v.属性=='自制'}]">{{v.属性}}</span>
		<div slot="after-title">
		  <span>{{v.名}}</span>
	    </div>
	    <span slot="value" class="font-pink">{{v.数}}</span>
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
		this.$http.get(this.$store.state.apiPath+'vlbq?w=名&o=属性&s=' + this.txt)
		.then(r => { if (r.data.result) this.list=r.data.data[0] })
		.catch(e => { console.log(e) })
	},500),
	getMsg(v) {
		this.showData = v
	},
  },
}
</script>
