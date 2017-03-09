function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function changeTitle(data) {
  wx.setNavigationBarTitle(data);
}
function chooseImage(params) {
  wx.chooseImage({
    count: params.count, // 最多可以选择的图片张数，默认9
    sizeType: params.sizeType, // original 原图，compressed 压缩图，默认二者都有
    sourceType: params.sourceType, // album 从相册选图，camera 使用相机，默认二者都有
    success: function (res) {
      console.log(res.tempFilePaths);
      wx.showToast({
        title: res.tempFilePaths[0],
        icon: 'success'
      });
    },
    fail: function () {
      wx.showToast({
        title: "出错了",
        icon: 'loading'
      });
    },
    complete: function () {
    }
  })
}
function seeFileList() {
  wx.getSavedFileList({
    success: function (res) {
      console.log(res.fileList[0]);
      var con = '文件列表列表：\n';
      for (var i = 0; i < res.fileList.length; i++) {
        con += res.fileList[i].filePath + '\n';
      }
      wx.showModal({
        content: con
      });
      console.log(res.fileList)
    }
  });
}
function saveFile() {
  wx.chooseImage({
    count: 8,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      console.log(res.tempFilePaths);
      for (var i = 0; i < res.tempFilePaths.length; i++) {
        wx.saveFile({
          tempFilePath: res.tempFilePaths[i],
          fail: function (res) {
            wx.showToast({
              title: 'fail'
            });
          }
        });
      }
      wx.showToast({
        title: 'success'
      });
    }
  });
}
function deleteCache() {
  wx.getSavedFileList({
    success: function (res) {
      for (var i = 0; i < res.fileList.length; i++) {
        wx.removeSavedFile({
          filePath: res.fileList[i].filePath,
          fail: function () {
            wx.showToast({
              title: 'fail'
            })
          }
        });
      }
      wx.showToast({
        title: 'success'
      })
    }
  });
}
function getLocation() {
  wx.getLocation({    
    success: function (res) {
      var latitude = res.latitude;
      var longitude = res.longitude;
      var speed = res.speed;
      var accuracy = res.accuracy;
      wx.showModal({
        content: 'latitude:' + latitude + " longitude:" + longitude + ' speed:' + speed + ' accuracy:' + accuracy
      });
    },
    fail: function (e) {
      console.log(e);
      wx.showToast({
        title: '定位失败'
      });
    }
  });
}
function openMapForChooseLocation() {
  wx.chooseLocation({
    success: function (res) {
      wx.showModal({
        content: 'name:' + res.name + " address:" + res.address + ' longitude:' + res.longitude + ' latitude:' + res.latitude
      });
    },
    fail: function (e) {
      console.log(e);
      wx.showToast({
        title: '定位失败'
      });
    }
  });
}
function openMapFromLonlat(params) {
  wx.openLocation({
    longitude: params.longitude,
    latitude: params.latitude,
    scale: 30,
    success: function (res) {
      console.log(res);
    }
  });
}
module.exports = {
  formatTime: formatTime,
  changeTitle: changeTitle,
  chooseImage: chooseImage,
  seeFileList: seeFileList,
  saveFile: saveFile,
  deleteCache: deleteCache,
  getLocation: getLocation,
  openMapForChooseLocation: openMapForChooseLocation,
  openMapFromLonlat: openMapFromLonlat
}
