<template>
	<view class="content">
		<u-tabs class="nav" :show-bar="true" active-color="#FA436A" :list="tabList" :is-scroll="true" :current="current" @change="change"></u-tabs>
		<view class="merchant-wrapper">
			<view class="merchant-item"v-for="(merchant, index) in merchantList" :key="index"">
				<u-row gutter=" 16" class="top-section">
					<u-col span="2">
						<u-avatar :src="merchant.logo"></u-avatar>
					</u-col>
					<u-col span="6">
						<view class="title">{{merchant.merchantName}}</view>
						<view class="desc">{{merchant.merchantAddress}}</view>
						<view class="desc">{{merchant.followTotal}}人已关注</view>
					</u-col>
					<u-col span="2">
						<view class="demo-layout bg-purple-dark">
							<u-button :ripple="true" :plain="true" type="error" size="mini" @click="cancelFollow(merchant)" v-if="merchant.followed">已关注</u-button>
							<u-button :ripple="true" :plain="true" type="error" size="mini" @click="follow(merchant)" v-else>关注</u-button>
						</view>
					</u-col>
					<u-col span="2">
						<u-button :ripple="true" :plain="false" type="error" size="mini"  @click="selectMerchant(merchant)">去逛逛</u-button>
					</u-col>
				</u-row>
				<scroll-view class="product-list" scroll-x>
					<view class="scoll-wrapper"   v-if="merchant.productList.length>0">
						<view v-for="product in merchant.productList" class="product-item" @click="navToDetailPage(product)">
							<image :src="product.productMainImage.url" mode="aspectFill"></image>
							<text class="title clamp">{{product.productName}}</text>
							<text class="price">￥{{product.unitPrice}}</text>
						</view>
					</view>
					<view v-else class='empty-product'>
						<image style="width:75px;height:75px" src="../../static/image/empty.png"></image>
						<view>商家未上架商品</view>
					</view>
				</scroll-view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			empty
		},
		data() {
			return {
				tabList: [{
					name: '全部商家'
				}, {
					name: '关注'
				}],
				current: 0,
				latitude: 30.6565202250, //默认天府广场, 如果获取当前位置成功则替换为当前位置
				longitude: 104.0659332275,
				merchantList: [],	//展示的商家
				followedMerchantList: [],	//关注的商家
				pageSize: 10,
				pageNo: 1,
				total: 0,
				loadingType: 'more', //加载更多状态
			}
		},
		onLoad(option) {
			let that = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.latitude = res.latitude;
					that.longitude = res.longitude;
				},
				complete: function(res) {
					//that.inquiryNearbyMerchant(res.latitude, res.longitude);
				}
			});
			that.searchMerchant();
		},
		//加载更多
		onReachBottom(){
			if(this.current==0 && this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				this.searchMerchant();
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			change(index) {
				this.current = index;
				this.resetPage();
				if(index==0){
					this.searchMerchant();
				}else if(index==1){
					if(this.hasLogin)
						this.inquiryFollowedMerchant();
					else{
						this.loadingType = 'noMore';
						uni.navigateTo({
							url: '/pages/public/login'
						})
					}
						
				}
			},
			//重置商品及分页
			resetPage(){
				this.pageNo = 1;
				this.total = 0;
				this.merchantList=[];
			},
			selectMerchant(item) {
				uni.navigateTo({
					url: '/pages/merchant/detail?id='+item.merchantUuid
				})
			},
			//查询附近商家
			inquiryNearbyMerchant(lat, lng) {
				let that = this;
				this.$api.request.nearbyMerchant({
					userLatitude: lat || this.latitude,
					userLongitude: lng || this.longitude
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.merchantList = res.body.data.merchants;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//查询商家列表
			searchMerchant() {
				let that = this;
				var postData = {
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				}
				if(this.hasLogin)	
					postData.userUuid = this.userInfo.userUuid;
				this.loadingType = 'loading';
				this.$api.request.merchantList(postData, res => {
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
			//查询关注的商家列表
			inquiryFollowedMerchant() {
				let that = this;
				var postData = {
					userUuid: this.userInfo.userUuid
				}
				this.loadingType = 'loading';
				this.$api.request.followedMerchant(postData, res => {
					this.loadingType = 'noMore';
					if (res.body.status.statusCode === '0') {
						this.merchantList = res.body.data.merchants;
						this.followedMerchantList = res.body.data.merchants;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				},true);
			},
			follow(merchant){
					this.$api.request.followMerchant({
							merchantDTO:{
								merchantUuid: merchant.merchantUuid
							},
							userDTO:{
								userUuid: this.userInfo.userUuid
							}
						}, res => {
						if (res.body.status.statusCode === '0') {
							merchant.followed = true;
							this.$api.msg('关注成功');
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
			},
			cancelFollow(merchant){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}else{
					this.$api.request.cancelFollowMerchant({
							merchantDTO:{
								merchantUuid: merchant.merchantUuid
							},
							userDTO:{
								userUuid: this.userInfo.userUuid
							}
						}, res => {
						if (res.body.status.statusCode === '0') {
							merchant.followed = false;
							this.$api.msg('取消关注成功');
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
				}
			},
			//详情页
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 40upx;
		background-color: #f8f8f8;
	}

	.content {
		position: relative;
	}
	
	.nav{
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
	}
	
	.merchant-wrapper{
		margin-top: 100upx;
	}
	
	.merchant-item{
		margin: 20upx;
		background-color: #fff;
	}

	.top-section {
		background-color: #fff;
		padding: 20upx;

		.title {}

		.desc {
			font-size: $font-sm;
			color: $font-color-light;
			margin-top: 10upx;
		}
	}
	.product-list {
		white-space: nowrap;
		padding: 40upx 20upx 20upx 20upx;
	}
	
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	
	.empty-product{
		width: 200upx;
		font-size: $font-sm;
		color: $font-color-light;
	}
	
	.product-item {
		width: 150upx;
		margin-right: 20upx;
		font-size: $font-sm+2upx;
		color: $font-color-dark;
		line-height: 1.8;
	
		image {
			width: 150upx;
			height: 150upx;
			border-radius: 6upx;
		}
	
		.price {
			color: $uni-color-primary;
		}
	}
</style>
