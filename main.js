import Vue from 'vue'
import store from './store'
import App from './App'
import util from './config/util'
import * as request from './config/api'
import './components/ican-H5Api/ican-H5Api'
import uView from "uview-ui";
import Json from './Json' 

Vue.use(uView);

const msg = (title, duration=2000, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage,util,request};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()