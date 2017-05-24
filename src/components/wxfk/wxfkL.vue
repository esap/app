<template>
<div>
	<!-- 导航头 -->
	<x-header>
	  <span>反馈列表</span>
	  <router-link to="/wxfkc" slot="right">+新建</router-link>
	</x-header>
	<!-- 搜索 -->
	<search v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>

	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :link="'/wxfkr/'+v.id" is-link>
		<span slot="icon" class="tzfl">{{v.id}}</span>
		<div slot="after-title" class="nb">
	        <span>{{v.contxt}}</span>
		    <div class="lastRe">日期：{{v.cDate}}</div>
	    </div>
	    <span slot="value" class="iqty">{{v.rel}}</span>
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
        tid: {},
		txt: '',
		list: [],
    }
  },
  methods: {
  	getdata: debounce(function() {
		// if (!this.txt) return
		this.$http.get(this.$store.state.apiPath+'wxfkl?s=' + this.txt+'&w=contxt&o=cdate desc')
		.then(r => { this.list=r.data })
		.catch(e => { console.log(e) })
	},500),
  },
  activated() {
  	this.getdata()
  }
}
</script>

<style lang="stylus" scoped>
.mtpop 
	width: 100vw
	height:100vh
	overflow:auto
.clsbtn 
	position: absolute
	opacity: 0.4
	bottom: 1em
	right: 1em
.nb
	&div,span 
		font-size: 13px
	&.rem 
		color: #669
.iqty
	color: #00e
	font-size: 14px
.tzfl
	float:left
	display:block
	width: 2.2em
	color: #fff
	padding: 1px
	border-radius: 3px	
	font-size: 10px
	background-color: #669
.lastRe
	font-size: 10px
	color: #999
</style>