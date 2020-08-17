<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadMore">
					<!-- 空白页 -->
					<empty v-if="loadingType!='loading'&&orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item,index) in orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text class="time">{{item.orderTime}}</text>
							<text class="state" v-if="!item.afterSale" :style="{color:item.orderStatusColor}">{{item.orderStatusDesc}}</text>
							<text class="state" v-if="item.afterSale">已申请退款</text>
							<text v-if="item.orderStatus==='4'" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(item)"></text>
						</view>

						<scroll-view v-if="item.orderProductDTOList.length > 1" class="goods-box" scroll-x>
							<view @click="navProductDetail(goodsItem)" v-for="(goodsItem, goodsIndex) in item.orderProductDTOList" :key="goodsIndex" class="goods-item">
								<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view v-if="item.orderProductDTOList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.orderProductDTOList"
						 :key="goodsIndex">
							<image @click="navProductDetail(goodsItem)" class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.productName}}</text>
								<text class="attr-box">{{goodsItem.productSkuDesc||''}} x {{goodsItem.productUnit}}</text>
								<text class="price">{{goodsItem.actualAmount}}</text>
							</view>
						</view>

						<view class="price-box">
							共
							<text class="num">{{item.productUnit}}</text>
							件商品 实付款
							<text class="price">{{item.actualAmount}}</text>
						</view>
						<view class="action-box b-t" v-if="!item.afterSale">
							<!-- 未付款或未发货状态可以取消订单 -->
							<button v-if="item.orderStatus=='0'" class="action-btn" @click="cancelOrder(item)">取消订单</button>
							<!-- 未付款状态可以发起支付 -->
							<button @click="pay(item)" class="action-btn recom" v-if="item.orderStatus=='0'">立即支付</button>
							<!-- 待收货状态可以收货 -->
							<button @click="receive(item)" class="action-btn recom" v-if="item.orderStatus=='2'">确认收货</button>
							<!-- 已收货状态可以评价 -->
							<button @click="evaluate(item)" class="action-btn recom" v-if="item.orderStatus=='3'">去评价</button>
							<!-- 申请退款(待发货,已发货,待评价状态可以申请退款, 前提是订单未结算) -->
							<button @click="applyAfterSale(item)" class="action-btn recom" v-if="item.orderStatus!='0'&&item.orderStatus!='4'&&!item.accounted&&!item.afterSale">申请退款</button>
							<button @click="viewOrder(item)" class="action-btn">订单详情</button>
							<!-- 发货后的状态可以查看物流 -->
							<button @click="viewCourier(item)" class="action-btn" v-if="item.deliveryType=='1'&&item.orderStatus!='0'&&item.orderStatus!='1'&&item.orderStatus!='4'">查看物流</button>
						</view>
						<view class="action-box b-t" v-if="item.afterSale">
							<button @click="viewAfterSale(item)" class="action-btn">查看退款</button>
							<button @click="viewOrder(item)" class="action-btn">订单详情</button>
						</view>	
					</view>

					<uni-load-more :status="loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				orderList: [],
				pageNo: 1,
				pageSize: 10,
				tabCurrentIndex: 0,
				loadingType: '',
				navList: [{
						state: '',
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: '0',
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: '1',
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: '2',
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: '3',
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
					{
						state: '4',
						text: '已取消',
						loadingType: 'more',
						orderList: []
					},
					{
						state: '5',
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				],
			};
		},

		onLoad(options) {
			this.tabCurrentIndex = Number(options.state);
			//查询全部订单时这里调用, 查询其他状态时因为tabCurrentIndex改变会触发changeTab方法调用查询
			if(this.tabCurrentIndex === 0)
				this.searchOrder(this.translateTabIndex(this.tabCurrentIndex));
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchOrder(this.translateTabIndex(this.tabCurrentIndex));
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchOrder(this.translateTabIndex(this.tabCurrentIndex))
				}
			},
			searchOrder(orderStatus) {
				let that = this;
				let keyArray = ['USER','IS_AFTER_SALE','ORDER_TYPE_LIST'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					afterSale: false,
					orderTypeList:['0','1','2'],
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				if (orderStatus) {
					keyArray.push('ORDERSTATUS');
					searchOptions.orderStatus = orderStatus;
				}
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.searchOrder(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var orders = res.body.data.orders;
						var total = res.body.data.total;
						var orderList = this.orderList;
						orders.forEach(function(val, index) {
							var orderStatusTran = that.$api.util.translateOrderStatus(val.orderStatus);
							val.orderStatusDesc = orderStatusTran.orderStatusDesc;
							val.orderStatusColor = orderStatusTran.orderStatusColor;
							orderList.push(val);
						})
						this.orderList = orderList;
						if (this.orderList.length >= total) {
							this.loadingType = 'noMore';
						} else {
							this.loadingType = 'more';
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			translateTabIndex(tabIndex) {
				let orderStatus = '';
				switch (tabIndex) {
					case 0:
						orderStatus = '';
						break;
					case 1:
						orderStatus = '0';
						break;
					case 2:
						orderStatus = '1';
						break;
					case 3:
						orderStatus = '2';
						break;
					case 4:
						orderStatus = '3';
						break;
					case 5:
						orderStatus = '4';
						break;
					case 6:
						orderStatus = '5';
						break;
				}
				return orderStatus;
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.resetPage();
				this.searchOrder(this.translateTabIndex(this.tabCurrentIndex))
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(item) {
				let that = this;
				uni.showModal({
					content: '确认要删除订单吗？',
					success: (e) => {
						if (e.confirm) {
							this.$api.request.delOrder({
								actionType: 'DELETE',
								orderNo: item.orderNo
							}, res => {
								if (res.body.status.statusCode === '0') {
									that.$api.msg('订单已成功删除');
									that.resetPage();
									that.searchOrder(that.translateTabIndex(that.tabCurrentIndex));
								} else {
									that.$api.msg(res.body.status.errorDesc);
								}
							}, false);
						}
					}
				})
			},
			resetPage() {
				this.pageNo = 1;
				this.orderList = [];
			},
			//取消订单
			cancelOrder(item) {
				let that = this;
				var content = '确认要取消订单吗？';
				uni.showModal({
					content: content,
					success: (e) => {
						if (e.confirm) {
							this.$api.request.cancelOrder({
								orderNo: item.orderNo
							}, res => {
								if (res.body.status.statusCode === '0') {
									that.$api.msg('订单已成功取消');
									that.resetPage();
									that.searchOrder(that.translateTabIndex(that.tabCurrentIndex));
								} else {
									that.$api.msg(res.body.status.errorDesc);
								}
							}, false);
						}
					}
				})
			},
			pay(item) {
				uni.navigateTo({
					url: '/pages/money/pay?orderNo=' + item.orderNo
				})
			},
			receive(item) {
				let that = this;
				uni.showModal({
					content: '确认已收货吗？',
					success: (e) => {
						if (e.confirm) {
							this.$api.request.confirmOrder({
								orderNo: item.orderNo
							}, res => {
								if (res.body.status.statusCode === '0') {
									that.$api.msg('确认收货成功');
									setTimeout(()=>{
										that.resetPage();
										that.searchOrder(that.translateTabIndex(that.tabCurrentIndex));
									}, 1000)
								} else {
									that.$api.msg(res.body.status.errorDesc);
								}
							}, false);
						}
					}
				})
			},
			evaluate(item) {
				uni.navigateTo({
					url: '/pages/order/evaluate?orderNo=' + item.orderNo
				})
			},
			navProductDetail(item){
				uni.navigateTo({
					url: '/pages/product/product?id='+item.productDTO.productUuid
				})
			},
			applyAfterSale(item){
				uni.showModal({
					content: '发起退款前请与客服仔细沟通, 达成一致后再发起退款申请, 是否继续申请退款？',
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/aftersale/index?orderNo='+item.orderNo
							})
						}
					}
				})
			},
			viewAfterSale(item){
				uni.navigateTo({
					url: '/pages/aftersale/detail?id='+item.afterSaleNo
				})
			},
			viewOrder(item){
				uni.navigateTo({
					url: '/pages/order/detail?orderNo='+item.orderNo
				})
			},
			viewCourier(item){
				uni.navigateTo({
					url: '/pages/order/courier?courierNo='+item.courierNo
				})
			}
		},
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
