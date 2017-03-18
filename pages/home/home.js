//index.js
//获取应用实例
var appInstance = getApp();
var TD = require('../../utils/tdweapp.js');
Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    TD.Page.load(true);
  },
  handleEvent: function (event) {
    var operation = event.target.dataset.operation;
    switch (operation) {
      case 'pullUp':
        wx.navigateTo({
          url: '/pages/secondary/listPage/listPage?from=home'
        })
        break;
    }
  }
})
