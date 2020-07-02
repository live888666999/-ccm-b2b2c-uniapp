<template>
	<view class="content b-t">
		<empty v-if="userList.length === 0"></empty>
		<view class="list b-b" v-for="(item, index) in userList" :key="index">
			<view class="wrapper">
				<view class="award-box">
					<text class="award">{{item.name||item.personalPhone}}</text>
				</view>
				<view class="u-box" v-if="item.name">
					<text class="name">{{item.personalPhone}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.registerDate}}</text>
				</view>
			</view>

			<text class="right-text">{{item.userLevelName}}</text>
		</view>
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
				userList: []
			}
		},
		onLoad(option) {
			this.inquiryInvitedUser();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//查询用户奖金明细
			inquiryInvitedUser() {
				let that = this;
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
				};
				this.$api.request.invitedUser(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.userList = res.body.data.userList;
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
		.right-text{
			color: $font-color-base;
			font-size: $font-lg;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.award-box {
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

		.award {
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
