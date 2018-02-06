<template>
	<div>
		  <button @click="toshow">点击让子组件显示</button>  
			<!-- 直接切换为子组件 -->
    	<div  v-bind:is="a"></div>  
	</div>
</template>
<script>
import first from './first.vue'
import two from './two.vue'
export default {
		data () {
			return {
				 a: "two"  
			}
		},
		methods: {  
      
    },  
		components: {  
			first,
			two
		}  
}
</script>

<style lang="less" scoped>

</style>
