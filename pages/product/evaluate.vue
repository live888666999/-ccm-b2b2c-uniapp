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

			/* 			text{
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
			} */
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
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

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

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
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
			}
		}

	}
</style>
