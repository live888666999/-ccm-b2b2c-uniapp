<template>
	<!-- #ifdef MP-WEIXIN -->
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎使用{{applicationConfig.applicationName}}
			</view>
			<view class="wrapper">
				<view class="application-logo">
					<image :src="applicationConfig.applicationLogo" mode="aspectFill"></image>
				</view>
				<view class="application-name">
					{{applicationConfig.applicationDesc}}
				</view>
			</view>
			<button open-type="getUserInfo" class="confirm-btn" @getuserinfo="getuserinfo" withCredentials="true">微信登录</button>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎使用{{applicationConfig.applicationName}}
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" :value="mobile" placeholder="请输入手机号码" maxlength="11" data-key="mobile" @input="inputChange" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="mobile" value="" placeholder="8-20位字母数字下划线组合" placeholder-class="input-empty" maxlength="20" password
					 data-key="password" @input="inputChange" @confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section" @click="toForgetPassword">
				忘记密码?
			</view>
		</view>
		<view class="register-section" v-if="applicationConfig.applicationPublicRegisterEnabled">
			还没有账号?
			<text @click="toRegister">马上注册</text>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				mobile: '',
				password: '',
				logining: false,
				to: '',
				wechatUserInfo: {}
			}
		},
		onLoad(options) {
			var to = options.to
			if (to) {
				this.to = unescape(to);
			}
		},
		computed: {
			...mapState(['applicationConfig'])
		},
		methods: {
			...mapMutations(['login']),
			//微信小程序用户授权
			getuserinfo(e) {
				let that = this;
				that.wechatUserInfo = e.detail.userInfo;
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log('code: ' + res.code);
						that.wechatUserInfo.code = res.code;
						var requestData = {
							verifyType: 'WECHAT'
						};
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
								that.logining = false;
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
			populateWechatUserInfo(requestData) {
				requestData.code = this.wechatUserInfo.code;
				requestData.name = this.wechatUserInfo.nickName;
				requestData.photoUrl = this.wechatUserInfo.avatarUrl;
				let sex = '未知';
				if (this.wechatUserInfo.gender === 1)
					sex = '男';
				else if (this.wechatUserInfo.gender === 2)
					sex = '女';
				requestData.sex = sex;
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegister() {
				uni.navigateTo({
					url: '/pages/public/register?to=' + escape(this.to)
				})
			},
			toForgetPassword() {
				uni.navigateTo({
					url: '/pages/public/forgetPassword'
				})
			},
			toLogin() {
				this.logining = true;
				const {
					mobile,
					password
				} = this;
				var isFormValid = true;
				if (!this.$api.util.validateMobileNo(mobile)) {
					this.$api.msg('手机号码格式错误');
					isFormValid = false;
				} else if (!this.$api.util.validatePassword(password)) {
					this.$api.msg('密码为8-20位字母数字下划线组合');
					isFormValid = false;
				}
				if (!isFormValid) {
					this.logining = false;
					return;
				}
				this.$api.request.login({
					verifyType: 'PASSWORD',
					personalPhone: mobile,
					personalPhoneCountryCode: '86',
					password: password
				}, loginRes => {
					if (loginRes.body.status.statusCode === '0') {
						var tokenId = loginRes.header.tokenId;
						uni.setStorageSync('userToken', tokenId);
						this.login(loginRes.body.data); //将用户信息保存起来
						if (this.to) {
							uni.navigateTo({
								url: this.to
							})
						} else {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}
					} else {
						this.$api.msg(loginRes.body.status.errorDesc);
						this.logining = false;
					}
				});
			}
		},

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
