var appInstance = getApp();
var TD = require('../../../utils/tdweapp.js');
var index = 1;
Page({
  data: {
    isReachBottom: false,
    noMoreData: false,
    listContent: [],
    loadingAnimation: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    TD.Page.load();
    TD.event({
      id: 'listPage',
      label: options.from,
      params: {
        count: 1
      }
    });
    getData(this, 1e1);
  },
  /**
   * 利用setInterval 添加动画
   */
  onShow: function () {
    var i = 0
    var animation = wx.createAnimation({
      duration: 1000
    })
    var that = this;
    setInterval(function () {
      animation.rotate(360 * (++i)).step()
      that.setData({
        loadingAnimation: animation.export()
      })
    }.bind(that), 1000);
  },
  onUnload: function () {
    index = 1;
  },
  /**
   * 到达底部 显示加载动画
   */
  onReachBottom: function () {
    this.setData({ isReachBottom: true });
    getData(this, 2e3);
  },
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(function () {
      index = 1;
      that.data.listContent.splice(0, that.data.listContent.length);
      getData(that, 1e1);
    }, 2e3);
    wx.stopPullDownRefresh();
  }
});
/**
 * 根据延时添加数据 模拟网络请求
 */
function getData(that, time) {
  setTimeout(function () {
    if (index > 80) {
      that.setData({ noMoreData: true });
      return;
    }
    var temp = [];
    for (var i = 0; i < 20; i++) {
      temp.push({ index: index++, text: !(i % 2) ? '十年生死两茫茫，不思量，自难忘。' : '千里孤坟何处话凄凉。' });
    }
    that.setData({
      isReachBottom: false,
      noMoreData: false,
      listContent: that.data.listContent.concat(temp)
    });
  }, time);
}