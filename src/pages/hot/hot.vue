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
				lists: [
					{
						'id': "zaojing",
						'img_num': 40,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/zaojing/1.jpg",
						'name': "zj",
						'title': "造景",
					},
					{
						'id': "compose",
						'img_num': 30,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/compose/1.jpg",
						'name': "zhpj",
						'title': "组合盆景",
					},
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
					{
						'id': "bhz",
						'img_num': 17,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/baihezhu/1.jpg",
						'name': "bhz",
						'title': "百合竹",
					},
					{
						'id': "cy",
						'img_num': 3,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/chunyu/1.jpg",
						'name': "cy",
						'title': "春雨",
					},
					{
						'id': "dys",
						'img_num': 13,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/dayesan/1.jpg",
						'name': "dys",
						'title': "大叶伞",
					},
					{
						'id': "fm",
						'img_num': 2,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/fumu/1.jpg",
						'name': "fm",
						'title': "福木",
					},
					{
						'id': "fgzl",
						'img_num': 2,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/fuguizhulong/1.jpg",
						'name': "fgzl",
						'title': "富贵竹笼",
					},
					{
						'id': "gbz",
						'img_num': 3,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/guibeizhu/1.jpg",
						'name': "gbz",
						'title': "龟背竹",
					},
					{
						'id': "hjr",
						'img_num': 9,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/huangjinrong/1.jpg",
						'name': "hjr",
						'title': "黄金榕",
					},
					{
						'id': "jqd",
						'img_num': 4,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/jinqiandou/1.jpg",
						'name': "jqd",
						'title': "金钱兜",
					},
					{
						'id': "llz",
						'img_num': 2,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/lvluozhu/1.jpg",
						'name': "llz",
						'title': "绿萝柱",
					},
					{
						'id': "ntz",
						'img_num': 6,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/nantianzhu/1.jpg",
						'name': "ntz",
						'title': "南天竹",
					},
					{
						'id': "pas",
						'img_num': 6,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/pinganshu/1.jpg",
						'name': "pas",
						'title': "平安树",
					},
					{
						'id': "qct",
						'img_num': 10,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/qicaitie/1.jpg",
						'name': "qct",
						'title': "七彩铁",
					},
					{
						'id': "xyflt",
						'img_num': 5,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/xyfltong/1.jpg",
						'name': "xyflt",
						'title': "细叶福绿桐",
					},
					{
						'id': "xwyz",
						'img_num': 3,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/xiaweiyizhu/1.jpg",
						'name': "xwyz",
						'title': "夏威夷竹",
					},
					{
						'id': "yjm",
						'img_num': 7,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/yajiaomu/1.jpg",
						'name': "yjm",
						'title': "鸭脚木",
					},
					{
						'id': "zj",
						'img_num': 5,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/zhujiao/1.jpg",
						'name': "zj",
						'title': "朱蕉",
					},
					{
						'id': "zz",
						'img_num': 7,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/zongzhu/1.jpg",
						'name': "zz",
						'title': "棕竹",
					},
					{
						'id': "aixinrong",
						'img_num': 6,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/aixinrong/1.jpg",
						'name': "axr",
						'title': "爱心榕",
					},
					{
						'id': "baximu",
						'img_num': 5,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/baximu/1.jpg",
						'name': "bxm",
						'title': "巴西木",
					},
					{
						'id': "luck",
						'img_num': 4,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/luck/1.jpg",
						'name': "luck",
						'title': "鸿运当头",
					},
					{
						'id': "hongzhang",
						'img_num': 12,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/hongzhang/1.jpg",
						'name': "hz",
						'title': "红掌",
					},
					{
						'id': "hupilan",
						'img_num': 4,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/hupilan/1.jpg",
						'name': "hpl",
						'title': "虎皮兰",
					},
					{
						'id': "kongquemu",
						'img_num': 4,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/kongquemu/1.jpg",
						'name': "kqm",
						'title': "孔雀木",
					},
					{
						'id': "liangtianchi",
						'img_num': 5,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/liangtianchi/1.jpg",
						'name': "ltc",
						'title': "量天尺",
					},
					{
						'id': "taiyangshen",
						'img_num': 5,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/taiyangshen/1.jpg",
						'name': "tys",
						'title': "太阳神",
					},
					{
						'id': "xiangpishu",
						'img_num': 8,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/xiangpishu/1.jpg",
						'name': "xps",
						'title': "橡皮树",
					},
					{
						'id': "yementie",
						'img_num': 8,
						'img_src': "https://production-1304544538.cos.ap-guangzhou.myqcloud.com/yementie/1.jpg",
						'name': "ymt",
						'title': "也门铁",
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
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '精选绿植花卉推荐', //分享的名称
				path: '/pages/hot/hot',
				mpId: this.mapid
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: this.name,
				type: 0,
				summary: "熬夜加班，需要这些绿植花卉来提神醒脑。",
			}
		},
		methods: {
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
