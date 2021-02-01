<template>
	<div>
		<!-- 鼠标右击弹窗 -->
		<context-menu id="context-menu" ref="ctxMenu">
			<li @mousedown="equip()">设备</li>
			<li @mousedown="program()">程序</li>
			<li @mousedown="phenomenon()">现象</li>
			<li @mousedown="cancel()">取消</li>
		</context-menu>
		<div class="y_condition">
			<p style="font-size: 20px;padding: 2px;">{{ title }}</p>
			<table class="table" style="text-align: center;">
				<tr class="table_select">
					<td>
						<div id="content" @contextmenu.prevent="$refs.ctxMenu.open($event)">
							<slot></slot>
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
							<a v-for="(tag,index) in dynamicTags" v-bind:class="describe_Object_change(index)">
								<input v-model="dynamicTags[index]" />
								<i class="el-icon-close" @click="describe_close(index)"></i>
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
							<el-button @click="increase()" round>创建</el-button>
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
							<i class="el-icon-close" @click="describe_list_close(indexs)"></i>
						</p>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import contextMenu from 'vue-context-menu'
	export default {
		name: 'child_makrer',
		props: ['title'],
		watch: {
			'title': function(new_data,old_data) {
				this.title = new_data
			}
		},
		components: {
			'contextMenu': contextMenu,
		},
		computed: {
			'relation': function() {
				var relation = [{
					value: '原因',
					label: '原因'
				}, {
					value: '设备',
					label: '设备'
				}, {
					value: '新建',
					label: '新建'
				}]
				return relation
			},
			// 计算实体词
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
				equip_show: [],
				equip_data: [],
				program_show: [],
				program_data: [],
				phenomenon_show: [],
				phenomenon_data: [],
				//新建关系
				describe_list: [],
				describe_relation: [],
				// 创建的实体词
				describe_left: [],
				describe_right: [],
				dynamicTags: [],
				describe_name_select: [],
				//抽象实体词
				datas: [{
						name: '原因',
					},
					{
						name: '故障',
					}
				],
			}
		},
		methods: {
			/*
			右键属性:
			 1.获取选中元素、选中的内容（txt）
			 2.获取id并替换html内容
			*/
			'equip': function() {
				var select = document.getSelection()
				var selection = select.toString()
				var nodeId = select.anchorNode.parentElement.id
				if (nodeId) {
					var repace = document.getElementById(nodeId).innerHTML.replaceAll(selection, '<a class=equip>' + selection + '</a>')
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
					var repace = document.getElementById(nodeId).innerHTML.replaceAll(selection, '<a class=program>' + selection +
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
					var repace = document.getElementById(nodeId).innerHTML.replaceAll(selection, '<a class=phenomenon>' + selection +
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
					var replaceAll = nodName = 'A' ? parent.replaceAll('<a class="equip">', '').replaceAll('<a class="phenomenon">','').replaceAll('<a class="program">', '').replaceAll('</a>', '') : parent;
					var repace = document.getElementById(nodeId).innerHTML.replaceAll(parent, replaceAll)
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
						that.program_show.splice(that.program_show.indexOf('<a class=program>' + selection + '</a>'), 1)
						that.program_data.splice(that.program_data.indexOf(selection), 1)
					} else if (parent.search('phenomenon') != '-1') {
						that.phenomenon_show.splice(that.phenomenon_show.indexOf('<a class=phenomenon>' + selection + '</a>'), 1)
						that.phenomenon_data.splice(that.phenomenon_data.indexOf(selection), 1)
					}

				}
			},
			//获取下拉菜单的数据并添加到标签中
			'create_relation': function(command) {
				this.dynamicTags.push(command)
				this.describe_name_select.push(command)
			},
			//删除标签
			'describe_close': function(index) {
				this.dynamicTags.splice(index, 1);
				this.describe_name_select.splice(index, 1);
			},
			// 创建关系标签
			'increase': function() {
				this.describe_list.push('')
			},
			//删除标签
			'describe_list_close': function(index){
				this.describe_list.splice(index, 1);
			},
			// 根据选择改变背景颜色
			'describe_Object_change': function(value){
				name = this.describe_name_select[value] == '原因' ? 'cause' : 'fault';
				return name
			},

		}
	}
</script>

<style>
</style>