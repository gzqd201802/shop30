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
  // 点击切换 tab 栏
  changeTab(event) {
    const {
      index
    } = event.currentTarget.dataset;
    // 切换选项卡状态
    this.setData({
      activeIndex: index
    });
    // 重新请求，更新订单列表
    this.getOrderData(index + 1);
  },
  // 在显示页面的时候请求数据
  onLoad(options) {
    // 解构页面参数
    let {
      type
    } = options;
    // 如果没有页面参数，默认值为 1
    type = type || 1;
    // 更新选项卡索引
    this.setData({
      activeIndex: type - 1
    });
    // 请求订单数据
    this.getOrderData(type);
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