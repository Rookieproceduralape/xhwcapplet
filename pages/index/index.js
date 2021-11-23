// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toplist: [],
    // 轮播图
    current: 0, //当前所在页面的 index
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    imgUrls: [
      "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/index/banner1.png",
      "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/index/banner2.png",
      "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/index/banner3.png"
    ],
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
    });
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id,
    });
  },
  //点击图片触发事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent],
    });
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
    db.collection("image_list").limit(5).skip(10)
      .get()
      .then(res => {
        console.log("请求成功", res.data);
        this.setData({
          toplist: res.data
        }) 
      })
      .catch(err => {
        console.log("请求失败", err);
      })
  }
});
