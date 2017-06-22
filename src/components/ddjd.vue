<template>
<div>
	<!-- 导航头 -->
	<x-header>订单进度查询</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索单号(未开放)"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" is-link>
		<span slot="icon" :class="['type-green', {'type-pink':v.类型=='外贸'}]">{{v.类型}}</span>
		<div slot="after-title">
			<span>{{v.销售单号}}</span>
			<div class="goods">{{v.商品名称}}</div>
		</div>
		<div>
			<span class="font-pink">{{v.订单总数}}</span>
			<span class="font-pink iqty2">{{v.完工数}}</span>
			<span class="font-pink iqty3">{{v.发货数}}</span>
		</div>
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
		popupVisible: false,
		list: [],
    }
  },
  methods: {
  	getdata: debounce(function() {
		if (!this.txt) return
		this.$http.get(this.$store.state.apiPath+'a=单&w=销售单号&s=' + this.txt)
		.then(r => { this.list=r.data })
		.catch(e => { console.log(e) })
	},600),
  },
}
</script>

<style scoped lang="stylus">
.iqty2
	color: red
.iqty3
	color: green
.goods
	font-size: 11px
	color: #111
</style>