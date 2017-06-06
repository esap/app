<template>
<div>
  <!-- 导航头 -->
  <x-header>新建采购订单</x-header>

  <group title="合同">
    <x-input title="供应商" v-model="form.vdesc"></x-input>
    <datetime v-model="form.cdate" title="签订日期"></datetime>
    <datetime v-model="form.cdate" title="交货日期"></datetime>
  </group>

  <group title="商品">   
    <x-input title="商品" v-model="data.mdesc"><x-button mini slot="right">搜索</x-button></x-input>
     <x-number title="数量" :min=0 v-model="data.qty"></x-number>
    <!-- <x-textarea title="备注" placeholder="请输入备注内容" v-model="list.contxt" :max="200"></x-textarea> -->
  </group>
  <x-button mini>+</x-button>
  
  <footbar>
    <x-button v-show="!done" type="primary" @click.native="sbmt">提交</x-button>
  </footbar>

</div>
</template>

<script>
import footbar from '../common/footbar'
import { XHeader, XButton, XTextarea, XSwitch, Group, XInput, Datetime, XNumber   } from 'vux';
export default {
  components: { XHeader, XButton, XTextarea, XSwitch, Group, XInput, Datetime, footbar, XNumber  },
  data() {
    return {
  		list: {contxt: "", pub:false,rel:'',files:''},
  		submit: false,
      form:{},
      data:[],
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
  		this.submit = true
  		this.list['rel']=this.$cookie.get('esap_username')
      this.list['files']=(this.images.length>0 ? this.images[0].url : '' ) 
  		this.$http.post(this.$store.state.esPath+"微信反馈", this.list)
      .then(r=> {					
  			this.done = true
  			this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
  			setTimeout(() => { this.$router.push("/wxfkl"); }, 2000)
  		})
      .catch(e => { console.log(e) });			
  	}
  },
  activated(){
  	this.list= {contxt: "", pub:false,rel:'',files:''},
    this.images=[],
  	this.submit=false;
  	this.done=false
  }
}
</script>
