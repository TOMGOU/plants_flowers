<template>
	<view class="index">
		<block v-for="item in list" :key="item.img_src">
			<view class="card" @click="goDetail(item)">
				<image class="card-img" :src="item.img_src" mode="aspectFill"></image>
				<text class="card-num-view">{{item.img_num}}P</text>
				<view class="card-bottm row">
					<view class="car-title-view row">
						<text class="card-title">{{item.title}}</text>
					</view>
					<!-- <view @click.stop="share(item)" class="card-share-view" open-type="share"></view> -->
					<button @click.stop="shareFriend" class="card-share-button" open-type="share"></button>
				</view>
			</view>
		</block>
		<!-- <text class="loadMore">加载中...</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
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
				providerList: [],
				list: [
					{
						'id': "hl",
						'img_num': 27,
						'img_src': "https://flower-1304544538.cos.ap-guangzhou.myqcloud.com/opening/1.jpg",
						'name': "hl",
						'title': "花篮",
					},
					{
						'id': "hs",
						'img_num': 32,
						'img_src': "https://flower-1304544538.cos.ap-guangzhou.myqcloud.com/bouquet/1.jpg",
						'name': "hs",
						'title': "花束",
					},
					{
						'id': "qth",
						'img_num': 24,
						'img_src': "https://flower-1304544538.cos.ap-guangzhou.myqcloud.com/front/1.jpg",
						'name': "qth",
						'title': "前台花",
					},
				],
				fetchPageNum: 1
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
		onLoad() {
			// this.getData();
			uni.getProvider({
				service: 'share',
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
					console.log('获取分享通道失败', e);
				}
			});
			wx.showShareMenu({
        withShareTicket:true,
        //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
        menus:["shareAppMessage","shareTimeline"]
    	})
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '精选绿植花卉推荐', //分享的名称
				path: '/pages/new/new',
				mpId: this.mapId
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: this.name,
				type: 0,
				summary: "头疼？看看这些治愈系绿植花卉，保准药到病除。",
			}
		},
		methods: {
			getData() {
				uni.request({
					url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) +
						'&per_page=5',
					success: (ret) => {
						console.log('data', ret);
						if (ret.statusCode !== 200) {
							console.log('失败!');
						} else {
							if (this.refreshing && ret.data[0].id === this.list[0].id) {
								uni.showToast({
									title: '已经最新',
									icon: 'none',
								})
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.list = ret.data;
								this.fetchPageNum = 2;
							} else {
								this.list = this.list.concat(ret.data);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			},
			goDetail(e) {
				uni.navigateTo({
					url: '../detail/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			shareFriend() {
				console.log('share')
			},
			share(e) {
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
						console.log(this.providerList[res.tapIndex])
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							href: "http://uniapp.dcloud.io/",
							title: '标卉绿植馆',
							summary: e.title,
							imageUrl: e.img_src,
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
						// uni.share({
						// 	provider: this.providerList[res.tapIndex].id,
						// 	scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
						// 		'WXSenceTimeline' : 'WXSceneSession',
						// 	type: 0,
						// 	title: '标卉绿植馆',
						// 	summary: e.title,
						// 	imageUrl: e.img_src,
						// 	href: 'https://uniapp.dcloud.io',
						// 	success: (res) => {
						// 		console.log('success:' + JSON.stringify(res));
						// 	},
						// 	fail: (e) => {
						// 		uni.showModal({
						// 			content: e.errMsg,
						// 			showCancel: false
						// 		})
						// 	}
						// });
					}
				})
			}
		}
	}
</script>

<style>

</style>
