import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		footPrint: [],	//商品浏览历史
		applicationConfig:{}	//应用全局设置
	},
	mutations: {
		addFootPrint(state, provider) {
			var oldFootPrint = state.footPrint;
			var footPrint = [];
			for(var i=0;i<oldFootPrint.length;i++){
				if(oldFootPrint[i].productUuid!=provider.productUuid){
					footPrint.push(oldFootPrint[i]);
				}
			}
			footPrint.push(provider);
			//只保留20个商品浏览历史
			if(footPrint.length>20){
				footPrint = footPrint.slice(-20);
			}
			state.footPrint = footPrint;
			uni.setStorage({//缓存应用全局设置
				key: 'footPrint',  
				data: footPrint  
			})
		},
		updateApplicationConfig(state, provider) {
			state.applicationConfig = provider;
			uni.setStorage({//缓存应用全局设置
			    key: 'applicationConfig',  
			    data: provider  
			}) 
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
			    key: 'userToken'  
			})
		}
	},
	actions: {
	
	}
})

export default store
