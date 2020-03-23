<template>
	
	<view style="width: 100%;background: #FFFFFF;position: absolute;left:0;bottom: 0;">

		<view class="share-pop">
			<view class="share-item">
				<button class="btn" open-type="share">
					<image src="../../static/image/share-f.png" mode=""></image>
					<button class="btn" open-type="share">微信好友</button>
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
// import { apiBaseUrl } from '@/config/config.js'
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
		shareType:{
			type:Number,
			default:1
		},
		//拼团id
		groupId:{
			type: String,
			default: ''
		},
		//拼团的团队id
		teamId:{
			type:Number,
			default:0
		}
	},
	data () {
		return {
			shareType: 0,
			providerList: [] // 分享通道 包含生成海报
		}
	},
	mounted () {
		
	},
	methods: {
		// 关闭弹出层
		close () {
			this.$emit('close')
		},
		// 生成海报
		createPoster () {
			let data = {
				productUuid: this.goodsId,
				productQrCodeUrl :this.shareHref
			}
			this.$api.request.goodsPoster(data, res => {
				if (res.body.status.statusCode === '0') {
					this.close();
					uni.navigateTo({
						url: '/pages/product/poster?poster='+ escape(res.body.data.posterUrl)
					})
				} else {
					this.$api.msg(res.body.status.errorDesc);
				}
			});
		},
		// 分享操作
		async share (e) {

		}
	}
}	
</script>

<style>
.share-pop{
	height: 300upx;
	width: 100%;
	display: flex;
}
.share-item{
	flex: 1;
	text-align: center;
	font-size: 26upx;
	color: #333;
	padding: 20upx 0;
}
.share-item image{
	width: 80upx;
	height: 80upx;
	margin: 20upx;
}	
.share-item .btn{
	line-height: 1;
	display: block;
	font-size: 26upx;
	background-color: #fff;
}
</style>
