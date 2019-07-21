// 引入之前封装的 request 方法
const {
  request
} = require("../../utils/request.js");

// 在需要用到 async await 的页面单独引入依赖库，前面变量名固定不要修改 regeneratorRuntime
const regeneratorRuntime = require('../../lib/runtime/runtime.js');

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

    try {
      // 支付流程 - 利用 await 把异步变同步，从上往下一步步执行
      // 1. 创建订单，获取订单号
      const {
        order_number
      } = await this.getOrderNumber();
      console.log('1. 创建订单，获取订单号', order_number);
      // 2. 根据订单号，准备预支付
      const {
        pay
      } = await this.getPayOrder(order_number);
      console.log('2. 根据订单号，准备预支付', pay);
      // 3. 根据预支付的数据，调用微信支付接口
      const res = await this.getRequestPayment(pay);
      console.log('3. 根据预支付的数据，调用微信支付接口', res);
      // 4. 微信支付结束后，查询订单检查支付状态
      const res2 = await this.getOrderCheck(order_number);
      console.log('4. 微信支付结束后，查询订单检查支付状态', res2);

      // 支付成功也给用户提示
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      });

      // 5. 支付完成后，把已经支付的商品从本地删除
      let { cartList } = this.data;
      // 先获取所有的 key
      Object.keys(cartList)
      // 过滤出被选中的商品的 key
      .filter(id => cartList[id].selected)
      // 遍历选中的 key，根据 key 删除掉对应数据
      .forEach(id=>{
        delete cartList[id];
      });
      // 5.1 更新本地存储数据
      wx.setStorageSync('cartList', cartList);

      // 6. 支付完成后，页面需要跳转
      wx.switchTab({
        url: '/pages/cart/cart',
      });

    } catch (err) {
      console.log('支付失败，执行catch', err);
      // 支付失败给用户提示
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      });
    }

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

  // 2. 根据订单号，准备预支付
  getPayOrder(order_number) {
    // 函数内部返回 promise 对象
    return request({
      url: 'my/orders/req_unifiedorder',
      method: 'POST',
      // 根据 order_number 创建预支付订单
      data: {
        order_number
      }
    })
  },

  // 3. 根据预支付的数据，调用微信支付接口
  getRequestPayment(pay) {
    // 把微信的方法改造成 Promise 写法
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        // 解构支付对象
        ...pay,
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      })
    })

  },

  // 4. 微信支付结束后，查询订单检查支付状态
  getOrderCheck(order_number) {
    return request({
      url: 'my/orders/chkOrder',
      method: 'POST',
      data: {
        order_number
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