<template>
	<view class="container">
		<view class="about-text">
			<text class="tit">{{applicationConfig.applicationDesc}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				name: ''
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo','applicationConfig'])
		},
		methods: {

		},
		mounted() {
			
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}
	.about-text{
		padding: 30upx;
		font-size: $font-sm;
	}

</style>
