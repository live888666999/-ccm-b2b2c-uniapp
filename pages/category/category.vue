<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in cateList" :key="item.productCateUuid" class="f-item b-b" :class="{active: item.productCateUuid === currentId}" @click="tabtap(item)">
				{{item.cateName}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
				<view class="ad" v-if="adList.length>0">
					<image @click="navAD(adList[0])" :src="adList[0].url" mode="scaleToFill"></image>
				</view>
				<view class="title" v-if="brandList.length>0">
					<text>热门品牌</text>
				</view>
				<view class="t-list" v-if="brandList.length>0">
					<view @click="navToBrand(titem.productBrandUuid)" class="t-item" v-for="titem in brandList"
					 :key="titem.productBrandUuid">
						<image :src="titem.logoUrl"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
				<view class="title" v-if="tlist.length>0">
					<text>常用分类</text>
				</view>
				<view class="t-list" v-if="tlist.length>0">
					<view @click="navToProduct(titem.productCateUuid)" class="t-item" v-for="titem in tlist"
					 :key="titem.productCateUuid">
						<image :src="titem.catePicUrl"></image>
						<text>{{titem.cateName}}</text>
					</view>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList:[],	//一级目录
				currentId: 1,
				tlist: [],	//二级目录
				adList:[]	,//广告
				brandList:[]	//品牌
			}
		},
		onLoad() {
			this.inquiryProductCate();
		},
		methods: {
			inquiryProductCate() {
				this.$api.request.productCate({}, res => {
					if (res.body.status.statusCode === '0') {
						this.cateList = res.body.data.cates;
						//默认选中
						if(this.cateList.length>0){
							this.tabtap(this.cateList[0]);
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//一级分类点击
			tabtap(item) {
				this.currentId = item.productCateUuid;
				this.tlist = item.childList;
				this.$api.request.productCateAddInfo({
					productCateUuid: item.productCateUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						var data = res.body.data;
						this.adList = data.adList;
						this.brandList = data.brandList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			navToBrand(tid) {
				uni.navigateTo({
					// url: '/pages/product/list?brandId='+tid+'&cateList='+escape(JSON.stringify(this.cateList))
					url: '/pages/product/list?brandId='+tid
				})
			},
			navToProduct(tid) {
				uni.navigateTo({
					// url: '/pages/product/list?cateId='+tid+'&cateList='+escape(JSON.stringify(this.cateList))
					url: '/pages/product/list?cateId='+tid
				})
			},
			navAD(item){
				this.$api.util.navAD(item);
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.ad {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
	
		image {
			width: 100%;
			height: 100%;
		}
	}
	.title{
		background: #fff;
		font-size: 26upx;
		color: $font-color-dark;
		font-weight: bold;
		margin-top: 10px;
		padding: 10px 0 0 10px;
	}   
	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;

		image {
			width: 140upx;
			height: 140upx;
			padding: 20upx;
		}
	}
</style>
