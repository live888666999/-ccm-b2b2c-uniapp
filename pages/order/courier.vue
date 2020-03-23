<template>
	<view>
		<view class="courier-info">
			<view>
				<image style="margin-right:40upx;width:120upx;height:120upx" :src="courierInfo.result.logo"></image>
			</view>
			<view>
				<view class="row">
					<view class="label">
						物流公司:
					</view>
					<view class="value">
						{{courierInfo.result.expName}}
					</view>
				</view>
				<view class="row">
					<view class="label">
						联系电话:
					</view>
					<view class="value">
						<a :href="'tel:'+courierInfo.result.expPhone">{{courierInfo.result.expPhone}}</a>
					</view>
				</view>
				<view class="row">
					<view class="label">
						物流单号:
					</view>
					<view class="value">
						{{courierInfo.result.number}}
					</view>
				</view>
			</view>
		</view>
		<view class="time-list" v-if="courierInfo.status=='0'">
			<uni-steps active-color="#f0ad4e" :options="courierSteps" direction="column" :active="0"></uni-steps>
		</view>
		<empty v-if="courierInfo.status!='0'"></empty>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue';
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				courierNo: '',
				courierInfo: {
					result:{
						
					}
				},
				courierSteps: []
			}
		},
		components: {
			uniSteps,empty
		},
		onLoad(option) {
			//订单数据
			this.courierNo = option.courierNo;
			this.inquiryCourier(this.courierNo);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//查询订单
			inquiryCourier(courierNo) {
				let that = this;
				this.$api.request.orderCourier({
					number: courierNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.courierInfo = res.body.data;
						if(this.courierInfo.status=='0'){
							var courierSteps = [];
							this.courierInfo.result.list.forEach(function(val,index){
								courierSteps.push({
									title:val.status,
									desc: val.time
								});
							})
							that.courierSteps = courierSteps;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.courier-info {
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		padding: 20upx;

		.row {
			margin: 6upx 0;
			display: flex;
			flex-direction: row;
			justify-content: left;

			.label {
				color: $font-color-light;
				font-size: $font-sm;
			}

			.value {
				color: $font-color-dark;
				font-size: $font-sm;
				margin-left: 10upx;
			}
		}
	}
	.time-list{
		padding: 20upx 30upx 0 30upx;
	}
</style>
