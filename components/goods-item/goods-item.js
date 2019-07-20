// components/goods-item/goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    // !!!! 小程序组件的事件需要写到 methods 内部，否则无效
    // 点击商品，跳转到商品详情页
    goToDetail(event) {
      // 从事件对象中提取 商品 id
      const {
        id
      } = event.currentTarget.dataset;
      // 通过 wxAPI 跳转页面
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail?goods_id=' + id,
      });
    },
  }
})