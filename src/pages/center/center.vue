<template>
	<view class="center">
		<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，欢迎来到春风十里绿植花卉馆！</text>
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
							<div @click="handleCall" class="link">13510237853</div>
						</view>
						<view class="source-cell" >
							<text space="nbsp">2. </text>
							<text>微信：D-297997817</text>
						</view>
					</view>
					<view class="qrcode">
						<image class="wechat" :show-menu-by-longpress="true" src="/static/Wechat.jpeg"></image>
						<text class="tip">（长按识别微信名片）</text>
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
				avatarUrl: '/static/logo.jpeg',
				uerInfo: {}
			}
		},
		onLoad() {
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
					phoneNumber: '13510237853'
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
