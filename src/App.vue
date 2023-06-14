<script>
	export default {
		onLaunch: function() {
			if (wx.canIUse('getUpdateManager')) {
				this.checkUpdateVersion()
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			checkUpdateVersion() {
				if (wx.getUpdateManager) {
					const updateManager = wx.getUpdateManager()
					// 检测版本更新
					updateManager.onCheckForUpdate((res) => {
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							// 监听小程序有版本更新事件
							updateManager.onUpdateReady(() => {
								wx.showModal({
									confirmColor: '#1890FF',
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									showCancel: false, // 是否显示取消按钮,
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(() => {
								// 新版本下载失败
								wx.showModal({
									confirmColor: '#1890FF',
									content: '小程序更新失败，请关闭后再次开启！',
									showCancel: false // 是否显示取消按钮,
								})
							})
						}
					})
				}
			},
		}
	}
</script>

<style>
	@import './common/common.css';

	page,
	view {
		display: flex;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #EFEFEF;
	}

	template {
		display: flex;
		flex: 1;
	}
</style>
