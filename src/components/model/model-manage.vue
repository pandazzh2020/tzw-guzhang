<template>
	<el-container>
		<tzw-top-bar active='/model/manage'></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div class="y_train">
					<el-table style="width: 100%;text-align: center;" 
					:data="tableData.filter(data => !search || data.address.toLowerCase().includes(search.toLowerCase()))">
					<el-table-column prop="name" label="模型名称" width="220"></el-table-column>
						<el-table-column prop="date" label="创建时间" width="200">
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="address" label="模型简介" width="420"></el-table-column> -->
						<el-table-column prop="model_type" label="模型类型" width="200"></el-table-column>
						<el-table-column prop="number" label="准确率" width="140"></el-table-column>
						<!-- <el-table-column prop="check" label="状态" width="150"></el-table-column> -->
						<el-table-column label="操作" width="250">
							<template slot="header" slot-scope="scope">
								<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
							</template>
							<template slot-scope="scope">
								<el-button type="text" size="small" style="width: 50px;">发布</el-button>
								<el-popconfirm title="这是一段内容确定删除吗？">
									<el-button slot="reference" type="text" size="small" style="width: 50px;">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block y_page">
						<el-pagination :page-size="10" layout="total, prev, pager, next" :total="8">
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
		name: 'search',
		components: {
			'tzw-top-bar': tzw_top_bar
		},
		data: function() {
			return {
				tableData: [{
					date: '2016-05-02',
					number: '10%',
					name: '速率陀螺工控机模型',
					model_type: '命名实体训练',
					check: '已检查',
					address: '速率陀螺工控机设备自检异常问题',
				}, {
					date: '2016-05-04',
					name: '压力测试模型',
					number: '35%',
					model_type: '关系抽取训练',
					check: '已检查',
					address: '水平填装车升降数控油缸不按设定量伸缩'
				}, {
					date: '2016-05-01',
					name: 'II级伺服变频电源模型',
					number: '70%',
					model_type: '命名实体训练',
					check: '未检查',
					address: 'II级伺服变频电源启动灯不亮',
				}, {
					date: '2016-05-03',
					name: '水平填装车模型',
					number: '100%',
					model_type: '命名实体训练',
					check: '已检查',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '模拟训练模型',
					number: '50%',
					model_type: '关系抽取训练',
					check: '未检查',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '升降数控油缸',
					number: '17%',
					model_type: '命名实体训练模型',
					check: '未检查',
					address: '水平填装车升降数控油缸不按设定量伸缩'
				}, {
					date: '2016-05-03',
					name: '平台力矩电机模型',
					number: '70%',
					model_type: '关系抽取训练',
					check: '未检查',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '交换机系统错误模型',
					number: '15%',
					model_type: '命名实体训练',
					check: '未检查',
					address: '上海市普陀区金沙江路 1518 弄',
				}],

				search: ''
			}
		},

		methods: {

		},
	}
</script>

<style>
</style>
