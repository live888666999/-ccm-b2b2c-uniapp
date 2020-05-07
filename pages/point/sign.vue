<template>
	<view>


		<view class="container">
			<view class="point">
				<view class="point-rule">
					<navigator url="/pages/point/rule">活动规则</navigator>
				</view>
				<view class="point-wrapper">
					<view class="point-text">
						当前积分
					</view>
					<navigator url="/pages/point/point-list" class="point-value">
						{{userInfo.availablePoint}}
						<font> ></font>
					</navigator>
				</view>
			</view>
			<view class="sign">
				<view class="sign-button-wrapper">
					<view class="sign-button-enable" v-if="!isSigned" @click="toggleSignPoint">
						签到
					</view>
					<view class="sign-button-disable" v-if="isSigned">
						已签到
					</view>
				</view>

				<view class="sign-text">
					已连续签到<font>{{signDateNum}}</font>天
				</view>
			</view>
			<view class="sign-history">
				<view class="sign-history-item">
					<view class="history-item" v-for="(signItem,index) in signList">
						<view class="item-point">
							<text v-if="!signItem.isSign">+{{signItem.point}}</text>
							<text v-if="signItem.isSign">√</text>
						</view>
						<view class="item-line" v-if="index<6"></view>
					</view>
				</view>
				<view class="sign-history-date">
					<view class="history-item" v-for="signItem in signList">
						<view class="item-point">
							<text>{{signItem.date}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			
		},
		data() {
			return {
				visible: true,
				signDateNum: 0,
				isSigned: true,
				signList: [],
				signSetting: {}
			}
		},
		onLoad() {},
		onShareAppMessage(res) {

		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig'])
		},
		methods: {
			...mapMutations(['login']),
			//获取签到设置
			getSignSetting() {
				let searchOptions = {

				};
				this.$api.request.signSetting(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.signSetting = res.body.data;
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			//获取签到设置
			toggleSignPoint() {
				let searchOptions = {
					userUuid: this.userInfo.userUuid
				};
				this.$api.request.signPoint(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('签到成功, 获得积分' + res.body.data.signPoint);
						this.getSignDateNum();
						this.isPointSigned(new Date());
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			formatSignList() {
				let that = this;
				this.signList = [];
				var firstDate = new Date();
				var currDate = new Date();
				if (this.isSigned)
					firstDate = this.$api.util.addDays(currDate, 1 - this.signDateNum)
				else
					firstDate = this.$api.util.addDays(currDate, 0 - this.signDateNum)
				for (var i = 0; i < 7; i++) {
					var itemDate = this.$api.util.addDays(firstDate, i);
					var point = 0;
					var isSign = false;
					if (i == 0) {
						point = this.signSetting.day1Point;
					} else if (i == 1) {
						point = this.signSetting.day2Point;
					} else if (i == 2) {
						point = this.signSetting.day3Point;
					} else if (i == 3) {
						point = this.signSetting.day4Point;
					} else if (i == 4) {
						point = this.signSetting.day5Point;
					} else if (i == 5) {
						point = this.signSetting.day6Point;
					} else if (i == 6) {
						point = this.signSetting.day7Point;
					}
					if (itemDate.getTime() < currDate.getTime())
						isSign = true;
					else if (itemDate.getTime() == currDate.getTime())
						isSign = that.isSigned;

					var signItem = {
						date: itemDate.format('MM-dd'),
						point: point,
						isSign: isSign
					}
					this.signList.push(signItem);
				}
			},
			//获取连续签到天数
			getSignDateNum() {
				let searchOptions = {
					userUuid: this.userInfo.userUuid
				};
				this.$api.request.signDateNum(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.signDateNum = res.body.data.signDateNum;
						this.formatSignList();
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			//是否积分签到
			isPointSigned(date) {
				let searchOptions = {
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					signTime: date.format('yyyy-MM-dd')
				};
				this.$api.request.isPointSigned(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.isSigned = res.body.data.signed;
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
		},
		onShow() {
			//同步用户信息
			if (this.hasLogin) {
				this.$api.request.userInfo({
					userUuid: this.userInfo.userUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.login(res.body.data);
					}
				});
				this.getSignDateNum();
				this.isPointSigned(new Date());
			}
		},
		onLoad() {
			this.getSignSetting();
		}
	}
</script>
<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.point {
		background-color: #fff;
		padding-bottom: 60upx;

		.point-rule {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: 40upx 30upx 80upx 30upx;
			color: $font-color-dark;
			font-size: $font-lg;
		}

		.point-wrapper {
			text-align: center;

			.point-text {
				color: $font-color-light;
				font-size: $font-base;
			}

			.point-value {
				padding-top: 20upx;
				color: $font-color-dark;
				font-size: 80upx;

				font {
					font-size: $font-base;
					color: $font-color-base;
				}
			}
		}
	}

	.sign {
		margin-top: 20upx;
		background-color: #fff;
		padding: 40upx 20upx 40upx 20upx;

		.sign-button-wrapper {
			display: flex;
			justify-content: center;

			.sign-button-enable {
				width: 200upx;
				height: 200upx;
				line-height: 200upx;
				border-radius: 50%;
				background: linear-gradient(to bottom, #ffac30, #fa436a, #F56C6C);
				text-align: center;
				color: #fff;
				border: none;
			}

			.sign-button-disable {
				width: 200upx;
				height: 200upx;
				line-height: 200upx;
				border-radius: 50%;
				background: #c5c5c5;
				text-align: center;
				color: #fff;
				border: none;
			}
		}

		.sign-text {
			text-align: center;
			padding-top: 20upx;
			color: $font-color-base;
			font-size: $font-base;
			font {
				color: #FD8247;
			}
		}
	}

	.sign-history {
		background-color: #fff;
		padding: 20px 0;

		.sign-history-item {
			display: flex;
			justify-content: center;

			.history-item {
				display: flex;
				justify-content: center;
				align-items: center;

				.item-point {
					width: 60upx;
					height: 60upx;
					line-height: 30px;
					border-radius: 50%;
					text-align: center;
					color: #fff;
					font-size: $font-sm;
					background-color: #FD8247;
				}

				.item-line {
					width: 36upx;
					height: 8upx;
					background-color: #FD8247;
				}
			}

		}

		.sign-history-date {
			display: flex;
			justify-content: center;

			.history-item {
				.item-point {
					padding: 6upx 18upx;
					font-size: $font-sm;
					color: $font-color-base;
				}
			}
		}
	}

	.result-content {
		position: relative;
		height: 650rpx;
		width: 630rpx;
		background: #fff;
		border-radius: 20rpx;
		text-align: center;
		font-family: PingFangSC-Medium;
	}
</style>
