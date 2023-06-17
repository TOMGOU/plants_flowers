<template>
	<view class="index">
		<view class="grid">
			<view class="grid-c-06" v-for="item in lists" :key="item.title">
				<view class="panel" @click="goDetail(item)">
					<image class="card-img card-list2-img" :src="item.img_src"></image>
					<text class="card-num-view card-list2-num-view">{{item.img_num}}P</text>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">{{item.title}}</text>
						</view>
						<!-- <view @click.stop="share(item)" class="card-share-view"></view> -->
						<button @click.stop="shareFriend" class="card-share-button" open-type="share"></button>
					</view>
				</view>
			</view>
		</view>
		<!-- <text class="loadMore">加载中...</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
				lists: [
					{
						'id': "fcs",
						'img_num': 11,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/facaisshu/1.jpg",
						'name': "fcs",
						'title': "发财树",
					},
					{
						'id': "jqs",
						'img_num': 16,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/jinqianshu/1.jpg",
						'name': "jqs",
						'title': "金钱树",
					},
					{
						'id': "xfs",
						'img_num': 11,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/xingfushu/1.jpg",
						'name': "xfs",
						'title': "幸福树",
					},
					{
						'id': "fgs",
						'img_num': 9,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/fuguishu/1.jpg",
						'name': "fgs",
						'title': "富贵树",
					},
					{
						'id': "lxs",
						'img_num': 8,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/longxueshu/1.jpg",
						'name': "lxs",
						'title': "龙血树",
					},
					{
						'id': "ttn",
						'img_num': 8,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/tiantangniao/1.jpg",
						'name': "ttn",
						'title': "天堂鸟",
					},
					{
						'id': "qyr",
						'img_num': 9,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/qinyerong/1.jpg",
						'name': "qyr",
						'title': "琴叶榕",
					},
					{
						'id': "swk",
						'img_num': 5,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/sanweikui/1.jpg",
						'name': "swk",
						'title': "散尾葵",
					},
					// {
					// 	'id': "big",
					// 	'img_num': 12,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/big/1.jpg",
					// 	'name': "big",
					// 	'title': "大绿植",
					// },
					// {
					// 	'id': "small",
					// 	'img_num': 5,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/small/1.jpg",
					// 	'name': "small",
					// 	'title': "小绿植",
					// },
					// {
					// 	'id': "pot",
					// 	'img_num': 6,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/pot/1.jpg",
					// 	'name': "pot",
					// 	'title': "盆栽花",
					// },
					// {
					// 	'id': "green",
					// 	'img_num': 2,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/green/1.jpg",
					// 	'name': "green",
					// 	'title': "绿萝",
					// },
					// {
					// 	'id': "funny",
					// 	'img_num': 11,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/funny/1.webp",
					// 	'name': "funny",
					// 	'title': "搞笑",
					// },
					// {
					// 	'id': "office",
					// 	'img_num': 10,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/office/1.webp",
					// 	'name': "office",
					// 	'title': "办公",
					// },
					// {
					// 	'id': "test",
					// 	'img_num': 13,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/test/1.webp",
					// 	'name': "test",
					// 	'title': "测试",
					// },
					// {
					// 	'id': "demo",
					// 	'img_num': 10,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/demo/1.webp",
					// 	'name': "demo",
					// 	'title': "绿色",
					// },
					// {
					// 	'id': "tree",
					// 	'img_num': 14,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/tree/1.jpg",
					// 	'name': "tree",
					// 	'title': "绿植",
					// },
					// {
					// 	'id': "flower",
					// 	'img_num': 7,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/basket/1.jpeg",
					// 	'name': "flower",
					// 	'title': "花卉",
					// },
					// {
					// 	'id': "tree",
					// 	'img_num': 8,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/nba/1.jpeg",
					// 	'name': "tree",
					// 	'title': "手机",
					// },
					// {
					// 	'id': "flower",
					// 	'img_num': 14,
					// 	'img_src': "https://plants-1304544538.cos.ap-guangzhou.myqcloud.com/flower/1.jpg",
					// 	'name': "flower",
					// 	'title': "皮套",
					// },
				],
				fetchPageNum: 1
			}
		},
		onLoad() {
			// this.getData();
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败', e);
				}
			});
			wx.showShareMenu({
        withShareTicket:true,
        //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
        menus:["shareAppMessage","shareTimeline"]
    	})
		},
		// onPullDownRefresh() {
		// 	console.log('下拉刷新');
		// 	this.refreshing = true;
		// 	this.getData();
		// },
		// onReachBottom() {
		// 	this.getData();
		// },
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '精选绿植花卉推荐', //分享的名称
				path: '/pages/hot/hot',
				mpId:'wx7b7a9bb81e710524' //此处配置微信小程序的AppId
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: '标卉绿植馆',
				type: 0,
				summary: "精选绿植花卉推荐，让你的生活和工作更有趣味",
			}
		},
		methods: {
			getData() {
				uni.request({
					url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) +
						'&per_page=10',
					success: (ret) => {
						console.log(ret)
						if (ret.statusCode !== 200) {
							console.log('请求失败:', ret)
						} else {
							if (this.refreshing && ret.data[0].id === this.lists[0].id) {
								uni.showToast({
									title: '已经最新',
									icon: 'none',
								});
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							let list = [],
								data = ret.data;
							for (let i = 0, length = data.length; i < length; i++) {
								var item = data[i];
								item.guid = this.newGuid() + item.id
								list.push(item);
							}
							console.log('得到list', list);
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.lists = list;
								this.fetchPageNum = 2;
							} else {
								this.lists = this.lists.concat(list);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			},
			newGuid() {
				let s4 = function() {
					return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
				}
				return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
			},
			goDetail(e) {
				console.log({ e })
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
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: 'uni-app模版',
							summary: e.title,
							imageUrl: e.img_src,
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
				})
			}
		}
	}
</script>

<style>
	.grid{
		padding-top: 10px;
	}
</style>
