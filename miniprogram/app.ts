// 博友政策咨询 — 小程序入口
// 前端负责人：郑成博（zhengchengbo）
// 后端负责人：陈艳强

App<IAppOption>({
  globalData: {
    userInfo: null,
    token: '',
  },

  onLaunch() {
    // 检查登录态
    this.checkLogin();
  },

  checkLogin() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.login({
        success: (res) => {
          if (res.code) {
            // TODO: 发送 code 给陈艳强的后端换取 token
            // api.login(res.code)
          }
        },
      });
    } else {
      this.globalData.token = token;
    }
  },
});
