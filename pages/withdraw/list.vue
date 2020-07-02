<template>
	<view class="content b-t">
		<view class="list b-b">
			<view class="wrapper">
				<view class="withdraw-box">
					<text class="balance">￥{{userInfo.availableBalance}}</text>
				</view>
				<view class="u-box">
					<text class="name">可提现余额</text>
				</view>
			</view>
			<text class="apply" @click="navTo('/pages/withdraw/apply')">提现</text>
		</view>
		<view class="withdraw-history">
			<view @click="navTo('/pages/withdraw/detail?id='+item.userWithdrawUuid)"  class="list b-b" v-for="(item, index) in withdrawList" :key="index">
				<view class="wrapper">
					<view class="withdraw-box">
						<text class="withdraw">{{item.paymentMethodStr}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.withdrawTime}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.paymentStatus}}</text>
					</view>
					<view class="u-box" v-if="item.withdrawStatus==='2'">
						<text class="name">{{item.rejectReason}}</text>
					</view>
				</view>
			
				<text class="amount">￥{{item.withdrawAmount}}</text>
			</view>
		</view>
		

		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				source: 0,
				withdrawList: [],
				pageNo: 1,
				pageSize: 20,
				loadingType:''
			}
		},
		onLoad(option) {
			this.searchUserWithdraw();
		},
		onReachBottom() {
			this.loadMore();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchUserWithdraw();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchUserWithdraw();
				}
			},
			resetPage() {
				this.pageNo = 1;
				this.withdrawList = [];
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			//添加或修改成功之后回调
			refreshList() {
				this.resetPage();
				this.searchUserWithdraw();
			},
			//查询用户奖金明细
			searchUserWithdraw() {
				let that = this;
				let keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.cashList(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						var withdrawList = res.body.data.withdraws;
						this.withdrawList = this.withdrawList.concat(withdrawList);
						if (this.withdrawList.length >= total) {
							this.loadingType = 'noMore';
						} else {
							this.loadingType = 'more';
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			}
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
		background: #f8f8f8;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
		.amount{
			color: $base-color
		}
		.apply{
			color: #fff;
			border-radius: 10px;
			background: linear-gradient(left, #f5cb54, #9e760d);
			width: 80px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.withdraw-box {
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.withdraw {
			font-size: 30upx;
			color: $font-color-dark;
		}
		
		.balance{
			font-size: 40upx;
			color: #303133;
			font-weight: bold;
		}
	}

	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;

		.name {
			margin-right: 30upx;
			display: block;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	.withdraw-history{
		margin-top: 10upx;
	}
	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
