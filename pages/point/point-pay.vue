<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{order.actualAmount}}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<!-- #endif -->
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">余额支付</text>
					<text>可用余额 ¥{{userInfo.availableBalance}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<text class="mix-btn" @click="confirmWx">确认支付</text>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<text class="mix-btn" @click="confirm">确认支付</text>
		<!-- #endif -->
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
				payType: 1,
				orderNo: '',
				order: {},
				suscribeMsgList:[]
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig'])
		},
		onLoad(options) {
			this.orderNo = options.orderNo;	
			this.inquiryOrder(this.orderNo);
			this.inquirySuscribeMsg();
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirmWx: function() {
				uni.requestSubscribeMessage({
					// 订单模板消息
					tmplIds: this.suscribeMsgList,
					success: function(res) {
						console.log('订单模板消息订阅成功');
					}
				});
				if (this.payType === 1) {
					this.wechatPay();
				} else if (this.payType === 2) {
					this.alipayPay();
				} else if (this.payType === 3) {
					this.balancePay();
				}

			},
			//确认支付
			confirm: function() {
				if (this.payType === 1) {
					this.wechatPay();
				} else if (this.payType === 2) {
					this.alipayPay();
				} else if (this.payType === 3) {
					this.balancePay();
				}
			
			},
			//余额支付
			wechatPay() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.code);
						that.$api.request.wechatPay({
							orderNo: that.orderNo,
							code: loginRes.code
						}, res => {
							if (res.body.status.statusCode === '0') {
								var data = res.body.data;
								console.log(res.body.data);
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: data.timestamp,
									nonceStr: data.nonceStr,
									package: data.packageStr,
									signType: 'MD5',
									paySign: data.signature,
									success: function(res) {
										uni.redirectTo({
											url: '/pages/point/point-pay-success'
										})
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
							} else {
								console.log(res.body.status.errorDesc);
							}
						});
					}
				});
			},
			//支付宝支付
			alipayPay() {
				uni.redirectTo({
					url: '/pages/point/point-pay-success'
				})
			},
			//余额支付
			balancePay() {
				this.$api.request.balancePay({
					orderNo: this.orderNo,
					paymentMethod: this.payType
				}, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/point/point-pay-success'
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//查询订单
			inquiryOrder(orderNo) {
				this.$api.request.orderDetail({
					orderNo: orderNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.order = res.body.data;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
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
			}
			
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
