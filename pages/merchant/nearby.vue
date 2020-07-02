<template>
	<view class="content b-t">
		<view class="amap">
			<map style="height:100%;width:100%" :show-location="showLocation" :scale="scale" :latitude="latitude" :longitude="longitude"
			 :markers="covers">
			</map>
		</view>

		<view class="m-list">
			<view class="no-merchant" v-if="merchantList.length === 0">
				<image class="no-merchant-image" src="../../static/image/empty.png"></image>
				<view class="no-merchant-text">附近未找到门店</view>
			</view>
			<view class="list b-b" v-for="(item, index) in merchantList" :key="index"">
				<view class="wrapper" @click="findCover(item)">
					<view class="merchant-box">
						<text class="merchant">{{item.merchantName}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.merchantAddress}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.mobileNo}}</text>
					</view>
				</view>
				<view class="distance" @click="openLocation(item)">
					<view>{{item.distance}}公里</view>
					<image src="../../static/image/nav.png"></image>
					<view>去这里</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			empty
		},
		data() {
			return {
				title: 'map',
				latitude: 30.6565202250,	//默认天府广场, 如果获取当前位置成功则替换为当前位置
				longitude: 104.0659332275,
				scale: 10,
				showLocation: true,
				covers: [],
				merchantList: []
			}
		},
		onLoad(option) {
			let that = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					this.latitude = res.latitude;
					this.longitude = res.longitude;
				},
				complete: function(res) {
					that.inquiryNearbyMerchant(res.latitude, res.longitude);
				}
			});
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			openLocation(item){
				debugger;
				uni.openLocation({
					latitude: item.latitude,
					longitude: item.longitude,
					success: function () {
						console.log('打开地图成功');
					}
				});
			},
			findCover(val) {
				var covers = [];
				covers.push(this.getCover(val));
				this.covers = covers;
			},
			//根据一个门店产生标记点
			getCover(val) {
				return {
					latitude: val.latitude,
					longitude: val.longitude,
					width: 40,
					height: 40,
					iconPath: '../../static/image/address.png',
					callout: {
						content: val.merchantName,
						borderRadius: "10",
						bgColor: "#F44F31",
						color: '#FFFFFF',
						padding: 5,
						display: 'ALWAYS',
						textAlign: 'center'
					}
				}
			},
			//查询附近门店
			inquiryNearbyMerchant(lat, lng) {
				let that = this;
				this.$api.request.nearbyMerchant({
					userLatitude: lat||this.latitude,
					userLongitude: lng||this.longitude
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.merchantList = res.body.data.merchants;
						var covers = [];
						this.merchantList.forEach(function(val, index) {
							covers.push(that.getCover(val));
						})
						this.covers = covers;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
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

		.distance {
			color: $font-color-light;
			font-size: $font-base;
			text-align: right;

			image {
				width: 60upx;
				height: 60upx;
			}
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.merchant-box {
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

		.merchant {
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

	.amap {
		width: 100%; 
		height: 300px;
		position:fixed;
		top:0;
		left:0;
		z-index:999;
	}
	.m-list{
		position:absolute;
		top:300px;
		left:0;
		width:100%;
	}
	.no-merchant{
		text-align: center;
		.no-merchant-image{
			height: 80upx;
			width: 80upx;
			margin-top: 40upx;
		}
		.no-merchant-text{
			margin-top: 20upx;
			color: $font-color-light;
			font-size: $font-sm;
		}
	}
</style>
