<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<empty v-if="loadingType!='loading'&&coupons.length === 0"></empty>
		<view v-if="coupons.length > 0">
			<view class="coupon-list">
				<view class="coupon-list-item" v-for="item in coupons">
					<u-row>
						<u-col span="4">
							<view class="coupon-left">
								<view class="c1">
									<text class="amount" v-if="item.couponDTO.type=='CASH'">{{item.couponDTO.benefitCash}}</text>
									<text class="discount" v-if="item.couponDTO.type=='DISCOUNT'">{{item.couponDTO.benefitDiscount/10}}</text>
								</view>
								<view class="c2">
									<text v-if="item.couponDTO.conditionAmount>0"> 满{{item.couponDTO.conditionAmount}}元可用</text>
									<text v-else> 无门槛</text>
								</view>
							</view>
						</u-col>
						<u-col span="2">
							<image v-if="isExpired" src="../../static/image/expired.png" mode="aspectFill"></image>
							<image v-else-if="isUsed" src="../../static/image/used.png" mode="aspectFill"></image>
							<text v-else style='color: #FA436A;'>-</text>
						</u-col>
						<u-col span="6" class="coupon-right">
							<view class="c1">
								<u-button  size="mini" type="warning">{{item.couponDTO.merchantDTO.merchantName}}</u-button>
							</view>
							<view class="c2">
								<text v-if="item.couponDTO.benefitType=='0'">全场通用</text>
								<text v-if="item.couponDTO.benefitType=='1'">指定商品</text>
							</view>
							<view class="c3">
								<text> 有效期至{{item.endDate}}</text>
							</view>
						</u-col>
					</u-row>
					
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
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
				navList: [{
						state: '1',
						text: '可使用'
					},
					{
						state: '2',
						text: '已过期'
					},
					{
						state: '3',
						text: '已使用'
					}],
				tabCurrentIndex:0,
				isExpired: false,
				isUsed: false,
				pageNo: 1,
				pageSize: 10,
				coupons: [],
				total: 0,
				loadingType: ''
			};
		},

		onLoad(options) {
			this.tabClick(0);
		},
		onReachBottom() {
			if (this.loadingType === 'more') {
				this.pageNo = this.pageNo + 1;
				this.searchCoupon(this.isExpired,this.isUsed);
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.resetPage();
				if(index==0){
					this.isExpired = false;
					this.isUsed = false;
				}
				else if(index==1){
					this.isExpired = true;
					this.isUsed = false;
				}
				else if(index==2){
					this.isExpired = false;
					this.isUsed = true;
				}
				this.searchCoupon(this.isExpired,this.isUsed);
			},
			//搜索优惠券
			searchCoupon(isExpired, isUsed) {
				var keyArray = ['USER','IS_EXPIRED','IS_USED'];
				//查找已使用无需加入是否过期查询条件
				if(isUsed)	
					keyArray = ['USER','IS_USED'];
				let postData = {
					keyArray: keyArray,
					userUuid: this.userInfo.userUuid,
					expired: isExpired,
					used: isUsed,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				//加载中
				this.loadingType = 'loading';
				this.$api.request.userCoupon(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.userCoupons;
						this.coupons = this.coupons.concat(coupons);
						this.total = res.body.data.total;
						this.loadingType = this.coupons.length >= this.total ? 'noMore' : 'more';
					} else {
						this.loadingType = 'more';
					}
				});
			},
			resetPage() {
				this.coupons = [];
				this.total = 0;
				this.pageNo = 1;
			}
		},
	}
</script>

<style lang="scss">
	page,
		{
		background: $page-color-base;
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

	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10upx;
		margin-top: 20upx;
		border-radius: 20upx;
		.coupon-list-item {
			width: 100%;
			height: 110px;
			margin: 10upx 0;
			background-image: url('../../static/image/coupon_bg.png');
			background-repeat:no-repeat;
			background-size:100% 100%;
			border-radius: 5px;
			.coupon-left {
				text-align: center;
				color: #fff;
				.c1{
					height: 80px;
					line-height: 80px;
					.amount{
						font-size: 100upx;
						font-weight: 900;
						&:before{
							content: '￥';
							font-size: $font-lg;
						}
					}
					
					.discount{
						font-size: 100upx;
						font-weight: 900;
						&:after{
							content: '折';
							font-size: $font-lg;
						}
					}
				}
				.c2{
					font-size: $font-sm;
				}
			}
			
			.coupon-right {
				color: #fff;
				text-align: center;
				padding: 10px 0;
				height: 110px;
				.c1{
					text-align: right;
					height: 30px;
					line-height: 30px;
				}
				.c2{
					height: 40px;
					line-height: 40px;
				}
				.c3{
					height: 20px;
					line-height: 20px;
					font-size: $font-sm;
				}
			}
			image{
				height: 100upx;
				width: 100upx;
				margin: 60upx 0;
			}
		}
	}
</style>
