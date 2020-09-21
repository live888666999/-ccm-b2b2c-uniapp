<template>
	<view class="content">
		<!-- 订单列表 -->
		<view class="order-item">
			<view class="i-top b-b">
				<text class="time">订单号: {{order.orderNo}}</text>
			</view>

			<scroll-view v-if="order.orderProductDTOList&&order.orderProductDTOList.length > 1" class="goods-box" scroll-x>
				<view @click="navProductDetail(goodsItem)" v-for="(goodsItem, goodsIndex) in order.orderProductDTOList" :key="goodsIndex"
				 class="goods-item">
					<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view v-if="order.orderProductDTOList&&order.orderProductDTOList.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in order.orderProductDTOList"
			 :key="goodsIndex">
				<image class="goods-img" :src="goodsItem.productImageUrl" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.productName}}</text>
					<text class="attr-box">{{goodsItem.productSkuDesc}} x {{goodsItem.productUnit}}</text>
					<text class="price">{{goodsItem.actualAmount}}</text>
				</view>
			</view>

			<view class="price-box">
				共
				<text class="num">{{order.productUnit}}</text>
				件商品 实付款
				<text class="price">{{order.actualAmount}}</text>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">退款类型</text>
			<radio-group class="input" @change="radioChange">
				<label>
					<radio color="#fa436a" value="1" :checked="afterSaleType=='1'"/><text>仅退款</text>
				</label>
				<!-- 待发货状态只需要退款即可 -->
				<label v-if="order.orderStatus != '1'">
					<radio color="#fa436a" value="2" :checked="afterSaleType=='2'"/><text>退款退货</text>
				</label>
			</radio-group>
		</view>
		<view class="row">
			<text class="tit">退款金额</text>
			<input class="input" type="number" v-model="afterSaleAmount" placeholder="退款金额" placeholder-class="placeholder" />
		</view>
		<view class="aftersale-image">
			<text>上传凭证</text>
			<robby-image-upload v-model="imageUrlList" fileKeyName="files" :header="header" :formData="formData" :server-url="uploadUrl"></robby-image-upload>
		</view>
		<view class="aftersale-desc">
			<text>问题描述</text>
			<textarea v-model="afterSaleDescription" :maxlength="500" rows="5" placeholder="请您在此描述问题(最多500字)" placeholder-class="placeholder"></textarea>
		</view>
		<button class="add-btn" @click="apply" v-if="!editModel">申请退款</button>
		<button class="add-btn" @click="update" v-if="editModel">确认修改</button>
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
				editModel: false,	//编辑模式, 更新退款单
				saleNo: '',	//编辑模式,退款单号
				afterSale: {},//编辑模式,退款单	
				orderNo: '',	//订单号
				order: {
					orderStatus:'1'
				},	//订单信息
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
			this.orderNo = option.orderNo;
			this.saleNo = option.saleNo;
			if(this.orderNo)
				this.inquiryOrder(this.orderNo);
			if(this.saleNo){
				this.editModel = true;
				this.inquiryOrderAfterSale(this.saleNo);
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			radioChange(e) {
				debugger
				this.afterSaleType = e.detail.value;
			},
			//查询退款单
			inquiryOrderAfterSale(saleNo) {
				this.$api.request.afterSalesInfo({
					saleNo: saleNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.afterSale = res.body.data;
						//编辑模式默认申请时的内容
						this.imageUrlList = this.afterSale.imageUrlList;
						this.afterSaleAmount = this.afterSale.afterSaleAmount;
						this.afterSaleType = this.afterSale.afterSaleType;
						this.afterSaleDescription = this.afterSale.afterSaleDescription;
						this.order = this.afterSale.orderDTO;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//提交退款
			apply() {
				//校验退款金额
				if(this.afterSaleAmount<=0 || this.afterSaleAmount>this.order.actualAmount){
					this.$api.msg('退款金额有误');
					return;
				}
				//校验凭证
				if(this.imageUrlList.length===0){
					this.$api.msg('未上传凭证');
					return;
				}

				let options = {
					afterSaleType: this.afterSaleType,
					afterSaleAmount: this.afterSaleAmount,
					afterSaleDescription: this.afterSaleDescription,
					imageUrlList: this.imageUrlList,
					orderDTO:{
						orderNo: this.orderNo
					}
				}
				this.$api.request.applyAfterSale(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('退款申请已提交');
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/aftersale/list'
							});
						}, 1000)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			//更新退款单
			update() {
				//校验退款金额
				if(this.afterSaleAmount<=0 || this.afterSaleAmount>this.order.productAmount){
					this.$api.msg('退款金额有误');
					return;
				}
				//校验凭证
				if(this.imageUrlList.length===0){
					this.$api.msg('未上传凭证');
					return;
				}
			
				let options = {
					afterSaleType: this.afterSaleType,
					afterSaleAmount: this.afterSaleAmount,
					afterSaleDescription: this.afterSaleDescription,
					imageUrlList: this.imageUrlList,
					saleNo: this.saleNo
				}
				this.$api.request.updateAfterSale(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('退款单已修改');
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/aftersale/list'
							});
						}, 1000)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			
			},
			//查询订单
			inquiryOrder(orderNo) {
				this.$api.request.orderDetail({
					orderNo: orderNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.order = res.body.data;
						//已发货, 默认运费不退
						if(this.order.deliveryTime)
							this.afterSaleAmount = this.order.productAmount;
						//未发货, 默认运费要退
						else
							this.afterSaleAmount = this.order.actualAmount;
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

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
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

</style>
