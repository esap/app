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
	    <span slot="value" class="font-pink">{{v.数}}</span>
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
    	show1: false,
    	show2: false,
		list: [],
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
      this.list.dept=value[0]
    },  
    change2 (value) {
      this.list.addr=value[0]
    },
	getInfo(v) {
		this.show1=true
		this.$http.get(this.$store.state.apiPath+"vIO")
		.then(r=> {	if (r.data.result) this.list=r.data.data[0]	})
		.catch(e => { console.log(e) })	
	},	
  },
  activated(){
  	this.list= []
  	this.done=false
  	this.getInfo()
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