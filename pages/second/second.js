var TD = require('../../utils/tdweapp.js');
Page({
  data: {
    params: '',
    audioSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    imageSrc: 'http://img2.imgtn.bdimg.com/it/u=3346736791,2137831901&fm=23&gp=0.jpg',
    videoSrc: 'http://139.219.187.128:8088//img/assets/vleader02.mp4'
  },
  onLoad: function (options) {
    this.setData({ params: options.params });
    TD.Page.load();
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('audio');
  },
  handleEvent: function (event) {
    var operation = event.target.dataset.operation;
    switch (operation) {
      case 'audioStart':
        this.audioCtx.play();
        break;
      case 'audioStop':
        this.audioCtx.pause();
        break;
      case 'to30second':
        this.audioCtx.seek(30);
        this.audioCtx.play();
        break;
      case 'backHome':
        this.audioCtx.seek(0);
        this.audioCtx.play();
        break;
      case 'audioError':
        var content = '';
        console.log(event.detail.errMsg);
        switch (event.detail.errMsg) {
          case 'MEDIA_ERR_ABORTED':
            content = '获取资源被用户禁止';
            break;
          case 'MEDIA_ERR_NETWORD':
            content = '网络错误';
            break;
          case 'MEDIA_ERR_DECODE':
            content = '解码错误';
            break;
          case 'MEDIA_ERR_SRC_NOT_SUPPOERTED':
            content = '不合适资源';
            break;
        }
        wx.showModal({ content: content });
        break;
    }
  }
})
