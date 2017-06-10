<template>
<div>
  <!-- 导航头 -->
  <x-header>新建采购订单</x-header>

  <group title="合同">
    <!-- <x-input title="供应商" v-model="form.vdesc"></x-input> -->
    <popup-picker title="供应商" show-name :data="dataList" v-model="form.vid" @on-show="getInfo" placeholder="请选择供应商"></popup-picker>
    <datetime v-model="form.cdate" required placeholder="选择签订日期" :start-date="new Date().toString()" title="签订日期"></datetime>
    <datetime v-model="form.ddate" required placeholder="选择交货日期" :start-date="new Date().toString()" title="交货日期"></datetime>
  </group>
  <x-button mini plain @click.native="list.push({mid:[],qty:0})">+插入行</x-button>
  <group v-for="v,k in list" :title="'明细'+(k+1)">   
    <popup-picker title="商品名称" show-name :data="dataList2" v-model="v.mid" @on-show="getInfo2" placeholder="请选择商品名称"></popup-picker>
    <!-- <x-input title="商品" v-model="v.mdesc"><x-button mini slot="right">搜索</x-button></x-input> -->
    <x-number title="数量" :min=0 v-model="v.qty"></x-number>
    <x-button mini plain @click.native="list.splice(k,1)">-删除行</x-button>
  </group>
  
  <footbar>
    <x-button v-show="!done" type="primary" @click.native="sbmt">提交</x-button>
  </footbar>

</div>
</template>

<script>
import footbar from '../common/footbar'
import { XHeader, XButton, XTextarea, XSwitch, Group, XInput, Datetime, XNumber, PopupPicker } from 'vux';
export default {
  components: { XHeader, XButton, XTextarea, XSwitch, Group, XInput, Datetime, footbar, XNumber, PopupPicker },
  data() {
    return {
  		form: {vid:[]},
      list:[{mid:[],qty:0}],
      dataList:[['']],
      dataList2:[['']],
  		done: false
    }
  },
  computed: {
  	userName() {
  		return this.$cookie.get('esap_username')
  	}
  },
  methods: {
  	sbmt() {
      this.form['data']=this.list
  		this.$http.post(this.$store.state.esPath+"MM_采购订单", this.form)
      .then(r=> {	
        if (r.data.result) {          
          this.done = true
          this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
          setTimeout(() => { this.$router.push("/cgddl"); }, 2000)
        }	else{
          this.$vux.toast.show({ text: '提交失败:'+errmsg, type: 'cancel', time: 2000 })		
        }
  		})
      .catch(e => { console.log(e) });			
  	},
    getInfo() {
      this.$http.get(this.$store.state.api2Path+"供应商?s=''")
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
  	this.form= {vid:[]},
    this.list=[{mdesc:'',qty:0}],
  	this.done=false
  }
}
</script>
