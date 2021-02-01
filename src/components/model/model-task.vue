<template>
	<el-container>
		<tzw-top-bar active='/train'></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div class="y_function_button">
					<div class="upload">
						<el-button @click="dialogTableVisible = true">创建模型</el-button>
					</div>
				</div>
				<div class="y_train">
					<el-table style="width: 100%;text-align: center;" :row-class-name="tableRowClassName"
					:data="tableData.filter(data => !search || data.address.toLowerCase().includes(search.toLowerCase()))">
					<el-table-column prop="name" label="训练名称" width="220"></el-table-column>
						<el-table-column prop="date" label="创建时间" width="200">
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="address" label="模型简介" width="420"></el-table-column>
						<el-table-column prop="model_type" label="模型类型" width="260"></el-table-column>
						<el-table-column prop="number" label="样本数量" width="140"></el-table-column>
						<el-table-column prop="check" label="状态" width="150"></el-table-column>
						<el-table-column label="操作" width="250">
							<template slot="header" slot-scope="scope">
								<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
							</template>
							<template slot-scope="scope">
								<router-link :to="{path:'train/name'}" v-if="scope.row.model_type == '命名实体训练'">
									<el-button type="text" size="small" style="width: 50px;">查看</el-button>
								</router-link>
								<router-link :to="{path:'train/relation'}" v-if="scope.row.model_type == '关系抽取训练'">
									<el-button type="text" size="small" style="width: 50px;">查看</el-button>
								</router-link>
								<el-popconfirm title="这是一段内容确定删除吗？">
									<el-button slot="reference" type="text" size="small" style="width: 50px;">删除</el-button>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<div class="block y_page">
						<el-pagination :page-size="10" layout="total, prev, pager, next" :total="9">
						</el-pagination>
					</div>
					
					<!-- 对话框 -->
					<el-dialog title="训练模型" :visible.sync="dialogTableVisible">
						<el-form ref="ruleForm" :model="ruleForm" label-width="80px">
							<el-form-item label="训练名称" prop="name">
								<el-input v-model="ruleForm.name" style="width: 260px;"></el-input>
							</el-form-item>
							<el-form-item label="样本选择">
								<div class="sample_select">
									<el-tabs v-model="activeName" type="border-card" >
									    <el-tab-pane label="未标记样本" name="first">
											<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
											@selection-change="handleSelectionChange" border>
												<el-table-column type="selection" width="55"></el-table-column>
												<el-table-column prop="name" label="姓名" width="250"></el-table-column>
												<el-table-column label="日期" width="120">
													<template slot-scope="scope">{{ scope.row.date }}</template>
												</el-table-column>
												<el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
											</el-table>
											<div class="block y_page">
												<!-- :current-page="currentPage" -->
												<el-pagination :page-size="11" layout="total, prev, pager, next" :total="11">
												</el-pagination>
											</div>
										</el-tab-pane>
									    <el-tab-pane label="已标记样本" name="second">
											<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
											@selection-change="handleSelectionChange1" border>
												<el-table-column type="selection" width="55"></el-table-column>
												<el-table-column prop="name" label="姓名" width="250"></el-table-column>
												<el-table-column label="日期" width="120">
													<template slot-scope="scope">{{ scope.row.date }}</template>
												</el-table-column>
												<el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
											</el-table>
											<div class="block y_page">
												<!-- :current-page="currentPage" -->
												<el-pagination :page-size="11" layout="total, prev, pager, next" :total="11">
												</el-pagination>
											</div>
										</el-tab-pane>
									  </el-tabs>
								</div>
							</el-form-item>
							<el-form-item label="训练类型" prop="type">
								<el-radio v-model="ruleForm.type" label="1" border>命名实体训练</el-radio>
								<el-radio v-model="ruleForm.type" label="2" border>关系抽取训练</el-radio>
							</el-form-item>
							<el-form-item>
								<div style="margin-left: 25%;">
									<el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
									<el-button @click="dialogTableVisible = false">取消</el-button>
								</div>
							</el-form-item>
						</el-form>
					</el-dialog>
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
		watch: {
			'ruleForm': function(new_data,old_data){
				console.log(new_data)
			}
		},
		data: function() {
			return {
				tableData: [{
					date: '2016-05-02',
					number: 10,
					name: '速率陀螺工控机',
					model_type: '命名实体训练',
					check: '已训练',
					address: '速率陀螺工控机设备自检异常问题',
				},  {
					date: '2016-05-01',
					name: 'II级伺服变频电源',
					number: 7,
					model_type: '命名实体训练',
					check: '未训练',
					address: 'II级伺服变频电源启动灯不亮',
				}, {
					date: '2016-05-03',
					name: '水平填装车',
					number: 10,
					model_type: '命名实体训练',
					check: '已训练',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '环境测试与部署',
					number: 21,
					model_type: '关系抽取训练',
					check: '未训练',
					address: 'II级伺服变频电源启动灯不亮',
				}, {
					date: '2016-05-03',
					name: '升降数控油缸',
					number: 17,
					model_type: '命名实体训练',
					check: '未训练',
					address: '水平填装车升降数控油缸不按设定量伸缩'
				}, {
					date: '2016-05-04',
					name: '伺服电动缸过载',
					number: 7,
					model_type: '关系抽取训练',
					check: '未训练',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '平台力矩电机',
					number: 15,
					model_type: '命名实体训练',
					check: '未训练',
					address: '上海市普陀区金沙江路 1518 弄',
				}, {
					date: '2016-05-03',
					name: '交换机系统错误',
					number: 1,
					model_type: '命名实体训练',
					check: '训练中',
					address: '水平填装车升降数控油缸不按设定量伸缩'
				}],
				radio: '1',
				ruleForm: {
					name: '',
					type: '',
					multipleSelection: [],
					multipleSelection1: [],
				},
				dialogTableVisible: false,
				search: '',
				activeName: 'first'
			}
		},

		methods: {
			'onSubmit': function() {
				var that = this
				var data = []
				if (this.ruleForm.multipleSelection.length != 0) {
					data.push({
						'name': that.ruleForm.name,
						'type': that.ruleForm.type,
						'multipleSelection': that.ruleForm.multipleSelection,
						'delivery': that.ruleForm.delivery,
					})
					that.$message({
						message: '创建成功',
						type: 'success'
					});
					// 清空表单并关闭
					that.$refs.ruleForm.resetFields();
					this.$refs.multipleTable.clearSelection();
					that.dialogTableVisible = false;
					
				} else {
					that.$message({
						message: '请选择文件',
						type: 'warning'
					});
				}
			
			
			},
			//获取对话框中选择的样本数据
			'handleSelectionChange': function(val) {
				this.ruleForm.multipleSelection = val
			},
			'handleSelectionChange1': function(val) {
				this.ruleForm.multipleSelection1 = val
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
			}
		}
	}
</script>

<style>
</style>
