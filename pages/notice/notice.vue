<template>
	<view class="content">
		<view v:if="notices.length>0">
		<view bindtap="navRickText(item)" class="list_i" v-for="item in notices" >
		  <view class="list_ii">{{item.publishTime}}</view>
		  <view class="list_ick" @click="navContent(item)">
		    <view>{{item.title}}</view>
			<view style="margin-top:20upx" v-if="item.articleType == '5'">
				<image :src="item.coverImageUrl" mode="aspectFill"></image>
			</view>
<!-- 		    <view class="list_il"> {{item.title}}</view> -->
		  </view>
		</view>
		</view>
		<view class="empty" v-if="notices.length===0">
		  <view mode="widthFix" class="noce">
		    <text>——暂无信息——</text>
		  </view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniBadge
		},
		data() {
			return {
				notices: []
			}
		},
		onLoad(options) {
			this.notices = JSON.parse(decodeURIComponent(options.data));
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			navContent(item){
				this.$api.request.inquiryArticle({articleUuid: item.articleUuid}, function(res) {
					if (res.body.status.statusCode === '0') {
						var article = res.body.data;
						if(article.linkType==='自定义内容')
							uni.navigateTo({
								url: '/pages/content/richText?content=' + escape(JSON.stringify(article.content))
							})
						else if(article.linkType==='外部链接')
							uni.navigateTo({
								url: '/pages/content/webView?src=' + article.content
							})
					}
				},true)
				//设置已读
				this.markRead(item.articleUuid);
			},
			markRead(articleUuid){
				var readNotice = uni.getStorageSync('readNotice');
				if (!readNotice) {
					readNotice = [];
				}
				var flag = false;	//已读列表是否已经存在该通知
				for (var key in readNotice) {
					if (readNotice[key] == articleUuid) {
						flag = true;
					}
				}
				if(!flag){
					readNotice.push(articleUuid);
				}
				uni.setStorageSync('readNotice', readNotice);
			}
		}
	}
</script>

<style lang='scss'>
	page {
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
	}
	.empty{
		margin-top: 40upx;
		text-align: center;
		color: $font-color-light;
		font-size: $font-base;
	}
	.list_i {
		border-radius: 10px;
		border-radius: 20upx;
		margin: 0 30upx 30upx 30upx;
	}
	
	.list_ii {
		display: inline-block;
		width: 100%;
		border-radius: 5px;
		text-align: center;
		font-size: 24upx;
		color: rgb(192, 192, 192);
		margin-top: 20px;
		margin-bottom: 10px;
	}
	
	.opp {
		font-size: 15px;
		color: #999999;
		text-align: center;
		padding-top: 15px;
	}
	
	.list_ick {
		font-size: $font-lg;
		color: $font-color-dark;
		background-color: #fff;
		padding: 20upx;
		border-radius: 20upx;
	}
	
	.list_il {
		font-size: $font-base;
		color: $font-color-light;
		margin-top: 20upx;
	}
</style>
