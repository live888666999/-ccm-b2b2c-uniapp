<template>
	<view class="container">
		<!-- 评价 -->
		<view class="eva-section">
			<view class="eva-section-item" v-for="comment in commentList">
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
						<text class="con">{{comment.commentContent}}</text>
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
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				id: '',
				commentList: [],
				totalComment: 0,
				stars:[0,0,0,0,0],
				pageNo: 1,
				pageSize: 10,
				loadingType:''
			};
		},
		onLoad(options) {

			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.id;
			if (id) {
				this.id = id;
				//商品评论
				this.searchProductComment(id);
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				this.searchProductComment(this.id);
			}
		},
		methods: {
			...mapMutations(['login', 'addFootPrint']),
			searchProductComment(id) {
				let postData = {
					keyArray: ['PRODUCTUUID'],
					productUuid: id,
					startIndex: (this.pageNo-1)*this.pageSize,
					pageSize: this.pageSize
				}
				this.loadingType = "loading";
				this.$api.request.goodsComment(postData, res => {
					if (res.body.status.statusCode === '0') {
						var commentList = res.body.data.commentList;
						this.commentList = this.commentList.concat(commentList);
						this.totalComment = res.body.data.total;
						if(this.commentList.length>=this.totalComment){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			previewImage(url){
				var urls = [];
				urls.push(url);
				uni.previewImage({
					current: url,
					indicator: "number",
					loop: "true",
					urls:urls
				})
			}
		},

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
	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 0 30upx 20upx 30upx;
		.eva-section-item{
			background-color:#fff;
			margin-top: 20upx;
			padding: 10upx;
		}

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
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
			.star{
				display: flex;
				image{
					width:40upx;
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
	.eva-image{
		display: flex;
		image{
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
		}
	}
	.eva-reply{
		background-color: #F8F8F8;
		color: $font-color-light;
		font-size: 28upx;
		padding: 10upx;
		margin: 20upx 0;
		border-radius: 20upx;
	}

</style>
