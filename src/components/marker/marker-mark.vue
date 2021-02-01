<template>
	<el-container>
		<tzw-top-bar active='/marker'></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div>
					<el-page-header @back="goBack" content="信息标记">
					</el-page-header>
				</div>
				<!-- 故障描述 -->
				<child-marker-editor title='故障描述'>
					<p id="test">速率陀螺工控机在进入自检测试程序时无法正常进入程序</p>
				</child-marker-editor>
				<!-- 分析过程 -->
				<child-marker-editor title='分析过程'>
					<p id="process">
						一、原因分析</br>
						分析认为，速率陀螺工控机在进入自检测试程序，无法正常进入程序是由于解除不良</br>
						1.XX电缆解除不良</br>
						2.工控机后面板XX电缆插座松动，契合不充分</br>
						二、位置定位</br>
						1.电缆断开重新连接，现象复现，无法进入程序；</br>
						2.重启工控机，重新反复2次，现象复现，扔无法进入；</br>
						3.断开XX电缆，现象复现，无法正常进入程序；</br>
						4.重新连接XX电缆，现象复现，无法正常进入程序；</br>
						5.用手扶住XX电缆头与工控机连接插座，向左向内稍加用例，现象消除，重复两次，都能正常进入程序。</br>
					</p>
				</child-marker-editor>
				<!-- 故障定位 -->
				<child-marker-editor  title='故障定位'>
					<p id="locate">故障定位为电路氧化，具体是：经过和厂家及上级领导批准后，拆下工控机上护板，发现电路有氧化现象</p>
				</child-marker-editor>
				<!-- 处理措施及结果 -->
				<child-marker-editor  title='处理措施及结果'>
					<p id="measure">首先用橡皮对XX电缆对应的电路板擦拭，其次用无水乙醇再次对电路板擦拭，重新组装好吼，加电进入程序，重复2次，
					都能正常进入。</p>
				</child-marker-editor>
				
				<div class="y_condition">
					<table class="table_analyse">
						<tr>
							<td>
								<img src="../../assets/imgs/u255.png" style="margin-left: 50px;" />
							</td>
						</tr>
					</table>
				</div>

				<div class="y_condition">
					<el-button :plain="true" @click='finish()'>完成</el-button>
				</div>
				<div class="y_dettiles" style="height: 20px;"></div>

			</div>
		</el-main>
	</el-container>
</template>

<script>
	import contextMenu from 'vue-context-menu'
	import $ from 'jquery'
	import tzw_top_bar from '../common/top-bar.vue'
	import marker_editor from '../child/child_marker_editor.vue'
	export default {
		components: {
			'tzw-top-bar': tzw_top_bar,
			'contextMenu': contextMenu,
			'child-marker-editor': marker_editor
		},
		data: function() {
			return {
		
			}
		},
		methods: {
			'finish': function() {
				this.$message({
					message: '编辑完成',
					type: 'success'
				})
			},
			'goBack':function(){
				this.$router.go(-1)
			},
		}
	}
</script>

<style>
</style>