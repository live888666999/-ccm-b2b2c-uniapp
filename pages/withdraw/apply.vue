<template>
	<view class="content">
		<view class="row">
			<text class="symbol">￥</text>
			<input  type="number" v-model="withdrawAmount" class="input-amount" :maxlength="10"/>
		</view>
		<view class="row">
			<text class="tit">可提现金额</text>
			<text class="tit-amount" @click="withdrawFullAmount">{{userInfo.availableBalance}}</text>
		</view>
		<view class="apply-wrapper">
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
				 @click="tabClick(index)">
					{{item.text}}
				</view>
			</view>
			<view v-if="tabCurrentIndex==0">
				<view class="row">
					<text class="tit">账户名</text>
					<input type="text" v-model="bankAccountName" class="input" :maxlength="10"/>
				</view>
				<view class="row">
					<text class="tit">开户银行</text>
					<view class="input">{{bankName}}</view>
					<text class="yticon icon-you" @click="showBankList"></text>
				</view>
				<view class="row">
					<text class="tit">银行卡号</text>
					<input type="number" v-model="bankAccountNo" class="input"/>
				</view>
				<view>
					<w-picker
						mode="selector"
						:defaultVal="defaultBank" 
						@confirm="onConfirm" 
						ref="bank"
						themeColor="#f00"
						:selectList="bankList"
					></w-picker>
				</view>
			</view>
			<view v-if="tabCurrentIndex==1">
				<view class="row">
					<text class="tit">支付宝账号</text>
					<input type="text" v-model="alipayId" class="input"/>
				</view>
			</view>
			<view class="note">
				每笔提现将扣除{{taxRate}}%手续费！
			</view>
		</view>
		
		<button class="apply-btn" @click="applyWithdraw">申请提现</button>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty,
			wPicker
		},
		data() {
			return {
				defaultBank:['中国工商银行'],
				bankList:this.$api.util.bankList,
				bankAccountName:'',
				bankName:'',
				bankAccountNo:'',
				alipayId:'',
				withdrawAmount: 0.00,
				withdrawList: [],
				taxRate:0,
				pageNo: 1,
				pageSize: 20,
				loadingType:'',
				navList: [{
						state: '1',
						text: '银行卡'
					},
					{
						state: '2',
						text: '支付宝'
					}],
				tabCurrentIndex:0,
			}
		},
		onLoad(option) {
			this.inquiryTaxRate();
			this.tabClick(0);
		},
		onReachBottom() {
			
		},
		//下拉刷新
		onPullDownRefresh() {
			
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			inquiryTaxRate() {
				this.$api.request.getParameter({
					name: 'TAX_RATE'
				}, res => {
					if (res.body.status.statusCode === '0') {
						if(res.body.data){
							this.taxRate = res.body.data.value;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			applyWithdraw(){
				//检查金额
				if(!this.withdrawAmount){
					this.$api.msg('请输入提现金额');
					return;
				}
				if(this.withdrawAmount===0 || this.withdrawAmount>this.userInfo.availableBalance){
					this.$api.msg('仅限金额输入有误');
					return;
				}
				//如果是银行卡提现, 检查各项输入是否正确
				if(this.tabCurrentIndex==0){
					if(!this.bankAccountName){
						this.$api.msg('请输入账户名');
						return;
					}
					if(!this.bankName){
						this.$api.msg('请选择开户银行');
						return;
					}
					if(!this.bankAccountNo){
						this.$api.msg('请输入银行卡号');
						return;
					}
				}
				//如果是支付宝提现, 检查各项输入是否正确
				if(this.tabCurrentIndex==1){
					if(!this.alipayId){
						this.$api.msg('请输入支付宝账号');
						return;
					}
				}
				let options = {
					userDTO:{
						userUuid: this.userInfo.userUuid,
					},
					withdrawAmount: this.withdrawAmount,
					bankAccountName: this.bankAccountName,
					bankName: this.bankName,
					bankAccountNo: this.bankAccountNo,
					alipayId: this.alipayId,
					paymentMethod: this.tabCurrentIndex===0?'BANK':'ALIPAY'
				}
				this.$api.request.userToCash(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('提现申请已提交');
						this.userInfo.availableBalance = this.userInfo.availableBalance - this.withdrawAmount;
						this.login(this.userInfo);
						setTimeout(()=>{
							this.$api.prePage().refreshList();
							uni.navigateBack();
						}, 800)
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, false);
			},
			onConfirm(val){
				this.bankName = val.checkArr.label;
			},
			showBankList(){
				this.$refs['bank'].show();	
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			withdrawFullAmount(){
				this.withdrawAmount = this.userInfo.availableBalance;
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
		background: #f8f8f8;
	}
	.content{
		margin: 0 auto;
	}
	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.tit-amount{
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: red;
			text-decoration:underline;
		}
		.symbol{
			flex-shrink: 0;
			width: 80upx;
			font-size: 34upx;
			color: $font-color-dark;
		}
		.input-amount{
			flex: 1;
			font-size: 56upx;
			color: #000000;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.apply-wrapper{
		margin:5px;
		border-radius: 5px;
	}
	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		/* position: relative; */
		z-index: 10;
	
		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
	
			&.current {
				color: $base-color;
	
				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}
	.note{
		padding: 20upx;
		font-size: 28upx;
		color: $font-color-base;
	}
	.apply-btn {
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
