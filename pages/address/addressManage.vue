<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" :maxlength="10" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.telephone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<!-- <view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view> -->
		<view class="row b-b">
			<text class="tit">省市区</text>
			<view class="input">
				{{addressData.province}}  {{addressData.city}}  {{addressData.area}}
			</view>
			<text class="yticon icon-you" @click="showAddressRegion"></text>
		</view>
		<view class="input">
			<w-picker
				mode="region"
				:defaultVal="defaultRegion"
				:hideArea="false"
				@confirm="onConfirm" 
				ref="region"
				:timeout="true"
			></w-picker>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input :maxlength="100" class="input" type="text" v-model="addressData.street" placeholder="省市区及详细地址" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">邮政编码</text>
			<input class="input" type="text" :maxlength="6" v-model="addressData.zipcode" placeholder="邮政编码" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.default" color="#09A0F7" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">保存</button>
		<button v-if="manageType==='edit'" class="del-btn" @click="del">删除</button>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				manageType:'',
				addressData: {
					name: '',
					telephone: '',
					province: '北京市',
					city: '市辖区',
					area: '东城区',
					street: '',
					zipcode: '',
					default: true,
				},
				defaultRegion:['北京市','市辖区','东城区']
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data);
				this.defaultRegion=[this.addressData.province,this.addressData.city,this.addressData.area];
			}
			this.manageType = option.type;
			debugger
			uni.setNavigationBarTitle({
				title
			})
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		components:{
			wPicker
		},
		methods: {
			showAddressRegion(){
				this.$refs['region'].show();	
			},
			onConfirm(val){
				this.$set(this.addressData,'province',val.checkArr[0]);
				this.$set(this.addressData,'city',val.checkArr[1]);
				this.$set(this.addressData,'area',val.checkArr[2]);
			},
			switchChange(e){
				this.addressData.default = e.detail.value;
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						debugger
						this.addressData.addressName = data.name;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!this.$api.util.validateMobileNo(data.telephone)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				// if(!data.address){
				// 	this.$api.msg('请在地图选择所在位置');
				// 	return;
				// }
				if(!data.street){
					this.$api.msg('请填写详细地址');
					return;
				}
				
				let options = this.addressData;
				if(this.manageType=='edit'){
					options.actionType = 'MODIFY';
				}else{
					options.actionType = 'ADD';
					options.userDTO = {
						userUuid: this.userInfo.userUuid
					}
				}
				this.$api.request.saveUserShip(options, res => {
					if (res.body.status.statusCode === '0') {
						var msg = '地址添加成功';
						if(this.manageType=='edit') msg = '地址修改成功';
						this.$api.msg(msg);
						setTimeout(()=>{
							this.$api.prePage().refreshList();
							uni.navigateBack();
						}, 800)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
				
			},
			//删除地址
			del(){
				let options = {
					userDeliveryAddressUuid: this.addressData.userDeliveryAddressUuid,
					actionType: 'DELETE'
				}
				this.$api.request.removeShip(options, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('地址删除成功');
						setTimeout(()=>{
							this.$api.prePage().refreshList();
							uni.navigateBack();
						}, 800)
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
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
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #09A0F7;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px #09A0F7;
	}
	.del-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	
	
	.tab{
		padding:20upx 0;
		font-size: 32upx;
	}
	.tab.active{
		color:#f00;
	}
	.result{
		margin-top: 100upx;
		font-size: 32upx;
	}
</style>
