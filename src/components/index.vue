<template>
	<el-container>
	  <tzw-top-bar></tzw-top-bar>
	  <el-main>
		  <div class="y_lable">
			
		  </div>
	  </el-main>
	</el-container>
</template>

<script>
	import tzw_top_bar from './common/top-bar.vue'
	export default {
		name: 'search',
		components: {
			'tzw-top-bar': tzw_top_bar
		},
		data: function(){
			return {
				
			}
		}
	}
</script>

<style>
</style>
