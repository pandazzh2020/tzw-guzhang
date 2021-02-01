<template>
	<el-container>
		<tzw-top-bar></tzw-top-bar>
		<el-main>
			<div class="y_lable">
				<div>
					<el-page-header @back="goBack" content="详情页面">
					</el-page-header>
				</div>

				<div class="y_dettiles">
					<p style="font-size: 20px;padding: 2px;">故障分析</p>
					<table class="table" style="text-align: center;">
						<tr>
							<td>
								<img src="../../assets/imgs/1608541415.png" style="margin-left: 50px;" />
							</td>
						</tr>
					</table>
				</div>

				<div class="y_dettiles">
					<p style="font-size: 20px;padding: 2px;">故障描述</p>
					<table class="table_analyse">
						<tr>
							<td>
								<p>速率陀螺工控机在进入自检测试程序时，无法正常进入程序。</p>
							</td>
						</tr>

					</table>
				</div>

				<div class="y_dettiles">
					<p style="font-size: 20px;padding: 2px;">故障过程</p>
					<table class="table_analyse">
						<tr>
							<td>
								<p>速率陀螺工控机在进入自检测试程序时，无法正常进入程序。</p>
								<p>分析认为，速率陀螺工控机在进入自检测试程序，无法正常进入程序是由于解除不良</p>
								<p>1.XX电缆解除不良</p>
								<p>2.工控机后面板XX电缆插座松动，契合不充分</p>
								<p>二、位置定位</p>
								<p>1.电缆断开重新连接，现象复现，无法进入程序；</p>
								<p>2.重启工控机，重新反复2次，现象复现，扔无法进入；</p>
								<p>3.断开XX电缆，现象复现，无法正常进入程序；</p>
								<p>4.重新连接XX电缆，现象复现，无法正常进入程序；</p>
								<p>5.用手扶住XX电缆头与工控机连接插座，向左向内稍加用例，现象消除，重复两次，都能正常进入程序。</p>
							</td>
						</tr>
					</table>
				</div>

				<div class="y_dettiles">
					<p style="font-size: 20px;padding: 2px;">故障定位</p>
					<table class="table_analyse">
						<tr>
							<td>
								<p>故障定位为电路氧化，具体是：经过和厂家及上级领导批准后，拆下工控机上护板，发现电路有氧化现象</p>
							</td>
						</tr>
					</table>
				</div>

				<div class="y_dettiles">
					<p style="font-size: 20px;padding: 2px;">处置措施及结果</p>
					<table class="table_analyse">
						<tr>
							<td>
								<p>首先用橡皮对XX电缆对应的电路板擦拭，其次用无水乙醇再次对电路板擦拭，重新组装好吼，加电进入程序，重复2次，都能正常进入。</p>
							</td>
						</tr>
					</table>
				</div>
				<div class="y_dettiles" style="height: 20px;">
					
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import tzw_top_bar from '../common/top-bar.vue'
	export default {
		name: 'detailes',
		components: {
			'tzw-top-bar': tzw_top_bar
		},
		data: function() {
			return {
				options: [{
					value: '标记',
					label: '标记',
					children: [{
						value: '设备',
						label: '设备',
					}, {
						value: '程序',
						label: '程序',
					}, {
						value: '现象',
						label: '现象',
					}]
				}, {
					value: '取消',
					label: '取消',
				}],
				fileList: [],
				file: '',
				imageUrl: false,
				substance: [{
					value: '速率陀螺工控机',
					label: '速率陀螺工控机'
				}, {
					value: '自检测试程序',
					label: '自检测试程序'
				}, {
					value: '无法正常进入程序',
					label: '无法正常进入程序'
				}, {
					value: '解除不良',
					label: '解除不良'
				}, {
					value: '故障5',
					label: '故障'
				}],
				relation: [{
					value: '原因1',
					label: '原因'
				}, {
					value: '设备2',
					label: '设备'
				}, {
					value: '新建3',
					label: '新建'
				}],
				selectedIds: [],
				value: '',
				data: '',
				list: [
					'', '', '', '', '', '', '', '', '', ''
				]
			}
		},
		methods: {
			'doSomething': function() {
				/*
				 1.获取选中元素、选中的内容（txt）
				 2.获取id并替换html内容
				 */
				var select = document.getSelection()
				var selection = select.toString()
				var nodeId = select.anchorNode.parentElement.id
				if (nodeId) {
					var repace = document.getElementById(nodeId).innerHTML.replace(selection, '<a class=doSomething>' + selection +
						'</a>')
					document.getElementById(nodeId).innerHTML = repace
				}
			},
			'cancel': function() {
				/*
				 1.获取选中元素、选中的内容（txt）、子节点的id、.获取子节点的内容
				 2.判断是否有标记，然后取消标记
				 */
				var select = document.getSelection()
				var selection = select.toString()
				var nodeId = select.anchorNode.parentElement.parentElement.id
				if (nodeId && nodeId != 'content') {
					let nodName = select.anchorNode.parentElement.nodeName
					var parent = select.anchorNode.parentElement.outerHTML;
					var replace = nodName = 'A' ? parent.replace('<a class="doSomething">', '').replace('</a>', '') : parent;
					var repace = document.getElementById(nodeId).innerHTML.replace(parent, replace)
					document.getElementById(nodeId).innerHTML = repace
				} else {
					this.$message({
						message: '请选择已标记内容',
						type: 'warning'
					})
				}
			},
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
			},
			'submit': function(event) {
				/*
				 1.创建formData对象，
				 2.将获取的文件添加到formData中，并传给后台
				 */
				var that = this;
				if (that.file) {
					let formData = new FormData();
					event.preventDefault(); //取消默认行为
					formData.append('file', that.file);
				} else {
					alert('请选择文件')
				}
			},
			'finish': function() {
				this.$message({
					message: '编辑完成',
					type: 'success'
				})
			},
			'goBack': function(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
</style>
