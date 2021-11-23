// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: {
      text: "登录/注册",
      image: "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/mine/head.png",
      bgimg: "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/mine/bgimg.png"
    },
    midlist: [],
    userInfo: null,
    name: "",
    mine_image_path: "",
    icon: {
      banner: "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/mine/banner4.png",
      right:"https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/mine/news_right.png"
    },
    buttomlist:[],
  },
  // 点击登录，跳出授权
  onClickObtainn: function () {
    this.showModal();
  },
  // 显示授权框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 显示手机授权框
  showModalNum: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationNum: animation.export(),
      showModalStatistics: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationNum: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModalNum: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationNum: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationNum: animation.export(),
        showModalStatistics: false
      })
    }.bind(this), 200)
  },
  getUserProfile: function () {
    var that = this;
    this.hideModal();
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res);
        that.setData({
          name: res.userInfo.nickName,
          mine_image_path: res.userInfo.avatarUrl
        })
        this.showModalNum();
      }
    })
  },
  jumpLoin: function () {
    var that = this;
    wx.navigateTo({ url: '/pages/loin/loin?name=' + that.data.name + '&mine_image_path=' + that.data.mine_image_path });
    this.hideModalNum();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: 'cloud1-5g08f6dkc9d1e16a',
      traceUser: true,
    })
    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("image_list").limit(10)  //获取集合的引用
      .get()
      .then(res => {
        console.log("请求成功", res.data);
        this.setData({
          midlist: res.data
        })
      })
      .catch(err => {
        console.log("请求失败", err);
      })
      db.collection("image_list").limit(4).skip(30)  //获取集合的引用
      .get()
      .then(res => {
        console.log("请求成功", res.data);
        this.setData({
          buttomlist: res.data
        })
      })
      .catch(err => {
        console.log("请求失败", err);
      })
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
    //本地storage中获取值
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
  * 用户注销
  */
  onClickLogout: function () {
    app.delUserInfo();
    this.setData({
      userInfo: null
    })
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

  },
  uploadImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          mine_image_path: res.tempFilePaths
        });
      }
    });
  },
})