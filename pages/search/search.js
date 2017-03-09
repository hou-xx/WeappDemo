var util = require('../../utils/util.js');
var httpUtil = require('../../utils/httpUtil.js');
var appInstance = getApp();
var page = getCurrentPages();
var TD = require('../../utils/tdweapp.js');
Page({
    data: {
        inputHint: '请输入基金代码或名称',
        searchBtnText: '查询',
        inputValue: '',
        searchData: [],
        riskData: []
    },
    onLoad: function () {
        TD.Page.load();
    },
    handleEvent: function (event) {
        var operation = event.target.dataset.operation;
        switch (operation) {
            case 'inputChange':
                this.setData({ inputValue: event.detail.value });
                break;
            case 'search':
                search(this);
                break;
            case 'fundDetail':
                var code = event.target.dataset.code;
                wx.showToast({
                    title: code
                });
                break;
        }
    }
});
function search(that) {
    wx.showNavigationBarLoading();
    httpUtil.request({
        url: 'api/info/fund/getFundDescription',
        data: {
            'code': that.data.inputValue
        },
        header: { 'Accept': 'application/json', 'Authorization': 'Bearer ' },
        method: 'GET',
        success: function (res) {
            parseData(res.data, that);
        },
        fail: function (failReason) {
            handleHttpFail(failReason);
        },
        complete: function () {
            wx.hideNavigationBarLoading();
        }
    });
}
function handleHttpFail(failReason) {
    wx.showModal({
        content: failReason
    });
}
function parseData(data, that) {
    console.log(data);
    if (data == null || data.data == null) {
        handleHttpFail('很抱歉，输入内容跑偏了');
        return;
    }
    var temp = [];
    data.code = that.data.inputValue;
    temp[0] = data.data;
    that.setData({ searchData: temp });
}