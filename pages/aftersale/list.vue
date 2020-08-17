<template>
	<view class="content">
		<empty v-if="loadingType!='loading'&&afterSales.length === 0"></empty>
		<!-- 售后/退款列表 -->
		<view v-for="(item,index) in afterSales" :key="index" class="order-item">
			<view class="i-top b-b">
				<text class="time">售后单号: {{item.saleNo}}</text>
				<text class="state" :style="{color:item.statusColor}">{{item.statusDesc}}</text>
			</view>

			<scroll-view v-if="item.orderDTO.orderProductDTOList.length > 1" class="goods-box" scroll-x>
				<view @click="navProductDetail(goodsItem)" v-for="(goodsItem, goodsIndex) in item.orderDTO.orderProductDTOList" :key="goodsIndex"
				 class="goods-item">
					<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view v-if="item.orderDTO.orderProductDTOList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.orderDTO.orderProductDTOList"
			 :key="goodsIndex">
				<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.productName}}</text>
					<text class="attr-box">{{goodsItem.productSkuDesc||''}} x {{goodsItem.productUnit}}</text>
					<text class="price">{{goodsItem.actualAmount}}</text>
				</view>
			</view>

			<view class="price-box">
				退款金额
				<text class="price">{{item.afterSaleAmount}}</text>
			</view>
			<view class="action-box b-t">
				<button class="action-btn"  v-if="item.status == '0' || item.status == '2'" @click="cancelOrderAfterSale(item)">撤销申请</button>
				<button class="action-btn"  v-if="item.status === '0'" @click="editOrderAfterSale(item)">修改申请</button>
				<button class="action-btn"  v-if="item.status === '2'" @click="editOrderAfterSale(item)">重新申请</button>
				<button class="action-btn"  v-if="item.status === '1'" @click="courierOrderAfterSale(item)">我已寄出</button>
				<button class="action-btn" @click="viewOrderAfterSale(item)">查看详情</button>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				afterSales: [],
				loadingType: '',
				pageNo: 1,
				pageSize: 10
			}
		},
		onLoad(option) {
			this.searchOrderAfterSale();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchOrderAfterSale();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			radioChange(e) {
				this.afterSaleType = e.detail.value;
			},

			//提交售后
			apply() {
				debugger
				//校验退款金额
				if (this.afterSaleAmount <= 0 || this.afterSaleAmount > this.order.productAmount) {
					this.$api.msg('退款金额有误');
					return;
				}
				//校验凭证
				if (this.imageUrlList.length === 0) {
					this.$api.msg('未上传凭证');
					return;
				}

				let options = {
					afterSaleType: this.afterSaleType,
					afterSaleAmount: this.afterSaleAmount,
					afterSaleDescription: this.afterSaleDescription,
					imageUrlList: this.imageUrlList,
					orderDTO: {
						orderNo: this.orderNo
					}
				}
				this.$api.request.applyAfterSale(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('售后申请已提交');
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/aftersale/detail'
							});
						}, 1000)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			//查询售后单
			searchOrderAfterSale() {
				let that = this;
				this.loadingType = 'loading';
				this.$api.request.searchAfterSale({
					keyArray: ['USER'],
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				}, res => {
					if (res.body.status.statusCode === '0') {
						var afterSaleList = res.body.data.afterSaleList;
						var afterSales = this.afterSales;
						afterSaleList.forEach(function(val, index) {
							var statusTran = that.translateOrderAfterSaleStatus(val.status);
							val.statusDesc = statusTran.statusDesc;
							val.statusColor = statusTran.statusColor;
							afterSales.push(val);
						})
						this.afterSales = afterSales;
						this.total = res.body.data.total;
						this.loadingType = this.afterSales.length >= this.total ? 'noMore' : 'more'
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				},true);
			},
			resetPage() {
				this.pageNo = 1;
				this.afterSales = [];
			},
			navProductDetail(item){
				uni.navigateTo({
					url: '/pages/product/product?id='+item.productDTO.productUuid
				})
			},
			viewOrderAfterSale(item){
				uni.navigateTo({
					url: '/pages/aftersale/detail?id='+item.saleNo
				})
			},
			// 修改申请
			editOrderAfterSale(item){
				uni.navigateTo({
					url: '/pages/aftersale/index?saleNo='+item.saleNo
				})
			},
			// 撤销申请
			cancelOrderAfterSale(item){
				let that = this;
				uni.showModal({
					content: '确定要撤销申请吗？',
					success: (e) => {
						if (e.confirm) {
							this.$api.request.cancelAfterSale({
								saleNo: item.saleNo
							}, res => {
								if (res.body.status.statusCode === '0') {
									that.$api.msg('售后单已成功撤销');
									that.resetPage();
									that.searchOrderAfterSale();
								} else {
									that.$api.msg(res.body.status.errorDesc);
								}
							}, false);
						}
					}
				})
			},
			courierOrderAfterSale(item){
				uni.navigateTo({
					url: '/pages/aftersale/courier?saleNo='+item.saleNo
				})
			},
			translateOrderAfterSaleStatus(status) {
				let statusDesc = '';
				let statusColor = '#303133';
				switch (status) {
					case '0':
						{
						statusDesc = '退款中';
						break;
						}
					case '1':
						{
						statusDesc = '待买家退货';
						break;
						}
					case '2':
						{
							statusDesc = '退款失败';
							statusColor = '#fa436a';
							break;
						}
					case '3':
						{
							statusDesc = '待确认收货';
							break;
						}
					case '9':
						{
							statusDesc = '退款成功';
							statusColor = '#5FCDA2';
							break;
						}
				}
				return {
					statusDesc: statusDesc,
					statusColor: statusColor
				};
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
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

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
