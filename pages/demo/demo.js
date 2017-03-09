var appInstance = getApp();
var page = getCurrentPages();
var util = require('../../utils/util.js');
var TD = require('../../utils/tdweapp.js');

Page({
    data: {
        itemList: ['A', 'B', 'C']
        // 
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
        setTimeout(wx.stopPullDownRefresh(), 500);
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
    showAction: function (event) {
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                showToa({
                    index: res.tapIndex,
                    icon: 'success'
                })
            },
            fail: function (res) {
                console.error(res.errMasg);
                wx.showToast({
                    title: 'error',
                    icon: "loading"
                })
            }
        });
    },

    showDia: function (event) {
        console.log(event);
        wx.showModal({
            title: '模拟弹窗',
            content: 'Hello Hxx',
            showCancel: true,
            cancelText: '算了',
            cancelColor: '#000f0f',
            confirmText: '好的'
        });
    },
    changeTitle: function (event) {
        util.changeTitle({ title: 'title changed!' });
    },
    handleEvent: function (event) {
        var section = event.target.dataset.section;
        var order = event.target.dataset.order;
        switch (section) {
            case 'image':
                switch (order) {
                    case '1':
                        util.chooseImage({
                            count: 8,
                            sizeType: ['original', 'compressed'],
                            sourceType: ['album', 'camera']
                        }); break;
                }
                break;
            case 'cache':
                switch (order) {
                    case '1':
                        util.seeFileList();
                        break;
                    case '2':
                        util.saveFile();
                        break;
                    case '3':
                        util.deleteCache();
                        break;
                }break;
            case 'locate':
                switch (order) {
                    case '1':
                        util.getLocation();
                        break;
                    case '2':
                        util.openMapForChooseLocation();
                        break;
                    case '3':
                        util.openMapFromLonlat({ longitude: 30, latitude: 120 });
                        break;
                }
                break;
            case 'talkingdata':
                TD.event({
                    id: '111',
                    label: '222',
                    params: {
                        from: '来自小程序的问候……',
                        content: '3.8 快乐'
                    }
                });
                break;
        }
    },
    //切换Tab
    backHome: function (event) {
        wx.switchTab({
            url: '/pages/index/index',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
});
var itemList = ['A', 'B', 'C'];
function showToa(data) {
    wx.showToast({
        title: itemList[data.index],
        icon: data.icon
    })
}