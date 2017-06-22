<template>
<div>
	<!-- 导航头 -->
	<x-header>销售订单详情</x-header>

	<group title="主表">
	  <cell title="客户">{{form.需方}}({{form.需代表}})</cell>
	  <cell title="签订日期">
		<div slot="after-title" class="lastRe">{{form.日期}}</div>
	    {{ form.供代表 }}	
	  </cell>
	  <cell title="交期">{{ form.交期 }}</cell>
	</group>
	
	<group title="明细" v-if="list.length>0">
	  <cell v-for="v in list" :title="v.品名">
		<span slot="icon" class="type-pink">{{ v.单位 }}</span>
		<span slot="after-title" class="lastRe">{{v.品}}</span>
	    <span class="contxt">{{ v.数 }}</span>
	  </cell>
	</group>
</div>
</template>

<script>
import { XHeader, Search, Group, Cell, XButton, XTextarea , debounce } from 'vux'
export default {
  components: {	XHeader, Search, Group, Cell, XButton, XTextarea },
	data() {
		return {
			form: {需代表:'',供方:'',日期:''},
			list: [],
		}
	},
	computed:{
		id(){ return this.$route.params.id }
	},
	methods: {
		fetchData(){
			this.$http.get(this.$store.state.api2Path+'app.订单?id=' + this.id)
			.then(r => { 
				if (r.data.result){
					this.form=r.data.data[0][0]
					this.list=r.data.data[1]
				}
			})
			.catch(e => { console.log(e) })
		}
	},
	activated(){
		this.fetchData()
	}
}
</script>
