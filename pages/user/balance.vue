<template>
	<view class="content b-t">
		<empty v-if="loadingType!='loading'&&statementList.length === 0"></empty>
		<view class="list b-b" v-for="(item, index) in statementList" :key="index">
			<view class="left">
				<view class="tran-type">
					{{item.transactionTypeDesc}}
				</view>
				<view class="tran-time">
					{{item.transactionTime}}
				</view>
			</view>
			<view class="right">
				<view class="balance-minus" v-if="item.balanceBefore>item.balanceAfter">
					-￥{{item.transactionAmount}}
				</view>
				<view class="balance-plus" v-if="item.balanceBefore<item.balanceAfter">
					+￥{{item.transactionAmount}}
				</view>
				<view class="balance">
					交易后余额:￥{{item.balanceAfter}}
				</view>
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
				statementList: [],
				pageNo: 1,
				pageSize: 20,
				loadingType:''
			}
		},
		onLoad(option) {
			this.searchUserStatement();
		},
		onReachBottom() {
			this.loadMore();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchUserStatement();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchUserStatement();
				}
			},
			resetPage() {
				this.pageNo = 1;
				this.statementList = [];
			},
			//添加或修改成功之后回调
			refreshList() {
				this.inquiryaward();
			},
			//查询用户奖金明细
			searchUserStatement() {
				let that = this;
				let keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.getStatementList(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						var statementList = res.body.data.statements;
						this.statementList = this.statementList.concat(statementList);
						if (this.statementList.length >= total) {
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
		justify-content: space-between;
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
	
	.left {
		text-align: left;
		.tran-type {
			font-size: $font-base;
			color: $font-color-dark;
		}
		
		.tran-time{
			font-size: $font-base;
			color: $font-color-light;
			padding-top:20upx;
		}
	}
	.right {
		text-align: right;
		.balance-plus {
			font-size: $font-lg;
			color: #D47169;
		}
		.balance-minus {
			font-size: $font-lg;
			color: green
		}
		.balance{
			font-size: $font-base;
			color: $font-color-light;
			padding-top:20upx;
		}
	}

</style>
