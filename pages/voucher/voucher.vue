<template>
	<view class="content">
		<view class="voucher" v-for="voucher in vouchers">
			<view class="voucher-text">
				<view class="voucher-title">
					{{voucher.name}}
				</view>
				<view class="voucher-merchant">
					{{voucher.merchantDTO.merchantName}}
				</view>
				<view class="voucher-date">
					有效期: {{voucher.validStartDate}} 至 {{voucher.validEndDate}}
				</view>
				<view class="voucher-divider">
					<u-divider>请出示二维码给商家核销</u-divider>
				</view>
				<view class="voucher-code">
					核销码: {{voucher.voucherCode}}
				</view>
				<view class="voucher-qrcode">
					<u-image width="400" height="400" :src="voucher.qrCodeUrl" :fade="true" duration="450" :lazy-load="true"></u-image>
				</view>
				<view class="voucher-used" v-if="voucher.used">
					<u-image width="100" height="100" src="../../static/image/used.png" :fade="true" duration="450" :lazy-load="true"></u-image>
				</view>
				<view class="voucher-btn">
					<u-button @click="saveVoucher(voucher.qrCodeUrl,voucher.voucherCode)" type="error" :ripple="true" shape="square" size="medium" plain>保存到相册</u-button>
				</view>
				
				<view class="voucher-desc">
					<view class="title">
						使用须知
					</view>
					<view>
						{{voucher.memo}}
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			
		},
		data() {
			return {
				orderNo:'',
				vouchers:[]
			};
		},

		onLoad(options) {
			this.orderNo = options.orderNo;
			this.inquiryVoucher();
		},
		onPullDownRefresh(){
			this.inquiryVoucher();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			//搜索优惠券
			inquiryVoucher() {
				let that = this;
				var postData = {
					orderDTO: {
						orderNo: this.orderNo
					}
				}
				this.$api.request.voucherList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var vouchers = res.body.data.vouchers;
						this.vouchers = vouchers;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				},false);
			},
			// 保存卡券到本地
			saveVoucher(qrCodeUrl,voucherCode) {
				let _this = this;
				// #ifdef H5 
				_this.downloadIamge(qrCodeUrl, voucherCode);
				// #endif
			
				// #ifdef MP || MP-ALIPAY || APP-PLUS || APP-PLUS-NVUE
				_this.downloadImageOfMp(_this.poster)
				// #endif
			},
			//下载图片地址和图片名
			downloadIamge(imgsrc, name) {
				var image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute('crossorigin', 'anonymous');
				image.onload = () => {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0, image.width, image.height);
					var url = canvas.toDataURL('image/png'); //得到图片的base64编码数据
					var a = document.createElement('a'); // 生成一个a元素
					var event = new MouseEvent('click'); // 创建一个单击事件
					a.download = name || 'photo'; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = imgsrc;
			},
			downloadImageOfMp (image) {
				let _this = this
				
				// #ifdef APP-PLUS
				uni.downloadFile({
					url: image,
					success (res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success() {
								_this.$api.msg('保存成功');
							},
							fail() {
								_this.$api.msg('图片保存失败');
							}
						});
					},
					fail (res) {
						_this.$api.msg('图片保存失败');
					}
				})
				// #endif
				
				// #ifdef MP
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success() {
						// 先下载到本地
						uni.downloadFile({
							url: image,
							success (res) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success() {
										_this.$api.msg('保存成功');
									},
									fail() {
										_this.$api.msg('图片保存失败');
									}
								});
							},
							fail (res) {
								_this.$api.msg('图片保存失败');
							}
						})
					},
					fail() {
						//console.log('授权失败')
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $page-color-base;
	}
	.content{
		
	}
	.voucher{
		background-color: #fff;
		margin: 20upx 20upx 40upx 20upx;
		padding: 30upx;
	}
	.voucher-text{
		
		.voucher-title{
			color: $font-color-dark;
			font-size: $font-lg;
			margin-bottom: 10upx;
		}
		.voucher-merchant{
			color: $font-color-light;
			font-size: $font-base;
			margin-bottom: 10upx;
		}
		.voucher-desc{
			color: $font-color-light;
			font-size: $font-sm;
			margin-top: 40upx;
			.title{
				margin-bottom: 10upx;
				color: $font-color-base;
				font-size: $font-base;
			}
		}
		.voucher-date{
			color: #2979ff;
			font-size: $font-base;
			margin-bottom: 10upx;
		}
		.voucher-divider{
			margin: 40upx 0 20upx 0;
		}
		.voucher-code{
			margin: 0 15%;
			background-color: #f5f5f5;
			padding: 5px;
			text-align: center;
			color: $font-color-light;
			font-size: $font-base;
		}
		.voucher-qrcode{
			display: flex;
			justify-content: center;
		}
		.voucher-used{
			position: absolute;
			right: 30px;
		}
		.voucher-btn{
			display: flex;
			justify-content: center;
			margin-top: 40upx;
		}
	}
</style>
