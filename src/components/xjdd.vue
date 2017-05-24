<template>
<div>
  <!-- 导航头 -->
  <x-header>新建订单</x-header>

  <group title="合同">
	<datetime  title="合同日期" format="YYYY-MM-DD HH:mm:00" required placeholder="选择合同日期" v-model="list.sdate"></datetime >
	<x-input title="客户" required placeholder="请选择客户" v-model="list.vab">
		<x-button slot="right" @click.native="getInfo(list.vab)" mini>模糊搜索</x-button>
	</x-input>
	<datetime  title="交期" format="YYYY-MM-DD HH:mm:00" required placeholder="请选择交期" v-model="list.ddate"></datetime >
  </group>
  <group title="商品">
  	<x-input title="商品名称" required placeholder="请选择商品名称" v-model="list.mDesc">
		<x-button slot="right" @click.native="getInfo2(list.mDesc)" mini>模糊搜索</x-button>
	</x-input>
	<x-input title="数量" required type="number" placeholder="请输入数量" v-model="list.qty"></x-input>
	<x-textarea title="备注" placeholder="请输入备注" v-model="list.rem" :max="200"></x-textarea>
  </group>
  <footbar>
    <x-button v-show="!done" type="primary" @click.native="sbmt">提交</x-button>
  </footbar>

  <popup v-model="show1">
    <div class="popup0">
      <picker :data='dataList' v-model="addr1" @on-change='change'></picker>
    </div>
  </popup>
  <popup v-model="show2">
    <div class="popup0">
      <picker :data='dataList2' v-model="addr2" @on-change='change2'></picker>
    </div>
  </popup>

</div>
</template>

<script>
import { Picker, Popup, Datetime, XHeader, XSwitch, PopupPicker, XInput, XTextarea, GroupTitle, XButton, Group } from 'vux'
import footbar from './common/footbar'
export default {
  components: { Picker, Popup, Datetime, XHeader, XSwitch, PopupPicker, XInput, XTextarea, GroupTitle, XButton, Group, footbar },
  data() {
    return {
    	show1: false,
    	show2: false,
		list: {},
		dno: [],
		addr1: [],
		addr2: [],
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
  	change (value) {
      this.list.vab=value[0]
      // this.list.vid=value[0].id
    },  
    change2 (value) {
      this.list.mDesc=value[0]
    },
	sbmt() {
		this.$http.post(this.$store.state.esPath+"SD_销售订单", this.list)
		.then(r=> {			
			this.done = true
			if (r.data){
				this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
			} else {
				this.$vux.toast.show({ text: '提交失败'+r.data.errmsg, type: 'cancel', time: 2000 })
			}
			setTimeout(() => { this.$router.push("/"); }, 2000)
		})
		.catch(e => { console.log(e) })	
	},	
	getInfo(v) {
		this.show1=true
		if (v==undefined) v=''
		this.$http.get(this.$store.state.apiPath+"客户?w=名称&s="+ v ||'')
		.then(r=> {
			this.dataList=[['']]
	  		for (var i=0;i<r.data.length;i++) {
	  			this.dataList[0].push(r.data[i].名称)
	  		}
		})
		.catch(e => { console.log(e) })	
	},	
	getInfo2(v) {
		this.show2=true
		this.$http.get(this.$store.state.apiPath+"商品?w=名&s="+ v ||'')
		.then(r=> {
			this.dataList2=[['']]
	  		for (var i=0;i<r.data.length;i++) {
	  			this.dataList2[0].push(r.data[i].名)
	  		}
		})
		.catch(e => { console.log(e) })	
	},
  },
  activated(){
  	this.list= {vab:'', addr: '',mDesc:'',rem:''}
  	this.done=false
  },
}
</script>

<style scoped>
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
.popup2 {
  padding-bottom:15px;
  height:400px;
}
</style>