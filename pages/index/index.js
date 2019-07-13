Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1.0 初始化轮播图数据
    slider: [],
    // 2.0 初始化入口数据
    entry: [],
    // 3.0 初始化楼层数据
    floor: [],
    // 4.0 是否显示返回顶部
    showTop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("页面加载的时候自动执行");
    // console.log(wx);
    // 1.1 调用轮播图请求
    this.getSliderData();
    // 2.1 调用请求首页入口方法
    this.getEntryData();
    // 3.1 调用楼层数据
    this.getFloorData();
  },

  // 1.0 封装轮播图请求
  getSliderData() {
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
  // 2.0 封装获取首页入口数据
  getEntryData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: res => {
        // 解构返回结果的数据
        const {
          message
        } = res.data;
        // 数据设置到页面中
        this.setData({
          entry: message
        });
      }
    })
  },

  // 3.0 封装获取首页入口数据
  getFloorData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: res => {
        // 解构返回结果的数据
        const {
          message
        } = res.data;
        // 数据设置到页面中
        this.setData({
          floor: message
        });
      }
    })
  },

  // 4.0 返回顶部的事件处理函数
  goTop(event) {
    const {
      top
    } = event.currentTarget.dataset;
    // 实现返回顶部效果
    wx.pageScrollTo({
      scrollTop: top,
      duration: 300
    })
  },

  // 5.0 页面滚动触发的事件
  onPageScroll(event) {
    // console.log(event);
    const {
      scrollTop
    } = event;
    if (scrollTop > 200) {
      this.setData({
        showTop: true
      });
    } else {
      this.setData({
        showTop: false
      });
    }
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