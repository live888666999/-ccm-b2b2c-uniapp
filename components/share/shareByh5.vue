<template>
	<view style="width: 100%;height: 300upx;background: #FFFFFF;position: absolute;left:0;bottom: 0;">
		<view class="share-pop">
			<view class="share-item" @click="copyUrl()">
				<image src="../../static/image/share-f.png" mode=""></image>
				<view class="">复制链接</view>
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
		//用户id
		userId:{
			type: String,
			default: ''
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
	mounted () {
		/**
		 * 
		 * H5端分享两种 (微信浏览器内引导用户去分享, 其他浏览器)
		 * 
		 */
	},
	methods: {
		// 关闭弹出层
		close () {
			this.$emit('close')
		},
		// 生成海报
		createPoster () {
			let data = {
				shareType: this.shareType,
				productUuid: this.goodsId,
				groupBuyUuid: this.groupId,
				userUuid: this.userId,
				shareHref :this.shareHref
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
		copyUrl () {
			let that = this;
			uni.setClipboardData({
				data:this.shareHref,
				success:function(data){
					that.$api.msg('复制成功');
				}, 
				fail:function(err){
					that.$api.msg('URL');
				}
			})
			// let data = {
			// 	id: this.goodsId,
			// 	type: this.shareType,
			// 	group_id :this.groupId,
			// 	team_id :this.teamId,
			// }
			// let _this = this;
			// _this.$api.createShareUrl(data, res => {
			// 	if(res.status) {
			// 		//todo::要复制的内容是 res.data
			// 		uni.setClipboardData({
			// 			data:res.data,
			// 			success:function(data){
			// 				_this.$common.successToShow('复制成功');
			// 			}, 
			// 			fail:function(err){
			// 				_this.$common.errorToShow('复制分享URL失败');
			// 			}
			// 		})
			// 	} else {
			// 		_this.$common.errorToShow('复制分享URL失败');
			// 	}
			// });
		},
		// 分享操作
		share () {
			// h5分享 判断是否是微信浏览器 引导用户完成分享操作
			
			// 其他浏览器的分享 
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
