import Vue from 'vue'
import Router from 'vue-router'

import search from './components/search/search.vue'
import message from './components/search/search-message.vue'
import detailes from './components/search/search-detailes.vue'
import marker from './components/marker/marker-main.vue'
import editor from './components/marker/marker-mark.vue'
import sample from './components/model/model-sample.vue'
import train from './components/model/model-task.vue'
import train_name from './components/model/model-name.vue'
import train_relation from './components/model/model-relation.vue'
import marked from './components/model/model_start_mark.vue'
import model_manage from './components/model/model-manage.vue'
import already_deito from './components/model/model_not_mark.vue'
import account from './components/account/account.vue'
import login from './components/login/login.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{path:'/search',name:'search',component:search},
		{path:'/search/message',name:'message',component:message},
		{path:'/search/detailes',name:'detailes',component:detailes},
		{path:'/marker',name:'marker',component:marker},
		{path:'/marker/editor',name:'editor',component:editor},
		{path:'/sample',name:'sample',component:sample},
		{path:'/train',name:'train',component:train},
		{path:'/train/name',name:'train_name',component:train_name},
		{path:'/train/relation',name:'train_relation',component:train_relation},
		{path:'/marked',name:'marked',component:marked},
		{path:'/model/manage',name:'model_manage',component:model_manage},
		{path:'/model/editor',name:'already_deito',component:already_deito},
		{path:'/account',name:'account',component:account},
		{path:'/login',name:'login',component:login},
	]
})