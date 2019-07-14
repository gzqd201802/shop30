// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化左侧菜单的默认选中状态索引
    activeIndex: 0,
    // 初始化分类总数据
    classify: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用方法，请求数据
    this.getClassifyData();
  },
  // 封装请求的方法
  getClassifyData() {
    // 显示加载提示框
    wx.showLoading({
      title: '疯狂加载中...',
    });
    // 请求发送
    wx.request({
      // url 请求地址
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      // 请求成功的回调函数
      success: res => {
        const {
          message
        } = res.data;
        console.log(message);
        // 把返回结果设置到页面数据中
        this.setData({
          classify: message
        })
      },
      // 请求失败的回调函数
      fail: err => {

      },
      // 请求结束都会执行
      complete: res => {
        // 隐藏记载提示框
        wx.hideLoading();
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})