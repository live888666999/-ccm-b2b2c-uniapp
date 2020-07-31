<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP||H5 -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled @click="navSearch"/>
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" style="background:#E37A64"></view>
			<swiper :autoplay="true" :interval="2000" class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navSwiper(item)">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots" v-if="carouselList.length>0">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<view class="grid-wrapper">
					<!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
					<swiper class="grid-swiper" :indicator-dots="false">
						<swiper-item>
							<uni-grid :column="4" :show-border="false"  :square="false">
							    <uni-grid-item>
									<view class="grid-item-box" @click="navCoupon">
										<image class="grid-image" src="/static/image/coupon.png"></image>
										<text class="grid-text">领券中心</text>
									</view>
							    </uni-grid-item>
								<!-- #ifdef MP-WEIXIN -->
							    <uni-grid-item>
							    	<view class="grid-item-box" @click="navLiveRooms">
							    		<image class="grid-image" src="/static/image/live.png"></image>
							    		<text class="grid-text">直播间</text>
							    	</view>
							    </uni-grid-item>
								<!-- #endif -->
								<uni-grid-item>
									<view class="grid-item-box" @click="navGroupBuy">
										<image class="grid-image" src="/static/image/pintuan.png"></image>
										<text class="grid-text">拼团专区</text>
										<view class="grid-dot">
											<uni-badge style="width:30px" text="低价" type="warning" />
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="grid-item-box" @click="navSecKill">
										<image class="grid-image" src="/static/image/seckill.png"></image>
										<text class="grid-text">秒杀专区</text>
										<view class="grid-dot">
											<uni-badge style="width:30px" text="限时" type="error" />
										</view>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="grid-item-box" @click="navSign">
										<image class="grid-image" src="/static/image/sign.png"></image>
										<text class="grid-text">签到领积分</text>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="grid-item-box" @click="navPoint">
										<image class="grid-image" src="/static/image/mall.png"></image>
										<text class="grid-text">积分商城</text>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="grid-item-box" @click="navMerchant">
										<image class="grid-image" src="/static/image/merchant.png"></image>
										<text class="grid-text">精选商家</text>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="grid-item-box" @click="navCustomerService">
										<image class="grid-image" src="/static/image/kefu.png"></image>
										<text class="grid-text">客服中心</text>
									</view>
								</uni-grid-item>
							</uni-grid>
						</swiper-item>
					</swiper>
				
				</view>
		<!-- 分类 -->
		<!-- <view class="cate-section">
			<view class="cate-item" @click="navCoupon">
				<image src="/static/temp/coupon.png"></image>
				<text>领券中心</text>
			</view>
			<view class="cate-item" @click="navPoint">
				<image src="/static/image/point.png"></image>
				<text>积分兑换</text>
			</view>
				<view class="cate-item" @click="navLiveRooms">
					<image src="/static/image/live.png"></image>
					<text>直播间</text>
				</view>
			<view class="cate-item" v-for="cate in cates" @click="navToList(cate.productCateUuid)">
				<image :src="cate.catePicUrl"></image>
				<text>{{cate.cateName}}</text>
			</view>
		</view> -->
		<view class="m-t" v-if="announcement.length>0">
			<uni-notice-bar scrollable="true" showIcon="true" showClose="true" showGetMore="true" :text="announcement[0].title" single="true" moreText="更多" @getmore="navAnnouncement"></uni-notice-bar>
		</view>
			
		<view class="ad-1" v-if="ads.length>0">
			<image @click="navAD(ads[0])" :src="ads[0].url" mode="scaleToFill"></image>
		</view>
		<!-- 秒杀楼层 -->
		<view class="seckill-section m-t" v-if="secKills.length>0">
			<view class="s-header">
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				<uni-countdown v-if="secKillFlag ==''" class="countdown" :day="secKillCountDown.days" :hour="secKillCountDown.hours" :minute="secKillCountDown.minutes"
				 :second="secKillCountDown.seconds" color="#FFFFFF" background-color="#333333" />
				<text class="end" v-if="secKillFlag=='END'">已结束</text>
				<text class="end" v-if="secKillFlag=='START'">秒杀中</text>
				<text class="yticon icon-you" @click="navSecKill()"></text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in secKills" :key="index" class="floor-item" @click="navSecKillDetail(item)">
						<image :src="item.productDTO.productMainImage.url" mode="aspectFill"></image>
						<text class="title clamp">{{item.productDTO.productName}}</text>
						<text class="price">￥{{item.unitPrice}}</text>
						<text>
						</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 团购楼层 -->
		<view class="f-header m-t" v-if="groupBuys.length>0">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">精品团购</text>
				<text class="tit2">Boutique Group Buying</text>
			</view>
			<text class="yticon icon-you" @click="navGroupBuy()"></text>
		</view>
		<view class="group-section" v-if="groupBuys.length>0">
			<swiper class="g-swiper" :duration="500">
				<swiper-item class="g-swiper-item" v-if="index%2 === 0" v-for="(item, index) in groupBuys" :key="index" @click="navGroupBuyDetail(item)">
					<view class="g-item left" v-if="index<groupBuys.length">
						<image :src="groupBuys[index].productDTO.productMainImage.url" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{groupBuys[index].productDTO.productName}}</text>
							<view class="price-box">
								<text class="price">￥{{groupBuys[index].unitPrice}}</text>
								<text class="m-price">￥{{groupBuys[index].productDTO.unitPrice}}</text>
							</view>

							<view class="pro-box">
								<view class="progress-box">
									<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
								</view>
								<text>{{groupBuys[index].minUserCount}}人成团</text>
							</view>
						</view>

					</view>
					<view class="g-item right" v-if="index+1<groupBuys.length">
						<image :src="groupBuys[index+1].productDTO.productMainImage.url" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{groupBuys[index+1].productDTO.productName}}</text>
							<view class="price-box">
								<text class="price">￥{{groupBuys[index+1].unitPrice}}</text>
								<text class="m-price">￥{{groupBuys[index+1].productDTO.unitPrice}}</text>
							</view>
							<view class="pro-box">
								<view class="progress-box">
									<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
								</view>
								<text>{{groupBuys[index+1].minUserCount}}人成团</text>
							</view>
						</view>
					</view>
				</swiper-item>

			</swiper>
		</view>



		<!-- 分类推荐楼层 -->
		<view v-for="group in productGroups">
			<view class="f-header m-t">
				<image :src="group.iconUrl" v-if="group.iconUrl"></image>
				<view class="tit-box">
					<text class="tit">{{group.groupName}}</text>
					<text class="tit2">{{group.groupDescription}}</text>
				</view>
				<text class="yticon icon-you" @click="navToGroupPage(group)"></text>
			</view>
			<view class="hot-floor">
				<view class="floor-img-box">
					<image class="floor-img" :src="group.backgroundUrl" mode="scaleToFill"></image>
				</view>
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<view v-for="product in group.productList" class="floor-item" @click="navToDetailPage(product)">
							<image :src="product.productMainImage.url" mode="aspectFill"></image>
							<text class="title clamp">{{product.productName}}</text>
							<text class="price">￥{{product.unitPrice}}</text>
						</view>
						<view class="more" @click="navToGroupPage(group)">
							<text>查看全部</text>
							<text>More+</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<u-tabs name="cateName" :show-bar="true" active-color="#FA436A" :list="cates" :is-scroll="true" :current="current" @change="change"></u-tabs>
			<view class="goods-list">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="goods-item"
				>
					<view class="image-wrapper" @click="navToDetailPage(item)">
						<image v-if="item.productMainImage" :src="item.productMainImage.url" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.productName}}</text>
					<view class="price-box">
						<text class="price">{{item.unitPrice}}</text>
						<text>已售 {{item.soldUnit}}</text>
					</view>
					<navigator :url="'/pages/merchant/detail?id='+item.merchantDTO.merchantUuid" class="merchant">{{item.merchantDTO.merchantName}}</navigator>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
			<u-mask :show="showGift" :mask-click-able="false">
				<view class="gift">
					<view class="gift-title">
						新人有礼
					</view>
					<view class="gift-desc">
						恭喜您获得以下福利!
					</view>
					<view class="gift-image">
						<image src="../../static/image/gift.png" ></image>
					</view>
					
					<view class="gift-content">
						<view class="gift-item" v-for="gift in giftList" v-if="gift.welfareType=='POINT'||gift.welfareType=='COUPON'">
							<!-- 积分 -->
							<view class="gift-item-label" v-if="gift.welfareType=='POINT'">
								积分
							</view>
							<view class="gift-item-value" v-if="gift.welfareType=='POINT'">
								<button><text class="tip">{{gift.pointGiven}}</text></button>
							</view>
							<!-- 优惠券 -->
							<view class="gift-item-label" v-if="gift.welfareType=='COUPON'">
								优惠券{{gift.couponCount}}张
							</view>
							<view class="gift-item-value" v-if="gift.welfareType=='COUPON'">
								<button>{{gift.couponDTO.name}}</button>
							</view>
						</view>
					</view>
					<view class="gift-message">
						{{receiveGiftMessage}}
					</view>
					<view class="gift-action">
						<u-button :loading="receiveLoading" :ripple="true" @click="receiveProfitWelfare">立即领取</u-button>
					</view>
				</view>
				<view class="gift-close">
					<u-icon size="60" name="close-circle" @click="showGift=false"></u-icon>
				</view>
			</u-mask>
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniCountdown,
			uniNoticeBar,
			uniGrid,
			uniGridItem,
			uniBadge
		},
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				cates: [],
				secKills: [],
				secKillCountDown: {},
				groupBuys: [],
				productGroups: [],
				ads: [],
				notice:[],
				announcement:[],
				articleList: []	,//图文, 音视频列表
				secKillFlag:'END',//秒杀结束标志符(END表示已结束)
				current: 0,	//默认展示推荐商品
				total: 0,
				pageSize: 10,
				pageNo: 1,
				loadingType: 'more', //加载更多状态
				goodsList:[],
				showGift:false,	//新人礼物弹窗
				giftList:[],
				receiveLoading:false,
				receiveGiftMessage:''
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig'])
		},
		onLoad() {
			this.loadData();
		},
		onShow(){
			if(this.hasLogin && !this.userInfo.profitWelfareReceived){
				this.receiveGiftMessage = '';
				this.inquiryProfitWelfare();
			}
		},
		//加载更多
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				if(this.current==0){
					this.searchRecommendProduct();
				}else{
					this.searchProductByCate(this.cates[this.current].productCateUuid);
				}
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.resetPage();
				if(index==0){
					this.searchRecommendProduct();
				}else{
					this.searchProductByCate(this.cates[index].productCateUuid);
				}
			},
			//重置商品及分页
			resetPage(){
				this.pageNo = 1;
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				// this.inquirySwiper();
				// this.inquiryAd();
				// this.inquiryProductCate();
				// this.inquirySecKill();
				// this.inquiryGroupBuy();
				// this.inquiryProductGroup();
				this.homeData();
				this.searchRecommendProduct();
			},
			//查询新人福利
			inquiryProfitWelfare() {
				this.$api.request.inquiryProfitWelfare({}, res => {
					if (res.body.status.statusCode === '0') {
						this.giftList = res.body.data.welfares;
						//有待领取新人福利, 打开领取弹窗
						if(this.giftList.length>0)
							this.showGift = true;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//领取新人福利
			receiveProfitWelfare() {
				this.receiveLoading = true;
				this.$api.request.receiveProfitWelfare({
					userUuid:this.userInfo.userUuid
				}, res => {
					this.receiveLoading = false;
					if (res.body.status.statusCode === '0') {
						this.$api.msg('领取成功');
						this.receiveGiftMessage = '';
						this.showGift = false;
						//标记新人福利已领取
						this.userInfo.profitWelfareReceived = true;
					} else {
						this.receiveGiftMessage = res.body.status.errorDesc
					}
				});
			},
			//轮播图
			// inquirySwiper() {
			// 	this.$api.request.slider({}, res => {
			// 		if (res.body.status.statusCode === '0') {
			// 			this.carouselList = res.body.data.swipers;
			// 			this.swiperLength = this.carouselList.length;
			// 			// this.titleNViewBackground = this.carouselList[0].background;
			// 		} else {
			// 			console.log(res.body.status.errorDesc);
			// 		}
			// 	});
			// },
			//首页数据
			homeData() {
				let that = this;
				this.$api.request.home({}, res => {
					if (res.body.status.statusCode === '0') {
						this.carouselList = res.body.data.swipers;
						this.swiperLength = this.carouselList.length;
						this.ads = res.body.data.ads;
						this.cates = [{cateName:'推荐'}].concat(res.body.data.cates);
						this.groupBuys = res.body.data.groupBuys;
						this.productGroups = res.body.data.groups;
						this.secKills = res.body.data.secKills;
						//用最近的秒杀商品作为秒杀倒计时数据
						if (this.secKills.length > 0) {
							for(var i=0; i<this.secKills.length; i++){
								var endTimeStr = this.secKills[i].endTime;
								var endTime = new Date(Date.parse(endTimeStr.replace(/-/g, "/")));
								var startTimeStr = this.secKills[i].startTime;
								var startTime = new Date(Date.parse(startTimeStr.replace(/-/g, "/")));
								if(endTime>=new Date()){	//未开始或者秒杀中
									var diff = that.$api.util.getCountDownTimes(this.secKills[i].startTime);
									this.secKillCountDown = {
										days: diff[0],
										hours: diff[1],
										minutes: diff[2],
										seconds: diff[3]
									}
									this.secKillFlag = startTime<=new Date()?'START':'';
									break;
								}
							}
							// var endTimeStr = this.secKills[0].endTime;
							// var endTime = new Date(Date.parse(endTimeStr.replace(/-/g, "/")));
							// if(endTime<new Date()){
							// 	this.secKillFlag = 'END';
							// }else{
							// 	var diff = that.$api.util.getCountDownTimes(this.secKills[0].startTime);
							// 	this.secKillCountDown = {
							// 		days: diff[0],
							// 		hours: diff[1],
							// 		minutes: diff[2],
							// 		seconds: diff[3]
							// 	}
							// 	}
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			searchRecommendProduct(){
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('RECOMMEND');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'recommend': true,
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize,
				};
				this.searchProduct(searchData);
			},
			searchProductByCate(productCateUuid){
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('PRODUCT_CATE');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'productCateUuid': productCateUuid,
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
						if(this.pageNo === 1)
							this.goodsList = goodsList;
						else
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
			//首页广告
			// inquiryAd() {
			// 	this.$api.request.advert({
			// 		location: '首页'
			// 	}, res => {
			// 		if (res.body.status.statusCode === '0') {
			// 			this.ads = res.body.data.ads;
			// 		} else {
			// 			console.log(res.body.status.errorDesc);
			// 		}
			// 	});
			// },
			//首页商品类目
			// inquiryProductCate() {
			// 	this.$api.request.homeProductCate({

			// 	}, res => {
			// 		if (res.body.status.statusCode === '0') {
			// 			this.cates = res.body.data.cates;
			// 		} else {
			// 			console.log(res.body.status.errorDesc);
			// 		}
			// 	});
			// },
			//首页秒杀商品
			// inquirySecKill() {
			// 	let that = this;
			// 	this.$api.request.secKill({

			// 	}, res => {
			// 		if (res.body.status.statusCode === '0') {
			// 			this.secKills = res.body.data.secKills;
			// 			//用最近的秒杀商品作为秒杀倒计时数据
			// 			if (this.secKills.length > 0) {
			// 				var diff = that.$api.util.getCountDownTimes(this.secKills[0].startTime);
			// 				this.secKillCountDown = {
			// 					days: diff[0],
			// 					hours: diff[1],
			// 					minutes: diff[2],
			// 					seconds: diff[3]
			// 				}
			// 			}
			// 		} else {
			// 			console.log(res.body.status.errorDesc);
			// 		}
			// 	});
			// },
			//首页团购商品
			// inquiryGroupBuy() {
			// 	let that = this;
			// 	this.$api.request.groupBuy({

			// 	}, res => {
			// 		if (res.body.status.statusCode === '0') {
			// 			this.groupBuys = res.body.data.groupBuys;
			// 		} else {
			// 			console.log(res.body.status.errorDesc);
			// 		}
			// 	});
			// },
			//首页首页商品组
			// inquiryProductGroup() {
			// 	let that = this;
			// 	this.$api.request.productGroup({

			// 	}, res => {
			// 		if (res.body.status.statusCode === '0') {
			// 			this.productGroups = res.body.data.groups;
			// 		} else {
			// 			console.log(res.body.status.errorDesc);
			// 		}
			// 	});
			// },
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
			},
			//轮播图链接
			navSwiper(item) {
				this.$api.util.navSwiper(item);
			},
			//广告链接
			navAD(item) {
				this.$api.util.navAD(item);
			},
			//商品列表页
			navToGroupPage(group) {
				let groupId = group.groupUuid;
				uni.navigateTo({
					url: '/pages/product/group?groupId=' + groupId
				})
			},
			//领券中心
			navCoupon(){
				uni.navigateTo({
					url: '/pages/coupon/list'
				})
			},
			//积分兑换
			navPoint(){
				uni.navigateTo({
					url: '/pages/point/product-list'
				})
			},
			//积分签到
			navSign(){
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}else{
					uni.navigateTo({
						url: '/pages/point/sign'
					})
				}
			},
			//客服中心
			navCustomerService(){
				uni.navigateTo({
					url: '/pages/help/help'
				})
			},
			//附近门店
			navMerchant(){
				uni.navigateTo({
					url: '/pages/merchant/list'
				})
			},
			//直播间
			navLiveRooms(){
				uni.navigateTo({
					url: '/pages/live/room-list'
				})
			},
			//限时秒杀
			navSecKill(){
				uni.navigateTo({
					url: '/pages/product/seckillList'
				})
			},
			//秒杀详情页
			navSecKillDetail(item){
				let id = item.secKillProductUuid;
				uni.navigateTo({
					url: `/pages/product/seckill?id=${id}`
				})
			},
			//精品团购
			navGroupBuy(){
				uni.navigateTo({
					url: '/pages/product/groupbuyList'
				})
			},
			//团购详情页
			navGroupBuyDetail(item){
				let id = item.groupBuyProductUuid;
				uni.navigateTo({
					url: `/pages/product/groupbuy?id=${id}`
				})
			},
			//商品列表页
			navToList(tid) {
				uni.navigateTo({
					url: '/pages/product/list?cateId=' + tid
				})
			},
			//导航至官方资讯页面
			navAnnouncement: function() {
				var announcement = JSON.stringify(this.announcement);
				announcement = encodeURIComponent(announcement);
				uni.navigateTo({
					url: '/pages/notice/notice?data=' + announcement
				});
			},
			//跳转到发现页
			navFind: function(){
				uni.switchTab({
					url:'/pages/content/index'
				})
			},
			//图文或音视频详情
			navToDetails(item){
				let url = '';
				if(item.articleType==='1' && item.linkType=='自定义内容')	
					url = '/pages/content/details?id='+item.articleUuid;
				if(item.articleType==='1' && item.linkType=='外部链接')
					url = '/pages/content/webView?src='+item.content;
				if(item.articleType==='2' || item.articleType==='3')
					url = '/pages/content/videoDetails?id='+item.articleUuid;
				uni.navigateTo({
					url:url
				})
			},
			//领取新人福利
			getNewMemberGift(){
				
			},
			// #ifdef MP||H5
			//小程序环境下点击搜索框
			navSearch(){
				uni.navigateTo({
					url: '/pages/index/search'
				})
			}
			// #endif
		},
		// #ifndef MP||H5
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			// this.$api.msg('点击了搜索框');
			uni.navigateTo({
				url: '/pages/index/search'
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				// this.$api.msg('点击了扫描');
				uni.scanCode({
					success:function(res){
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/content/webView?src=' + res.result
						})
					}
				})
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/list'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	/* #ifdef MP||H5 */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
			border-radius: 16upx 16upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	
	.grid-wrapper{
		background-color: #ffffff;
		position: relative;
		z-index: 5;
		border-radius: 16upx 16upx 0 0;
		margin-top: -20upx;
	}
	.grid-swiper{
		height: 344upx;
	}
	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	
	.grid-image{
		width: 80upx;
		height: 80upx;
	}
	.grid-text{
		color: $font-color-dark;
		font-size: $font-sm;
	}
	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	/* 分类 */
	.cate-section {
		display: -webkit-box;
		overflow-x: scroll;
		overflow-y:hidden;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;
		height: 100px;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			width: 25%;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 秒杀专区 */
	.seckill-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;

			.s-img {
				width: 140upx;
				height: 30upx;
			}

			.tip {
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}

			.countdown {
				margin: 0 20upx 0 40upx;
			}

			.timer {
				display: inline-block;
				width: 40upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0, 0, 0, .8);
			}
			.end{
				font-size: 12px;
				margin-left: 20px;
				background-color: #333;
				color: #fff;
				padding: 5px;
				border-radius: 5px;
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
				margin-left: auto;
			}
		}

		.floor-list {
			white-space: nowrap;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
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
	}

	.f-header {
		display: flex;
		align-items: center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}

	/* 团购楼层 */
	.group-section {
		background: #fff;

		.g-swiper {
			height: 650upx;
			padding-bottom: 30upx;
		}

		.g-swiper-item {
			width: 100%;
			padding: 0 30upx;
			display: flex;
		}

		image {
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.left {
			flex: 1.2;
			margin-right: 24upx;

			.t-box {
				padding-top: 20upx;
			}
		}

		.right {
			flex: 0.8;
			flex-direction: column-reverse;

			.t-box {
				padding-bottom: 20upx;
			}
		}

		.t-box {
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}

		.price {
			color: $uni-color-primary;
		}

		.m-price {
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}

		.pro-box {
			display: flex;
			align-items: center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}

		.progress-box {
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}

	/* 分类推荐楼层 */
	.hot-floor {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;

		.floor-img-box {
			width: 100%;
			height: 320upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255, 255, 255, .06) 30%, #f8f8f8);
			}
		}

		.floor-img {
			width: 100%;
			height: 100%;
		}

		.floor-list {
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top: -140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
			position: relative;
			z-index: 1;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}

		.more {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;

			text:first-child {
				margin-bottom: 4upx;
			}
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
		.merchant{
			margin-top: 20upx;
			color: $font-color-light;
		}
	}
	//新人福利
	.gift{
		margin: 30% 17% 10% 17%;
		padding: 15px;
		background-color: #B42A28;
		border-radius: 10px;
		.gift-title{
			color: #FCCB90;
			font-size: $font-base;
			font-weight: 700;
			text-align: center;
		}
		.gift-desc{
			color: #FCCB90;
			font-size: $font-sm;
			text-align: center;
		}
		.gift-image{
			margin-top: 10px;
			text-align: center;
			image{
				width: 75px;
				height: 75px;
			}
		}
			
		.gift-content{
			margin-top: 20px;
			.gift-item{
				background-color: #F5D5A2;
				padding:10px;
				margin-top: 10px;
				height: 35px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.gift-item-label{
					color:#C12E25;
					font-size: $font-sm;
				}
				.gift-item-value{
					text-align: center;
					button{
						background-color: #B42A28;
						color: #FBC78F;
						font-size: $font-base;
						height: 30px;
						line-height: 30px;
						.tip{
							&:after{
								content:'积分';
								font-size: $font-sm;
							}
						}
					}
				}	
			}
		}
		.gift-message{
			margin-top: 10px;
			color: #F8C180;
			font-size: $font-base;
			text-align: center;
		}
		.gift-action{
			margin-top: 30px;
			text-align: center;
			button{
				background-color: #F8C180;
				color: #7B4F15;
				height: 35px;
				line-height: 35px;
				font-size: $font-base;
				font-weight: 700;
			}
		}
	}
	.gift-close{
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
</style>
