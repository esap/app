<template>
<div>
  <!-- 导航头 -->
  <x-header>销售出库详情</x-header>

  <search :autoFixed="false" v-model="txt" @on-change="getdata" placeholder="搜索关键字"></search>
  <cell :title="form.cdesc"></cell>
  <group v-for="v,k in list" :title="v.id">
    <cell :title="v.品名"></cell>
    <img style="margin: 10px" width="90%" v-if="v.图片" :src="$store.state.appUrl+'p/'+ v.图片" :alt="v.图片" />
    <cell @click.native="v.实发=Number(v.待发)" is-link>
      <x-button mini slot="value">全部出库</x-button>
      <span slot ="after-title">待发数量:{{v.待发}}({{v.单位}})</span>
    </cell>
    <x-number fillable width="75px" :min="0" title="实发数量" v-model="v.实发"></x-number>
  </group>

  <footbar>
    <x-button :disabled="done || list.length==0 " type="primary" @click.native="sbmt">提交</x-button>
  </footbar>

</div>
</template>

<script>
import { XHeader, Search, XInput, XButton, Group, Cell, debounce, XNumber } from 'vux'
import footbar from '@/components/common/footbar'
export default {
  components: { XHeader, Search, XInput, XButton, Group, Cell, XNumber, footbar },
  data() {
    return {
      form: {cdesc:''},
      list: [{供方:'',品名:''}],
  		txt: '',
  		done: false,
    }
  },
  computed: {
  	userName() { 
  		return this.$cookie.get('esap_username')
  	},
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    getdata: debounce(function() {
      this.$http.get(this.$store.state.apiPath+'app.未发销售明细?s=' + this.txt+'&cid='+this.id)
      .then(r => {
        this.list=r.data
        if (this.list.length>0){
          this.form['cdesc']=this.list[0].需方          
        }
       })
      .catch(e => { console.log(e) })
    },500),
    sbmt() {
      this.done = true
      this.form['cid']=this.id
      this.form['data']=this.list
      this.$http.post(this.$store.state.esPath+"WM_出库单", this.form)
      .then(r=> {     
        if (r.data.result){
          this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })           
          this.init()  
          this.done = false
        } else {
          this.$vux.toast.show({ text: '提交失败'+r.data.errmsg, type: 'cancel', time: 2000 })
          this.done = false
        }
      })
      .catch(e => { console.log(e) }) 
    },
    init(){
      this.form= {cdesc:''}
      this.list= [],
      this.txt= ''
      this.done=false
      this.getdata()    
    }   
  },
  activated(){
    this.init()  
  },
 
}
</script>