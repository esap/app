<template>
<div>
  <!-- 导航头 -->
  <x-header>出入明细</x-header>

  <group :title="'共查到'+list.length+'条记录'">
	  <cell v-for="v in list">
		<span slot="icon" :class="['type-green', {'type-pink':v.类=='入库'}]">{{v.类}}</span>
		<div slot="after-title">
		  <div>{{v.品名}}</div>
		  <span>{{v.日期}}</span>
	    </div>
	    <span class="font-pink">{{v.数}}</span>
	  </cell>
	</group>

</div>
</template>

<script>
import { Cell,  XHeader, Group } from 'vux'
export default {
  components: { Cell, XHeader, Group },
  data() {
    return {
		  list: [],
    }
  },
  computed: {
  	userName() {
  		return this.$cookie.get('esap_username')
  	}
  },
  methods: {
  	getInfo(v) {
  		this.$http.get(this.$store.state.apiPath+"vIO")
  		.then(r=> {	if (r.data.length) this.list=r.data })
  		.catch(e => { console.log(e) })	
  	},	
  },
  activated(){
  	this.list= []
  	this.getInfo()
  },
}
</script>
