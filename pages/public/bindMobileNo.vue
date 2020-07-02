<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">MOBILE</view>
			<view class="welcome">
				绑定手机号码！
			</view>
			<view class="input-content">
				<view class="input-item">
					<view class="mobileno-input">
						<view class="mobileno-input-left">
							<text class="tit">手机号码</text>
							<input type="number" :value="mobileNo" placeholder="请输入手机号码" maxlength="11" data-key="mobileNo" @input="inputChange" />
						</view>
						<view class="mobileno-input-right">
							<a class="sendCodeBtn" @click="sendCode" v-if="verification">发送验证码</a>
							<a class="sendCodeBtn" v-if="!verification">{{ timer }} 秒后重新获取</a>
						</view>
					</view>


				</view>
				<view class="input-item">
					<text class="tit">验证码</text>
					<input type="number" :value="verificationCode" placeholder="请输入验证码" maxlength="6" data-key="verificationCode"
					 @input="inputChange" />

				</view>
			</view>
			<button class="confirm-btn" @click="toBindMobileNo" :disabled="submitting">提交</button>

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
				to: '',
				mobileNo: '',
				verificationCode: '',
				submitting: false,
				verification: true, // 通过v-show控制显示获取还是倒计时
				timer: 5, // 定义初始时间为60s
			}
		},
		onLoad(options){
			var to = options.to
			if(to){
				this.to = unescape(to);
			}
		},
		computed: {
			...mapState(['applicationConfig','hasMerchant','merchantInfo'])
		},
		methods: {
			...mapMutations(['login']),
			//发送短信验证码
			sendCode() {
				const {
					mobileNo,
					verificationCode
				} = this;
				if (!this.$api.util.validateMobileNo(mobileNo)) {
					this.$api.msg('手机号码格式错误');
					return
				}
				this.$api.request.sms({
					type: 'MOBILE',
					mobileCountryCode: '86',
					mobileNo: mobileNo
				}, loginRes => {
					if (loginRes.body.status.statusCode === '0') {
						this.$api.msg('验证码已发送');
						this.timer = 5
						this.verification = false
						this.countDown() // 执行验证码计时
					} else {
						this.$api.msg(loginRes.body.status.errorDesc);
					}
				});
			},
			// 验证码倒计时
			countDown() {
				let auth_timer = setInterval(() => {
					// 定时器设置每秒递减
					this.timer-- // 递减时间
					uni.setStorage({
						key: 'timer',
						data: this.timer,
						success: function() {}
					})
					if (this.timer <= 0) {
						this.verification = true // 60s时间结束还原v-show状态并清除定时器
						clearInterval(auth_timer)
					}
				}, 1000)
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			afterBind(){
				var that = this;
				if(that.to){
					uni.navigateTo({
						url: that.to
					})
				}else{
					uni.switchTab({
						url: '/pages/user/user'
					})
				}
			},
			async toBindMobileNo() {
				var that = this;
				this.submitting = true;
				const {
					mobileNo,
					verificationCode,
				} = this;
				var isFormValid = true;
				if (!this.$api.util.validateMobileNo(mobileNo)) {
					this.$api.msg('手机号码格式错误');
					isFormValid = false;
				}
				if (!this.$api.util.validateVerificationCode(verificationCode)) {
					this.$api.msg('请输入6位数字的验证码');
					isFormValid = false;
				}
				if (!isFormValid) {
					this.submitting = false;
					return;
				}
				const requestData = {
					type: 'MOBILE',
					mobileNo: mobileNo,
					mobileCountryCode: '86',
					verificationCode: verificationCode
				};
				this.$api.request.verifyCode(requestData, verifyRes => {
					if (verifyRes.body.status.statusCode === '0') {
						//验证码校验成功后重置密码
						this.$api.request.editInfo({
							actionType: 'PERSONALPHONE',
							personalPhone: mobileNo,
							personalPhoneCountryCode: '86'
						}, resetRes => {
							if (resetRes.body.status.statusCode === '0') {
								this.$api.msg('绑定成功');
								setTimeout(function() {
									that.afterBind();
								}, 2000)
							} else {
								this.$api.msg(resetRes.body.status.errorDesc);
								this.submitting = false;
							}
						});
					} else {
						this.$api.msg(verifyRes.body.status.errorDesc);
						this.submitting = false;
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
		padding-top: 55px;
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
		left: 50upx;
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

		.mobileno-input {
			width: 100%;

			.mobileno-input-left {
				display: inline-block;
				width: 65%;
			}

			.mobileno-input-right {
				float: right;
				height: 60px;
				line-height: 60px;
				width: 35%;
				text-align: center;
				.sendCodeBtn {
					font-size: $font-sm+2upx;
					color: $font-color-base;
				}
			}
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
