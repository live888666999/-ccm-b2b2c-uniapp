<template>
	<view>
		<!-- 地址 -->
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
			<!-- 商品列表 -->
			<view v-for="cart in carts">
				<view class="store">
					<view class="m-name">
					{{cart.productDTO.merchantDTO.merchantName}}
					</view>
					<view class="m-address" v-if="currentDeliveryType=='3'" @click="openLocation(cart.productDTO.merchantDTO.latitude, cart.productDTO.merchantDTO.longitude)">
						{{cart.productDTO.merchantDTO.province||''}}{{cart.productDTO.merchantDTO.city||''}}{{cart.productDTO.merchantDTO.district||''}}{{cart.productDTO.merchantDTO.merchantAddress||''}}
					</view>
				</view>
				<view class="g-item">
					<image :src="cart.productDTO.productMainImage.url"></image>
					<view class="right">
						<text class="title clamp">{{cart.productDTO.productName}}</text>
						<text class="spec" v-if="cart.productDTO.skuEnabled">
							<text v-for="sku in cart.productSkuDTO.skuAttrValueList">{{sku.skuAttrValue}}</text>
						</text>
						<text class="spec" v-if="!cart.productDTO.skuEnabled">-</text>
						<view class="price-box">
							<text class="price" v-if="cart.productDTO.skuEnabled">￥{{cart.productSkuDTO.skuUnitPrice}}</text>
							<text class="price" v-if="!cart.productDTO.skuEnabled">￥{{cart.productDTO.unitPrice}}</text>
							<text class="number">x {{cart.unit}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细, 如果商品包含多个商家则不能使用优惠券 -->
		<view class="yt-list" v-if="!isMultipleMerchant">
			<view class="yt-list-cell b-b">
				<!-- <view class="yt-list-cell b-b" @click="toggleMask('show')"> -->
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active" v-if="coupons.length==0">
					<text>无可用优惠券</text>
				</text>
				<text class="cell-tip active" v-if="coupons.length>0" @click="togglePopup('bottom', 'coupon')">
					<text v-if="!selectedCoupon.userCouponUuid">不使用优惠券</text>
					<text v-if="selectedCoupon.userCouponUuid">
						<text v-if="selectedCoupon.couponDTO.conditionAmount>0">满{{selectedCoupon.couponDTO.conditionAmount}}</text>
						<text v-else>立</text>
						<text v-if="selectedCoupon.couponDTO.type=='CASH'">减{{selectedCoupon.couponDTO.benefitCash}}</text>
						<text v-if="selectedCoupon.couponDTO.type=='DISCOUNT'">享{{selectedCoupon.couponDTO.benefitDiscount/10}}折</text>
					</text>
				</text>
				<text class="cell-tip">
					<text @click="clearSelectedCoupon" v-if="selectedCoupon.userCouponUuid" class="close yticon icon-shanchu4"></text>
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
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
				<text class="price">{{actualAmount.toFixed(2)}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showcoupon" :type="type" @change="change">
			<scroll-view scroll-y="true" class="coupon-list">
				<view class="coupon-list-item" v-if="item.userCouponUuid!=selectedCoupon.userCouponUuid" v-for="item in coupons">
					<u-row>
						<u-col span="4">
							<view class="coupon-left">
								<view class="c1">
									<text class="amount" v-if="item.couponDTO.type=='CASH'">{{item.couponDTO.benefitCash}}</text>
									<text class="discount" v-if="item.couponDTO.type=='DISCOUNT'">{{item.couponDTO.benefitDiscount/10}}</text>
								</view>
								<view class="c2">
									<text v-if="item.couponDTO.conditionAmount>0"> 满{{item.couponDTO.conditionAmount}}元可用</text>
									<text v-else> 无门槛</text>
								</view>
							</view>
						</u-col>
						<u-col offset="2" span="6" class="coupon-right">
							<view class="c1">
								<text v-if="item.couponDTO.benefitType=='0'">全场通用</text>
								<text v-if="item.couponDTO.benefitType=='1'">指定商品</text>
							</view>
							<view class="c2">
								<text> 有效期至{{item.endDate}}</text>
							</view>
							<view class="c3">
								<u-button plain size="mini " type="error"  @click="selectCoupon(item)">立即使用</u-button>
							</view>
						</u-col>
					</u-row>
				</view>
			</scroll-view>
		</uni-popup>
		<u-modal @confirm="navigateBack" v-model="isMultipleProductType" :show-title="false"  :content="multipleProductTypeContent"></u-modal>
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
				cartIds: [],
				carts: [], //结算的商品
				productAmount: 0.00, //商品金额, 未扣减任何优惠
				deductAmount: 0.00, //优惠金额
				actualAmount: 0.00, //实付金额
				freightAmount: 0.00, //运费
				deliveryData:{},	//配送地址
				deliveryAmount: 0.00, //配送费
				addressData: {}, //收货地址
				maskState: 0, //优惠券面板显示状态
				memo: '', //备注
				memoPlaceHolder: '请填写备注信息',
				payType: 1, //1微信 2支付宝
				coupons: [], //有效优惠券
				selectedCoupon: {}, //选择使用的优惠券
				type: '',
				isMultipleMerchant: false, //订单是否包含多商家商品
				isMultipleProductType: false,//订单是否寄包含实物商品又包含虚拟商品
				multipleProductTypeContent: '订单中商品类型不一致(如实物商品, 虚拟商品, 电子卡券),需分开购买.'
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			//商品数据
			var cart_id = JSON.parse(option.data);
			if (cart_id.length < 0) {
				uni.navigateBack({
					delta: 1
				})
			}
			this.cartIds = cart_id;
			//如果开启了门店
			if(this.applicationConfig.applicationMerchantEnabled){
				this.navList.push({
						state: '2',
						text: '门店自提'
					})
			}
			this.inquiryProductByCartId(this.cartIds);
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
				this.calculateFreightAmount(this.cartIds, val.province, val.city, val.area);
			}
		},
		methods: {
			navigateBack(){
				uni.navigateBack();
			},
			tabClick(index,item) {
				this.tabCurrentIndex = index;
				this.currentDeliveryType = item.state;
				if(this.currentDeliveryType=='1'){
					this.actualAmount = this.productAmount - this.deductAmount + this.freightAmount;
				}else if(this.currentDeliveryType=='2'){
					this.actualAmount = this.productAmount - this.deductAmount + this.deliveryAmount;
				}else if(this.currentDeliveryType=='3'){
					this.actualAmount = this.productAmount - this.deductAmount;
				}
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
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//查询订单商品
			inquiryProductByCartId(cardIds) {
				let that = this;
				let postData = cardIds.split(',');
				this.$api.request.productByCardIds(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.carts = res.body.data.carts;
						var productAmount = this.calcSelectedProductAmount(this.carts);
						this.productAmount = productAmount.toFixed(2);
						this.actualAmount = this.productAmount - this.deductAmount + this.freightAmount;
						//是否包含多个商家商品, 是否多支持快递配送, 同城配送, 门店自提
						this.carts.forEach(function(val,index){
							if(that.carts[index].productDTO.merchantDTO.merchantUuid!=that.carts[0].productDTO.merchantDTO.merchantUuid){
								that.isMultipleMerchant = true;			
							}
							if(that.carts[index].productDTO.productType!=that.carts[0].productDTO.productType){
								that.isMultipleProductType = true;			
							}
							if(!that.carts[index].productDTO.deliveryExpressEnabled){
								that.isDeliveryExpressEnabled = false;
							}
							if(!that.carts[index].productDTO.deliveryCityEnabled){
								that.isDeliveryCityEnabled = false;
							}
							if(!that.carts[index].productDTO.deliveryPickEnabled){
								that.isDeliveryPickEnabled = false;
							}
						})
						//单商家商品, 搜索优惠券
						if(!that.isMultipleMerchant){
							that.searchCoupon();
						}
						//虚拟商品提示填写联系方式
						if(this.carts[0].productDTO.productType=='2'){
							this.memoPlaceHolder = '虚拟商品, 请务必填写手机号码以便商家联系!';
						}
						//实物商品查询收货地址
						if(this.carts[0].productDTO.productType=='1')
							this.inquiryDefaultAddress(this.userInfo.userUuid);
						//商品支持的发货方式
						this.populateDeliveryType();
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
						that.calculateDeliveryAmount(that.cartIds, res.latitude, res.longitude);
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
			//搜索可用优惠券
			searchCoupon() {
				var keyArray = ['USER', 'IS_EXPIRED', 'IS_USED', 'IS_STARTED'];
				let postData = {
					keyArray: keyArray,
					userUuid: this.userInfo.userUuid,
					expired: false,
					used: false,
					started: true,
					startIndex: 0,
					pageSize: 50 //默认查询50张有效优惠券, 用户大于50张则多余部分不会显示
				};
				//只查询适用于该商家的优惠券(不适用于跨商家订单)
				if(!this.isMultipleMerchant){
					keyArray.push('MERCHANT');
					postData.merchantUuid = this.carts[0].productDTO.merchantDTO.merchantUuid;
				}
				postData.keyArray = keyArray;
				//加载中
				this.$api.request.userCoupon(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.userCoupons;
						this.coupons = coupons;
					}
				}, true);
			},
			// 不使用优惠券
			clearSelectedCoupon() {
				this.selectedCoupon = {};
				this.deductAmount = 0.00;
				this.actualAmount = this.productAmount - this.deductAmount + this.freightAmount;
			},
			// 选中优惠券
			selectCoupon(item) {
				//计算当前商品使用优惠券后的优惠金额
				let postData = {
					shoppingCartUuidList: this.cartIds.split(','),
					userCouponDTO: {
						couponDTO: {
							couponUuid: item.couponDTO.couponUuid
						}
					}
				}
				this.$api.request.calculateCouponAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.deductAmount = res.body.data.deductAmount;
						this.actualAmount = this.productAmount - this.deductAmount + this.freightAmount;
						this.selectedCoupon = item;
						this.$refs.showcoupon.close();
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			// 计算运费金额
			calculateFreightAmount(item, province, city, area) {
				let postData = {
					shoppingCartUuidList: this.cartIds.split(','),
					deliveryProvince: province,
					deliveryCity: city,
					deliveryArea: area
				}
				this.$api.request.calculateFreightAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.freightAmount = res.body.data.freightAmount;
						this.actualAmount = this.productAmount - this.deductAmount + this.freightAmount;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			// 计算同城配送费金额
			calculateDeliveryAmount(item, deliveryLatitude, deliveryLongitude) {
				let postData = {
					shoppingCartUuidList: this.cartIds.split(','),
					deliveryLatitude: deliveryLatitude,
					deliveryLongitude: deliveryLongitude
				}
				this.$api.request.calculateDeliveryAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.deliveryAmount = res.body.data.deliveryAmount;
						//同城配送
						if(this.currentDeliveryType=='2')
							this.actualAmount = this.productAmount - this.deductAmount + this.deliveryAmount;
					} else {
						this.$api.msg(res.body.status.errorDesc);
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
			//显示优惠券面板
			toggleMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(() => {
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type) {
				this.payType = type;
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
					actionType: 'ADD',
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
					memo: this.memo,
					shoppingCartUuidList: this.cartIds.split(',')
				}
				if (this.selectedCoupon.userCouponUuid) {
					postData.userCouponDTO = {
						userCouponUuid: this.selectedCoupon.userCouponUuid,
						couponDTO: {
							couponUuid: this.selectedCoupon.couponDTO.couponUuid
						}
					}
				}
				this.$api.request.createOrder(postData, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/money/pay?pOrderNo=' + res.body.data.pOrderNo
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

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
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

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}

	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10upx;
		border-radius: 20upx;
		margin-bottom: 100upx;
		height: 700upx;
		.coupon-list-item {
			width: 100%;
			height: 110px;
			margin: 10upx 0;
			background-image: url('../../static/image/coupon_bg.png');
			background-repeat:no-repeat;
			background-size:100% 100%;
			border-radius: 5px;
			.coupon-left {
				text-align: center;
				color: #fff;
				.c1{
					height: 80px;
					line-height: 80px;
					.amount{
						font-size: 100upx;
						font-weight: 900;
						&:before{
							content: '￥';
							font-size: $font-lg;
						}
					}
					
					.discount{
						font-size: 100upx;
						font-weight: 900;
						&:after{
							content: '折';
							font-size: $font-lg;
						}
					}
				}
				.c2{
					font-size: $font-sm;
				}
			}
			
			.coupon-right {
				color: #fff;
				text-align: center;
				.c1{
					padding-top: 20upx;
				}
				.c2{
					padding-top: 10upx;
					font-size: $font-sm;
				}
				.c3{
					padding-top: 30upx;
				}
			}
			image{
				height: 100upx;
				width: 100upx;
			}
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
