<template>
	<view>
		<view class="evaluation-item" v-for="(orderProduct,productIndex) in orderProductList">
			<view class="evaluation-product">
				<image :src="orderProduct.productImageUrl" mode="aspectFill"></image>
				<text class="desc">{{orderProduct.productName}}}</text>
			</view>
			<view class="evaluation-star">
				<view class="desc">
					<text>商品描述相符</text>
				</view>
				<view class="star">
					<image class='star-item' @click="changeProductRank(productIndex,index)" v-for="(item,index) in orderProduct.stars"
					 :src="item? '../../static/temp/redstar.png': '../../static/temp/star.png'" />
				</view>
			</view>
			<view class="evaluation-comment">
				<textarea v-model="orderProduct.comment" placeholder="商品满足你的期望吗？说说它的优点和美中不足的地方吧" />
			</view>
			<view class="evaluation-image">
				<robby-image-upload v-model="orderProduct.imageUrlList" fileKeyName="files" :header="header" :formData="formData" :server-url="uploadUrl"></robby-image-upload>
			</view>
			
		</view>
		<button class="evaluate-btn" @click="evaluate">发表</button>

	</view>
</template>

<script>
	import robbyImageUpload from '../../components/robby-image-upload/robby-image-upload.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {robbyImageUpload},
		data() {
			return {
				orderNo: '',
				order: {},
				orderProductList: [],
				uploadUrl: this.$api.request.apiBaseUrl+'uploadSingleFile',
				formData:{},
				header: {}
			}
		},
		onLoad(option) {
			this.orderNo = option.orderNo;
			this.inquiryOrder(this.orderNo);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//查询订单
			inquiryOrder(orderNo) {
				this.$api.request.orderDetail({
					orderNo: orderNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.order = res.body.data;
						this.orderProductList = this.order.orderProductDTOList;
						this.initProductEvaluation(this.orderProductList);
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			initProductEvaluation(orderProductList) {
				let that = this;
				var initedProductList = [];
				orderProductList.forEach(function(val, index) {
					that.$set(val,'stars',[1, 1, 1, 1, 1]);//默认所有评价星点亮
					that.$set(val,'commentRank',5);//默认五星评价
					that.$set(val,'imageUrlList',[]);//评论图片列表
					initedProductList.push(val);
				})
				this.orderProductList = initedProductList;
			},
			changeProductRank(productIndex, starIndex) {
				var starArray = [0, 0, 0, 0, 0];
				for (var i = 0; i <= 4; i++) {
					if (i <= starIndex) {
						starArray.splice(i, 1, 1);
					} else {
						starArray.splice(i, 1, 0);
					}
				}
				this.$set(this.orderProductList[productIndex], 'stars', starArray);
				this.$set(this.orderProductList[productIndex], 'commentRank', starIndex + 1);
			},
			evaluate(){
				let that = this;
				let productCommentList = [];
				this.orderProductList.forEach(function(val,index){
					let productComment = {
						commentContent: val.comment,
						commentRank: val.commentRank,
						orderUuid: that.order.orderUuid,
						productUuid: val.productDTO.productUuid,
						imageUrlList: val.imageUrlList
					}
					productCommentList.push(productComment);
				})
				this.$api.request.commentOrder({
					actionType: 'ADD',
					commentList: productCommentList
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('订单评价成功');
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/order/order'
							})
						}, 1000);
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding: 0 30upx 40upx 30upx;
	}

	.evaluation-item {
		background: #fff;
		margin-top: 20upx;
		padding: 10upx;

		.evaluation-product {
			width: 100%;

			image {
				float: left;
				height: 70upx;
				width: 70upx;
			}

			.desc {
				display: flex;
				color: $font-color-dark;
				font-size: 28upx;
				height: 70upx;
				line-height: 70upx;
				white-space: 'nowrap';
				overflow: hidden;
				text-overflow: ellipsis;
				padding-left: 20upx;
			}
		}

		.evaluation-star {
			margin-top: 20upx;
			display: flex;

			.desc {
				color: $font-color-base;
				font-size: 30upx;
				height: 50upx;
				line-height: 50upx;
			}

			.star {
				padding-left: 20upx;

				.star-item {
					width: 50upx;
					height: 50upx;
				}
			}
		}
		.evaluation-comment{
			margin-top: 20upx;
			textarea{
				padding: 10upx;
				font-size: 28upx;
			}
		}
		.evaluation-image{
			display: flex;
			image{
				width: 100upx;
				height: 100upx;
				padding: 10upx;
			}
		}
	}
	.evaluate-btn {
		margin-bottom: 80upx;
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
