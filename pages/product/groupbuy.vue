<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item v-for="(item,index) in product.productVideos">
				    <video style="width:100%;height:100%" :show-fullscreen-btn="true" :autoplay="true" play-btn-position="center" :src="item.url" controls></video>
				 </swiper-item>
				<swiper-item class="swiper-item" v-for="(item,index) in product.productImages" :key="index">
					<view class="image-wrapper">
						<image :src="item.url" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 单规格商品 -->
		<view class="introduce-section" v-if="!product.skuEnabled">
			<text class="title"><u-tag :text="groupbuy.minUserCount+'人团'" mode="dark" size="mini" type="error" />{{product.productName}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{groupbuy.unitPrice}}</text>
				<text class="m-price">¥{{product.unitPrice}}</text>
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>库存: {{groupbuy.stock}}</text>
				<!-- <text>浏览量: 768</text> -->
			</view>
		</view>
		<!-- 多规格商品 -->
		<view class="introduce-section" v-if="product.skuEnabled">
			<text class="title"><u-tag :text="groupbuy.minUserCount+'人团'" mode="dark" size="mini" type="error" />{{product.productName}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{groupbuy.unitPrice}}</text>
				<text class="m-price">¥{{productSku.skuUnitPrice}}</text>
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>库存: {{groupbuy.stock}}</text>
				<!-- <text>浏览量: 768</text> -->
			</view>
		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec" v-if="product.skuEnabled">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="sku in productSku.skuAttrValueList">
						{{sku.skuAttrValue}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			
			<view class="c-row b-b">
				<text class="tit">数量</text>
				<view class="bz-list con">
					<uni-number-box class="step" :min="1" :max="productSku.skuTotalUnit" :value="unit"
					 :isMax="unit>=productSku.skuTotalUnit?true:false" :isMin="unit===1" @eventChange="numberChange" v-if="product.skuEnabled"></uni-number-box>
					<uni-number-box class="step" :min="1" :max="product.totalUnit" :value="unit"
					 :isMax="unit>=product.totalUnit?true:false" :isMin="unit===1" @eventChange="numberChange" v-if="!product.skuEnabled"></uni-number-box>
				</view>
			</view>
			<view class="c-row b-b" v-if="product.productFreightDTO">
				<text class="tit">快递</text>
				<view class="bz-list con">
					<text>{{product.productFreightDTO.name}}</text>
				</view>
			</view>
			<view v-if="product.attrList.length>0" class="c-row b-b" @click="togglePopup('bottom', 'attr')">
				<text class="tit">参数</text>
				<view class="bz-list con">
					<text>{{product.attrList[0].productAttrName}} {{product.attrList[0].productAttrValue}}...</text>
				</view>
				<view class="bz-list action">
					<text class="yticon icon-you"></text>
				</view>
			</view>
			
		</view>

		<u-cell-group class="pintuan-section" v-if="groupBuyList.length>0">
			<u-cell-item value="查看全部" @click="popupPinTuan()">
				<view slot="title">
					<view>
						{{groupBuyList.length}}人在拼团
					</view>
				</view>
			</u-cell-item>
			<u-cell-item :arrow="false" :use-label-slot="false" v-for="(item,index) in groupBuyList" v-if="index<2">
				<view slot="icon">
					<u-avatar style="height:30px;width:30px;display:flex;align-items: center;margin-right:5px" :src="item.avatarUrl"></u-avatar>
				</view>
				<view slot="title" style="margin-left: 20px;">
					<view style="font-size: 13px;">
						{{item.nickName}}, 还差<text style="color:#dd6161">{{item.remainingCount}}人</text>成团
					</view>
					<view class="">
						<u-count-down color="#606266" font-size="26" separator="zh" separator-size="26" separator-color="#606266" :show-days="false" :timestamp="item.timestamp"></u-count-down>
					</view>
				</view>
				<view slot="right-icon">
					<u-button :ripple="true"  :plain="true" type="error" size="mini" @click="joinGroup(item.groupBuyUuid)">去参团</u-button>
				</view>
			</u-cell-item>
		</u-cell-group>
		<u-popup v-model="showAllPinTuan" mode="center" :closeable="true" border-radius="14" width="80%" height="350px">
			<view class="pintuan-title">
				正在拼团
			</view>
			<u-cell-item :arrow="false" :use-label-slot="false" v-for="item in groupBuyList">
				<view slot="icon">
					<u-avatar style="height:30px;width:30px;display:flex;align-items: center;margin-right:5px" :src="item.avatarUrl"></u-avatar>
				</view>
				<view slot="title" style="margin-left: 20px;">
					<view style="font-size: 13px;">
						{{item.nickName}}, 还差<text style="color:#dd6161">{{item.remainingCount}}人</text>成团
					</view>
					<view class="">
						<u-count-down color="#606266" font-size="26" separator="zh" separator-size="26" separator-color="#606266" :show-days="false" :timestamp="item.timestamp"></u-count-down>
					</view>
				</view>
				<view slot="right-icon">
					<u-button :ripple="true"  :plain="true" type="error" size="mini" @click="joinGroup(item.groupBuyUuid)">去参团</u-button>
				</view>
			</u-cell-item>
		</u-popup>
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="image-wrapper">
				<image v-for="item in product.productDescImages" class="loaded" mode="widthFix" :src="item.url" />
			</view>
			
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
				<text class="action-btn no-border buy-now-btn" v-if="!groupId" @click="buy">我要开团</text>
				<text class="action-btn no-border buy-now-btn" v-if="groupId" @click="buy">立即参团</text>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image v-if="product.productMainImage" :src="product.productMainImage.url"></image>
					<view class="right">
						<text class="price">¥{{groupbuy.unitPrice}}</text>
						<text class="stock">库存：{{groupbuy.stock}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="sku in productSku.skuAttrValueList">
								{{sku.skuAttrValue}}
							</text>
						</view>
					</view>
				</view>
				<view class="attr-list">
					<view class="item-list">
						<view v-for="(childItem, childIndex) in product.skuList" :key="childIndex" class="item" :class="{selected: productSku.productSkuUuid === childItem.productSkuUuid}"
						 @click="selectSpec(childItem)">
							<text v-for="attrValue in childItem.skuAttrValueList">{{attrValue.skuAttrValue}}</text>
						</view>
					</view>
				</view>
				<button v-if="productSku.skuTotalUnit>0" class="btn" @click="toggleSpec">完成</button>
				<button v-if="productSku.skuTotalUnit===0" class="btn disabled" disabled="disabled">无库存</button>
			</view>
		</view>
		
		<!-- 底部商品参数弹窗 -->
		<uni-popup ref="showattr" :type="type">
			<view class="c-list pb50">
				<view class="c-row b-b" v-for="item in product.attrList">
					<text class="tit">{{item.productAttrName}}</text>
					<view class="bz-list con">
						<text>{{item.productAttrValue}}</text>
					</view>
				</view>
			</view>
			<button class="close-btn" @click="closeAttr">关闭</button>
		</uni-popup>
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import uniNumberBox from '@/components/uni-number-box.vue'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniNumberBox,
			uniBadge,
			uniPopup,
			uniCountdown
		},
		data() {
			return {
				id: '',
				groupId:'',	//参团ID, 如果该值不为空表明是参团而不是开团
				unit: 1,
				groupbuy:{
					stock: 0,
					minUserCount: 1
				},
				groupBuyCountDown:'',	//倒计时
				actionFlag:false,	//是否开始团购标记
				endFlag:false,	//是否已经结束
				interval:null,	//定时器检测团购是否开始或者结束
				product: {
					unitPrice:0,
					unitPriceStandard:0,
					soldUnit: 0,
					totalUnit: 0,
					productMainImage:{},
					productImages:[],
					attrList:[]
				},
				productSku: {},
				cartNum: 0,
				// productSkuAttrValueMap:null,
				isProductCollected: false,
				specClass: 'none',
				specSelected: [],
				favorite: true,
				type: '',
				commentList: [],
				totalComment: 0,
				stars: [0, 0, 0, 0, 0],
				
				groupBuyList:[],
				subTitle: '查看全部',
				showAllPinTuan:false
			};
		},
		onLoad(options) {
			let id = options.id;
			let scene = decodeURIComponent(options.scene);	//带参数微信小程序码
			console.log(scene);
			if(scene && scene != 'undefined'){
				let strArray = scene.split('-');
				this.groupId = strArray[0];
				this.id = strArray[1];
				this.inquiryGroupBuy(this.id);
				this.inquiryGroupBuyByProduct(this.id);
			}else if(id){
				this.id = id;
				this.groupId = options.groupId;
				this.inquiryGroupBuy(this.id);
				this.inquiryGroupBuyByProduct(this.id);
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			shareHref() {
				let pages = getCurrentPages()
				let page = pages[pages.length - 1]
				// #ifdef H5 || MP-WEIXIN || APP-PLUS || APP-PLUS-NVUE
				return this.$api.request.apiBaseUrl.replace("/b2c/rest/","") + '/#/' + page.route + '?id=' + this.product.productUuid;
				// #endif

				// #ifdef MP-ALIPAY
				return this.$api.request.apiBaseUrl.replace("/b2c/rest/","") + '/#/' + page.__proto__.route + '?id=' + this.product
					.productUuid;
				// #endif
			}
		},
		methods: {
			...mapMutations(['login', 'addFootPrint']),

			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break

					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			closeShare() {
				this.$refs.showshare.close();
			},
			closeAttr() {
				this.$refs.showattr.close();
			},
			cancel(type) {
				this.$refs.showshare.close();
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			popupPinTuan(){
				//查看全部拼团, 重置倒计时的数值
				var groupBuyList = [];
				this.groupBuyList.forEach(function(val,index){
					var endTimeStr = val.endTime;
					var endTime = new Date(Date.parse(endTimeStr.replace(/-/g, "/")));
					val.timestamp = (endTime.getTime()-new Date().getTime())/1000;
					groupBuyList.push(val);
				})
				this.groupBuyList = groupBuyList;
				this.showAllPinTuan = true;
			},
			//查询团购商品
			inquiryGroupBuy(id) {
				let postData = {
					groupBuyProductUuid: id
				}
				this.$api.request.groupBuy(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.groupbuy = res.body.data;
						this.product = this.groupbuy.productDTO;
						if (this.product.skuEnabled) {
							this.productSku = this.product.skuList[0];
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//查询商品正在进行的拼团
			inquiryGroupBuyByProduct(groupBuyProductUuid) {
				let postData = {
					groupBuyProductUuid: groupBuyProductUuid
				}
				this.$api.request.getGroupBuyByProduct(postData, res => {
					if (res.body.status.statusCode === '0') {
						var groupBuys = res.body.data.groupBuys;
						var groupBuyList = [];
						groupBuys.forEach(function(val,index){
							var endTimeStr = val.endTime;
							var endTime = new Date(Date.parse(endTimeStr.replace(/-/g, "/")));
							val.timestamp = (endTime.getTime()-new Date().getTime())/1000;
							val.avatarUrl = val.ownerDTO.photoUrl;
							val.nickName = val.ownerDTO.name;
							val.remainingCount = val.minUserCount - val.joinUserCount;
							groupBuyList.push(val);
						})
						this.groupBuyList = groupBuyList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			numberChange(e) {
				this.unit = e.number;
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(productSku) {
				this.productSku = productSku;

			},
			joinGroup(groupBuyUuid){
				var url = '/pages/order/createGroupBuyOrder?groupBuyId='+groupBuyUuid+'&groupBuyProductId='+this.id+'&productId='+this.product.productUuid+'&productSkuId='+this.productSku.productSkuUuid+'&unit='+this.unit;
				if(this.userInfo && this.userInfo.userUuid){
					uni.navigateTo({
						url: url
					})
				}else{
					uni.navigateTo({
						url: '/pages/public/login?to='+escape(url) 
					})
				}
			},
			//立即购买
			buy() {
				var url = '/pages/order/createGroupBuyOrder?groupBuyId='+this.groupId+'&groupBuyProductId='+this.id+'&productId='+this.product.productUuid+'&productSkuId='+this.productSku.productSkuUuid+'&unit='+this.unit;
				if(this.userInfo && this.userInfo.userUuid){
					uni.navigateTo({
						url: url
					})
				}else{
					uni.navigateTo({
						url: '/pages/public/login?to='+escape(url) 
					})
				}
			},
			navTo(url) {
				uni.navigateTo({
					url: url
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
			},
			stopPrevent() {}
		},
		onUnload(){
			
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		width:100%;
		position: relative;

		swiper {
			height: 100%;
			width:100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 200upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}
		
		.action{
			flex: 1;
			color: $font-color-dark;
			
			.selected-text {
				margin-right: 10upx;
			}
			
			text-align: right;
		}

		.bz-list {
			//height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	.pintuan-section{
		margin-top:8px;
	}
	
	.pintuan-title{
		padding:10px;
		text-align: center;
		color: #333;
		font-weight: bold;
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}
	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;
		.a-t {
			display: flex;
			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}
			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text {
					margin-right: 10upx;
				}
			}
		}
		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}

			.disabled {
				background-color: $font-color-disabled;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 80upx;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		background-color: $base-color;

		.uni-badge {
			position: absolute;
			top: -0.1em;
			left: 7em;
			background: $uni-color-error;
			color: #fff;
		}

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base;
			padding: 0;
			border-radius: 0;
			background: transparent;
			color: #fff;
		}

	}
	.pb50{
		padding-bottom: 100upx;
	}
	.close-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
