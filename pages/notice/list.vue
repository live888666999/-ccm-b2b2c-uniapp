<template>
	<view class="content">
		<view class="msg-section">
			<view @click="navSysmessage" class="mix-list-cell b-b">
				<text class="cell-icon yticon icon-notice" style="color: #e07472"></text>
				<text class="cell-tit clamp">系统通知</text>
				<uni-badge type="error" v-if="notesNumber>0" class="num" :text="notesNumber+''"></uni-badge>
				<text class="cell-tip" v-if="notes.length>0">{{notes[0].content}}</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
		</view>
		<view class="announcement-section">
			<view @click="navAnnouncement" class="mix-list-cell b-b">
				<text class="cell-icon yticon icon-dizhi" style="color: #9789f7"></text>
				<text class="cell-tit clamp">官方资讯</text>
				<uni-badge type="error" v-if="announcementNumber>0" class="num" :text="announcementNumber+''"></uni-badge>
				<text class="cell-tip" v-if="announcement.length>0">{{announcement[0].title}}</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
		</view>
		<view class="notice-section">
			<view @click="navNotice" class="mix-list-cell b-b">
				<text class="cell-icon yticon icon-share" style="color: #5fcda2"></text>
				<text class="cell-tit clamp">活动通知</text>
				<uni-badge type="error" v-if="noticeNumber>0" class="num" :text="noticeNumber+''"></uni-badge>
				<text class="cell-tip" v-if="notice.length>0">{{notice[0].title}}</text>
				<text class="cell-more yticon icon-you"></text>
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
				notice: [],
				noticeNumber:0,
				announcement: [],
				announcementNumber:0,
				notes: [],
				notesNumber:0,
				isnotes: false,
			}
		},
		onLoad() {
			this.inquiryNotes();
			this.inquiryArticle();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			//查询系统通知
			inquiryNotes: function() {
				let that = this;
				let postData = {
					userUuid: that.userInfo.userUuid
				}
				this.$api.request.inquiryNotes(postData, function(res) {
					if (res.body.status.statusCode === '0') {
						that.notes = res.body.data.notes;
						var notesNumber = 0;
						that.notes.forEach(function(val, index) {
							if (val.noteStatus==='UNREAD') {
								notesNumber++;
							}
						})
						that.notesNumber = notesNumber;
					}
				});
			},
			//查询公告活动
			inquiryArticle: function() {
				let that = this;
				this.$api.request.inquiryArticle({}, function(res) {
					if (res.body.status.statusCode === '0') {
						var articleList = res.body.data.articles;
						var noticeList = [];
						var noticeNumber = 0;
						var announcementList = [];
						var announcementNumber = 0;
						articleList.forEach(function(val, index) {
							if (val.articleType == '4') {
								announcementList.push(val);
								if(!that.isRead(val.articleUuid)){
									announcementNumber++;
								}
							}
							if (val.articleType == '5') {
								noticeList.push(val);
								if(!that.isRead(val.articleUuid)){
									noticeNumber++;
								}
							}
						})
						that.notice = noticeList;
						that.noticeNumber = noticeNumber;
						that.announcement = announcementList;
						that.announcementNumber = announcementNumber;
					}
				})
			},
			isRead(articleUuid){
				var isRead = false;
				var readNotice = uni.getStorageSync('readNotice');
				if (!readNotice||readNotice.length>0) {
					for (var key in readNotice) {
						if (readNotice[key] == articleUuid) {
							isRead = true;
						}
					}
				}
				return isRead;
			},
			//系统通知
			navSysmessage: function() {
				var notes = JSON.stringify(this.notes);
				notes = encodeURIComponent(notes);
				uni.navigateTo({
					url: '/pages/notice/sysmessage?data=' + notes
				});
			},
			//公告
			navNotice: function() {
				var notice = JSON.stringify(this.notice);
				notice = encodeURIComponent(notice);
				uni.navigateTo({
					url: '/pages/notice/notice?data=' + notice
				});
			},
			//活动
			navAnnouncement: function() {
				var announcement = JSON.stringify(this.announcement);
				announcement = encodeURIComponent(announcement);
				uni.navigateTo({
					url: '/pages/notice/notice?data=' + announcement
				});
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

	.content {
		background-color: #fff;
	}

	.top_li {
		background-color: #fff;
		width: 95%;
		margin: auto;
		height: 45px;
		margin: 20px 10px;
	}

	.top_i {
		width: 12%;
		height: inherit;
		float: left;
		margin-right: 5%;
		position: relative;
	}

	image {
		height: 100%;
		width: 100%;
	}

	.top_a {
		height: 45px;
		float: left;
		color: #999999;
		font-size: 15px;
		padding-bottom: 20px;
		border-bottom: 0.5rpx solid #F8F8F8
	}

	.icon .mix-list-cell.b-b:after {
		left: 90upx;
	}

	.mix-list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			align-self: center;
			width: 56upx;
			max-height: 60upx;
			font-size: 38upx;
		}

		.cell-more {
			align-self: center;
			font-size: 30upx;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;

			.num {
				background: #dd524d;
				color: #fff;
				position: absolute;
			}
		}

		.cell-tip {
			text-align: right;
			font-size: $font-sm+2upx;
			color: $font-color-light;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;

		}
	}

	.msg-section {
		.uni-badge {
			position: absolute;
			top: 2upx;
			left: 50upx;
			background: #dd524d;
			color: #fff;
		}
	}

	.announcement-section {
		.uni-badge {
			position: absolute;
			top: 2upx;
			left: 50upx;
			background: #dd524d;
			color: #fff;
		}
	}

	.notice-section {
		.uni-badge {
			position: absolute;
			top: 2upx;
			left: 50upx;
			background: #dd524d;
			color: #fff;
		}
	}
</style>
