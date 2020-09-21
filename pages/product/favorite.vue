<template>
	<view class="content">
		<empty v-if="loadingType!='loading'&&productList.length === 0"></empty>
		<view class="goods-list" v-if="productList.length > 0">
			<view 
				v-for="(item, index) in productList" :key="index"
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
			<view class="goods-item" style="background:none">
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				productList:[],
				loadingType: 'loading'
			};
		},
		
		onLoad(options){
			this.inquiryFavorite();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			//查询收藏的商品
			inquiryFavorite(){
				let postData = {
					userUuid: this.userInfo.userUuid
				};
				//加载中
				this.$api.request.inquiryCollectedProduct(postData, res => {
					this.productList = res.body.data.products;
					this.loadingType = 'noMore';
				},true);
			},
			//详情
			navToDetailPage(item){
				let id = item.productUuid;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}

	/* 商品列表 */
	.goods-list{
		position: absolute;
		top:0;
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
