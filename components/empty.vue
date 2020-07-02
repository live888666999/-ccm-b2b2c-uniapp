<template>
	<view class="empty-content">
		<image class="empty-content-image" :src="setSrc" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: 'empty'
			},
		},

		data() {
			return {
				typeSrc: {
					empty: '../static/image/empty.png'
				},
			}
		},

		computed: {
			setSrc() {
				return this.typeSrc[this.src];
			},
		}
	}
</script>

<style lang="scss">
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: $page-color-base;
		padding-bottom: 120upx;

		&-image {
			width: 200upx;
			height: 200upx;
		}
	}
</style>
