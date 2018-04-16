//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady: function(){
    console.log('程序isonREADY');
  },
  onShow: function(){
    console.log('程序isonshow');
  },
  onHide: function(){
    console.log('程序isonhide');
  },
  onUnload: function(){
    console.log('程序isonunload');
  },
  onPullDownRefresh: function(){
    console.log('程序isonPullDownRefresh');
  },
  onReachBottom: function(){
    console.log('程序ison触底');
  }
})
