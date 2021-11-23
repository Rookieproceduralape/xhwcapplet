// pages/seek/seek.js
// 获取公共的那个app
var app = getApp();
Page({
  // 清除历史记录
  cleanhistory: function (e) {
    this.setData({
      history: false, //隐藏历史记录
      newArray: [],
      shoopingtext: "" //清空搜索框
    })
    wx.removeStorageSync("recentSearch")
  },
  //搜索
  search: function (e) {
    var searchtext = this.data.shoopingtext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.shoopingarray) {
        var num = this.data.shoopingarray[index].title.indexOf(searchtext);
        let temp = 'shoopingarray[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        noneview: sss, //隐藏未找到提示
        shoppinglist: true, //显示商品列表
      })
      console.log(this.data.newArray);
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: true, //隐藏历史记录
      })
    }
    if (this.data.newArray.indexOf(searchtext) != -1) {
      //是 不做任何操作
      return null;
    } else {
      //否，把_val push到arr2中
      this.data.newArray.push(searchtext)
    };
    //把新的arr2存储到缓存中
    wx.setStorageSync('recentSearch', this.data.newArray);
    wx.getStorage({
      key: 'recentSearch',
      success: function (res) {
        //输出缓存内容
        console.log(res)
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    hotimg: [],
    firetext: ['油纸伞', '苏绣汉服'],
    hottext: ['银花丝', '苏绣团扇', '苏式糕点'],
    icon: {
      searchimg: "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/icon/search.png",
      fireimg: "cloud://cloud1-5g08f6dkc9d1e16a.636c-cloud1-5g08f6dkc9d1e16a-1307955925/image/icon/火.png",
      rubbish: "cloud://cloud1-5g08f6dkc9d1e16a.636c-cloud1-5g08f6dkc9d1e16a-1307955925/image/icon/垃圾桶.png",
      sorry: "cloud://cloud1-5g08f6dkc9d1e16a.636c-cloud1-5g08f6dkc9d1e16a-1307955925/image/icon/难过.png",
    },
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    newArray: [], //添加历史记录数组
    shoopingarray: [{ //商品
      id: 0,
      images: "/images/3201.png",
      title: "完达山甄选牧场酸奶饮品牛奶饮料常温发酵乳包...",
      money: "88.00",
      sold: "78箱",
      status: 0
    }, {
      id: 1,
      images: "/images/3202.jpg",
      title: "网红 天日盐饼干 粗粮早餐 代餐宿舍小吃零食 130g*...",
      money: "26.80",
      sold: "34包",
      status: 0
    }]
  },
  clickinput: function (e) {
    this.setData({
      noneview: false,
    })
  },
  //搜索框的值
  shoppinginput: function (e) {

    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true,
        shoppinglist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
      for (var index in this.data.shoopingarray) {
        let temp = 'shoopingarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      shoopingtext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function (e) {
    this.setData({
      shoopingtext: e.target.dataset.text
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'recentSearch',
      success: function (res) {
        that.setData({
          newArray: res.data
        })
      }
    })
    if (this.data.newArray != []) {
      this.setData({
        history: true, //显示历史记录
      });
    }
    wx.cloud.init({
      env: 'cloud1-5g08f6dkc9d1e16a',
      traceUser: true,
    })
    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("seek_image")  //获取集合china的引用
      .get()
      .then(res => {
        console.log("请求成功", res.data);
        this.setData({
          hotimg: res.data
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