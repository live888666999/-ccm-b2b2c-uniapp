<template>
	<view class="content">
		<view class="search-section">
			<u-search placeholder="输入城市名或首字母进行搜索" v-model="abbrCharacter" :show-action="false"  @change="searchCity"></u-search>
		</view>
		<view class="current-city" v-if="currentCity">
			<view class="tip">当前城市</view>
			<u-grid :border="false" :col="4">
				<u-grid-item bg-color="#f5f5f5">
					<u-button type="primary" size="mini" plain>{{currentCity}}</u-button>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="hot-city">
			<view class="tip">热门城市</view>
			<u-grid :border="false" :col="4">
				<u-grid-item bg-color="#f5f5f5" :key="city" v-for="city in hotCityList">
					<u-button type="default" size="mini" plain @click="selectCity(city)">{{city}}</u-button>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="all-city">
			<u-index-list :scrollTop="scrollTop">
				<view v-for="(item, index) in groupCityList" :key="index">
					<u-index-anchor :index="item.key" />
					<view class="list-cell" :key="city.areaId" v-for="city in item.value"  @click="selectCity(city.name)">
						{{city.name}}
					</view>
				</view>
			</u-index-list>
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
				abbrCharacter:'',
				scrollTop: 0,
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
					"V", "W", "X", "Y", "Z"
				],
				cityList:[],
				hotCityList:['上海市','北京市','广州市','深圳市','成都市','杭州市','苏州市','重庆市','武汉市','南京市'],
				groupCityList:[],
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(e){
			//先使用缓存
			this.cityList = uni.getStorageSync("city");
			if(this.cityList){
				this.groupCityList = this.groupCity(this.indexList,this.cityList);
			}
			//同时后台查询并更新到缓存
			this.inquiryCity();
		},
		computed: {
			...mapState(['currentCity'])
		},
		methods: {
			...mapMutations(['changeCity']),
			selectCity(city){
				this.changeCity(city);
				uni.navigateBack();
			},
			//搜索城市
			inquiryCity() {
				this.$api.request.inquiryCity({}, res => {
					if (res.body.status.statusCode === '0') {
						this.cityList = res.body.data.areas;
						this.groupCityList = this.groupCity(this.indexList,this.cityList);
						uni.setStorageSync('city',this.cityList);
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			groupCity(indexList,cityList){
				let groupList = [];
				indexList.forEach(function(val,index){
					let fc = val;	//首字母
					let group = {
						key: fc,
						value:[]
					}
					cityList.forEach(function(city,cityIndex){
						let firstCharacter = city.firstCharacter;
						if(firstCharacter==fc){
							group.value.push(city);
						}
					})
					groupList.push(group);
				})
				return groupList;
			},
			searchCity(e){
				let key = e.trim().toUpperCase();
				if(key){
					let matchList = [];
					this.cityList.forEach(function(val,index){
						let name = val.name;
						let abbr = val.abbrCharacter;
						if(name.indexOf(key)!=-1){
							matchList.push(val);
						}else if(abbr.indexOf(key)!=-1){
							matchList.push(val);
						}
					})
					this.groupCityList = this.groupCity(this.indexList,matchList);
				}else{
					this.groupCityList = this.groupCity(this.indexList,this.cityList);
				}
				
			}
		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}
	.content{
		margin: 10upx;
	}
	.search-section{
		background: #fff;
		padding: 20upx;
	}
	.current-city{
		margin: 40upx 0;
	}
	.hot-city{
		margin: 40upx 0;
	}
	.tip{
		color: #666;
		margin: 20upx 0;
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 20upx 24upx;
		overflow: hidden;
		color: #666;
		font-size: 24upx;
		line-height: 40upx;
		background-color: #fff;
		border-bottom: solid .5px #f5f5f5;
	}
</style>
