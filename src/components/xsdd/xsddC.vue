<template>
<div>
  <!-- 导航头 -->
  <x-header>新建销售订单</x-header>

  <group title="合同">
    <popup-picker title="客户" show-name :data="dataList" v-model="form.cid" @on-show="getInfo" placeholder="请选择客户"></popup-picker>
    <datetime v-model="form.cdate" required placeholder="选择签订日期" :start-date="new Date().toString()" title="签订日期"></datetime>
    <datetime v-model="form.ddate" required placeholder="选择交货日期" :start-date="new Date().toString()" title="交货日期"></datetime>
  </group>
  <x-button mini @click.native="list.push({mid:[],qty:0})"><x-icon type="ios-plus" class="default-x-icon"></x-icon></x-button>

  <group v-for="v,k in list" :title="'明细'+(k+1)">   
    <popup-picker title="商品名称" show-name :data="dataList2" v-model="v.mid" @on-show="getInfo2" placeholder="请选择商品名称"></popup-picker>
    <x-number title="数量" :min=0 v-model="v.qty"></x-number>
    <x-button v-if="itemCount>1" mini @click.native="list.splice(k,1)"><x-icon type="ios-minus" class="red-x-icon"></x-icon></x-button>
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
  		form: {cid:[]},
      list:[{mid:[],qty:0}],
      dataList:[['']],
      dataList2:[['']],
  		done: false
    }
  },
  computed: {
  	userName() {
  		return this.$cookie.get('esap_username')
  	},
    itemCount(){
      return this.list.length
    }
  },
  methods: {
  	sbmt() {
      this.form['data']=this.list
  		this.$http.post(this.$store.state.esPath+"SD_销售订单", this.form)
      .then(r=> {	
        if (r.data.result) {          
          this.done = true
          this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
          setTimeout(() => { this.$router.push("/xsddl"); }, 2000)
        }	else{
          this.$vux.toast.show({ text: '提交失败:'+errmsg, type: 'cancel', time: 2000 })	
          this.done = false	
        }
  		})
      .catch(e => { console.log(e) });			
  	},
    getInfo() {
      this.$http.get(this.$store.state.api2Path+"客户?s=''")
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
  	this.form= {cid:[]},
    this.list=[{mid:[],qty:0}],
  	this.done=false
  }
}
</script>
