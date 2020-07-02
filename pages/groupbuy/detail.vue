<template>
	<view class="content">
		
		<view class="photo-wrapper">
			<view v-for="item in groupBuy.groupBuyUserList">
				<!-- <image :src="item.userDTO.photoUrl" ></image> -->
				<u-avatar :src="item.userDTO.photoUrl"></u-avatar>
				<!-- <uni-badge type="primary" v-if="item.owner" text="团长"></uni-badge> -->
			</view>
		</view>
		<view class="desc-wrapper">
			<view v-if="groupBuy.status=='1'">
				还差{{groupBuy.groupBuyProductDTO.minUserCount - groupBuy.groupBuyUserList.length}}人拼团成功, 快去邀请好友吧!
			</view>
			<view v-if="groupBuy.status=='2'">
				拼团失败, 未在有效期邀请到足够朋友参加!
			</view>
			<view v-if="groupBuy.status=='3'">
				拼团成功, 您还可以看看其他拼团商品!
			</view>
		</view>
		<view class="btn-group">
			<view @click="togglePopup('bottom', 'share')" v-if="groupBuy.status=='1'" url="/pages/order/order?state=0" open-type="redirect" class="mix-btn">邀请好友拼团</view>
			<navigator v-if="groupBuy.status=='2'" url="/pages/product/groupbuyList" class="mix-btn">查看更多拼团商品</navigator>
			<navigator v-if="groupBuy.status=='3'" url="/pages/product/groupbuyList" class="mix-btn">查看更多拼团商品</navigator>
			<view class="note" v-if="groupBuy.status=='1'">
				<uni-countdown class="countdown" :day="groupBuy.groupBuyCountDown.days" :hour="groupBuy.groupBuyCountDown.hours" :minute="groupBuy.groupBuyCountDown.minutes"
				 :second="groupBuy.groupBuyCountDown.seconds" color="#FFFFFF" background-color="#333333" />
			</view>
			<view class="note" v-if="groupBuy.status=='2'">{{groupBuy.endTime}} 拼团结束</view>
			<view class="note" v-if="groupBuy.status=='3'">{{groupBuy.endTime}} 拼团结束</view>
		</view>
		
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showshare" :type="type" @change="change">
			<!-- #ifdef H5 -->
			<shareByH5 :shareType='4' :groupId="groupBuy.groupBuyUuid" :shareHref="shareHref" @close="closeShare()"></shareByH5>
			<!-- #endif -->
		
			<!-- #ifdef MP-WEIXIN -->
			<shareByWx :shareType='4' :groupId="groupBuy.groupBuyUuid" :shareHref="shareHref" @close="closeShare()"></shareByWx>
			<!-- #endif -->
		
			<!-- #ifdef MP-ALIPAY -->
			<shareByAli :shareType='4' :groupId="groupBuy.groupBuyUuid" :shareHref="shareHref" @close="closeShare()"></shareByAli>
			<!-- #endif -->
		
			<!-- #ifdef APP-PLUS -->
			<shareByApp :shareType='4' :groupId="groupBuy.groupBuyUuid" :shareHref="shareHref" @close="closeShare()"></shareByApp>
			<!-- #endif -->
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	// #ifdef H5
	import shareByH5 from '@/components/share/shareByh5.vue'
	// #endif
	// #ifdef MP-WEIXIN
	import shareByWx from '@/components/share/shareByWx.vue'
	// #endif
	// #ifdef MP-ALIPAY
	import shareByAli from '@/components/share/shareByAli.vue'
	// #endif
	// #ifdef APP-PLUS
	import shareByApp from '@/components/share/shareByApp.vue'
	// #endif
	export default {
		components: {
			uniCountdown,
			uniBadge,
			uniPopup,
			// #ifdef H5
			shareByH5,
			// #endif
			
			// #ifdef MP-WEIXIN
			shareByWx,
			// #endif
			
			// #ifdef MP-ALIPAY
			shareByAli,
			// #endif
			
			// #ifdef APP-PLUS
			shareByApp,
			// #endif
		},
		data() {
			return {
				groupBuyUuid:'',
				groupBuy:{},
				type: '',
				shareHref:''
			}
		},
		onLoad(options) {
			this.groupBuyUuid = options.id;
			this.inquiryGroupBuy(this.groupBuyUuid);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onShareAppMessage(res) {
		    return {
		      title: this.groupBuy.groupBuyProductDTO.productDTO.productName,
			  imageUrl:this.groupBuy.groupBuyProductDTO.productDTO.productMainImage.url,
		      path: '/pages/product/groupbuy?id=' + this.groupBuy.groupBuyProductDTO.groupBuyProductUuid+'&groupId='+this.groupBuy.groupBuyUuid
		    }
		 },
		methods: {
			inquiryGroupBuy(id) {
				let postData = {
					groupBuyUuid: id
				};
				this.$api.request.groupBuyDetail(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.groupBuy = res.body.data;
						var diff = this.$api.util.getCountDownTimes(this.groupBuy.endTime);
						var groupBuyCountDown = {
							days: diff[0],
							hours: diff[1],
							minutes: diff[2],
							seconds: diff[3]
						}
						this.groupBuy.groupBuyCountDown = groupBuyCountDown;
						this.shareHref = this.$api.request.apiBaseUrl.replace("/b2b2c/rest/","") + '/#/pages/product/groupbuy?id=' + this.groupBuy.groupBuyProductDTO.groupBuyProductUuid+'&groupId='+this.groupBuy.groupBuyUuid;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, true);
			},
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
			
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			closeShare() {
				this.$refs.showshare.close();
			},
			change(e) {
				console.log('是否打开:' + e.show)
			}
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 40upx;
		.note{
			color: $font-color-light;
			font-size: $font-base;
			text-align: center;
			margin-top: 20upx;
		}
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
	.photo-wrapper{
		margin-top: 80upx;
		display: flex;
		image{
			width: 80upx;
			height: 80upx;
		}
	}
	.desc-wrapper{
		font-size: $font-lg;
		color: $font-color-dark;
		text-align: center;
		margin-top: 80upx;
	}
	.uni-badge {
		margin-left: -40upx;
		position: relative;
	}
</style>
