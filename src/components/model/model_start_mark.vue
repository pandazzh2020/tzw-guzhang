<template>
	<el-container>
		<tzw-top-bar active='/marked'></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div>
					<el-table style="margin-bottom: 20px;text-align: left;" row-key="id" 
						:data="tableData.filter(data => !search || data.toLowerCase().includes(search.toLowerCase()))"
						:tree-props="{children: 'children', hasChildren: 'hasChildren'}">
						<el-table-column prop="name" label="信息简介" ></el-table-column>
						<el-table-column prop="date" label="标记时间">
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<el-table-column label="准确率" width="250px">
							<template slot-scope="scope">
								<span v-bind:class="status_color(scope.row.status)">{{ scope.row.status }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="beiz" label="备注"></el-table-column>
						<el-table-column label="操作" width="230px">
							<template slot="header" slot-scope="scope">
								<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
							</template>
							<template slot-scope="scope" v-if="typeof(scope.row.id)=='string'">
								<router-link :to="{name:'already_deito'}">
									<el-button type="text" size="small" style="width: 50px;" >查看</el-button>
								</router-link>
								<el-button slot="reference" type="text" size="small" style="width: 50px;">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block y_page">
						<!-- :current-page="currentPage" -->
						<el-pagination 
							@current-change="handleCurrentChange" 
							:page-size="10" layout="total, prev, pager, next" 
							:total="6">
						</el-pagination>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import tzw_top_bar from '../common/top-bar.vue'
	export default {
		components: {
			'tzw-top-bar': tzw_top_bar
		},
		data: function() {
			return {
				tableData: [{
					id: 1,
					name: '速率陀螺器',
					date: '2020-05-05',
					status: '',
					beiz: '速率陀螺工控机的状态信息',
					children: [{
						id: '1-1',
						date: '2020-05-01',
						name: '速率陀螺工控机设备自检异常问题',
						status: '40%',
						beiz: '设备自检异常问题',
					}, {
						id: '1-2',
						date: '2020-05-02',
						name: '速率陀螺工控机无法正常进入程序',
						status: '69%',
						beiz: '程序故障',
					}, {
						id: '1-3',
						date: '2020-05-05',
						name: '速率陀螺工控机无法启动',
						status: '91%',
						beiz: '程序无法启动',
					}]
				},{
					id: 2,
					name: 'DS计算机',
					date: '2020-05-01',
					status: '',
					beiz: 'DS计算机的状态信息',
					children: [{
						id: '2-1',
						date: '2020-05-01',
						name: 'DS计算机蓝屏',
						status: '75%',
						beiz: 'DS计算机无法启动',
					}, {
						id: '2-2',
						date: '2020-05-01',
						name: 'DS计算机无法进入程序',
						status: '80%',
						beiz: 'DS计算机程序故障',
					}]
				},{
					id: 3,
					name: '水平填装车',
					date: '2020-04-25',
					status: '',
					beiz: '水平填装车的状态信息',
					children: [{
						id: '3-1',
						date: '2020-05-01',
						name: '水平填装车动作不稳',
						status: '69%',
						beiz: '水平填装车故障',
					}]
				},{
					id: 4,
					name: '数控油缸器',
					date: '2020-07-08',
					status: '',
					beiz: '数控油缸器的日常状态',
					children: [{
						id: '4-1',
						date: '2020-05-01',
						name: '数控油缸器无法启动',
						status: '75%',
						beiz: '数控油缸器启动问题',
					}, {
						id: '4-2',
						date: '2020-05-01',
						name: '数控油缸器动作不稳',
						status: '92%',
						beiz: '数控油缸器多次出现问题',
					}]
				},{
					id: 5,
					name: '伺服变频电源',
					date: '2020-06-06',
					status: '',
					beiz: '伺服变频电源的状态信息',
					children: [{
						id: '5-1',
						date: '2020-05-01',
						name: '伺服变频电源电压不稳',
						status: '80%',
						beiz: '伺服变频电源的电压问题',
					}, {
						id: '52',
						date: '2020-05-01',
						name: '伺服变频电源无法使用',
						status: '69%',
						beiz: '伺服变频电源的状态故障',
					}]
				},{
					id: 6,
					name: '平台力矩电机',
					date: '2020-05-11',
					status: '',
					beiz: '平台力矩电机的状态信息',
					children: [{
						id: '6-1',
						date: '2020-05-01',
						name: '平台力矩电机无法启动',
						status: '76%',
						beiz: 'DS设备启动问题',
					}, {
						id: '6-2',
						date: '2020-05-01',
						name: '平台力矩电机短路',
						status: '80%',
						beiz: '设备电路问题',
					}]
				}],
				search: '',
				file: '',
			}
		},

		methods: {
			'status_color': function(value) {
				/*获取标记状态，根据三种状态对应相应的字体颜色*/
				name =  value >= '90%' ? 'already_marker' : value >= '50% '? 'not_marker' : value < '50%' ? 'on_marker' : 'status'
				return name
			},
			'handleCurrentChange': function() {},
		},
	}
</script>

<style>
</style>
