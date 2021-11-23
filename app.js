App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      env:'cloud1-5g08f6dkc9d1e16a'
    })
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: null, // {phone:xxx,token:xxxx}
    userlocalInfo: null,
  },
  inputBind: function (res) {
    var info = {
      token: res.token,
      phone: res.phone,
      nickName: res.nickName,
      avatarUrl: res.avatarUrl
    }
    // 1.去公共的app.js中调用globalData，在里面赋值。(在全局变量赋值)
    this.globalData.userInfo = info;//{phone:xxx,token:xxxx}

    // 2.在本地“cookie”中赋值
    wx.setStorageSync("userInfo", info);
  },
  delUserInfo: function () {
    this.globalData.userInfo = null;
    wx.removeStorageSync("userInfo")
  },
})
