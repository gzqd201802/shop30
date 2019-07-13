Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1.0 初始化轮播图数据
    slider: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("页面加载的时候自动执行");
    // console.log(wx);
    // 1.0 向服务器发送请求，获取轮播图数据
    wx.request({
      // url 地址
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      // 请求成功的回调函数
      success: res => {
        // 解构返回结果的数据
        const {
          message
        } = res.data;
        // 通过 setData 方法设置页面数据更新
        this.setData({
          slider: message
        });
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