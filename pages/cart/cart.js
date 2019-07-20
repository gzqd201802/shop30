// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址数据
    address: {},
    // 购物车数据
    cartList: {},
    // 全选状态
    checkAllStatus: false
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
          });
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

  // 商品数量计数器事件
  countChange(event) {
    // 解构事件传递的参数
    const {
      num,
      id
    } = event.currentTarget.dataset;

    // 解构购物车集合
    const {
      cartList
    } = this.data;

    // 数量加减运算
    cartList[id].count += num;

    // 如果数据运算后小于 1，询问用户是否要删除
    if (cartList[id].count < 1) {
      console.log("询问用户是否要删除");
      // 弹出模态窗口
      wx.showModal({
        // 标题
        title: '是否删除商品',
        content: '',
        confirmText: '删除',
        confirmColor: '#eb4450',
        success: (res) => {
          // console.log(res);
          if (res.confirm) {
            // 用户点击确定，直接把数据删除
            delete cartList[id];
          } else if (res.cancel) {
            // 用户点击取消，数量变回 1
            cartList[id].count = 1;
          }

          // 在异步函数内部也要更新数据
          this.setCartListData(cartList);
        }
      })
    } else {
      this.setCartListData(cartList);
    }

  },
  // 计数器失去焦点触发
  countBlur(event) {
    // 从事件对象中，获取事件参数
    const {
      id
    } = event.currentTarget.dataset;
    // 从事件对象中，获取输入框的值
    const {
      value
    } = event.detail;

    // 解构购物车数据
    let {
      cartList
    } = this.data;

    // 修改购物车商品数量
    cartList[id].count = +value;

    // 更新购物车数据
    this.setCartListData(cartList);

  },

  setCartListData(cartList) {
    // 更新视图
    this.setData({
      cartList
    });

    // 更新本地存储
    wx.setStorageSync('cartList', cartList);
  },

  // 点击商品前的选择按钮
  changeItemSelect(event) {
    const {
      id
    } = event.currentTarget.dataset;

    const {
      cartList
    } = this.data;

    cartList[id].selected = !cartList[id].selected;

    // // Object.keys(对象)     返回对象 所有 键名称，数组格式
    // let result = Object.keys(cartList);
    // // Object.values(对象)   返回对象 所有 值，数组格式
    // let result2 = Object.values(cartList);

    // console.log(result2);
    // every 数组方法，用于检查数据组中是否数据都符合某个规则
    const checkAllStatus = Object.values(cartList).every(item => item.selected);

    this.setData({
      checkAllStatus
    });

    this.setCartListData(cartList);
  },

  // 全选按钮点击事件
  changeAllSelect(){
    let {
      checkAllStatus,
      cartList
    } = this.data;
    // 自身取反
    checkAllStatus = !checkAllStatus;
    // 遍历购物车，把选择状态改成和全选状态一样
    Object.keys(cartList).forEach(id => {
      cartList[id].selected = checkAllStatus;
    });

    // 更新自身状态
    this.setData({
      checkAllStatus
    });
    
    // 更新购物车数据
    this.setCartListData(cartList);
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
      address: wx.getStorageSync('address') || {},
      cartList: wx.getStorageSync('cartList') || {}
    });
    // 获取全选状态
    const checkAllStatus = Object.values(this.data.cartList).every(item => item.selected);

    this.setData({
      checkAllStatus
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