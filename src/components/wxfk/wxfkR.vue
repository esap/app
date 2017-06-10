<template>
<div>
	<!-- 导航头 -->
	<x-header>反馈详情</x-header>
	<!-- 楼主部分	 -->
	<group title="发起人">
	  <cell :title="list.contxt">
        <span slot="icon" class="inline-block mtitle">
		  <div class="avatar">{{ list.rel }}</div>
		  <span class="lastRe">{{ list.cDate }}</span>
		</span>
	      <a slot="after-title" v-if="list.files" class="attachFile" :href="list.files" target="_blank">反馈附件:点击查看</a>
	  </cell>
	</group>

	<!-- 回复部分 -->
	<group :title="'共'+result.length+'条处理信息'" v-if="result.length>0">
	  <cell v-for="v in result" :title="v.内容">
        <span slot="icon" class="inline-block mtitle">
			<div class="avatar">{{ v.处理人 }}</div>
			<span class="lastRe">{{ v.日期 }}</span>
		</span>
	   	<a slot="after-title" v-if="v.附件" class="attachFile" :href="v.附件" target="_blank">回复附件:点击查看</a>
	  </cell>
	</group>

	<!-- 评论部分 -->
	<x-textarea title="我的意见" placeholder="请输入您的处理意见" type="textarea" :rows="4" v-model="clyj.my"></x-textarea>
	<uploader
		title="文件上传"
		:max="1"
		:images="images"
		:upload-url="$store.state.apiPath+'upload'"
		size="small">
	</uploader>
	<x-button type="primary" @click.native="smbt">提交</x-button>
</div>
</template>

<script>
import Uploader from 'vux-uploader'
import { XHeader, Search, Group, Cell, XButton, XTextarea , debounce } from 'vux'
export default {
  components: {	XHeader, Search, Group, Cell, XButton, XTextarea, Uploader },
	data() {
		return {
			clyj: {my:"",id:""},
			list:{rel:"1",contxt:"1",cdate:"1",files:"1"},
			result: [],
			images:[]
		}
	},
	computed:{
		id(){ return this.$route.params.id }
	},
	methods: {
		smbt(){
			this.list['files']=(this.images.length>0 ? this.images[0].url : ''	)
			this.list['my']=this.clyj.my
			this.$http.post(this.$store.state.apiPath+"wxfk", this.list)
			.then(r=> {
				if (r.data.result){
					this.init()
					this.fetchData()
					this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
				} else {
					this.$vux.toast.show({ text: '提交失败'+r.data.errmsg, type: 'cancel', time: 2000 })
				}
			})
			.catch(e => { console.log(e) })
		},
		fetchData(){
			this.$http.get(this.$store.state.api2Path+'wxfk?id=' + this.id)
			.then(r => { 
				if (r.data.result) this.list=r.data.data[0][0];
				this.result=r.data.data[1] 
			})
			.catch(e => { console.log(e) })
		},
		init(){
			this.clyj.my=""
			this.images=[]
		}
	},
	activated(){
		this.init()
		this.fetchData()
	}
}
</script>

<style lang="stylus" scoped>
img
	width: 100%
.mtitle 
	width: 70px
.attachFile 
	margin: 4px
	padding: 4px
	color: #fff
	display: block
	height: 2em
	border-radius: 4px
	font-size: 13px
	background-color: #3cc51f
</style>