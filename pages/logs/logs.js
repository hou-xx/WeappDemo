//logs.js
var util = require('../../utils/util.js')
var TD = require('../../utils/tdweapp.js');
Page({
  data: {
    logs: []
  },
   onShow: function () {
        // 生命周期函数--监听页面显示
        TD.Page.load(true);
    },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
