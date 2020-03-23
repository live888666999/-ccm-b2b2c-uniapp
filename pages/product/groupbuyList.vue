<template>
	<view class="content">
		<view class="group">
			<image src="https://ccmao-b2c.oss-cn-shenzhen.aliyuncs.com/groupbuy.png" mode="aspectFill"></image>
		</view>
		
		<view class="goods-list">
			<view class="header">
				<image src="../../static/image/groupbuy_icon.png" mode="aspectFill"></image><text>超级团购</text>
			</view>
			<view 
				v-for="(item, index) in groupBuys" :key="index"
				class="goods-item"
			>
				<view class="image-wrapper">
					<image v-if="item.productDTO.productMainImage" :src="item.productDTO.productMainImage.url" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.productDTO.productName}}</text>
				<view class="price-box">
					<text class="price">{{item.unitPrice}}<text class="standard">￥{{item.productDTO.unitPrice}}</text></text>
					<text class="note">{{item.minUserCount}}人成团</text>
					<text class="action" @click="navGroupBuy(item)">去开团</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	export default {
		components: {
			uniLoadMore,
			uniCountdown
		},
		data() {
			return {
				groupBuys:[]
			};
		},
		
		onLoad(options){
			this.inquiryGroupBuy();
		},
		methods: {
			//秒杀商品
			inquiryGroupBuy() {
				let that = this;
				this.$api.request.groupBuy({
			
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.groupBuys = res.body.data.groupBuys;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//秒杀详情页
			navGroupBuy(item){
				let id = item.groupBuyProductUuid;
				uni.navigateTo({
					url: `/pages/product/groupbuy?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}

	.group{
		height: 240px;
		image{
			width: 100%;
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $base-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 商品列表 */
	.goods-list{
		position: absolute;
		top:200px;
		left:0;
		right:0;
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: linear-gradient(to bottom, #ffffff 0%,#f8f8f8 100%);
		border-radius: 20upx;
		.header{
			width: 100%;
			text-align: center;
			padding: 20upx 0;
			font-size: $font-lg;
			font-color: $font-color-dark;
			image{
				vertical-align: middle;
				height: 60upx;
				width:60upx;
			}
			text{
				padding-left:10upx
			}
		}
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 100%;
			padding: 20upx;
			background-color: #fff;
			margin: 10upx 0;
			border-radius: 20upx;
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
			padding: 10upx 10upx 10upx 0;
			font-size: 24upx;
			color: $font-color-light;
			.note{
				color: $font-color-base;
			}
			.action{
				background-color: $base-color;
				border-radius: 10upx;
				box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
				color: #fff;
				padding: 10upx;
				font-size: $font-base;
			}
			.end{
				background-color: #D6D6D6;
				border-radius: 10upx;
				color: #fff;
				padding: 10upx;
				font-size: $font-base;
			}
			.standard{
				color: $font-color-base;
				text-decoration: line-through;
				margin-left: 10upx;
			}
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
	

</style>
