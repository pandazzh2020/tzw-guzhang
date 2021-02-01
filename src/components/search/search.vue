<template>
	<el-container>
		<tzw-top-bar active='/search'></tzw-top-bar>
		<el-main>
			<div class="y_search">
				<img src="../../assets/imgs/favicon.png" />
				<div class="y_search_input">
					<el-input placeholder="请输入检索内容" v-model="input" clearable></el-input>
					<router-link :to="{name: 'message'}">
						<el-button type="primary" icon="el-icon-search">搜索</el-button>
					</router-link>
				</div>
				<div class="y_hot">
					<a>故障热榜</a>
					<ul style="width: 50%;float: left;">
						<li><span style="color: #ff0000;">1</span> 速率陀螺工控机设备自检异常问题</li>
						<li><span style="color: #fd6492;">2</span> II级伺服变频电源启动灯不亮</li>
						<li><span style="color: #ffaa00;">3</span> 水平填装车升降数控油缸不按设定量伸缩</li>
					</ul>
					<ul style="width: 50%;float: right;">
						<li><span>4</span> 速率陀螺工控机设备无法启动</li>
						<li><span>5</span> I级伺服变频电源电阻偏大</li>
						<li><span>6</span> 速率陀螺工控机设备自检异常问题</li>
					</ul>
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
		'data': function() {
			return {
				input: '',
			}
		},
		methods: {

		}
	};
</script>

<style>
</style>
