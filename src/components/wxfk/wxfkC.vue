<template>
<div>
  <!-- 导航头 -->
  <x-header>意见反馈</x-header>

  <group :title="'隐私--'+userName">
        <x-switch title="公开" v-model="list.pub"></x-switch>
  </group>

  <group title="意见">   
    <x-textarea title="内容" placeholder="请输入意见内容" v-model="list.contxt" :max="200"></x-textarea>

    <uploader
      title="文件上传"
      :max="1"
      :images="images"
      :upload-url="$store.state.apiPath+'upload'"
      size="small">
    </uploader>
  </group>
  
  <footbar>
    <x-button v-show="!done" type="primary" @click.native="sbmt">提交</x-button>
  </footbar>

</div>
</template>

<script>
import Uploader from 'vux-uploader'
import footbar from '../common/footbar'
import { XHeader, XButton, XTextarea, XSwitch, Group, XInput } from 'vux';
export default {
  components: { XHeader, XButton, XTextarea, XSwitch, Group, XInput, Uploader, footbar },
  data() {
    return {
  		list: {contxt: "", pub:false,rel:'',files:''},
      images:[],
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
      this.list['files']=(this.images.length>0 ? this.images[0].url : '' ) 
  		this.$http.post(this.$store.state.esPath+"微信反馈", this.list)
      .then(r=> {
        if (r.data.result) {          
          this.done = true
          this.$vux.toast.show({ text: '提交成功', type: 'success', time: 2000 })
          setTimeout(() => { this.$router.push("/wxfkl"); }, 2000)
        } else {
          this.$vux.toast.show({ text: '提交失败:'+r.data.errmsg, type: 'cancel', time: 2000 })
        }			
  		})
      .catch(e => { console.log(e) });			
  	}
  },
  activated(){
  	this.list= {contxt: "", pub:false,rel:'',files:''},
    this.images=[],
  	this.done=false
  }
}
</script>
