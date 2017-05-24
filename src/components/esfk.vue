<template>
<div>
  <!-- 导航头 -->
  <x-header>意见反馈</x-header>

  <group :title="'隐私--'+userName">
        <x-switch title="公开" v-model="list.pub"></x-switch>
  </group>
  <group title="意见">   
    <x-textarea title="内容" placeholder="请输入意见内容" v-model="list.contxt" :max="200"></x-textarea>
    <x-button v-show="!done" type="primary" @click.native="sbmt">提交</x-button>
  </group>

</div>
</template>

<script>
import { XHeader, XButton, XTextarea, XSwitch, Group, XInput } from 'vux';
export default {
  components: { XHeader, XButton, XTextarea, XSwitch, Group, XInput },
  data() {
    return {
  		list: {sub: "app意见", contxt: "", pub:false,rel:''},
  		submit: false,
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
  		this.$http.post(this.$store.state.esPath+"微信反馈", this.list)
      .then(r=> {					
  			this.done = true
  			this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
  			setTimeout(() => { this.$router.push("/"); }, 2000)
  		})
      .catch(e => { console.log(e) });			
  	}
  },
  activated(){
  	this.list= {sub: "app意见", contxt: "", pub:false,rel:''},
  	this.submit=false;
  	this.done=false
  }
}
</script>
