<template>
<div>
	<!-- 导航头 -->
	<x-header>采购订单详情</x-header>

	<group title="主表">
	   <cell title="供应商">{{form.供方}}</cell>
	  <cell title="签订日期">
		<div slot="after-title">{{form.日期}}</div>
	    <span class="lastRe">{{ form.需代表 }}</span>	
	  </cell>
	</group>

	<group title="明细" v-if="data.length>0">
	  <cell v-for="v in data" :title="v.品名">
		<span slot="icon" class="type-pink">{{ v.单位 }}</span>
		<div slot="after-title">{{v.品}}</div>
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
			data: [],
		}
	},
	computed:{
		id(){
			return this.$route.params.id
		}
	},
	methods: {
		fetchData(){
			this.$http.get(this.$store.state.apiPath+'app.采购订单?id=' + this.id)
			.then(r => { 
				if (r.data.result){
					this.form=r.data.data[0][0]
					this.data=r.data.data[1]
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
