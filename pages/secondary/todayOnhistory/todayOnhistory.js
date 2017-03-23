var appInstance = getApp();
var httpUtil = require('../../../utils/httpUtil.js');
var promiseUtil = require('../../../utils/promiseUtil');
Page({
  data: {
    eventList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 获取历史上的今天数据
    getData(this);
  },
  onShareAppMessage: function () {
    return {
      title: '历史上的今天',
      path: '/pages/secondary/todayOnhistory/todayOnhistory'
    };
  },
  handleEvent: function (event) {
    var operation = event.target.dataset.operation; event.target.dataset.eid
    switch (operation) {
      case 'historyDetail':
        wx.navigateTo({
          url: '/pages/secondary/historyDetail/historyDetail?eId=' + event.target.dataset.eid
        });
        break;
    }
  }
});
function getData(that) {
  var date = new Date();
  //使用Promise 处理回调
  var httpPromise = promiseUtil.wxPromisify(httpUtil.request);
  httpPromise({
    url: 'todayOnhistory/queryEvent.php',
    method: 'get',
    data: {
      key: appInstance.globalData.todayOfHistoryKey,
      date: (date.getMonth() + 1) + '/' + date.getDate()
    }
  }).then(function (res) {
    if (!res || !res.data || res.data.error_code) { return; }
    that.setData({ eventList: res.data.result });
  }).catch(function (error) { console.log(error); });

  // httpUtil.request({
  //   url: 'todayOnhistory/queryEvent.php',
  //   method: 'get',
  //   data: {
  //     key: appInstance.globalData.todayOfHistoryKey,
  //     date: (date.getMonth() + 1) + '/' + date.getDate()
  //   },
  //   success: function (res) {
  //     if (!res || !res.data || res.data.error_code) { return; }
  //     that.setData({ eventList: res.data.result });
  //   },
  //   fail: function (error) {
  //     console.log(error);
  //   }
  // });
}