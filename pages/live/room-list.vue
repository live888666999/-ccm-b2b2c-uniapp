<template>
	<view class="content">
		<view class="room-list">
			<view 
				v-for="(item, index) in roomList" :key="index"
				class="room-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.cover_img" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<view class="desc-box">
					<text>{{item.anchor_name}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>	
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				roomList: [],	//直播间列表
				total: 0,
				pageNo:1,
				pageSize:10
			};
		},
		
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.querySelector(".uni-page-head").offsetHeight+'px';
			// #endif
			this.getLiveRooms();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			//重新加载数据
			this.resetPage();
			this.getLiveRooms();
		},
		//加载更多
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				this.getLiveRooms()
			}
		},
		methods: {
			//搜索商品
			getLiveRooms(){
				let searchData = {
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize
				};
				//加载中
				this.loadingType = 'loading';
				this.$api.request.wechatLiveRoomList(searchData, res => {
					uni.stopPullDownRefresh();
					if (res.body.status.statusCode === '0') {
						var roomList = res.body.data.room_info;
						this.roomList = this.roomList.concat(roomList);
						this.total = res.body.data.total;
						if(this.roomList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						this.loadingType = 'more';
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			//重置直播间及分页
			resetPage(){
				this.pageNo = 1;
				this.roomList = [];
			},
			//详情
			navToDetailPage(item){
				let id = item.productUuid;
				uni.navigateTo({
					url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+item.roomid
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		
	}
	/* 商品列表 */
	.room-list{
		display:flex;
		flex-wrap:wrap;
		.room-item{
			width: 100%;
			padding: 20upx;
			margin: 20upx;
			background: #fff;
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.desc-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
	}
	

</style>
