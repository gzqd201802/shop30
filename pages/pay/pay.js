// 引入之前封装的 request 方法
const {
  request
} = require("../../utils/request.js");

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
  async payHandle() {

    console.log('支付的逻辑都写到该事件内部');

    // 1.0 先检查用户是否已经是登录的，如果没有登录就跳转到登录页面
    // jwt
    // 获取本地存储是否有 token ，如果没有 token 就跳转到获取 token 授权登录页
    const token = wx.getStorageSync('token');
    if (!token) {
      // 跳转到获取 token 的页面
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }

    // 支付流程
    // 1. 创建订单，获取订单号
    const { order_number } = (await this.getOrderNumber());
    console.log('1. 创建订单，获取订单号', order_number);
    // 2. 根据订单号，准备预支付
    console.log('2. 根据订单号，准备预支付')
    // 3. 根据预支付的数据，调用微信支付接口
    // 4. 微信支付结束后，查询订单检查支付状态


  },

  // 1. 创建订单，获取订单号
  getOrderNumber() {
    // 订单请求参数较为复杂
    const {
      totalPrice,
      address,
      cartList
    } = this.data;

    // 1. 遍历购物车选中的商品
    const goods =
      // 提取对象键名称
      Object.keys(cartList)
      // 把键名称进行过滤，只保留选中的商品
      .filter(id => cartList[id].selected)
      // 根据选中商品的 id 值构建新的对象，用于创建订单
      .map(id => {
        return {
          "goods_id": cartList[id].goods_id,
          "goods_price": cartList[id].goods_price,
          "goods_number": cartList[id].count
        }
      });

    // 返回请求的 promise 对象
    return request({
      url: 'my/orders/create',
      method: 'POST',
      data: {
        "order_price": totalPrice,
        "consignee_addr": address.addressInfo,
        // 购物车中选中的商品数据
        "goods": goods
      }
    })
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