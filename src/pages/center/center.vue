<template>
	<view class="center">
		<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，欢迎来到{{ name }}！</text>
				<!-- <text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text> -->
			</view>
		</view>
		<view class="about">
			<view class="content">
				<view class="source">
					<view class="title">联系方式：</view>
					<view class="source-list">
						<view class="source-cell">
							<text space="nbsp">1.电话： </text>
							<div @click="handleCall" class="link">{{ tel }}</div>
						</view>
						<view class="source-cell" >
							<text space="nbsp">
								{{ `2.${platform === 'mp-toutiao' ? '抖音：' : '微信：'}` }}
							</text>
							<text>{{ acount }}</text>
						</view>
					</view>
					<view class="qrcode">
						<image class="wechat" :show-menu-by-longpress="true" :src="wechatUrl"></image>
						<text class="tip" v-if="platform !== 'mp-toutiao'">（长按识别微信名片）</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				login: false,
				platform: process.env.UNI_PLATFORM,
				owner: process.env.OWNER,
				avatarUrls: {
					biao: '/static/logo.jpeg',
					tang: '/static/hk.jpeg',
					yu: '/static/yu.jpeg'
				},
				wechatUrls: {
					biao: '/static/Wechat.jpeg',
					tang: '/static/douyin.jpeg',
					yu: '/static/xu.jpeg'
				},
				tels: {
					biao: '13510237853',
					tang: '13040835292',
					yu: '13040835292'
				},
				acounts: {
					biao: 'D-297997817',
					tang: '1585090420',
					yu: 'xuzhongyu12345678'
				},
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
				uerInfo: {},
			}
		},
		computed: {
			avatarUrl() {
				return this.avatarUrls[this.owner]
			},
			wechatUrl() {
				return this.wechatUrls[this.owner]
			},
			tel() {
				return this.tels[this.owner]
			},
			acount() {
				return this.acounts[this.owner]
			},
			name() {
				return this.names[this.owner]
			},
			mapid() {
				return this.mapids[this.owner]
			},
		},
		onLoad() {
			console.log(process.env)
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
				title: '不要犹豫，立刻联系我！', //分享的名称
				path: '/pages/center/center',
				mpId: this.mapid
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: this.name,
				type: 0,
				summary: "如果你不想错过一个美好的机会，那就赶紧联系我吧！",
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			handleCall() {
				uni.makePhoneCall({
					phoneNumber: this.tel
				});
			},
			preImg() {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: '/static/Wechat.jpeg',
						urls: ['/static/Wechat.jpeg']
					})
				}, 150)
			},
		}
	}
</script>

<style>
	.wechat {
		width: 360upx;
		height: 360upx;
	}
	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		/* justify-content: center; */
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 30upx;
	}

	.qrcode .tip {
		margin-top: 20upx;
		font-size: 30upx;
	}

	.desc {
		margin-top: 30upx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f8f8f8;
	}

	button {
		width: 100%;
		margin-top: 40upx;
	}

	.version {
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}

	.title {
		margin-bottom: 20upx;
	}

	.source {
		margin-top: 30upx;
		flex-direction: column;
	}

	.source-list {
		flex-direction: column;
		font-size: 35upx;
	}

	.source-cell {
		height: 60upx;
		line-height: 60upx;
	}

	.link {
		color: #007AFF;
	}
</style>
