const {
  request
} = require("../../utils/request.js");

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化关键词
    query: "",
    // tab栏选中的索引
    activeIndex: 0,
    // 商品列表
    goods: [],
    // 商品分类 id
    cid: 0,
    // 页码
    pagenum: 1,
    // 每页数据长度
    pagesize: 20,
    // 是否还有更多数据
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 解构获取页面参数
    const {
      query,
      cid
    } = options;
    // 更新数据
    this.setData({
      query,
      cid
    });
    // 从 data 中解构出来
    const {
      pagenum,
      pagesize
    } = this.data;
    // 调用
    this.getListData({
      query,
      cid,
      pagenum,
      pagesize
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("页面到达底部触发事件");
    // pagenum 页码+1，发起新的请求
    let {
      pagenum,
      cid,
      pagesize,
      query,
      hasMore
    } = this.data;

    if (!hasMore) {
      // 1. 没有数据给用户提示
      wx.showToast({
        title: '所有数据加载完毕...',
        icon: 'none',
        duration: 1000
      });
      // 没有数据直接 return 跳出当前函数，就不请求数据了
      return;
    };

    // 页码+1
    pagenum++;
    // 更新页面 data 中的 pagenum
    this.setData({
      pagenum
    })
    // 重新发起请求请求下一页数据
    this.getListData({
      query,
      cid,
      pagenum,
      pagesize
    });
  },

  // 用于请求列表的方法
  getListData(params) {

    request({
        url: "goods/search",
        // 请求参数
        data: {
          ...params
        }
      })
      .then(res => {
        console.log(res);
        // 请求返回的商品列表
        const {
          goods
        } = res;
        // 设置页面数据
        this.setData({
          // 把原数据展开，把新数据展开，连接成成新数组
          goods: [...this.data.goods, ...goods]
        });

        // 判断 goods 长度和 pagesize 长度
        if (goods.length < this.data.pagesize) {

          // 2. 改变 hasMore 变成 false
          this.setData({
            hasMore: false
          });
        }

      });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onReady--生命周期函数--监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow--生命周期函数--监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("onHide--生命周期函数--监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onUnload--生命周期函数--监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})