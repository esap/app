<template>
<div>
<!--   <div style="text-align:center;padding:10px">
    <img src="../assets/logo.png" style="width:100px" />
  </div> -->
  <swiper :list="swiperList" auto 
    style="width:100%;margin:0 auto;" 
    height="150px" 
    dots-class="custom-bottom" 
    dots-position="center">
  </swiper>

  <group>
	<grid>
	  <grid-item :label="v.name" :link="'/'+v.path" v-for="v in hd">
		<img slot="icon" :src="picPath(v)" width="24" height="24">
	  </grid-item>
	</grid>
  </group>
  <tabbar>
	  <tabbar-item selected link="/">
	    <img slot="icon" src="../assets/icon_nav_button.png">
	    <span slot="label">首页</span>
	  </tabbar-item>
	  <tabbar-item :badge="String(cnt)" link="/dbsy">
	    <img slot="icon" src="../assets/icon_nav_msg.png">
	    <span slot="label">待办</span>
	  </tabbar-item>
	  <tabbar-item link="https://esap.erp8.net">
	    <img slot="icon" src="../assets/icon_nav_article.png">
	    <span slot="label">官网</span>
	  </tabbar-item>
	  <tabbar-item :badge="!!userName?'':'1'" link="/me">
	    <img slot="icon" src="../assets/icon_nav_cell.png">
	    <span slot="label">账号</span>
	  </tabbar-item>
	</tabbar>
</div>
</template>

<script>
import { Swiper, SwiperItem, Group, Grid, GridItem, XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  components: { Swiper, SwiperItem, Group, Grid, GridItem, XHeader, Tabbar, TabbarItem },
  data () {
    return {
    	swiperList:[{
		  url: 'javascript:',
		  img: 'https://static.vux.li/demo/1.jpg',
		  title: '在鲜花盛开的季节'
		}, {
		  url: 'javascript:',
		  img: 'https://static.vux.li/demo/2.jpg',
		  title: '驾着车踏上旅程'
		}, {
		  url: 'javascript:',
		  img: 'https://static.vux.li/demo/3.jpg',
		  title: '向着诗和远方去吧'
		}],
		hd: [
		  { path: "xjdd", name: "新建订单", nav: "article" },
		  { path: "cgddl", name: "采购订单", nav: "panel" },
		  { path: "jcmx", name: "进出明细", nav: "tab" },
		  { path: "eskc", name: "库存查询", nav: "search_bar" },
		  { path: "ddjd", name: "订单进度", nav: "progress" },
		  { path: "wxfkl", name: "意见反馈", nav: "dialog" },
		  { path: "/", name: "尚未开放", nav: "actionSheet" },
		  { path: "/", name: "尚未开放", nav: "actionSheet" },
		],
		cnt:0
    }
  },
  computed:{
  	userName(){
  		return decodeURI(this.$cookie.get("esap_username") || '')   	
	},
  },
  methods: {
	picPath(v){
		return require('../assets/icon_nav_' + v.nav + '.png')
	},
	getCnt() {
		this.$http.get(this.$store.state.apiPath+'dbsyCnt')
		.then(r => { this.cnt=r.data[0].cnt })
		.catch(e => { console.log(e) })
	}
  },
  activated() {
  	this.getCnt()
  }
}
</script>
