<template>
	<view>
		<view class="withdraw-status" :style="{color: withdraw.withdrawStatusColor}">
			{{withdraw.withdrawStatusDesc}}
		</view>


		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">提现金额</text>
				<text class="cell-tip">￥{{withdraw.withdrawAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">手续费</text>
				<text class="cell-tip">￥{{withdraw.taxAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">实付金额</text>
				<text class="cell-tip red">￥{{withdraw.paymentAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">提现到</text>
				<text class="cell-tip">{{withdraw.paymentMethodStr}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='BANK'">
				<text class="cell-tit clamp">开户银行</text>
				<text class="cell-tip">{{withdraw.bankName}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='BANK'">
				<text class="cell-tit clamp">账号名称</text>
				<text class="cell-tip">{{withdraw.bankAccountName}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='BANK'">
				<text class="cell-tit clamp">银行卡号</text>
				<text class="cell-tip">{{withdraw.bankAccountNo}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.paymentMethod=='ALIPAY'">
				<text class="cell-tit clamp">支付宝账号</text>
				<text class="cell-tip">{{withdraw.alipayId}}</text>
			</view>
		</view>
		
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">申请时间</text>
				<text class="cell-tip">{{withdraw.withdrawTime}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">申请编号</text>
				<text class="cell-tip">{{withdraw.withdrawNo}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.verifyTime">
				<text class="cell-tit clamp">审核时间</text>
				<text class="cell-tip">{{withdraw.verifyTime}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="withdraw.completeTime">
				<text class="cell-tit clamp">打款时间</text>
				<text class="cell-tip">{{withdraw.completeTime}}</text>
			</view>
			<view class="yt-list-cell b-b"">
				<text class="cell-tit clamp">备注</text>
				<text class="cell-tip">{{withdraw.memo}}</text>
			</view>
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
				id: '',
				withdraw: {}
			}
		},
		onLoad(option) {
			//订单数据
			this.id = option.id;
			this.inquiryUserWithdraw(this.id);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//查询提现详情
			inquiryUserWithdraw(id) {
				this.$api.request.withdrawDetail({
					userWithdrawUuid: id
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.withdraw = res.body.data;
						this.withdraw.withdrawStatusDesc = this.$api.util.translateWithdrawStatus(this.withdraw.withdrawStatus).withdrawStatusDesc;
						this.withdraw.withdrawStatusColor = this.$api.util.translateWithdrawStatus(this.withdraw.withdrawStatus).withdrawStatusColor;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	
	.withdraw-status{
		background: #fff;
		padding: 5px 15px 5px 20px;
		color: #333;
		font-size: 16px;
		font-weight: bold;
	}
	
	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
</style>
