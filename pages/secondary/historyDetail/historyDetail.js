var appInstance = getApp();
var httpUtil = require('../../../utils/httpUtil.js');
var eId;
Page({
  data: {
    title: '',
    content: '',
    picUrl: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    eId = options.eId;
    this.setData({ text: eId });
    getDetailData(this);
  }
});
function getDetailData(that) {
  httpUtil.request({
    url: 'todayOnhistory/queryDetail.php',
    method: 'get',
    data: {
      key: appInstance.globalData.todayOfHistoryKey,
      e_id: eId
    },
    success: function (res) {
      if (!res || !res.data || res.data.error_code) { return; }
      var result = res.data.result[0];
      var temp = [];
      result.picUrl.forEach(function (value, index, array) {
        var item = {};
        item.url = value.url;
        item.pic_title = value.pic_title;
        temp[index] = item;
      });
      that.setData({
        title: result.title,
        content: result.content,
        picUrl: temp
      });
    }
  });
}