// 在页面生命周期函数上方，导入 request 模块
const {
  request
} = require("../../utils/request.js");

// 页面生命周期函数
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
    // 调用封装过的 request 方法
    request({
        url: 'categories'
      })
      // 请求成功执行的回调函数
      .then(res => {
        console.log(res);
        this.setData({
          classify: res
        });
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