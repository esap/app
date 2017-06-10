<template>
<div>
  <!-- 导航头 -->
  <x-header>新建销售订单</x-header>

  <group title="合同">
	<datetime title="合同日期" required placeholder="选择合同日期" :start-date="new Date().toString()" v-model="list.sdate"></datetime>
    <popup-picker title="客户" show-name :data="dataList" v-model="list.cid" @on-show="getInfo" placeholder="请选择客户"></popup-picker>
	<datetime title="交期" required placeholder="请选择交期" :start-date="new Date().toString()" v-model="list.ddate"></datetime>
  </group>
  <group title="商品">
    <popup-picker title="商品名称" show-name :data="dataList2" v-model="list.mid" @on-show="getInfo2" placeholder="请选择商品名称"></popup-picker>
	<x-number title="数量" fillable v-model="list.qty"></x-number>
	<x-textarea title="备注"  v-model="list.rem" :max="200"></x-textarea>
  </group>
  <footbar>
    <x-button v-show="!done" type="primary" @click.native="sbmt">提交</x-button>
  </footbar>

</div>
</template>

<script>
import { Picker, Popup, Datetime, XHeader, XSwitch, XNumber, PopupPicker, XInput, XTextarea, GroupTitle, XButton, Group } from 'vux'
import footbar from './common/footbar'
export default {
  components: { Picker, Popup, Datetime, XHeader, XSwitch, XNumber, PopupPicker, XInput, XTextarea, GroupTitle, XButton, Group, footbar },
  data() {
    return {    
		list: {qty:0, addr: '', rem:'', cid:[], mid:[]},
		dataList: [['']],
		dataList2: [['']],
		done: false,
    }
  },
  computed: {
  	userName() {
  		return this.$cookie.get('esap_username')
  	}
  },
  methods: {
	sbmt() {		
		this.$http.post(this.$store.state.esPath+"SD_销售订单", this.list)
		.then(r=> {			
			this.done = true
			if (r.data.result){
				this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
				setTimeout(() => { this.$router.push("/app"); }, 2000)
			} else {
				this.$vux.toast.show({ text: '提交失败:'+r.data.errmsg, type: 'cancel', time: 2000 })
				this.done = false
			}
		})
		.catch(e => { console.log(e) })
	},	
	getInfo() {
		this.$http.get(this.$store.state.api2Path+"客户")
		.then(r=> { if (r.data.result) this.dataList=r.data.data })
		.catch(e => { console.log(e) })	
	},	
	getInfo2() {
		this.$http.get(this.$store.state.api2Path+"商品?s=''")
		.then(r=> { if (r.data.result) this.dataList2=r.data.data })
		.catch(e => { console.log(e) })	
	},
  },
  activated(){
  	this.list= {qty:0, addr: '', rem:'', cid:[], mid:[]}
  	this.done=false
  },
}
</script>
