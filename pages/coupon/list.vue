<template>
	<view class="content">
		<u-search bg-color="#fff" placeholder="搜索商家" :clearabled="true" :show-action="false" action-text="搜索" :animation="true" v-model="searchKey" @search="search"></u-search>
		<view class="coupon-list" v-for="merchant in merchantList" v-if="merchant.couponList.length>0">
			<view class="coupon-title" @click="navMerchant(merchant)">{{merchant.merchantName}}<u-icon name="arrow-right"></u-icon></view>
			<view class="coupon-list-item" v-for="item in merchant.couponList">
				<u-row>
					<u-col span="4">
						<view class="coupon-left">
							<view class="c1">
								<text class="amount" v-if="item.type=='CASH'">{{item.benefitCash}}</text>
								<text class="discount" v-if="item.type=='DISCOUNT'">{{item.benefitDiscount/10}}</text>
							</view>
							<view class="c2">
								<text v-if="item.conditionAmount>0"> 满{{item.conditionAmount}}元可用</text>
								<text v-else> 无门槛</text>
							</view>
						</view>
					</u-col>
					<u-col span="8" class="coupon-right">
						<view class="c1">
							<text v-if="item.benefitType=='0'">全场通用</text>
							<text v-if="item.benefitType=='1'">指定商品</text>
						</view>
						<view class="c2">
							<text v-if="item.validType==1"> 有效期至{{item.endDate}}</text>
							<text v-if="item.validType==2"> 领取后{{item.validDays}}天内有效</text>
						</view>
						<view class="c3">
							<u-button plain size="mini " type="error" @click="getCoupon(item)">立即领取</u-button>
						</view>
					</u-col>
				</u-row>
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
				searchKey:'',
				pageNo: 1,
				pageSize: 10,
				merchantList: [],
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
			navMerchant(merchant){
				uni.navigateTo({
					url: '/pages/merchant/detail?id='+merchant.merchantUuid
				})
			},
			search(e){
				this.resetPage();
				this.searchCoupon();
			},
			//搜索优惠券
			searchCoupon() {
				let that = this;
				var postData = {
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize,
					merchantName: this.searchKey
				}
				var keyArray = ['HAS_COUPON'];
				if(this.hasLogin)	
					postData.userUuid = this.userInfo.userUuid;
				if(this.searchKey){
					keyArray.push('MERCHANTNAME');
				}
				postData.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.merchantCouponList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var merchantList = res.body.data.merchants;
						this.merchantList = this.merchantList.concat(merchantList);
						this.total = res.body.data.total;
						if(this.merchantList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						this.loadingType = 'more';
						this.$api.msg(res.body.status.errorDesc);
					}
				},true);
			},
			//领取优惠券
			getCoupon(item) {
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return;
				}
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
				this.merchantList = [];
				this.total = 0;
				this.pageNo = 1;
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: $page-color-base;
	}
	.content{
		margin: 20upx;
	}

	/* 列表 */
	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20upx;
		padding: 0 20upx 20upx 20upx;
		background-color: #ffffff;
		// margin-top: 20upx;
		border-radius: 20upx;
		.coupon-title{
			font-size: 30upx;
			color: #000;
			font-weight: 700;
			padding: 20upx 0;
		}
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
				.c1{
					padding-top: 20upx;
				}
				.c2{
					padding-top: 10upx;
					font-size: $font-sm;
				}
				.c3{
					padding-top: 30upx;
				}
			}
		}
	}
</style>
