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
      temp.push({ index: index++, text: i % 2 ? '天王盖地虎' : '小鸡炖蘑菇' });
    }
    that.setData({
      isReachBottom: false,
      listContent: that.data.listContent.concat(temp)
    });
  }, time);
}