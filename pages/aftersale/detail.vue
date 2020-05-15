<template>
	<view class="content">
		<!-- 订单列表 -->
		<view class="order-item">
			<view class="i-top b-b">
				<text class="time">售后单号: {{afterSale.saleNo}}</text>
				<text class="state" :style="{color:afterSale.statusColor}">{{afterSale.statusDesc}}</text>
			</view>

			<scroll-view v-if="afterSale.orderDTO&&afterSale.orderDTO.orderProductDTOList.length > 1" class="goods-box" scroll-x>
				<view @click="navProductDetail(goodsItem)" v-for="(goodsItem, goodsIndex) in afterSale.orderDTO.orderProductDTOList" :key="goodsIndex"
				 class="goods-item">
					<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view v-if="afterSale.orderDTO&&afterSale.orderDTO.orderProductDTOList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in afterSale.orderDTO.orderProductDTOList"
			 :key="goodsIndex">
				<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.productName}}</text>
					<text class="attr-box">{{goodsItem.productSkuDesc||''}} x {{goodsItem.productUnit}}</text>
					<text class="price">{{goodsItem.actualAmount}}</text>
				</view>
			</view>

			<view class="price-box">
				共
				<text class="num">{{afterSale.orderDTO.productUnit}}</text>
				件商品 实付款
				<text class="price">{{afterSale.orderDTO.productAmount}}</text>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">申请时间</text>
			<text class="input">{{afterSale.timeApplication}}</text>
		</view>
		<view class="row">
			<text class="tit">售后类型</text>
			<text class="input">{{afterSale.afterSaleTypeDesc}}</text>
		</view>
		<view class="row">
			<text class="tit">退款金额</text>
			<text class="price">{{afterSale.afterSaleAmount}}</text>
		</view>
		<view class="row" v-if="afterSale.afterSaleType==='2'">
			<text class="tit">退货物流</text>
			<text class="input">{{afterSale.courierName}}({{afterSale.courierNo}})</text>
		</view>
		<view class="aftersale-image">
			<text>凭证</text>
			<robby-image-upload :enableDel="false" :enableAdd="false" :enableDrag="false" v-model="imageUrlList" fileKeyName="files" :header="header" :formData="formData" :server-url="uploadUrl"></robby-image-upload>
		</view>
		<view class="aftersale-desc">
			<text>问题描述</text>
			<textarea class="input" disabled :value="afterSale.afterSaleDescription" rows="5" ></textarea>
		</view>
		<view class="aftersale-desc" v-if="afterSale.status==='2'">
			<text>退款失败原因</text>
			<textarea class="input" disabled :value="afterSale.rejectReason" rows="5" ></textarea>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import robbyImageUpload from '../../components/robby-image-upload/robby-image-upload.vue'
	export default {
		components: {robbyImageUpload},
		data() {
			return {
				saleNo: '',	//售后单号
				afterSale: {
					saleNo:''
				},	//售后单信息
				afterSaleType:'1',	//退款类型(1-仅退款, 2-退款退货)
				afterSaleAmount:0,	//退款金额
				afterSaleDescription:'',//退款描述
				formData:{},	//上传图片form
				header:{},	//上传图片header
				imageUrlList:[],	//上传图片列表
				uploadUrl: this.$api.request.apiBaseUrl+'uploadSingleFile'	//上传图片后台地址
			}
		},
		onLoad(option) {
			this.saleNo = option.id;
			this.inquiryOrderAfterSale(this.saleNo);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//查询售后单
			inquiryOrderAfterSale(saleNo) {
				this.$api.request.afterSalesInfo({
					saleNo: saleNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.afterSale = res.body.data;
						this.afterSale.afterSaleTypeDesc = this.translateAfterSaleType(this.afterSale.afterSaleType);
						this.afterSale.statusDesc = this.translateOrderAfterSaleStatus(this.afterSale.status).statusDesc;
						this.afterSale.statusColor = this.translateOrderAfterSaleStatus(this.afterSale.status).statusColor;
						this.imageUrlList = this.afterSale.imageUrlList;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			navProductDetail(item){
				uni.navigateTo({
					url: '/pages/product/product?id='+item.productDTO.productUuid
				})
			},
			edit(){
				uni.navigateTo({
					url: '/pages/aftersale/index?saleNo='+this.afterSale.saleNo
				})
			},
			translateAfterSaleType(afterSaleType) {
				let afterSaleTypeDesc = '';
				switch (afterSaleType) {
					case '1':
						{
						afterSaleTypeDesc = '仅退款';
						break;
						}
					case '2':
						{
						afterSaleTypeDesc = '退款退货';
						break;
						}
				}
				return afterSaleTypeDesc;
			},
			translateOrderAfterSaleStatus(status) {
				let statusDesc = '';
				let statusColor = '#303133';
				switch (status) {
					case '0':
						{
						statusDesc = '退款中';
						break;
						}
					case '1':
						{
						statusDesc = '待买家退货';
						break;
						}
					case '2':
						{
							statusDesc = '退款失败';
							statusColor = '#fa436a';
							break;
						}
					case '3':
						{
							statusDesc = '待确认收货';
							break;
						}
					case '9':
						{
							statusDesc = '退款成功';
							statusColor = '#5FCDA2';
							break;
						}
				}
				return {
					statusDesc: statusDesc,
					statusColor: statusColor
				};
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
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
	}

	.aftersale-image{
		background-color: #fff;
		font-size: 30upx;
		color: $font-color-dark;
		margin: 20upx 0;
		padding: 30upx;
	}
	.aftersale-desc{
		background-color: #fff;
		font-size: 30upx;
		color: $font-color-dark;
		margin: 20upx 0;
		padding: 30upx;
		textarea{
			margin-top: 20upx;
			font-size: $font-base;
			color: $font-color-base;
		}
	}
	.b-b{
		margin-top: 20upx;
	},
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			label{
				margin-left: 20upx;
			}
			
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

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #fa436a;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px #fa436a;
	}

	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
