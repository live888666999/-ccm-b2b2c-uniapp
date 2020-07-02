<template>
	<view class="content b-t">
		<empty v-if="loadingType!='loading'&&performanceList.length === 0"></empty>
		<view class="list b-b" v-for="(item, index) in performanceList" :key="index">
			<view class="wrapper">
				<view class="performance-box">
					<text class="performance">团队销售业绩</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.performanceDate}}</text>
				</view>
			</view>

			<text class="amount">￥{{item.performanceAmount}}</text>
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
				performanceList: [],
				pageNo: 1,
				pageSize: 20,
				loadingType:''
			}
		},
		onLoad(option) {
			this.searchUserPerformance();
		},
		onReachBottom() {
			this.loadMore();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchUserPerformance();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchUserPerformance();
				}
			},
			resetPage() {
				this.pageNo = 1;
				this.performanceList = [];
			},
			//添加或修改成功之后回调
			refreshList() {
				this.inquiryperformance();
			},
			//查询用户奖金明细
			searchUserPerformance() {
				let that = this;
				let keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.getPerformanceList(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						var performanceList = res.body.data.performances;
						this.performanceList = this.performanceList.concat(performanceList);
						if (this.performanceList.length >= total) {
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
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.performance-box {
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

		.performance {
			font-size: 30upx;
			color: $font-color-dark;
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
