<template>
	<view class="container">
		<view class="point">
			<image style="width:100%" :src="signSetting.ruleUrl" mode="widthFix"></image>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			
		},
		data() {
			return {
				signSetting:{}
			}
		},
		onLoad() {},
		onShareAppMessage(res) {
		    
		 },
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig'])
		},
		methods: {
			...mapMutations(['login']),
			//获取签到设置
			getSignSetting() {
				let searchOptions = {
					
				};
				this.$api.request.signSetting(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.signSetting = res.body.data;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
		},
		onLoad() {
			this.getSignSetting();
		}
	}
</script>
<style lang='scss'>
	page {
		background: $page-color-base;
	}
</style>
