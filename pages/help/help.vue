<template>
	<view>
		<!-- 热门, 全部 -->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<view class="hot-wrapper" v-if="tabCurrentIndex==0">
			<uni-list>
			    <uni-list-item @click="navDetail(item)" v-for="(item,index) in hotQas" :title="item.title" :show-extra-icon="true" :extra-icon="{color: '#909399',size: '22',type: 'help-filled'}"></uni-list-item>
			</uni-list>
		</view>
		<view class="all-wrapper" v-if="tabCurrentIndex==1">
			<view class="tag-view">
				<view v-for="(item,index) in tags" :key="item.tagUuid" class="tag-item">
					<uni-tag :type="item.type" :text="item.tagName" @click="selectTag(item)" />
				</view>
				
			</view>
			<view class="qa-wrapper">
				<uni-list>
				    <uni-list-item @click="navDetail(item)" v-for="(item,index) in qas" :title="item.title" :show-extra-icon="true" :extra-icon="{color: '#909399',size: '22',type: 'help-filled'}"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="contact-btn" open-type='contact'>人工客服</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				tabCurrentIndex:0,
				navList: [{
						state: '1',
						text: '热门'
					},{
						state: '1',
						text: '全部'
					}],
				hotQas:[],	//热门问题
				qas:[],	//分类问题
				tags:[]	//分类标签
			}
		},
		components: {
			uniList,
			uniListItem,
			uniTag
		},
		onLoad(option) {
			this.inquiryTag();
			this.inquiryHotQa();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'applicationConfig'])
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;
				if(index==1){
					this.actualAmount = this.productAmount - this.deductAmount;
				}else if(index==0){
					this.actualAmount = this.productAmount - this.deductAmount + this.freightAmount;
				}
			},
			//查询热门问题
			inquiryHotQa() {
				let that = this;
				this.$api.request.hotQaList({}, function(res) {
					if (res.body.status.statusCode === '0') {
						that.hotQas = res.body.data.qas;
					}
				})
			},
			//根据标签查找问题
			inquiryQaByTag(item) {
				let that = this;
				this.$api.request.qaList({
					tagDTO:{
						tagName:item.tagName
					}
				}, function(res) {
					if (res.body.status.statusCode === '0') {
						that.qas = res.body.data.qas;
					}
				})
			},
			//查询问题标签
			inquiryTag() {
				let that = this;
				this.$api.request.inquiryTag({tagType:'QA'}, function(res) {
					if (res.body.status.statusCode === '0') {
						let tags = res.body.data.tags;
						that.tag = [];
						if(tags.length>0){
							tags.forEach(function(val,index){
								val.type="default";
								that.tags.push(val);
							})
							that.selectTag(tags[0]);
						}
					}
				})
			},
			//选中标签
			selectTag(tag){
				this.tags.forEach(function(val,index){
					if(val.tagUuid == tag.tagUuid){
						val.type='primary';
					}else{
						val.type='default';
					}
				})
				this.inquiryQaByTag(tag)
			},
			//点击问题
			navDetail(qa){
				if(qa.previewUrl){
					uni.navigateTo({
						url:'/pages/content/webView?src='+qa.previewUrl
					})
				}else{
					uni.navigateTo({
						url:'/pages/content/richText?content='+escape(JSON.stringify(qa.content))
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	.hot-wrapper{
		background: #fff;
		margin:0 10upx;
		padding-top:20upx;
	}
	.all-wrapper{
		background: #fff;
		.tag-view{
			padding:20upx 0;
			display: flex;
			flex-flow: row wrap;
			.tag-item{
				margin-left: 20upx;
				margin-top: 20upx;
			}
		}
	}
	.contact-btn {
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
