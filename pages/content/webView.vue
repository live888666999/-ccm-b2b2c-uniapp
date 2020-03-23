<template>
	<view class="content">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		components: {
				
		},
		data() {
			return {
				src:''
			};
		},
		
		onLoad(options){
			this.src = options.src;
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
</style>
