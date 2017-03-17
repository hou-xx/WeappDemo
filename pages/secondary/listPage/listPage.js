var appInstance = getApp();
var TD = require('../../../utils/tdweapp.js');
var index = 1;
Page({
  data: {
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
    var temp = [];
    for (var i = 0; i < 20; i++) {
      temp.push({ index: index++, text: i % 2 ? '天王盖地虎' : '小鸡炖蘑菇' });
    }
    this.setData({ listContent: this.data.listContent.concat(temp) });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})