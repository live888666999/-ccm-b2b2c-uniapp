<template>
	<view>
		<view class="top-section">
			<u-row gutter="16">
				<u-col span="2">
					<u-avatar :src="merchant.logo"></u-avatar>
				</u-col>
				<u-col span="8">
					<view class="title">{{merchant.merchantName}}</view>
					<view class="desc">{{merchant.merchantAddress}}</view>
					<view class="desc">{{merchant.followTotal}}人已关注</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout bg-purple-dark">
						<u-button :ripple="true"  :plain="true" type="error" size="mini" @click="cancelFollow" v-if="isFollowed">已关注</u-button>
						<u-button :ripple="true"  :plain="true" type="error" size="mini" @click="follow" v-else>关注</u-button>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-gap height="10" bg-color="#f8f8f8"></u-gap>
		<view class="body-section">
			<u-tabs :show-bar="true" active-color="#FA436A" :list="tabList" :is-scroll="true" :current="current" @change="change"></u-tabs>
			<view class="goods-list" v-if="current==0||current==1">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image v-if="item.productMainImage" :src="item.productMainImage.url" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<view class="price-box">
						<text class="price">{{item.unitPrice}}</text>
						<text>已售 {{item.soldUnit}}</text>
					</view>
				</view>
			</view>
			<view class="comment-list" v-for="comment in commentList" v-if="current==2">
				<view class="eva-box">
					<image class="portrait" :src="comment.userDTO.photoUrl||'/static/missing-face.png'" mode="aspectFill"></image>
					<view class="right">
						<view class="bot">
							<text class="attr">{{comment.userDTO.name}}</text>
							<text class="time">{{comment.evaluateTime}}</text>
						</view>
						<view class="star">
							<image src="../../static/temp/redstar.png" mode="" v-if="i<comment.commentRank" v-for="(item,i) in stars"></image>
						</view>
						<text class="con">{{comment.commentContent||''}}</text>
					</view>
				</view>
				<view class="eva-image">
					<image @click="previewImage(url)" :src="url" mode="aspectFill" v-for="url in comment.imageUrlList"></image>
				</view>
				<view class="eva-reply" v-if="comment.replayContent">
					<text>卖家回复: {{comment.replayContent}}</text>
				</view>
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
				merchantUuid:'',
				merchant:{},
				isFollowed: false,
				tabList: [{
					name: '推荐'
				}, {
					name: '全部商品'
				}, {
					name: '评价'
				}],
				current: 0,
				total: 0,
				pageSize: 10,
				pageNo: 1,
				loadingType: 'more', //加载更多状态
				goodsList:[],
				commentList:[],
				stars: [0, 0, 0, 0, 0]
			}
		},
		onLoad(option) {
			this.merchantUuid = option.id;
			// 商家基本信息
			this.inquiryMerchant(this.merchantUuid);
			// 商家评价
			this.searchRecommendProduct(this.merchantUuid);
			//是否已关注商家
			if(this.hasLogin){
				this.isMerchantFollowed(this.merchantUuid);
			}
		},
		//加载更多
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				if(this.current==0){
					this.searchRecommendProduct(this.merchantUuid);
				}else if(this.current==1){
					this.searchAllProduct(this.merchantUuid);
				}else if(this.current==2){
					this.searchProductComment(this.merchantUuid);
				}
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
					this.searchRecommendProduct(this.merchantUuid);
				}else if(index==1){
					this.searchAllProduct(this.merchantUuid);
				}else if(index==2){
					this.searchProductComment(this.merchantUuid);
				}
			},
			//重置商品及分页
			resetPage(){
				this.pageNo = 1;
				this.total = 0;
				this.goodsList=[];
				this.commentList=[];
			},
			//查询商家详情
			inquiryMerchant(merchantUuid) {
				this.$api.request.merchantDetail({
					merchantUuid: merchantUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.merchant = res.body.data;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			searchRecommendProduct(merchantUuid){
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('RECOMMEND');
				keyArray.push('MERCHANT');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'recommend': true,
					'merchantUuid':merchantUuid,
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize,
				};
				this.searchProduct(searchData);
			},
			searchAllProduct(merchantUuid){
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('MERCHANT');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'merchantUuid': merchantUuid,
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize,
				};
				this.searchProduct(searchData);
			},
			//搜索商品
			searchProduct(searchData){
				//加载中
				this.loadingType = 'loading';
				this.$api.request.goodsList(searchData, res => {
					uni.stopPullDownRefresh();
					if (res.body.status.statusCode === '0') {
						var goodsList = res.body.data.products;
						this.goodsList = this.goodsList.concat(goodsList);
						this.total = res.body.data.total;
						if(this.goodsList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						this.loadingType = 'more';
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			searchProductComment(merchantUuid) {
				this.loadingType = 'loading';
				let postData = {
					keyArray: ['MERCHANT'],
					merchantUuid: merchantUuid,
					startIndex: (this.pageNo-1)*this.pageSize,
					pageSize: this.pageSize
				}
				this.$api.request.goodsComment(postData, res => {
					if (res.body.status.statusCode === '0') {
						var commentList = res.body.data.commentList;
						this.commentList = this.commentList.concat(commentList);
						this.total = res.body.data.total;
						debugger
						if(this.commentList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			isMerchantFollowed(merchantUuid) {
				let postData = {
					merchantDTO: {
						merchantUuid: merchantUuid
					},
					userDTO:{
						userUuid: this.userInfo.userUuid
					}
				}
				this.$api.request.isMerchantFollowed(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.isFollowed = res.body.data.followed;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			follow(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}else{
					this.$api.request.followMerchant({
							merchantDTO:{
								merchantUuid: this.merchantUuid
							},
							userDTO:{
								userUuid: this.userInfo.userUuid
							}
						}, res => {
						if (res.body.status.statusCode === '0') {
							this.isFollowed = true;
							this.$api.msg('关注成功');
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
				}
			},
			cancelFollow(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}else{
					this.$api.request.cancelFollowMerchant({
							merchantDTO:{
								merchantUuid: this.merchantUuid
							},
							userDTO:{
								userUuid: this.userInfo.userUuid
							}
						}, res => {
						if (res.body.status.statusCode === '0') {
							this.isFollowed = false;
							this.$api.msg('取消关注成功');
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
				}
			},
			//导航到商品详情页
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
			},
			previewImage(url) {
				var urls = [];
				urls.push(url);
				uni.previewImage({
					current: url,
					indicator: "number",
					loop: "true",
					urls: urls
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
	}
	.content {
		position: relative;
	}
	.top-section{
		background-color: #fff;
		margin-top: 20upx;
		padding: 10upx;
		.title{
			
		}
		.desc{
			font-size: $font-sm;
			color: $font-color-light;
			margin-top: 10upx;
		}
	}
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 30upx 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	/* 评价 */
	.comment-list{
		padding: 30upx;
	}
	.eva-box {
		display: flex;
		padding: 20upx 0;
	
		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
	
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
	
			.star {
				display: flex;
	
				image {
					width: 40upx;
					height: 40upx;
				}
			}
	
			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
	
			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}
	
	.eva-image {
		display: flex;
	
		image {
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
		}
	}
	
	.eva-reply {
		background-color: #F8F8F8;
		color: $font-color-light;
		font-size: 28upx;
		padding: 10upx;
		margin: 20upx 0;
		border-radius: 20upx;
	}
</style>
