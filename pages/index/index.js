//index.js
//获取应用实例
var appInstance = getApp();
var TD = require('../../utils/tdweapp.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    name: "houxx",
    sex: 'men',
    index: 1
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    TD.Page.load();
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    // 接收页面数据 上送大数据平台 options.source options.render
    if (options.source != null && typeof (options.source) != "undefined") {
      appInstance.globalData.dataCollection.source = options.source;
      TD.event({
        id: '111',
        label: '222',
        params: {
          // source: options.source,
          // render: options.render,
          // mine: appInstance.globalData.userData.userId
        }
      });
      console.log('TD.event');
    }
  },
   onShow: function () {
        // 生命周期函数--监听页面显示
        TD.Page.load(true);
    },
  onShareAppMessage: function () {
    var source = appInstance.globalData.dataCollection.source;
    if (source === null || typeof (source) === 'undefined' || source === '') {
      source = appInstance.globalData.userData.userId;
    }
    var render = appInstance.globalData.userData.userId;
    return {
      title: 'DEMO',
      path: '/pages/index/index?source=' + source + '&render=' + render
    }
  },
  //数据绑定测试
  changeName: function () {
    console.log(this.data.name);
    this.setData({
      name: this.data.name + ' ' + this.data.index,
      index: this.data.index + 1
    })
  }
})
