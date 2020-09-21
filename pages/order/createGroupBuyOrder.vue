<template>
	<view>
		<view class="navbar" v-if="navList.length>0">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index,item)">
				{{item.text}}
			</view>
		</view>
		<navigator v-if="currentDeliveryType=='1'" url="/pages/address/address?source=1" class="address-section">
			<view class="order-content" v-if="addressData.name">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{addressData.name}}</text>
						<text class="mobile">{{addressData.telephone}}</text>
					</view>
					<text class="address">{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.street}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="order-content" v-if="!addressData.name">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<!-- <text class="name">{{addressData.name}}</text>
						<text class="mobile">{{addressData.telephone}}</text> -->
						<text>请选择地址</text>
					</view>
					<!-- <text class="address">{{addressData.street}}</text> -->
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvVHce/1/deXzuJHSdOM+fhpKMllI2SkTZpV6ULYrCHQGwrf41p/LENVk3QTipSWujKoyot1aQN0FYQQxtsMCS2SVuqsfFYHxBKYQNGV9ouZdA8nDipH4mT+HFf+51rO0pN0japrw9HreLe3Pqc3/me3+f3uFdIvfVuDIAPix1C9oceicFRVQWlvRWCkL1omqb1Of9z9rXZY65rhcO6x5ove19oWkX/RAaSMLOEkg+2Zt0wEcvoWOZzYZnXeWEbzmP7XPs11//LnOiDEY9DkGRwGw5a59QUTM2As+1qiD5v0TUvvC9Bc52KpmDSnju4ic7+CIinNVQoElYtcUM8jx2L1bzwPn14DOrHZ0hzEdxOPJtW16FH45CvuBzyZU22aH7Od9LnU/E0xpMqJG6iZ309qeqYNoA1gTJ4ZdF2zY2pJNSTfYCmkb85+GnO1hIbh+DzQVndaiHYTs3ZGJpifE/DyVnzi+X7pWqen8/i+8kPYUSjEORPCd9XtUKs9Fi+KMxjVzE0n9ZNnIgkYXwK+B5LafC4JKyudcMxD2+LqblGfNcY30VxJsfhcOCJ7xr02ATkluXE96DtmrPvPxFLIUH7zY3vOc0Z39O0oGtqy1DlFIuu+Zx8P/Ffa8/hEBey4rh0uuPWS6S6CRUhyGjG0hcfOWex+c9zXSsE5HmFzseP3H294Sl847VBRGJJQHTwy9wJNKAE7otLfXi2K3hRgeB81+bar8IDEPvFMxi6cxebnMx2cjrnDmiIwUAGDTvugX9de9E1L7R9NK1jc+8gnj8dy2rOKY/JRhgV8Cr405ea0HEBOxajeaHtySPvYvD2bUgdP0lmuzkl7oLl6Wn0wX/Dd1D/xG5bNc/f+7NjY9jyzghlM5QxS/ySOGt+Wlt3WwDXBz22a86gHrqjG7Hnekhz5uciN9NVDEBxXYng87vgEoqveZ7y+XsPE99vOTyAs1SkU+bOT3NKIJHUsIb4/rsL8L0YmrMRffQ3GNn8c6L7BOnu4pW10/xR4nsK9T+5FzWda2fXcEXTfLbtYUrc7joSwguno9kilZfsLNmgtaBcxv7rmudN2i9Fc8YRlsvkr6aOvoeBHxDf//MBzVfGke9p8vVhVN2wAQ1P7rFdczYeO34Wm4+Gsr4mcqzWMqQ5IX5rex3W1pUXX/PCRlwkjpEtDyLy9B8sPxcgLWzFpy7rWlTH3eq66AbUj0fh7lyJhn27oFzVck41mTdgdnU5+3fzbczsqqVwQ14aSuCrhwZoo3UEqCLW6biZJZZZom0e0UhlSiY3rvBjd0cdfLJjTrsXYvN8e5TvPEZ2PYbw9l9CrKqAWFNB+2+W/oiTc2l9BFefC/WPdqPyuxts1/zMlIrbqVB7OZSgaSWrC2eUWHUGcLa2MVrLyho3ftvVhNYq1ye6J8XUnI3JFw8idNdOaB+GIS+vsZhf6gMvsP1OJKGFx1H9o1sQeOSBXOcfc9pQDM3Z2PGvEeykxJ0l7AGaTyux4YKVLpOvs0BO/v0UQf17LdUzwdcskuaFHRo1NIrQxq1I9ByEc2kj+ZwDZsk1z/H9I+L7us+j4fHdUFa2FF3zQtv3DyTwrTcGoVFxXOeWKZEoPeNm+E66b7zSj71r6+ERHXN21C5V85nPmo7I3scRvncfxOoyiP7y0vNdyMZ17X9xmGR+43MPwvvtm23XnPH9h68P4u8U2yuJ7wonvmu0pigValf73XhmfRCt1S5bNbd6QK/0ov+2bhjDE8T3aj58p5hujCehjsZQs+lWLNl5N0RvuS2a5z/T8cLOd8K4/72wxdaAXHq+syGT7sOM7xLxvaOe+F5lu+bqYBjDd25H4s+vQ26ugSBL1lsEC+m4C8fQvMhXZXTa/CR8N96MekrapWCdvc1t+rvn32PY3juYrc7cEjjonFuMYQm97QsBPLSq1v7pKJAPbbwHZ3ueoqCyhJIJStqto8/BdMTh8q1A8PcPo+xrXbbP97ehSXydFWpjU0CZzO8xInM+CqSdTV688OVmBBT7O6DRh/dhYOt20nqSdK+f1RIqdRMqRXgrR90Dm+Dfsdn2+QYpeH7/8CBe+mAsq7nIsevKEjivgv1dQdzYUGH7dMlXe3FmwxZMTRyFgiZkW48mF0/XMYWqm75JfH8IUmPA1tlUMnHv+8T3N3J8d3Hkey6I3re6Djvaam1v/urhswjdsQ2jf/kVJRI1xHdPrh1lltzTWUxXai5H07N74P7KettnPDQyjWtf/ohglyJfl7jz/drP+vDrzgYsLZdtP2PRnz6B/u4t9I+U9cYCH81hddoFuBG4bxNq7v9xSfh+G/H9wKkIwF5JkR38fF3VLb73dDXhpsYS8P0Vxve7MZ14E04EkX2SumDj40Lkjz2LS9x1nZVqcK1rh1L/GaiZDB1GYwGPRi9+sA4r63odGEjAoKTZS0mTwUtoS2sTPioc1jd64KJqNZXRP9EtLFrLT5KQOd6H1JtvQ/SUQ1CUC1Z/tjp5MgXn51bAfc1VpAUVb6pqi+bsqRlrOB0ITSI0kUa1IvF7JcribPbxZnt9BYIeBZm0ap1BO2yHLMOIxjH111chmDocXg9XzZFR4fD74e5cA9GtQEulbLGbfaNMvv4+BfG3hiet9wxlUeDGdDPn68uqXVgVKKezbiBN/HHYoTnrqlORkDx0BHr/ABzVVbknbZysZ3wnRVyda6HU1UIjvpt28p2C+T+GEtYeeEh3jqcdKjl2BcWY65q9UAQb+c6+k3iePnaS+P5Pq8spOJ38fJ09RVI1OFuWo6xtJXSD+J6xh++OHN8PEt8HxtNY4pbAczC+m2Rnh8V3J9Q0Fa4LeG97YQdehj4aoSL9NZiZNMTKStp6g5/x5NsW37vWQaS1WXzPHvjihzYS/lgshbeJ75WySHm7wNXXk8SbK/xutOX4ntHtYRxE0eJn6uARaGf6ie++7GPNxVkf/78AAwCn1+RYqusbZQAAAABJRU5ErkJggg=="></image>
		</navigator>
		<view v-if="currentDeliveryType=='2'" class="delivery-section">
			<u-form :model="deliveryData">
				<u-form-item label="收件人姓名" label-width="250"><u-input type="text" v-model="deliveryData.deliveryName" placeholder="请输入姓名"/></u-form-item>
				<u-form-item label="收件人电话号码" label-width="250"><u-input type="number" v-model="deliveryData.deliveryContactNo" placeholder="请输入电话号码"/></u-form-item>
				<u-form-item label="收件地址" label-width="250" right-icon="arrow-right"><u-input readonly type="text" v-model="deliveryData.deliveryStreet"  placeholder="点击选择" @click="chooseLocation"/></u-form-item>
			</u-form>
		</view>
		<view v-if="currentDeliveryType=='3'" class="delivery-section">
			<u-form :model="deliveryData">
				<u-form-item label="提货人姓名" label-width="250"><u-input type="text" v-model="deliveryData.deliveryName" placeholder="请输入姓名"/></u-form-item>
				<u-form-item label="提货人电话号码" label-width="250"><u-input type="number" v-model="deliveryData.deliveryContactNo" placeholder="请输入电话号码"/></u-form-item>
			</u-form>
		</view>

		<view class="goods-section">
			<view class="store">
				<view class="m-name" v-if="product.merchantDTO">
				{{product.merchantDTO.merchantName}}
				</view>
				<view class="m-address" v-if="currentDeliveryType=='3'" @click="openLocation(product.merchantDTO.latitude, product.merchantDTO.longitude)">
					{{product.merchantDTO.province||''}}{{product.merchantDTO.city||''}}{{product.merchantDTO.district||''}}{{product.merchantDTO.merchantAddress||''}}
				</view>
			</view>
			<view class="g-item">
				<image  v-if="product.productMainImage" :src="product.productMainImage.url"></image>
				<view class="right">
					<text class="title clamp">{{product.productName}}</text>
					<text class="spec" v-if="product.skuEnabled">
						<text v-for="sku in productSku.skuAttrValueList">{{sku.skuAttrValue}}</text>
					</text>
					<text class="spec" v-if="!product.skuEnabled">-</text>
					<view class="price-box">
						<text class="price">￥{{groupbuy.unitPrice}}</text>
						<text class="number">x {{unit}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip red">￥{{productAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip">￥{{deductAmount}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="currentDeliveryType=='1'">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">￥{{freightAmount}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="currentDeliveryType=='2'">
				<text class="cell-tit clamp">配送费</text>
				<text class="cell-tip">￥{{deliveryAmount}}</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="memo" :placeholder="memoPlaceHolder" placeholder-class="placeholder" />
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{actualAmount}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				tabCurrentIndex:0,
				currentDeliveryType:'',
				isDeliveryExpressEnabled:true,
				isDeliveryCityEnabled:true,
				isDeliveryPickEnabled:true,
				navList: [],
				quanlificationId: '',
				groupBuyProductId: '',
				groupBuyId:'',
				groupbuy:{
					unitPrice: 0.00
				},
				productId: '',
				product:{},
				productSkuId: '',
				productSku: {},
				productAmount: 0.00, //商品金额, 未扣减任何优惠
				deductAmount: 0.00, //优惠金额
				actualAmount: 0.00, //实付金额
				freightAmount: 0.00, //运费
				unit: '',
				addressData: {}, //收货地址
				deliveryData:{},	//配送地址
				deliveryAmount: 0.00, //配送费
				memo: '', //备注
				memoPlaceHolder: '请填写备注信息',
				type: ''
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			//商品数据
			this.quanlificationId = option.quanId;
			this.groupBuyProductId = option.groupBuyProductId;
			this.groupBuyId = option.groupBuyId;
			this.productId = option.productId;
			this.productSkuId = option.productSkuId;
			this.unit = option.unit
			this.inquiryGroupBuyById(this.groupBuyProductId);
			//全局支持的配送方式
			if(!this.applicationConfig.applicationDeliveryExpressEnabled){
				this.isDeliveryExpressEnabled = false;
			}
			if(!this.applicationConfig.applicationDeliveryCityEnabled){
				this.isDeliveryCityEnabled = false;
			}
			if(!this.applicationConfig.applicationDeliveryPickEnabled){
				this.isDeliveryPickEnabled = false;
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'applicationConfig'])
		},
		watch: {
			addressData(val) {
				this.calculateFreightAmount(this.groupBuyProductId, val.province, val.city, val.area);
			}
		},
		methods: {
			tabClick(index,item) {
				this.tabCurrentIndex = index;
				this.currentDeliveryType = item.state;
				if(this.currentDeliveryType=='1'){
					this.actualAmount = this.toActualAmount(this.productAmount,this.deductAmount,this.freightAmount);
				}else if(this.currentDeliveryType=='2'){
					this.actualAmount = this.toActualAmount(this.productAmount,this.deductAmount,this.deliveryAmount);
				}else if(this.currentDeliveryType=='3'){
					this.actualAmount = this.toActualAmount(this.productAmount,this.deductAmount,0.00);
				}
			},
			toActualAmount(productAmount,deductAmount,freightAmount){
				return (productAmount - deductAmount + freightAmount).toFixed(2);
			},
			//查询默认收货地址
			inquiryDefaultAddress(userUuid) {
				let that = this;
				let postData = {
					userDTO: {
						userUuid: userUuid
					}
				}
				this.$api.request.userShip(postData, res => {
					if (res.body.status.statusCode === '0') {
						res.body.data.addresses.forEach(function(val, index) {
							if (val.default) {
								that.addressData = val;
							}
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//查询团购活动
			inquiryGroupBuyById(groupBuyProductId) {
				let that = this;
				let postData = {
					groupBuyProductUuid: groupBuyProductId
				}
				this.$api.request.groupBuy(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.groupbuy = res.body.data;
						this.product = res.body.data.productDTO;
						if(this.productSkuId){
							this.product.skuList.forEach(function(val,index){
								if(that.productSkuId === val.productSkuUuid){
									that.productSku = val;
								}
							})
						}
						that.productAmount = (that.groupbuy.unitPrice * this.unit).toFixed(2);
						this.actualAmount = this.toActualAmount(this.productAmount,this.deductAmount,this.freightAmount);
						if(!that.product.deliveryExpressEnabled){
							that.isDeliveryExpressEnabled = false;
						}
						if(!that.product.deliveryCityEnabled){
							that.isDeliveryCityEnabled = false;
						}
						if(!that.product.deliveryPickEnabled){
							that.isDeliveryPickEnabled = false;
						}
						//商品支持的发货方式
						this.populateDeliveryType();
						//实物商品查询收货地址
						if(this.product.productType=='1')
							this.inquiryDefaultAddress(this.userInfo.userUuid);
						//虚拟商品需填写联系方式
						else if(this.product.productType=='2')
							this.memoPlaceHolder = '虚拟商品, 请务必填写手机号码以便商家联系!';
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//打开商家地址
			openLocation(latitude,longitude){
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function () {
						console.log('打开地图成功');
					}
				});
			},
			//选择配送地址
			chooseLocation(){
				let that = this;
				uni.chooseLocation({
					success: function (res) {
						that.$set(that.deliveryData, 'deliveryStreet', res.address+res.name);
						that.$set(that.deliveryData, 'deliveryLatitude', res.latitude);
						that.$set(that.deliveryData, 'deliveryLongitude', res.longitude);
						that.calculateDeliveryAmount(that.groupBuyProductId, res.latitude, res.longitude);
					}
				});
			},
			//支持的发货方式
			populateDeliveryType(){
				if(this.isDeliveryExpressEnabled){
					this.navList.push({state:'1',text:'快递配送'});
				}
				if(this.isDeliveryCityEnabled){
					this.navList.push({state:'2',text:'同城配送'});
				}
				if(this.isDeliveryPickEnabled){
					this.navList.push({state:'3',text:'门店自提'});
				}
				if(this.navList.length>0)
					this.currentDeliveryType = this.navList[0].state;	//第一个为默认选择
			},
			// 计算运费金额
			calculateFreightAmount(groupBuyProductId, province, city, area) {
				let that = this;
				let postData = {
					groupBuyProduct:{
						groupBuyProductUuid: groupBuyProductId
					},
					orderDTO:{
						deliveryProvince: province,
						deliveryCity: city,
						deliveryArea: area,
						productUnit: this.unit
					}
				}
				this.$api.request.calculateGroupBuyFreightAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						that.freightAmount = res.body.data.orderDTO.freightAmount;
						that.actualAmount = that.toActualAmount(that.productAmount,that.deductAmount,that.freightAmount);
					} else {
						that.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			// 计算同城配送费金额
			calculateDeliveryAmount(groupBuyProductId, deliveryLatitude, deliveryLongitude) {
				let that = this;
				let postData = {
					groupBuyProduct:{
						groupBuyProductUuid: groupBuyProductId
					},
					orderDTO:{
						productUnit: this.unit,
						deliveryLatitude: deliveryLatitude,
						deliveryLongitude: deliveryLongitude
					}	
				}
				this.$api.request.calculateGroupBuyDeliveryAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						that.deliveryAmount = res.body.data.orderDTO.deliveryAmount;
						//同城配送
						if(that.currentDeliveryType=='2')
							that.actualAmount = that.toActualAmount(that.productAmount,that.deductAmount,that.deliveryAmount);
					} else {
						that.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			//计算总金额
			calcSelectedProductAmount(cartData) {
				var amount = 0;
				cartData.forEach(function(val, index) {
					if (val.productDTO.skuEnabled) {
						amount = amount + val.productSkuDTO.skuUnitPrice * val.unit;
					} else {
						amount = amount + val.productDTO.unitPrice * val.unit;
					}
				})
				return amount;
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break

					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			submit() {
				//检查收货地址是否选择
				if ((this.currentDeliveryType=='1')&&!this.addressData.userDeliveryAddressUuid) {
					this.$api.msg('未选择快递收货地址');
					return;
				}
				//检查配送地址是否选择
				if ((this.currentDeliveryType=='2')&&(!this.deliveryData.deliveryStreet||!this.deliveryData.deliveryName||!this.deliveryData.deliveryContactNo)) {
					this.$api.msg('配送地址未填写完整');
					return;
				}
				//检查提货人是否选择
				if ((this.currentDeliveryType=='3')&&(!this.deliveryData.deliveryName||!this.deliveryData.deliveryContactNo)) {
					this.$api.msg('提货人信息未填写完整');
					return;
				}
				//post订单数据到后台
				let postData = {
					groupBuyUuid: this.groupBuyId,
					groupBuyProduct: {
						groupBuyProductUuid: this.groupBuyProductId
					},
					orderDTO: {
						userDTO: {
							userUuid: this.userInfo.userUuid
						},
						deliveryAddressDTO: {
							userDeliveryAddressUuid: this.addressData.userDeliveryAddressUuid
						},
						deliveryName: this.deliveryData.deliveryName,
						deliveryContactNo: this.deliveryData.deliveryContactNo,
						deliveryLatitude: this.deliveryData.deliveryLatitude,
						deliveryLongitude: this.deliveryData.deliveryLongitude,
						deliveryStreet: this.deliveryData.deliveryStreet,
						deliveryType: this.currentDeliveryType,
						productUnit: this.unit,
						memo: this.memo
					},
					productDTO: {
						productUuid: this.productId
					},
					productSkuDTO: {
						productSkuUuid: this.productSkuId
					},
					owner: (this.groupBuyId!=null&&this.groupBuyId!=''&&this.groupBuyId!='undefined')?false:true
				}
				this.$api.request.createGroupBuyOrder(postData, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/money/pay?orderNo=' + res.body.data.orderNo
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			stopPrevent() {}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}
	.store{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 40upx 30upx 0 30upx;
		font-size: $font-sm;
		color: $font-color-dark;
		.m-name{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.m-address{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 200px;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.delivery-section{
		background-color: #fff;
		padding: 20upx 30upx 0 30upx;
	}
	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-light;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}

			& .close {
				color: $font-color-light;
				margin-left: 20upx;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
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
</style>
