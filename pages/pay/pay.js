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
    checkAllStatus: false,
    // 合计总价格
    totalPrice: 0,
    // 结算个数
    accountNumber: 0
  },

  // 封装用于计算总金额和结算数量的方法
  setTotalPrice() {
    const {
      cartList
    } = this.data;

    // 创建用于存放合计总价格的变量
    let totalPrice = 0;
    // 创建用户统计结算个数的变量
    let accountNumber = 0;

    // 遍历购物车数据，选中的商品，累加到总价格总
    Object.values(cartList).forEach(item => {
      if (item.selected) {
        // 总价格计算
        totalPrice += item.count * item.goods_price;
        // 选中多少个商品
        accountNumber++;
      }
    });

    this.setData({
      totalPrice,
      accountNumber
    });

  },
  
  // 点击支付按钮触发的事件
  payHandle(){

    console.log('支付的逻辑都写到该事件内部');

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

    this.setTotalPrice();

  },

})