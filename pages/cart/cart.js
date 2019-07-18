// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址数据
    address: {}
  },
  // 点击选择收货地址
  chooseAddress() {
    // 在调用收货地址功能前先 检查权限
    wx.getSetting({
      // 返回值中只会出现小程序已经向用户请求过的权限。
      success: res => {
        console.log(res);
        // 获取授权信息
        const addressAuth = res.authSetting['scope.address'];
        // 如果检测权限的时候，发现收货地址的结果为 false ，打开设置引导用户开启权限
        if (addressAuth === false) {
          // 调起客户端小程序设置界面 - 引导用户开启权限
          wx.openSetting({
            // 从设置界面点击返回后就会触发 success 回调函数
            success: result => {
              // 每次关闭设置界面的时候，都尝试调用收货地址功能，开启权限的话自动弹出收货地址
              this.chooseAddressMain();
            }
          })
          // 如果用户权限列表中是已授权 true 或者 没有地址授权信息 undefined
        } else if (addressAuth === true || addressAuth === undefined) {
          // 调用收货地址功能
          this.chooseAddressMain();
        }
      }
    })

  },
  // 收货地址核心 功能封装
  chooseAddressMain() {
    // 调用收货地址 api 
    wx.chooseAddress({
      success: res => {
        // 解构需要的地址数据
        const {
          userName,
          telNumber,
          provinceName,
          cityName,
          countyName,
          detailInfo
        } = res;

        const address = {
          userName,
          telNumber,
          addressInfo: provinceName + cityName + countyName + detailInfo
        }
        // 更新视图
        this.setData({
          address
        });
        // 设置到本地存储中
        wx.setStorageSync('address', address);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 页面显示的时候，从本地存储获取数据
    this.setData({
      address: wx.getStorageSync('address') || {}
    });
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