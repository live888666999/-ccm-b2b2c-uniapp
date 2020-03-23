<template>
	<view class="content">
		<view class="row">
			<text class="tit">快递公司</text>
			<picker class="input" @change="bindPickerChange" :value="index" :range="couriers">
			                        <view class="uni-input">{{couriers[index]}}</view>
			                    </picker>
		</view>
		<view class="row">
			<text class="tit">快递单号</text>
			<input class="input" v-model="courierNo" placeholder="物流单号" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="courierOrderAfterSale">确认</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				saleNo: '',	//售后单号
				afterSale: {},	//售后单信息
				courierName:this.$api.util.courierList[0],	//物流公司
				courierNo:'',	//物流单号
				couriers: this.$api.util.courierList,
				index:0
				
			}
		},
		onLoad(option) {
			this.saleNo = option.saleNo;
			this.inquiryOrderAfterSale(this.saleNo);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			bindPickerChange(e){
				this.courierName = this.couriers[e.detail.value];
			},
			//查询售后单
			inquiryOrderAfterSale(saleNo) {
				this.$api.request.afterSalesInfo({
					saleNo: saleNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.afterSale = res.body.data;
						this.imageUrlList = this.afterSale.imageUrlList;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			courierOrderAfterSale() {
				if(!this.courierName || !this.courierNo){
					this.$api.msg('物流信息未填写完整');
					return;
				}
				this.$api.request.courierAfterSale({
					saleNo: this.saleNo,
					courierName: this.courierName,
					courierNo: this.courierNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('物流信息已提交');
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/aftersale/list'
							})
						}, 1000);
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}

	.aftersale-image{
		background-color: #fff;
		font-size: 30upx;
		color: $font-color-dark;
		margin: 20upx 0;
		padding: 30upx;
	}
	.aftersale-desc{
		background-color: #fff;
		font-size: 30upx;
		color: $font-color-dark;
		margin: 20upx 0;
		padding: 30upx;
		textarea{
			margin-top: 20upx;
			font-size: $font-base;
			color: $font-color-base;
		}
	}
	.b-b{
		margin-top: 20upx;
	},
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			label{
				margin-left: 20upx;
			}
			
		}
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		
			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #fa436a;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px #fa436a;
	}

	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
