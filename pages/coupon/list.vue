<template>
	<view class="content">
		<!-- <view class="coupon-list">
			<view 
				v-for="(item, index) in coupons" :key="index"
				class="coupon-item"
				@click="navToDetailPage(item)"
			>
				<view class="coupon-left">
					<image :src="item.imageUrl" mode="scaleToFill"></image>
				</view>
				<view class="coupon-right">
					<text class="name">{{item.couponName}}</text>
					<text class="expire" v-if="item.validType=='1'">有效期至{{item.endDate}}</text>
					<text class="expire" v-if="item.validType=='2'">领取后{{item.validDays}}内有效</text>

					<text class="stock">{{item.availableCount}}</text>
				</view>
				
				<text class="title clamp">{{item.productName}}</text>
				<view class="price-box">
					<text class="price">{{item.unitPrice}}</text>
					<text>已售 {{item.soldUnit}}</text>
				</view>
			</view>
		</view> -->
		<view class="coupon-list">
			<view class="coupon-list_item" v-for="item in coupons">
				<view class="coupon-left">
					<image :src="item.imageUrl"></image>
					<!-- <image src="../../image/page1copy.png"></image> -->
				</view>
				<view bindtap="checkbox" class="coupon-right">
					<view class="name">
						<text>{{item.name}}</text>
					</view>
					<view class="stock">
						<text v-if="item.benefitType=='0'">所有商品</text>
						<text v-if="item.benefitType=='1'">指定商品</text>
					</view>
					<view class="valid">
						<text v-if="item.conditionAmount>0"> 满{{item.conditionAmount}}元可用</text>
						<text v-else> 无金额限制</text>
					</view>
<!-- 					<view class="stock">
						<text>剩余{{item.totalCount}}张</text>
					</view> -->
					
					<view class="buy" @click="getCoupon(item)">立即领取</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				coupons: [],
				total: 0,
				loadingType: ''
			};
		},

		onLoad(options) {
			this.searchCoupon();
		},
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				this.searchCoupon();
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			//搜索优惠券
			searchCoupon() {
				let postData = {
					keyArray: ['ACTIVE'],
					active: true,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				//加载中
				this.loadingType = 'loading';
				this.$api.request.couponList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.coupons;
						this.coupons = this.coupons.concat(coupons);
						this.total = res.body.data.total;
						this.loadingType = this.coupons.length >= this.total ? 'noMore' : 'more';
					} else {
						this.loadingType = 'more';
					}
				}, true);
			},
			//领取优惠券
			getCoupon(item) {
				this.$api.request.getCoupon({
					actionType:'RECEIVE',
					couponDTO:{
						couponUuid: item.couponUuid,
					},
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					receiveChannel: 'SELF'
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('领取成功');
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			resetPage() {
				this.coupons = [];
				this.total = 0;
				this.pageNo = 1;
			},
			//详情
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss">
	page,{
		background: $page-color-base;
	}


	/* 列表 */
	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		border-radius: 20upx;
		.coupon-list_item {
			width: 100%;
			height: 110px;
			margin: 10upx 0;
			background-color: #fff;
			border-radius: 5px;
			.coupon-left {
				float: left;
				width: 45%;
				height: 100%;
				padding: 10upx;
			
				image {
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			
			.coupon-right {
				padding: 10upx;
				width: 55%;
				float: left;
				border-radius: 0px 10px 10px 0px;
				.name {
					color: $font-color-dark;
					font-size: $font-lg;
				}
			
				.valid {
					color: $font-color-light;
					font-size: $font-base;
					line-height: 40upx;
				}
			
				.stock {
					color: $font-color-light;
					font-size: $font-base;
					line-height: 40upx;
					margin-top: 10upx;
				}
				.buy {
					float: right;
					width: 90px;
					height: 60upx;
					border: .5px solid rgba(219, 63, 96, 0.4);
					border-radius: 30upx;
					line-height: 60upx;
					color: #FF3D45;
					font-size: 14px;
					text-align: center;
				
				}
			}
		}
	}
</style>
