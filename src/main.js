import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router.js'

import './assets/css/common.css'
import './assets/css/style.css'
import './assets/css/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

//验证一下是否登陆 
router.beforeEach((to, from, next) => {
	if (to.path === '/'){
		next({name: 'search'})
	}
	next()
})

new Vue({
	render: h => h(App),
	router:router,
}).$mount('#app')
