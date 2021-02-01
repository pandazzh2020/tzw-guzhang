<template>
	<el-container>
		<tzw-top-bar active="/sample"></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div>
					<el-page-header @back="goBack" content="命名实体训练">
					</el-page-header>
				</div>
				<div class="y_learn">
					<p style="font-size: 25px;padding: 5px;">
						<span>训练状态</span>
					</p>
					<div class="name_table">
						<p>迭代轮次: 1</p>
						<p>
							<span>训练准确率：68%  </span>     
							<span>预测准确率：54%</span>
						</p>
						<p>迭代轮次: 2</p>
						<p>
							<span>训练准确率：69%  </span>     
							<span>预测准确率：52%</span>
						</p>
						<p>...........</p>
						<p>迭代轮次: 201</p>
						<p>
							<span>训练准确率：95%  </span>     
							<span>预测准确率：89%</span>
						</p>
					</div>

					<li>
						<a style="color: #000000;margin-left: 40px;">迭代轮次: <input v-model="data" type="text" /></a>
						<a style="color: #000000;margin-left: 40px;">迭代阈值: <input v-model="threshold" type="text" /></a>
					</li>
					<p style="padding: 10px;">
						<el-button round style="margin-left: 180px;" @click="start()">开始训练</el-button>
						<el-button round style="margin-left: 50px;" @click="finish()">终止训练</el-button>
					</p>
				</div>

				<!-- 右侧模型展示 -->
				<div class="y_model_right">
					<!-- 新创建模型 -->
					<el-table :data="now_data" border style="width: 100%" :show-header="showHeader">
						<el-table-column prop="name" label="姓名" width="180"></el-table-column>
						<el-table-column prop="date" label="日期" width="180"></el-table-column>
						<el-table-column label="操作">
						      <template slot-scope="scope">
						        <el-button  size="mini">使用</el-button>
								 <el-button  size="mini">发布</el-button>
						        <el-button size="mini" type="danger" >删除</el-button>
						      </template>
						    </el-table-column>
					</el-table>
					<!-- 分割线 -->
					<el-divider>上面为新模型 | 下面为历史模型</el-divider>
					<!-- 历史模型 -->
					<el-table :data="history_data" border style="width: 800px" :show-header="showHeader">
						<el-table-column prop="name" label="姓名" width="180"></el-table-column>
						<el-table-column prop="date" label="日期" width="180"></el-table-column>
						<el-table-column label="操作">
						      <template slot-scope="scope">
						        <el-button  size="mini">保存</el-button>
								 <el-button  size="mini">发布</el-button>
						        <el-button size="mini" type="danger" >删除</el-button>
						      </template>
						    </el-table-column>
					</el-table>
				</div>

				<div v-if="study">
					<p style="font-size: 20px;padding: 2px;margin-left: 5%">主动学习标记
						<span style="margin-left: 5px;">(准确率: 95%)</span>
					</p>
					<!-- 鼠标右击弹窗 -->
					<context-menu id="context-menu" ref="ctxMenu">
						<li @mousedown="equip()">设备</li>
						<li @mousedown="program()">程序</li>
						<li @mousedown="phenomenon()">现象</li>
						<li @mousedown="cancel()">取消</li>
					</context-menu>
					<div class="y_condition" style="margin-left: 5%;">
						<table class="table" style="text-align: center;">
							<tr class="table_select">
								<td>
									<div id="content" @contextmenu.prevent="$refs.ctxMenu.open($event)">
										<p id="test"><a class=equip>速率陀螺工控机</a> 在<a class=program>进入自检测试程序</a>时<a class=phenomenon>无法正常进入程序</a></p>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									实体词:<span v-for="(item,index) in equip_show" v-html="item"></span>
									<span v-for="(item,index) in program_show" v-html="item"></span>
									<span v-for="(item,index) in phenomenon_show" v-html="item"></span>
								</td>
							</tr>
							<tr>
								<td class="abstract">
									<p>抽象实体:
										<a v-for="(tag,index) in dynamicTags" v-bind:class="Object_change(index)">
											<input v-model="dynamicTags[index]" />
											<i class="el-icon-close" @click="handleClose(index)"></i>
										</a>
										<el-dropdown @command="create_relation">
											<span class="el-dropdown-link">
												新建<i class="el-icon-arrow-down el-icon--right"></i>
											</span>
											<el-dropdown-menu slot="dropdown">
												<el-dropdown-item v-for="(item,index) in datas" :command="item.name">
													{{ item.name }}
												</el-dropdown-item>
											</el-dropdown-menu>
										</el-dropdown>
									</p>
								</td>
							</tr>
							<tr>
								<td id="insert">
									<p>
										<el-button @click="describe_increase()" round>创建</el-button>
									</p>
									<p>
										实体词 <el-select v-model="describe_left1" clearable placeholder="请选择" size='mini'>
											<el-option v-for="item in describe_one" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
										选择关系 <el-select v-model="describe_relation1" clearable placeholder="请选择" size='mini'>
											<el-option v-for="item in relation" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
										实体词 <el-select v-model="describe_right1" clearable placeholder="请选择" size='mini'>
											<el-option v-for="item in describe_one" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</p>

									<p v-for="(items,indexs) in describe_list">
										实体词 <el-select v-model="describe_left[indexs]" clearable placeholder="请选择" size='mini'>
											<el-option v-for="item in describe_one" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
										选择关系 <el-select v-model="describe_relation[indexs]" clearable placeholder="请选择" size='mini'>
											<el-option v-for="item in relation" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
										实体词 <el-select v-model="describe_right[indexs]" clearable placeholder="请选择" size='mini'>
											<el-option v-for="item in describe_one" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</p>
								</td>
							</tr>
						</table>
					</div>

					<div class="y_condition" style="margin-left: 5%;">
						<p>
							<el-button :plain="true" @click='submit()'>完成</el-button>
						</p>
					</div>
					<div class="y_dettiles" style="height: 20px;">

					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import tzw_top_bar from '../common/top-bar.vue'
	import contextMenu from 'vue-context-menu'
	export default {
		name: 'relation',
		components: {
			'tzw-top-bar': tzw_top_bar,
			'contextMenu': contextMenu,
		},
		watch: {
			'dynamicTags': function(new_data, old_data) {

			}
		},
		computed: {
			'relation': function() {
				var relation = [{
					value: '原因',
					label: '原因'
				}, {
					value: '设备2',
					label: '设备'
				}, {
					value: '新建3',
					label: '新建'
				}]
				return relation
			},
			'describe_one': function() {
				var data = [],
					describe = [];
				data = data.concat(this.equip_data).concat(this.program_data).concat(this.phenomenon_data).concat(this.dynamicTags)
				data.forEach(function(item, index) {
					describe.push({
						value: item,
						label: item,
					})
				})
				return describe
			},
		},
		data: function() {
			return {
				study: false,
				form: [],
				data: '0',
				threshold: '0',

				datas: [{
						name: '原因',
					},
					{
						name: '故障',
					}
				],
				//右键属性
				equip_show: ['<a class=equip>速率陀螺工控机</a>'],
				equip_data: [],
				program_show: ['<a class=program>进入自检测试程序</a>'],
				program_data: [],
				phenomenon_show: ['<a class=phenomenon>无法正常进入程序</a>'],
				phenomenon_data: [],
				//新建关系
				describe_list: [],
				describe_relation: [],
				// 创建的实体词
				describe_left: ['速率陀螺工控机', '进入自检测试程序', '无法正常进入程序'],
				describe_right: ['速率陀螺工控机', '进入自检测试程序', '无法正常进入程序'],
				describe_abstract: [],
				dynamicTags: [],
				name_select: [],
				inputVisible: false,
				inputValue: '',
				describe_left1: '速率陀螺工控机',
				describe_relation1: '设备',
				describe_right1: '速率陀螺工控机',

				now_data: [],
				history_data: [{
					date: '2016-05-02',
					name: '旧模型1',
				},{
					date: '2016-05-02',
					name: '旧模型2',
				},{
					date: '2016-05-02',
					name: '旧模型3',
				},{
					date: '2016-05-02',
					name: '旧模型4',
				},{
					date: '2016-05-02',
					name: '旧模型5',
				},{
					date: '2016-05-02',
					name: '旧模型6',
				},{
					date: '2016-05-02',
					name: '旧模型7',
				}],
				showHeader: false
			}
		},
		methods: {
			'start': function() {
				location.reload()
			},
			'finish': function() {
				this.data = '201'
				this.threshold = '0.1'
				this.study = true
				this.now_data.push({
					date: '2016-05-02',
					name: '新模型',
				})
			},
			'submit': function() {
				this.$message({
					message: '提交成功',
					type: 'success'
				})
			},
			'goBack': function() {
				this.$router.go(-1)
			},

			/*
			 1.获取选中元素、选中的内容（txt）
			 2.获取id并替换html内容
			*/
			'equip': function() {
				var select = document.getSelection()
				var selection = select.toString()
				var nodeId = select.anchorNode.parentElement.id
				if (nodeId) {
					var repace = document.getElementById(nodeId).innerHTML.replace(selection, '<a class=equip>' + selection + '</a>')
					document.getElementById(nodeId).innerHTML = repace
					let equip = ('<a class=equip>' + selection + '</a>').toString()
					this.equip_data.push(selection)
					this.equip_show.push(equip)
				}
			},
			'program': function() {
				var select = document.getSelection()
				var selection = select.toString()
				var nodeId = select.anchorNode.parentElement.id
				if (nodeId) {
					var repace = document.getElementById(nodeId).innerHTML.replace(selection, '<a class=program>' + selection +
						'</a>')
					document.getElementById(nodeId).innerHTML = repace
					let program = ('<a class=program>' + selection + '</a>').toString()
					this.program_data.push(selection)
					this.program_show.push(program)
				}
			},
			'phenomenon': function() {
				var select = document.getSelection()
				var selection = select.toString()
				var nodeId = select.anchorNode.parentElement.id
				if (nodeId) {
					var repace = document.getElementById(nodeId).innerHTML.replace(selection, '<a class=phenomenon>' + selection +
						'</a>')
					document.getElementById(nodeId).innerHTML = repace
					let phenomenon = ('<a class=phenomenon>' + selection + '</a>').toString()
					this.phenomenon_data.push(selection)
					this.phenomenon_show.push(phenomenon)
				}
			},
			'cancel': function() {
				/*
				 1.获取选中元素、选中的内容（txt）、子节点的id、.获取子节点的内容
				 2.判断是否有标记，然后取消标记
				 3.判断是哪个实体，将选中的实体词清空
				 */
				var that = this,
					select = document.getSelection(),
					selection = select.toString();
				var nodeId = select.anchorNode.parentElement.parentElement.id
				if (nodeId && nodeId != 'content') {
					let nodName = select.anchorNode.parentElement.nodeName
					var parent = select.anchorNode.parentElement.outerHTML;
					var replace = nodName = 'A' ? parent.replace('<a class="equip">', '').replace('<a class="phenomenon">', '').replace(
						'<a class="program">', '').replace('</a>', '') : parent;
					var repace = document.getElementById(nodeId).innerHTML.replace(parent, replace)
					document.getElementById(nodeId).innerHTML = repace
					// 清空实体词
					remove()
				} else {
					this.$message({
						message: '请选择已标记内容',
						type: 'warning'
					})
				}

				function remove() {
					if (parent.search('equip') != '-1') {
						that.equip_show.splice(that.equip_show.indexOf('<a class=equip>' + selection + '</a>'), 1)
						that.equip_data.splice(that.equip_data.indexOf(selection), 1)
					} else if (parent.search('program') != '-1') {
						that.program_show.splice(that.program_show.indexOf('<a class=equip>' + selection + '</a>'), 1)
						that.program_data.splice(that.program_data.indexOf(selection), 1)
					} else if (parent.search('phenomenon') != '-1') {
						that.phenomenon_show.splice(that.phenomenon_show.indexOf('<a class=equip>' + selection + '</a>'), 1)
						that.phenomenon_data.splice(that.phenomenon_data.indexOf(selection), 1)
					}

				}
			},

			'describe_increase': function() {
				this.describe_list.push('')
			},
			'handleClose': function(index) {
				this.dynamicTags.splice(index, 1);
				this.name_select.splice(index, 1);
			},
			//获取下拉菜单的数据并添加到标签中
			'create_relation': function(command) {
				this.dynamicTags.push(command)
				this.name_select.push(command)
			},
			// 根据选择改变背景颜色
			'Object_change': function(value) {
				name = this.name_select[value] == '原因' ? 'cause' : 'fault';
				return name
			}
		}
	}
</script>

<style>
	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>
