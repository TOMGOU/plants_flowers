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
				<!-- <view class="desc">
					目前处于开发阶段，敬请期待。。。
				</view> -->
				<view class="source">
					<view class="title">联系方式：</view>
					<view class="source-list">
						<view class="source-cell">
							<text space="nbsp">1. </text><text>电话：13510237853</text>
						</view>
						<view class="source-cell">
							<text space="nbsp">2. </text>
							<text>微信：D-297997817</text>
						</view>
					</view>
					<view class="qrcode">
						<image src="/static/Wechat.jpeg"></image>
						<!-- <text class="tip">标卉绿植馆</text> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60c;</text>
				<text class="list-text">收藏图片</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe60d;</text>
				<text class="list-text">收藏图集</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goAbout">
				<text class="list-icon">&#xe603;</text>
				<text class="list-text">联系方式</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view> -->
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
	image {
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
