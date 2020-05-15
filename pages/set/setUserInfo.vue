<template>
	<view class="container">
		<view class="list-cell b-b m-t" hover-class="cell-hover"
		 :hover-stay-time="50">
			<text class="cell-tit">手机号码</text>
			<text class="cell-tip">{{userInfo.personalPhone||''}}</text>
		</view>
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/setUserInfoName')" hover-class="cell-hover"
		 :hover-stay-time="50">
			<text class="cell-tit">昵称</text>
			<text class="cell-tip">{{userInfo.name||'未设置'}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b m-t" @click="changeAvatar" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">头像</text>
			<!-- <text class="cell-tip"> -->
				<image class="cell-tip portrait" :src="userInfo.photoUrl || '/static/missing-face.png'"></image>
			<!-- </text> -->
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {

			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},

			//switch
			switchChange(e) {
				let statusTip = e.detail.value ? '打开' : '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

			//上传头像
			changeAvatar() {
				this.$api.request.uploadImage(1, uploadRes => {
					if (uploadRes.errno === 0) {
						//上传成功后获取地址并更新该地址到服务器
						var photoUrl = uploadRes.data[0];
						this.$api.request.editInfo({
							userUuid: this.userInfo.userUuid,
							actionType: 'PHOTOURL',
							photoUrl: photoUrl
						}, res => {
							if (res.body.status.statusCode === '0') {
								this.$api.msg('头像已更改');
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/user/user'
									})
								}, 1000);
							} else {
								this.$api.msg(res.body.status.errorDesc);
							}
						});
					} else {
						this.$api.msg('头像上传失败');
					}
				})
			}

		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.portrait {
		width: 60upx;
		height: 60upx;
		align-self: center;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
