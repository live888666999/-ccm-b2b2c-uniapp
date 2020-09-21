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
					<empty v-if="loadingType!='loading'&&groupBuyList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item,index) in groupBuyList" :key="index" class="group-buy-item">
						<view class="i-top b-b">
							<text class="time">{{item.startTime}}</text>
							<text class="state" :style="{color:item.groupBuyStatusColor}">{{item.groupBuyStatusDesc}}</text>
						</view>
						<view class="goods-box-single"
						 :key="index">
							<image @click="navProductDetail(item.groupBuyProductDTO.productDTO)" class="goods-img" :src="item.groupBuyProductDTO.productDTO.productMainImage.url" mode="aspectFill"></image>
							<uni-badge type="primary" v-if="item.ownerDTO.userUuid==userInfo.userUuid" text="团长"></uni-badge>
							<uni-badge type="warning" v-if="item.ownerDTO.userUuid!=userInfo.userUuid" text="团员"></uni-badge>
							<view class="right">
								<text class="title clamp">{{item.groupBuyProductDTO.productDTO.productName}}</text>
								<text class="price">{{item.groupBuyProductDTO.unitPrice}}</text>
								<view class="action">
									<text @click="viewGroupBuy(item)" class="action-btn">拼团详情</text>
								</view>
								
							</view>
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
	import uniBadge from "@/components/uni-badge/uni-badge.vue";
	import empty from "@/components/empty";
	import Json from '@/Json';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			uniBadge,
			empty
		},
		data() {
			return {
				groupBuyList: [],
				pageNo: 1,
				pageSize: 10,
				tabCurrentIndex: 0,
				loadingType: '',
				navList: [{
						state: '0',
						text: '全部',
						loadingType: 'more',
						groupBuyList: []
					},
					{
						state: '1',
						text: '拼团中',
						loadingType: 'more',
						groupBuyList: []
					},
					{
						state: '2',
						text: '拼团失败',
						loadingType: 'more',
						groupBuyList: []
					},
					{
						state: '3',
						text: '拼团成功',
						loadingType: 'more',
						groupBuyList: []
					}
				],
			};
		},

		onLoad(options) {
			this.tabCurrentIndex = Number('0');
			this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex));
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex));
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex))
				}
			},
			searchGroupBuy(groupBuyStatus) {
				let that = this;
				let keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				if (groupBuyStatus) {
					keyArray.push('GROUP_BUY_STATUS');
					searchOptions.groupBuyStatus = groupBuyStatus;
				}
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.searchGroupBuy(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var groupBuys = res.body.data.groupBuys;
						var total = res.body.data.total;
						var groupBuyList = this.groupBuyList;
						groupBuys.forEach(function(val, index) {
							var groupBuyStatusTran = that.$api.util.translateGroupBuyStatus(val.status);
							val.groupBuyStatusDesc = groupBuyStatusTran.groupBuyStatusDesc;
							val.groupBuyStatusColor = groupBuyStatusTran.groupBuyStatusColor;
							groupBuyList.push(val);
						})
						this.groupBuyList = groupBuyList;
						if (this.groupBuyList.length >= total) {
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
				let groupBuyStatus = '';
				switch (tabIndex) {
					case 0:
						groupBuyStatus = '';
						break;
					case 1:
						groupBuyStatus = '1';
						break;
					case 2:
						groupBuyStatus = '2';
						break;
					case 3:
						groupBuyStatus = '3';
						break;
				}
				return groupBuyStatus;
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.resetPage();
				this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex))
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
									that.searchGroupBuy(that.translateTabIndex(that.tabCurrentIndex));
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
				this.groupBuyList = [];
			},
			pay(item) {
				uni.navigateTo({
					url: '/pages/money/pay?orderNo=' + item.orderNo
				})
			},
			navProductDetail(item){
				uni.navigateTo({
					url: '/pages/product/product?id='+item.productDTO.productUuid
				})
			},
			viewGroupBuy(item){
				uni.navigateTo({
					url: '/pages/groupbuy/detail?id='+item.groupBuyUuid
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


	.group-buy-item {
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
				width: 200upx;
				height: 200upx;
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
				width: 200upx;
				height: 200upx;
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
					margin-top: 40upx;
					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
				
				.action{
					margin-top: 40upx;
					text-align: right;
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
			padding: 10upx;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 10upx;
			border: .5px solid $border-color-base;
			&:after {
				border-radius: 10upx;
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
	.uni-badge {
		left: 10px;
		position: absolute;
	}
</style>
