const {
  request
} = require("../../utils/request.js");


// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsTitle: ["全部订单", "待付款", "待发货", "退款/退货"],
    activeIndex: 0,
    // 订单列表
    orders: []
  },
  // 在显示页面的时候请求数据
  onLoad() {

    // 请求订单数据
    this.getOrderData();
  },
  // 封装获取订单数据的方法
  getOrderData(type = 1) {
    request({
      url: 'my/orders/all',
      data: {
        type
      }
    }).then(res => {
      const {
        orders
      } = res;
      this.setData({
        orders
      })
    })
  },
})