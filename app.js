var TD = require('./utils/tdweapp');
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    //弹窗
    TD.launch({
      uploadUrl: 'https://h5.udrig.com/wx/app/v1',
      appkey: '28724A822ACA4F09AB82D5A5359B439B',
      appName: 'demo',
      versionName: '1.0.0',
      versionCode: '1.0.0',
      autoOnAppShow: true,
      autoOnAppHide: true,
      autoOnPageUnload: true,
      autoOnPullDownRefresh: true,
      autoOnReachBottom: true,
      autoOnShare: true
    });
  },
  //发生错误
  onError: function (msg) {
    console.log(msg);
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res);
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
        }
      })
    }
  },
  //全局数据
  globalData: {
    baseUrl: 'http://v.juhe.cn/',
    userInfo: {}
  }
})