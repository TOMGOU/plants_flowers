<template>
	<view class="index">
		<swiper @change="swpierChange" :style="{height:screenHeight + 'px'}">
			<swiper-item v-for="(value,index) in data" :key="value" @click="preImg(index)">
				<image :src="value" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- #ifndef H5 -->
		<view class="detail-btn-view">
			<view class="download" @click="download"></view>
			<!-- <view class="collect" @click="collect"></view> -->
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				owner: process.env.OWNER,
				names: {
					biao: '春风十里绿植花卉馆',
					tang: '绿植花卉租摆大亨',
					yu: '雨哥园林'
				},
				mapids: {
					biao: 'wx7b7a9bb81e710524',
					tang: 'wx7b7a9bb81e710524',
					yu: 'wx6c4c98ac2494e375'
				},
				detailDec: ""
			}
		},
		computed: {
			name() {
				return this.names[this.owner]
			},
			mapid() {
				return this.mapids[this.owner]
			},
		},
		onLoad(e) {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.detailDec = e.data;
			let data = JSON.parse(decodeURIComponent(e.data));
			this.imgLength = data.img_num;
			this.data.push(data.img_src);
			const template = data.img_src.split('/1.')
			const marks = {
				biao: 'aHR0cHM6Ly9mbG93ZXItMTMwNDU0NDUzOC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS90ZXN0L3dtLmpwZw==',
				tang: 'aHR0cHM6Ly9mbG93ZXItMTMwNDU0NDUzOC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS90ZXN0L3R5LmpwZw==',
				yu: 'aHR0cHM6Ly9mbG93ZXItMTMwNDU0NDUzOC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS90ZXN0L3l1LmpwZWc='
			}
			const watermark = `?watermark/1/image/${marks[this.owner]}/gravity/southeast/dissolve/30/`
			for (let i = 2;i <= this.imgLength;i++) {
				this.data.push(`${template[0]}/${i}.${template[1]}${watermark}`)
			}
			// this.getData(data.id);
			uni.setNavigationBarTitle({
				title: "1/" + this.imgLength
			});
			// 获取分享通道
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		onShareAppMessage() {
			return {
				title: '绿植们的自拍时刻',
				path: '/pages/detail/detail?data=' + this.detailDec,
				imageUrl: this.data[this.index],
				mpId: this.mapid
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				// #ifdef APP-PLUS
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: 'uni-app模版',
							summary: '欢迎使用uni-app模版',
							imageUrl: this.data[this.index],
							href: 'https://uniapp.dcloud.io',
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				});
				// #endif
				// #ifdef H5
				this.collect();
				// #endif
			}
		},
		methods: {
			download() {
				uni.downloadFile({
					url: this.data[this.index],
					success: (e) => {
						uni.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: () => {
								uni.showToast({
									icon: 'none',
									title: '已保存到手机相册'
								})
							},
							fail: () => {
								uni.showToast({
									icon: 'none',
									title: '保存到手机相册失败'
								})
							}
						});
					},
					fail: (e) => {
						uni.showModal({
							content: '下载失败，' + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			collect() {
				uni.showToast({
					icon: 'none',
					title: '点击收藏按钮'
				})
			},
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + '/' + this.imgLength
				})
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				console.log({
						current: this.data[index],
						urls: this.data
					})
				setTimeout(() => {
					uni.previewImage({
						current: this.data[index],
						urls: this.data
					})
				}, 150)
			},
			getData(e) {
				uni.request({
					url: this.$serverUrl + '/api/picture/detail.php?id=' + e,
					success: (res) => {
						if (res.data.code !== 0) {
							uni.showModal({
								content: '请求失败，失败原因：' + res.data.msg,
								showCancel: false
							})
							return;
						}

						this.data = this.data.concat(res.data.data);
					},
					fail: () => {
						uni.showModal({
							content: '请求失败，请重试!',
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #000;
		height: 100%;
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750upx;
		height: 1125upx;
	}
</style>
