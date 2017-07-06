<template>
<div>
	<!-- 导航头 -->
	<x-header>文件内容
	<!-- <div slot="right" @on-click-more="refresh">刷新</div> -->
	<x-button mini plain slot="right" @click.native="refresh">刷新</x-button>
	</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>
	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :title="v.fDesc" is-link>
	    <span slot="icon" class="type-pink">{{v.class2}}</span>
	    <!-- <span slot="after-title">{{v.附件}}</span>:link="'/f/'+v.附件" -->
	    <span><a v-if="v.fLink"  class="attachFile" :href="$store.state.appUrl+'fl/'+v.fLink" target="_blank">{{v.display}}</a></span>
	    <span slot="after-title" class="grey">{{v.ExcelServerRCID}}</span>
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
        tid: {},
		txt: '',
		list: [],
		popupVisible: false,
    }
  },
  computed:{
  	id(){return this.$route.params.id},
  	sid(){return this.$route.params.sid}
  },
  methods: {
  	getdata: debounce(function(){this.refresh()},500),
	refresh() {
		this.$http.get(this.$store.state.apiPath+'wxwk.details?id='+this.id+'&sid='+this.sid+'&s=' + this.txt)
		.then(r => { this.list=r.data })
		.catch(e => { console.log(e) })
	}
  },
  activated() {
  	this.refresh()
  }
}
</script>
