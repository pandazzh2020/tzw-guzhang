<template>
	<el-container>
		<tzw-top-bar active="/sample"></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div class="y_function_button">
					<div class="upload">
						<input type="file" @change="getFile($event)">
					</div>
				</div>
				<div style="padding: 20px;">
					<el-table :data="tableData" style="width: 100%;" stripe size='medium '>
						<el-table-column prop="name" label="名称">
						</el-table-column>
						<el-table-column prop="date" label="上传时间">
							<template slot-scope="scope">
								<i class="el-icon-time"></i>
								<span style="margin-left: 10px">{{ scope.row.date }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="address" label="备注"></el-table-column>

						<el-table-column label="操作" width="250">
							<template slot="header" slot-scope="scope">
								<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
							</template>
							<template slot-scope="scope">
								<el-button type="text" size="small" style="width: 50px;" @click='dialogTableVisible = true '>编辑</el-button>
								<el-button slot="reference" type="text" size="small" style="width: 50px;">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block y_page">
						<!-- :current-page="currentPage" -->
						<el-pagination :page-size="10" layout="total, prev, pager, next" :total="10">
						</el-pagination>
					</div>
					<!-- 对话框 -->
					<el-dialog title="信息编辑" :visible.sync="dialogTableVisible" width='23%'>
						<el-form ref="ruleForm" :model="ruleForm" label-width="80px">
							<el-form-item label="备注" prop="name">
								<el-input v-model="ruleForm.name" style="width: 260px;"></el-input>
							</el-form-item>
							<div style="margin-left: 18%;">
								<el-button type="primary">修改</el-button>
								<el-button @click="dialogTableVisible = false">取消</el-button>
							</div>
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
		data: function() {
			return {
				tableData: [{
					date: '2020-05-02',
					name: '20200502故障语料.txt',
					address: '日常故障的基本信息以及数据'
				}, {
					date: '2020-05-04',
					name: '20200504外部故障语料.zip',
					address: '外部故障的原因以及基本信息'
				}, {
					date: '2020-05-01',
					name: '20200501故障预料.zip',
					address: '日常故障的基本信息以及数据'
				}, {
					date: '2020-05-03',
					name: '20200503维修简报.txt',
					address: '过去维修的原因及维修方法'
				}, {
					date: '2020-05-04',
					name: '20160504外部故障语料.zip',
					address: '日常故障的基本信息以及数据'
				}, {
					date: '2020-05-01',
					name: '20160501故障预料.zip',
					address: '日常故障的基本信息以及数据'
				}, {
					date: '2020-05-03',
					name: '20160504外部故障语料.zip',
					address: '外部故障的原因以及基本信息'
				}, {
					date: '2020-05-04',
					name: '20160501故障预料.zip',
					address: '日常故障的基本信息以及数据'
				}, {
					date: '2020-05-01',
					name: '20160503维修简报.txt',
					address: '过去维修的原因及维修方法'
				}, {
					date: '2020-05-03',
					name: '20160504外部故障语料.zip',
					address: '日常故障的基本信息以及数据'
				}],
				search: '',
				dialogTableVisible: false,
				ruleForm: {
					name: '',
				},
			}
		},
		methods: {
			'getFile': function(evevt) {
				/*
				 1.获取文件信息后，调用FileReaderonload(读取完成时触发)
				 2.获取图片base64，将图片的url转化成base64(将图片的src绑定为DataURL)
				 3.将图片信息传给file
				 */
				var that = this;
				var reader = new FileReader();
				reader.readAsDataURL(event.target.files[0])
				reader.onload = function(e) {
					that.imageUrl = e.target.result
				}
				that.file = event.target.files[0]
				that.name = event.target.files[0].name
				that.$message({
					showClose: true,
					message: '上传成功',
					type: 'success'
				})
			},
		}
	}
</script>

<style>
</style>
