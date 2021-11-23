// components/SearchInput/SearchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchimg: "https://636c-cloud1-5g08f6dkc9d1e16a-1307955925.tcb.qcloud.la/image/icon/search.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputBind: function () {
      wx.navigateTo({
        url: "/pages/seek/seek"
      });
    }
  }
})
