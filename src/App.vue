<template>
  <div id="app">
	<transition name="router-slid" mode="out-in">
		<keep-alive>
		    <router-view></router-view>
		</keep-alive>
	</transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>


