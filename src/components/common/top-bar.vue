<template>
	<el-header>
		<el-menu :default-active="active" class="el-menu-demo" mode="horizontal" @select="handleSelect" router
		 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item>
				<img src="../../assets/imgs/logo.png" style="width: 30px;height: 25px;filter: blur();" />
				<span style="font-size: 20px;margin-left: 10px;color: #ffffff;">故障标记系统</span>
			</el-menu-item>
			<el-menu-item index="/search" style="margin-left: 50px;">故障检索</el-menu-item>		
			<el-menu-item index="/marker">故障标记</el-menu-item>
			<el-submenu index="3">
				<template slot="title">样本训练</template>
				<el-menu-item index="/sample">无标记样本</el-menu-item>
				<el-menu-item index="/marked">已标记样本</el-menu-item>
				<el-menu-item index="/train">训练任务</el-menu-item>
				<el-menu-item index="/model/manage">模型管理</el-menu-item>
			</el-submenu>
			<div class="user" style="float: right;">
				<el-menu-item index="/account">
					<el-dropdown>
					<span class="el-dropdown-link">
						<el-avatar :size="30" :src="circleUrl"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item><el-button type="text" @click="accountpage">个人主页</el-button></el-dropdown-item>
						<el-dropdown-item divided><el-button type="text" style="color:#F56C6C;" @click="exit">退出登录</el-button></el-dropdown-item>
					</el-dropdown-menu>
					</el-dropdown>
				</el-menu-item>
			</div>
		</el-menu>
	</el-header>
</template>

<script>
	import user from '../../assets/imgs/user.png'
	export default {
		name: 'top_bar',
		props: ['active'],
	    data() {
	      return {
			circleUrl: user,
	      };
	    },
		watch: {
			'active': function(new_data,old_data){
				this.active = new_data
			}
		},
	    methods: {
	      handleSelect(key, keyPath) {
	        // console.log(key, keyPath);
		  },
		  exit() {
			this.$confirm('您将退出登录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
				message: '退出成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				});          
			});
		  },
		 accountpage() {
			this.$router.push('account');
		 },
	    }
	  }
</script>

<style>
.el-dropdown-link {
cursor: pointer;
color: #409EFF;
}
.el-icon-arrow-down {
font-size: 7px;
}
</style>
