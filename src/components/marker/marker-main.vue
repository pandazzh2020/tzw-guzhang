<template>
	<el-container>
	  <tzw-top-bar active='/marker'></tzw-top-bar>
	  <el-main>
		  <div class="y_lable">
		  	<el-tabs v-model="activeName" type="border-card" class='y_lable_show'>
		  		<el-tab-pane label="故障信息采集卡" name="failure">
		  			<child-marker-message></child-marker-message>
		  		</el-tab-pane>
		  		<el-tab-pane label="FMEA采集卡" name="fmea">
					<child-marker-fmea></child-marker-fmea>
		  		</el-tab-pane>
		  	</el-tabs>
		  </div> 
		</el-main>
	</el-container>
</template>

<script>
	import tzw_top_bar from '../common/top-bar.vue'
	import child_message from '../child/child_marker_message.vue'
	import child_fmea from '../child/child_marker_fmea.vue'
	export default {
		name: 'mark_show',
		components: {
			'tzw-top-bar': tzw_top_bar,
			'child-marker-message': child_message,
			'child-marker-fmea': child_fmea,
		},
		data: function(){
			return {
				activeName: 'failure'
			}
		}
	}
</script>

<style>
</style>
