var appInstance = getApp();
var TD = require('../../../utils/tdweapp.js');
var index = 1;
Page({
  data: {
    isReachBottom: false,
    noMoreData: false,
    listContent: []
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
    getData(this);
  },
  onReachBottom: function () {
    this.setData({ isReachBottom: true });
    getData(this);
  },
  onPullDownRefresh: function () {
  }
});
function getData(that) {
  setTimeout(function () {
    if (index > 60) {
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
  }, 2e3);
}