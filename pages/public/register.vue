<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎使用{{applicationConfig.applicationName}}
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="wrapper">
			
				<view class="application-logo">
					<image :src="applicationConfig.applicationLogo" mode="aspectFill"></image>
				</view>
				<view class="application-name">
					{{applicationConfig.applicationDesc}}
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" :value="mobileNo" placeholder="请输入手机号码" maxlength="11" data-key="mobileNo" @input="inputChange" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="mobile" value="" placeholder="8-20位字符组合" placeholder-class="input-empty" maxlength="20" password
					 data-key="password" @input="inputChange" />
				</view>
				<view class="input-item">
					<text class="tit">重复密码</text>
					<input type="mobile" value="" placeholder="8-20位字符组合" placeholder-class="input-empty" maxlength="20" password
					 data-key="rePassword" @input="inputChange" />
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="getUserInfo" class="confirm-btn" @getuserinfo="getuserinfo" withCredentials="true" :disabled="registering">微信登录</button>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN -->
			<button class="confirm-btn" @click="toRegisterByPassword" :disabled="registering">注册</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				code: '',
				openId: '',
				mobileNo: '',
				password: '',
				rePassword: '',
				registering: false,
				supervisorId: '',
				groupUuid: '', //会员注册专用商品组
				wechatUserInfo:{},
				to: '',
				suscribeMsgList:[]
			}
		},
		onLoad(options) {
			// #ifdef H5
			//微信浏览器
			if(this.isWexinBrowser()){
				var openId = uni.getStorageSync('openId');
				//未缓存openId
				if(!openId){
					//有code, 通过code换取openId
					if(options.code){
						this.code = options.code;
						this.getOpenIdByCode(this.code);
					}
					//没有code, 重定向获取code
					else{
						let uri = encodeURIComponent(window.location.href);
						let authURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.applicationConfig.wechatAppIdOfficialAccount+'&redirect_uri='+uri+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';  
						window.location.href = authURL;
						return;
						//注意因为使用vue的history模式, 需要在nginx配置重定向, 否则会出现404错误
					}
				}else{
					this.openId = openId;
				}
			}
			// #endif
			this.supervisorId = options.id || decodeURIComponent(options.scene);
			var to = options.to;
			if(to){
				this.to = unescape(to);
			}
			this.inquiryProductGroupRegister();
			this.inquirySuscribeMsg();
		},
		computed: {
			...mapState(['applicationConfig'])
		},
		methods: {
			...mapMutations(['login']),
			isWexinBrowser(){
			    var ua = navigator.userAgent.toLowerCase();
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {
			        return true;
			    } else {
			        return false;
			    }
			},
			getOpenIdByCode(code) {
				let that = this;
				let searchOptions = {
					code: code
				};
				that.$api.request.getOpenIdByCode4OfficialAccount(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var data = res.body.data;
						that.openId = data.openId;
						uni.setStorageSync("openId",that.openId);
					} else {
						that.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			getuserinfo(e){
				let that = this;
				that.wechatUserInfo = e.detail.userInfo;
				uni.requestSubscribeMessage({
					// 订阅消息
					tmplIds: this.suscribeMsgList,
					success: function(res) {
						console.log('订阅消息订阅成功');
					}
				});
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log('code: '+res.code);
						that.wechatUserInfo.code = res.code;
						var requestData = {
							verifyType: 'WECHAT'
						};
						if (that.supervisorId && that.supervisorId != 'undefined') {
							requestData.supervisorL1 = {
								userUuid: that.supervisorId
							}
						}
						that.populateWechatUserInfo(requestData);
						that.$api.request.login(requestData, loginRes => {
							if (loginRes.body.status.statusCode === '0') {
								var tokenId = loginRes.header.tokenId;
								uni.setStorageSync('userToken', tokenId);
								that.login(loginRes.body.data); //将用户信息保存起来
								//如果未绑定手机号码则提示绑定手机号码
								if (!loginRes.body.data.personalPhone) {
									uni.showModal({
										title: '',
										content: '您还未绑定手机，绑定后体验更佳!',
										showCancel: false,
										cancelText: '',
										confirmText: '立即绑定',
										confirmColor: '#666666',
										success: res => {
											uni.navigateTo({
												url: '/pages/public/bindMobileNo?to=' + escape(that.to)
											})
										}
									});
								} else {
									that.loginRedirect();
								}
				
							} else {
								that.$api.msg(loginRes.body.status.errorDesc);
							}
						});
					}
				});
			},
			loginRedirect() {
				var that = this;
				if (that.to) {
					uni.navigateTo({
						url: that.to
					})
				} else {
					uni.switchTab({
						url: '/pages/user/user'
					})
				}
			},
			//查询订阅消息
			inquirySuscribeMsg() {
				this.$api.request.wxSuscribeMsg({}, res => {
					if (res.body.status.statusCode === '0') {
						this.suscribeMsgList = res.body.data.suscribeMsgList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			populateWechatUserInfo(requestData){
				requestData.code = this.wechatUserInfo.code;
				requestData.name = this.wechatUserInfo.nickName;
				requestData.photoUrl = this.wechatUserInfo.avatarUrl;
				let sex = '未知';
				if(this.wechatUserInfo.gender===1)
					sex = '男';
				else if(this.wechatUserInfo.gender===2)
					sex = '女';
				requestData.sex = sex;
			},
			
			// 查询注册专用商品组
			inquiryProductGroupRegister() {
				this.$api.request.productGroupForRegister({}, res => {
					if (res.body.status.statusCode === '0' && res.body.data) {
						this.groupUuid = res.body.data.groupUuid;
					}
				});
			},
			async toRegisterByPassword() {
				this.registering = true;

				const {
					mobileNo,
					password,
					rePassword
				} = this;
				var isFormValid = true;
				if (!this.$api.util.validateMobileNo(mobileNo)) {
					this.$api.msg('手机号码格式错误');
					isFormValid = false;
				} else if (!this.$api.util.validatePassword(password)) {
					this.$api.msg('密码为8-20位字母数字下划线组合');
					isFormValid = false;
				} else if (password != rePassword) {
					this.$api.msg('两次密码输入不一致');
					isFormValid = false;
				}
				if (!isFormValid) {
					this.registering = false;
					return;
				}
				let requestData = {
					personalPhone: mobileNo,
					personalPhoneCountryCode: '86',
					password: password,
					openId: this.openId
				};
				if (this.supervisorId) {
					requestData.supervisorL1 = {
						userUuid: this.supervisorId
					}
				}
				this.$api.request.reg(requestData, regRes => {
					if (regRes.body.status.statusCode === '0') {
						//注册成功后立即登录, 获取userToken
						this.$api.request.login({
							verifyType: 'PASSWORD',
							personalPhone: mobileNo,
							personalPhoneCountryCode: '86',
							password: password
						}, loginRes => {
							if (loginRes.body.status.statusCode === '0') {
								var tokenId = loginRes.header.tokenId;
								uni.setStorageSync('userToken', tokenId);
								this.login(loginRes.body.data); //将用户信息保存起来
								if(this.to){
									console.log(this.to);
									uni.navigateTo({
										url: this.to
									})
								}else if (this.groupUuid) {
									uni.navigateTo({
										url: '/pages/product/group?groupId=' + this.groupUuid
									})
								} else {
									uni.switchTab({
										url: '/pages/user/user'
									})
								}
							} else {
								this.$api.msg(loginRes.body.status.errorDesc);
								this.registering = false;
							}
						});
					} else {
						this.$api.msg(regRes.body.status.errorDesc);
						this.registering = false;
					}
				});
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 75px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	
	.application-logo {
		text-align: center;

		image {
			width: 200upx;
			height: 200upx;
		}
	}

	.application-name {
		margin-top: 20upx;
		text-align: center;
		color: $font-color-base;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		text-align: center;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
