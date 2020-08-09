<template>
	<view class="content">
		<view class="nav">
			<u-row>
				<u-col span="6">
					<u-tabs :show-bar="true" active-color="#FA436A" :list="tabList" :is-scroll="true" :current="current" @change="change"></u-tabs>
				</u-col>
				<u-col span="6">
					<u-search v-if="current==0" placeholder="搜索商家" :clearabled="true" :show-action="false" action-text="搜索" :animation="true" v-model="searchKey" @search="search"></u-search>
				</u-col>
			</u-row>
		</view>
		
		<view class="merchant-wrapper">
			<view class="sort" v-if="current==0">
				<u-row>
					<u-col span="12">
						<u-tabs :show-bar="false" active-color="#333" height="100" :list="sortList" :is-scroll="false" :current="sortCurrent" @change="sort"></u-tabs>
					</u-col>
				</u-row>
			</view>
			<view class="merchant-item"v-for="(merchant, index) in merchantList" :key="index"">
				<u-row gutter=" 16" class="top-section">
					<u-col span="2">
						<u-avatar :src="merchant.logo"></u-avatar>
					</u-col>
					<u-col span="10">
						<u-row>
							<u-col span="8">
								<view class="title">{{merchant.merchantName}}</view>
							</u-col>
							<u-col span="4" class="distance">
								<text>{{merchant.distance.toFixed(3)||''}}km</text>
							</u-col>
						</u-row>
						<u-row>
							<u-col span="7">
								<view class="desc">{{merchant.merchantAddress}}</view>
								<view class="desc"><u-icon name="star-fill" color="#FC9F2A" size="30"></u-icon>{{merchant.score}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已售{{merchant.soldUnit}}</view>
								<view class="desc">{{merchant.followTotal}}人已关注</view>
							</u-col>
							<u-col span="3">
								<view>
									<u-button :ripple="true" :plain="true" type="error" size="mini" @click="cancelFollow(merchant)" v-if="merchant.followed">已关注</u-button>
									<u-button :ripple="true" :plain="true" type="error" size="mini" @click="follow(merchant)" v-else>关注</u-button>
								</view>
							</u-col>
							<u-col span="2">
								<u-button :ripple="true" :plain="false" type="error" size="mini"  @click="selectMerchant(merchant)">去逛逛</u-button>
							</u-col>
						</u-row>
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
				sortList: [{
					name: '默认排序'
				}, {
					name: '销量'
				}, {
					name: '评分'
				}, {
					name: '距离'
				}],
				sortCurrent: 0,	//当前排序
				tabList: [{
					name: '全部商家'
				}, {
					name: '关注'
				}],
				current: 0,
				latitude: 30.6565202250, //默认天府广场, 如果获取当前位置成功则替换为当前位置
				longitude: 104.0659332275,
				searchKey: '',
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
			sort(index){
				this.sortCurrent = index;
				this.resetPage();
				this.searchMerchant();
			},
			//搜索商家
			search(e){
				this.resetPage();
				this.searchMerchant();
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
				if(this.searchKey){
					postData.keyArray=['MERCHANTNAME'];
					postData.merchantName = this.searchKey;
				}
				if(this.sortCurrent == 1){
					postData.sortBy = 'sold_unit';
				}else if(this.sortCurrent == 2){
					postData.sortBy = 'score';
				}else if(this.sortCurrent == 3){
					postData.sortBy = 'distance';
					postData.latitude = this.latitude;
					postData.longitude = this.longitude;
				}
				this.loadingType = 'loading';
				this.$api.request.merchantList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var merchantList = [];
						res.body.data.merchants.forEach(function(val,index){
							if(val.latitude && val.longitude){
								//计算离当前位置距离
								var distance = that.$api.util.getDistance(that.latitude, that.longitude,val.latitude,val.longitude);
								val.distance = distance;
								if(val.score){
									val.score = val.score.toFixed(1);
								}else{
									val.score = 0
								}
								merchantList.push(val);
							}
						})
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
						var merchantList = [];
						res.body.data.merchants.forEach(function(val,index){
							if(val.latitude && val.longitude){
								//计算离当前位置距离
								var distance = that.$api.util.getDistance(that.latitude, that.longitude,val.latitude,val.longitude);
								val.distance = distance;
								if(val.score){
									val.score = val.score.toFixed(1);
								}else{
									val.score = 0
								}
								merchantList.push(val);
							}
						})
						this.merchantList = merchantList;
						this.followedMerchantList = merchantList;
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
		background-color: #fff;
	}
	.sort{
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
		.distance {
			text-align: right;
			font-size: $font-sm;
			color: $font-color-light;
		}
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
