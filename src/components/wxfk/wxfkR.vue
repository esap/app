<template>
<div>
	<!-- 导航头 -->
	<x-header>反馈详情</x-header>
	<!-- 楼主部分	 -->
	<group title="楼主">
	  <cell>
		<div slot="after-title">
	        <span class="inline-block mtitle">
			  <div class="avatar">
			    <div>{{ tid.rel }}</div>
			  </div>
			  <span class="lastRe">{{ tid.cDate }}</span>
			</span>
	        <span class="contxt">
	          <span>{{ tid.contxt }}</span>
		      <a v-if="tid.files" class="attachFile" :href="tid.files" target="_blank">反馈附件:点击查看</a>
	        </span>	
	    </div>
	  </cell>
	</group>

	<!-- 回复部分 -->
	<group :title="'共'+result.length+'条处理信息'" v-if="result.length>0">
	  <cell v-for="v in result">
		<div slot="after-title">
	        <span class="inline-block mtitle">
				<div class="avatar">
				  <div>{{ v.处理人 }}</div>
				</div>			
				<span class="lastRe">{{ v.日期 }}</span>
			</span>
	        <span>
	          <span class="contxt">{{ v.内容 }}</span>
		    </span>
	    </div>
	    <div>
	   		<a v-if="v.附件" class="attachFile" :href="v.附件" target="_blank">回复附件:点击查看</a>
	    </div>
	  </cell>
	</group>
 
    <hr />

    <div>
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
</div>
</template>

<script>
import Uploader from 'vux-uploader'
import { XHeader, Search, Group, Cell, XButton, XTextarea , debounce } from 'vux'
export default {
  components: {	XHeader, Search, Group, Cell, XButton, XTextarea, Uploader },
	data() {
		return {
			geting: false,
			result: [],
			clyj: {my:"",id:""},
			tid:{rel:"1",contxt:"1",cdate:"1",files:"1"},
			id:0,
			images:[]
		}
	},
	watch: {
		tid(v) {
			this.geting = true;
			this.result=[]
			this.fresh(v.id)
			this.geting = false;
		}
	},
	methods: {
		smbt(){
			// this.clyj.id=this.id.toString()
			this.tid['files']=(this.images.length>0 ? this.images[0].url : ''	)		

			this.tid['my']=this.clyj.my
			this.$http.post(this.$store.state.apiPath+"wxfk", this.tid)
			.then(r=> {
				this.clyj.my=""
				this.images=[]
				console.log("body:",r.body)
				this.fresh(this.id)
				if (r.data){
					this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
				} else {
					this.$vux.toast.show({ text: '提交失败'+r.data.errmsg, type: 'cancel', time: 2000 })
				}
			})
			.catch(e => { console.log(e) })
		},
		fresh(id){
			this.$http.get(this.$store.state.apiPath+'wxfkD?pid=' + id)
			.then(r => { this.result=r.data })
			.catch(e => { console.log(e) })
		},
		fetchData(){
			this.id=this.$route.params.id
			this.$http.get(this.$store.state.apiPath+'wxfk?id=' + this.id)
			.then(r => { this.tid=r.data[0] })
			.catch(e => { console.log(e) })
		}
	},
	activated(){
		this.fetchData()
	}
}
</script>

<style lang="stylus" scoped>
img
	width: 100%
.iqty
	color: #00e
	font-size: 12px
	margin: 5px
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
.lastRe 
	float: right
	font-size: 10px
	color: #999
.contxt 
	padding: 5px 0
	font-size: 14px
</style>