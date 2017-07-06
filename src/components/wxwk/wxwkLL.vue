<template>
<div>
	<!-- 导航头 -->
	<x-header>文库二级列表
	<x-button mini plain slot="right" @click.native="refresh">刷新</x-button>
	</x-header>
	<!-- 搜索 -->
	<search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>
	<group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list" :title="v.class2":link="'/wxwklll/'+id+'/'+v.class2" is-link>
	    <span class="iqty">{{v.ct}}</span>
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
  	id(){return this.$route.params.id}
  },
  methods: {
  	getdata: debounce(function(){this.refresh()},500),
	refresh() {
		this.$http.get(this.$store.state.apiPath+'wxwk.class2?id='+this.id+'&s=' + this.txt)
		.then(r => { this.list=r.data })
		.catch(e => { console.log(e) })
	}
  },
  activated() {
  	this.refresh()
  }
}
</script>
