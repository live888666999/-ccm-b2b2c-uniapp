<template>
	<view class="content">
		<view class="row">
			<text class="tit">快递公司</text>
			<picker class="input" @change="bindPickerChange" :value="index" :range="couriers">
			                        <view class="uni-input">{{couriers[index]}}</view>
			                    </picker>
		</view>
		<view class="row">
			<text class="tit">快递单号</text>
			<input class="input" v-model="courierNo" placeholder="物流单号" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="courierOrderAfterSale">确认</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				saleNo: '',	//售后单号
				afterSale: {},	//售后单信息
				courierName:this.$api.util.courierList[0],	//物流公司
				courierNo:'',	//物流单号
				couriers: this.$api.util.courierList,
				index:0
				
			}
		},
		onLoad(option) {
			this.saleNo = option.saleNo;
			this.inquiryOrderAfterSale(this.saleNo);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			bindPickerChange(e){
				this.courierName = this.couriers[e.detail.value];
			},
			//查询售后单
			inquiryOrderAfterSale(saleNo) {
				this.$api.request.afterSalesInfo({
					saleNo: saleNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.afterSale = res.body.data;
						this.imageUrlList = this.afterSale.imageUrlList;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			courierOrderAfterSale() {
				if(!this.courierName || !this.courierNo){
					this.$api.msg('物流信息未填写完整');
					return;
				}
				this.$api.request.courierAfterSale({
					saleNo: this.saleNo,
					courierName: this.courierName,
					courierNo: this.courierNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('物流信息已提交');
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/aftersale/list'
							})
						}, 1000);
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.b-b{
		margin-top: 20upx;
	},
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			label{
				margin-left: 20upx;
			}
			
		}
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		
			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #fa436a;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px #fa436a;
	}
</style>
