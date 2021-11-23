// pages/auth/auth.js

// 获取公共的那个app
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: {
      logo:"https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/loin/logo.png",
      bgimg:"https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/loin/background.png"
    },
    phone: "19858196989",
    code: "",
    nickName: "",
    avatarUrl: ""
  },
  // 获取输入的手机号
  bindPhoneInput: function (e) {
    this.setData({ phone: e.detail.value });
  },
  // 获取输入的验证码
  bindCodeInput: function (e) {
    this.setData({ code: e.detail.value });
  },
  /** 
   * 点击获取短信验证码
   */
  onClickCheckCode: function (e) {
    // 判断手机号格式是否正确
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    // 发送短信验证码，登录成功之后获取jwt和微信用户信息，保存到globalData和本地存储中。
    wx.request({
      url: "http://127.0.0.1:8000/api/message/",
      data: { phone: this.data.phone },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.status) {
          // 倒计时计数器
          wx.showToast({ title: res.data.message, icon: 'none' });
        } else {
          // 短信发送失败
          wx.showToast({ title: res.data.message, icon: 'none' });
        }
      }
    })
  },
  onClickSubmit: function (e) {
    wx.request({
      url: "http://127.0.0.1:8000/api/login/",
      data: { phone: this.data.phone, code: this.data.code },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // 初始化用户信息
        var localInfo = {
          token: res.data.data.token,
          phone: res.data.data.phone,
          nickName: app.globalData.userlocalInfo.nickName,
          avatarUrl: app.globalData.userlocalInfo.avatarUrl
        }
        console.log(localInfo.avatarUrl);
        if (res.data.status) {
          app.initUserInfo(localInfo);
          // var pages = getCurrentPages();
          // prevPage = pages[pages.length-2];
          // 跳转会上一级页面
          wx.navigateBack({});
        } else {
          wx.showToast({ title: "登录失败", icon: 'none' });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(options.name);
    app.globalData.userlocalInfo={
      nickName: options.name,
      avatarUrl: options.mine_image_path
    };
    console.log(app.globalData.userlocalInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})