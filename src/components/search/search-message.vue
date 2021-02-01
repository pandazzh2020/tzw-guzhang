<template>
	<el-container>
		<tzw-top-bar active='/search'></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div class="y_search_keyword">
					<el-input placeholder="请输入检索内容" v-model="input" clearable></el-input>
					<router-link :to="{name:'message'}">
						<el-button type="primary" icon="el-icon-search">搜索</el-button>
					</router-link>
				</div>
				<div class="search_keyword">
					<div class="search_message" v-for="(item,index) in data">
						<table>
							<tr>
								<td>
									<p>故障描述</p>
									<p>进行II级伺服模拟能源控制箱和II级变频电源自检，启动主源后，II级变频电源启动灯不亮</p>
									<p>故障定位</p>
									<p>1.模拟能源控制箱C35-8插座7、8点，输出正常；</p>
									<p>2.将1-40电缆与控制箱连接，检查电缆C37-4端插头7、8点输出，显示不导通状态；</p>
									<p>3.检查电缆1-40的5、6、7、8点，其中8点不通</p>
									<p>处置措施</p>
									<p>重新焊接，更换第二套地幔设备变频电源电缆1-40操作后，故障消除</p>
									<router-link :to="{name:'detailes'}">
										<p class="detailes"><i class="el-icon-d-arrow-right"></i>详情</p>
									</router-link>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import tzw_top_bar from '../common/top-bar.vue'
	export default {
		name: 'message',
		components: {
			'tzw-top-bar': tzw_top_bar
		},
		data: function() {
			return {
				input: '',
				data: [
					'', '', '', '', '', '', '', '', '', '', '', '', '', '',
				]
			}
		}
	}
</script>

<style>
</style>
