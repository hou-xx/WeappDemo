var appInstance = getApp();
var page = getCurrentPages();
var TD = require('../../utils/tdweapp.js');
Page({
    data: {
        iconSize: 23,
        progress: 0,
        pickerIndex: 0,
        checkboxText: '',
        inputText: '',
        time: '13:00',
        date: '2016-01-22',
        pickerResult: '',
        pickerViewResult: '',
        radioResult: '',
        sliderResult: '',
        years: [2011, 2012, 2013, 2014, 2015, 1016, 2017, 2018],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        checkboxItems: [{ name: '兴业', value: '1' }, { name: '招商', value: '2' }, { name: '民生', value: '3', checked: true }, { name: '渣打', value: '4' }, { name: '花旗', value: '5' }]
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载      
    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
        TD.Page.load(true);
    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏
    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作
        setTimeout(wx.stopPullDownRefresh(), 100);
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: '进入日志页', // 分享标题
            desc: '看日志', // 分享描述
            path: '/page/logs' // 分享路径
        }
    },
    checkBoxChanged: function (event) {
        this.setData({ checkboxText: " 选中 " + event.detail.value });
    },
    handleEvent: function (event) {
        var operation = event.target.dataset.operation;
        switch (operation) {
            case 'iconSizeUp':
                this.setData({ iconSize: this.data.iconSize + 5 });
                break;
            case 'iconSizeDown':
                this.setData({ iconSize: this.data.iconSize - 5 });
                break;
            case 'changeProgress':
                start = true;
                changeProgress(this);
                break;
            case 'stopProgress':
                start = false;
                break;
            case 'pickerChange':
                var mode = event.target.dataset.mode;
                console.log(mode);
                switch (mode) {
                    case 'selector':
                        this.setData({
                            pickerIndex: event.detail.value,
                            pickerResult: event.detail.value
                        }); break;
                    case 'time':
                        this.setData({
                            time: event.detail.value,
                            pickerResult: event.detail.value
                        }); break;
                    case 'date':
                        this.setData({
                            data: event.detail.value,
                            pickerResult: event.detail.value
                        });
                        break;

                }
                break;
            case 'pickerViewChanged':
                var indexs = event.detail.value;
                this.setData({
                    pickerViewResult: this.data.years[indexs[0]] + '-' + this.data.months[indexs[1]] + '-' + this.data.days[indexs[2]]
                });
                break;
            case 'radioChanged':
                console.log(event.detail.value);
                this.setData({ radioResult: event.detail.value });
                break;
            case 'sliderChanged':
                this.setData({ sliderResult: event.detail.value });
                break;
        }
    },
    inputChange: function (e) {
        var inputValue = e.detail.value;
        this.setData({ inputText: inputValue });
    }

});
var start = true;
function changeProgress(that) {
    that.setData({ progress: that.data.progress + 1 === 100 ? 0 : that.data.progress + 1 });
    if (start) {
        setTimeout(function () {
            changeProgress(that);
        }, 100);
    }
}