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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("用户下拉页面时候触发");
    // 1. 页面重新从 1 开始，商品列表先清空
    const {
      query,
      cid,
      pagesize
    } = this.data;

    // 重新设置请求页码
    const pagenum = 1;
    // 把页面数据中的 列表清空
    this.setData({
      pagenum,
      goods: [],
      hasMore: true
    })
    // 发起新的请求
    this.getListData({
      query,
      cid,
      pagenum,
      pagesize
    })
  },
  // 用于请求列表的方法
  getListData(params) {
    // 如果从搜索页过来，cid 的结果是 undefined
    // undefined 时候，利用 delete 关键词删除参数上多余的 params.cid
    if (!params.cid) delete params.cid;
    
    // 发起请求
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
        // 在用户请求数据完成后，就停止下拉动画
        wx.stopPullDownRefresh();
      });

  },
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})