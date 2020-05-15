<template>
	<view class="content">
		<view class="tj-sction">
			<view class="tj-item" @click="navTo('/pages/user/invited')">
				<text class="num">{{nextLevelData.directUserCount}}</text>
				<text>直邀会员</text>
			</view>
			<view class="tj-item">
				<text class="num">{{nextLevelData.teamUserCount}}</text>
				<text>团队会员</text>
			</view>
			<view class="tj-item">
				<text class="num">￥{{nextLevelData.directSaleAmount}}</text>
				<text>个人销售额</text>
			</view>
			<view class="tj-item">
				<text class="num">￥{{nextLevelData.teamSaleAmount}}</text>
				<text>团队销售额</text>
			</view>
		</view>
		<view>
			<view class="arc-title" v-if="nextLevelData.userLevelDTO">
				<!-- <uni-tag text="目标会员等级" type="default"> -->
					目标会员等级 - {{nextLevelData.userLevelDTO.name}}
				<!-- </uni-tag> -->
			</view>
			<view class="arc-columns">
				<view v-if="nextLevelData.userLevelDTO && nextLevelData.userLevelDTO.requiredByUser">
					<view class="arc-bg-white arc-title-bar arc-common-mt">
						<view class="arc-title-dot-light">直邀会员</view>
					</view>
					<view class="arc-charts">
						<!--#ifdef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
						<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas> -->
						<!--#endif-->
						<!--#ifndef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts" style="margin-left: 100upx;"></canvas>
						<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts" style="margin-left: 400upx;"></canvas> -->
						<!--#endif-->
						<progress :percent="nextLevelData.userDirectRating" show-info stroke-width="15" active border-radius="5" font-size="12"/>
					</view>
				</view>
				<view v-if="nextLevelData.userLevelDTO&&nextLevelData.userLevelDTO.requiredByUser">
					<view class="arc-bg-white arc-title-bar arc-common-mt">
						<view class="arc-title-dot-light">团队会员</view>
					</view>
					<view class="arc-charts">
						<!--#ifdef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
						<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas> -->
						<!--#endif-->
						<!--#ifndef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts" style="margin-left: 100upx;"></canvas>
						<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts" style="margin-left: 400upx;"></canvas> -->
						<!--#endif-->
						<progress :percent="nextLevelData.userTeamRating" show-info stroke-width="15" active border-radius="5" font-size="12"/>
					</view>
				</view>
				<view v-if="nextLevelData.userLevelDTO&&nextLevelData.userLevelDTO.requiredByAmount">
					<view class="arc-bg-white arc-title-bar arc-common-mt">
						<view class="arc-title-dot-light">个人销售额</view>
					</view>
					<view class="arc-charts">
						<!--#ifdef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
						<canvas canvas-id="canvasArcbar4" id="canvasArcbar4" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas> -->
						<!--#endif-->
						<!--#ifndef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts" style="margin-left: 100upx;"></canvas>
						<canvas canvas-id="canvasArcbar4" id="canvasArcbar4" class="charts" style="margin-left: 400upx;"></canvas> -->
						<!--#endif-->
						<progress :percent="nextLevelData.amountDirectRating" show-info stroke-width="15" active border-radius="5" font-size="12"/>
						
					</view>
				</view>
				<view v-if="nextLevelData.userLevelDTO&&nextLevelData.userLevelDTO.requiredByAmount">
					<view class="arc-bg-white arc-title-bar arc-common-mt">
						<view class="arc-title-dot-light">团队销售额</view>
					</view>
					<view class="arc-charts">
						<!--#ifdef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas>
						<canvas canvas-id="canvasArcbar4" id="canvasArcbar4" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth3-cWidth3*(pixelRatio-1)/2+'px','margin-top':-cHeight3*(pixelRatio-1)/2+'px'}"></canvas> -->
						<!--#endif-->
						<!--#ifndef MP-ALIPAY -->
						<!-- <canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts" style="margin-left: 100upx;"></canvas>
						<canvas canvas-id="canvasArcbar4" id="canvasArcbar4" class="charts" style="margin-left: 400upx;"></canvas> -->
						<!--#endif-->
						
						<progress :percent="nextLevelData.amountTeamRating" show-info stroke-width="15" active border-radius="5" font-size="12"/>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var _self;
	var canvasObj = {};
	export default {
		components: {
			uniTag
		},
		data() {
			return {
				nextLevelData: {
					directUserCount:0,
					teamUserCount:0,
					directSaleAmount:0.00,
					teamSaleAmount:0.00,
					userDirectRating:0,
					teamDirectRating:0,
					amountDirectRating:0,
					amountTeamRating:0,
				},
				cWidth: '', //圆弧进度图
				cHeight: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				serverData: '',
			};
		},

		onLoad(options) {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(250);
			this.cHeight = uni.upx2px(250);
			this.arcbarWidth = uni.upx2px(24);

			//this.fillData(Data);
			this.groupId = options.groupId;
			this.inquiryNextLevelData();
		},
		onReady() {
			//this.fillData();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig'])
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url: url
				})
			},
			//搜索商品
			inquiryNextLevelData() {
				let postData = {
					userUuid: this.userInfo.userUuid
				};
				//加载中
				this.$api.request.nextUserLevel(postData, res => {
					this.nextLevelData = res.body.data;
					var userLevel = this.nextLevelData.userLevelDTO;
					if(userLevel){
						var requiredByUser = userLevel.requiredByUser;
						var requiredByAmount = userLevel.requiredByAmount;
						var requiredUserCountDirect = userLevel.requiredUserCountDirect;
						var requiredUserCountTeam = userLevel.requiredUserCountTeam;
						var requiredProductAmountDirect = userLevel.requiredProductAmountDirect;
						var requiredProductAmountTeam = userLevel.requiredProductAmountTeam;
						if(requiredByUser){
							var directRating = (this.nextLevelData.directUserCount/requiredUserCountDirect).toFixed(2);
							var teamRating = (this.nextLevelData.teamUserCount/requiredUserCountTeam).toFixed(2);
							this.nextLevelData.userDirectRating = Number(directRating)*100;
							this.nextLevelData.userTeamRating = Number(teamRating)*100;
						}
						if(requiredByAmount){
							var directRating = (this.nextLevelData.directSaleAmount/requiredProductAmountDirect).toFixed(2);
							var teamRating = (this.nextLevelData.teamSaleAmount/requiredProductAmountTeam).toFixed(2);
							this.nextLevelData.amountDirectRating = Number(directRating)*100;
							this.nextLevelData.amountTeamRating = Number(teamRating)*100;
						}
					}
				}, false);
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	.content {
		margin: 0 20upx;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.tj-sction {
		margin-top: 40upx;
		padding: 10px 0;
		background-color: #FA436A;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #fff;
		}

		.num {
			font-size: $font-lg+5;
			color: #fff;
			margin-bottom: 8upx;
		}
	}

	.arc-title {
		color: $font-color-dark;
		font-size: $font-base;
		padding: 40upx 0 0 0;
		display: flex;
	}

	.arc-columns {
		display: flex;
		flex-direction: column !important;
	}

	.arc-common-mt {
		margin-top: 20upx;
	}

	.arc-bg-white {
		background: #FFFFFF;
	}

	.arc-title-bar {
		width: 100%;
		padding: 10upx 10upx;
		border-radius: 5px;
		flex-wrap: nowrap;
	}

	.arc-title-dot-light {
		border-left: 10upx solid #FA436A;
		padding-left: 10upx;
		font-size: 28upx;
		color: $font-color-base
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.arc-charts {
		width: 100%;
		height: 70upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}
</style>
