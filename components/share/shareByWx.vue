<template>

	<view style="width: 100%;height: 300upx;background: #FFFFFF;position: absolute;left:0;bottom: 0;">

		<view class="share-pop">
			<view class="share-item">
				<button open-type="share" class="share-btn">
					<image src="../../static/image/ic-wechat.png" mode=""></image>
					<view class="desc">
						微信好友
					</view>
				</button>

			</view>
			<view class="share-item" @click="createPoster()">
				<image src="../../static/image/poster.png" mode=""></image>
				<view class="">生成二维码</view>
			</view>
		</view>
		<view class="button-bottom">
			<button class="btn btn-w btn-square" @click="close()">关闭</button>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		props: {
			// 商品id
			goodsId: {
				type: String,
				default: ''
			},
			// 分享的图片
			shareImg: {
				type: String,
				default: ''
			},
			// 分享标题
			shareTitle: {
				type: String,
				default: ''
			},
			// 分享内容
			shareContent: {
				type: String,
				default: ''
			},
			// 分享链接
			shareHref: {
				type: String,
				default: ''
			},
			//分享类型
			shareType: {
				type: Number,
				default: 1
			},
			//用户id
			userId: {
				type: String,
				default: ''
			},
			//拼团id
			groupId: {
				type: String,
				default: ''
			},
			//拼团的团队id
			teamId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				providerList: [] // 分享通道 包含生成海报
			}
		},
		mounted() {
			
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'applicationConfig'])
		},
		methods: {
			// 关闭弹出层
			close() {
				this.$emit('close')
			},
			// 生成海报
			createPoster() {
				let data = {
					shareType: this.shareType,
					productUuid: this.goodsId,
					groupBuyUuid: this.groupId,
					userUuid: this.userId,
					shareHref: this.shareHref
				}
				this.$api.request.goodsPoster(data, res => {
					if (res.body.status.statusCode === '0') {
						this.close();
						uni.navigateTo({
							url: '/pages/product/poster?poster=' + escape(res.body.data.posterUrl)
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			}
		}
	}
</script>

<style>
	.share-pop {
		height: 300upx;
		width: 100%;
		display: flex;
	}

	.share-item {
		flex: 1;
		text-align: center;
		font-size: 26upx;
		color: #333;
		padding: 20upx 0;
	}

	.share-item image {
		width: 80upx;
		height: 80upx;
		margin: 20upx;
	}

	.share-item .btn {
		line-height: 1;
		display: block;
		font-size: 26upx;
		background-color: #fff;
	}

	.share-item .desc {
		color: #333;
		font-size: 13px;
		margin-top: -20px;
	}

	.share-btn {
		background-color: #fff;
		height: auto;
	}

	.share-btn::after {
		border: none;
		outlin: none;
	}
</style>
