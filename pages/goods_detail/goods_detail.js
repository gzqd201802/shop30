/* 
1 在onLoad生命周期事件中 获取 goods_id
2 封装请求 获取数据
3 再去渲染页面  
4 图片预览功能
  1 给图片绑定点击事件
5 加入购物车
  1 点击事件触发
  2 获取本地存储中的 购物车数据 cart 对象 格式 很类似 收藏的对象 
      要确保 这个是数据 是一个对象格式 
  3 判断 这个对象当中 有没有 要添加购物车的 商品对象
  4 不存在 就创建  同时 给 这个商品对象 加一个属性 count=1 数量的意思 
  5 已经存在 获取  count++；
  6 把 新的数据 重新 填充到 本地存储中  
 */

// 引入之前封装的 request 方法
const {
  request
} = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_all: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      goods_id
    } = options;

    this.getDetailData(goods_id);
  },
  // 封装请求 获取数据
  getDetailData(goods_id) {

    // 调用 request 请求详情页数据
    request({
        url: 'goods/detail',
        data: {
          goods_id
        }
      })
      .then(res => {
        // console.log(res);
        // 获取设备系统信息
        wx.getSystemInfo({
          success(result) {
            // .indexOf()       如果不包含字符串，返回 -1，包含返回字符串索引值
            // .includes()      是否包含字符串，返回结果 布尔类型
            if (result.system.toLowerCase().includes('ios')) {
              // 对富文本 webp 图片格式进行替换操作，因为 ios 不支持 webp
              res.goods_introduce = res.goods_introduce.replace(/\?.+?webp/g, '');
            }
          }
        });
        // console.log(res.goods_introduce);
        // 把所有的数据都添加到页面 data 中
        this.setData({
          goods_all: res
        });
      })


  },
  // 在新页面中全屏预览图片
  previewImage(event) {
    // 结构当前点击的图片链接
    const {
      current
    } = event.currentTarget.dataset;

    // 通过 map 迭代方法，把数组对象，提取成数组字符串
    const urls = this.data.goods_all.pics.map(item => item.pics_big_url);

    // 调用预览图片功能，在手机中可以看大图，可以保存或发送好友
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls, // 需要预览的图片http链接列表
    });

  },
  // 点击加入购物车按钮
  addToCart() {

    // debugger;    // 调试关键词，相当于之前的打断点
    // 解构购物车需要的商品数据
    const {
      goods_id,
      goods_small_logo,
      goods_name,
      goods_price
    } = this.data.goods_all;

    // 整个购物车所有商品集合,先读取本地存储中数据，如果没有设置成 {}
    let cartList = wx.getStorageSync('cartList') || {};
    // 如果商品已经在购物车总存在，再点击应该是 数量累加  ???
    if (cartList[goods_id]) {
      cartList[goods_id].count++;
    } else {
      // 单个商品信息数据设计 - 如果从来没添加过到购物车的商品才重新创建新对象
      let goodsItem = {
        goods_id,
        goods_small_logo,
        goods_name,
        goods_price,
        selected: true,
        count: 1
      }
      // 把单条数据存放到购物车集合中
      cartList[goods_id] = goodsItem;
    }
    // console.log(cartList);
    // 把购物车集合数据添加到本地存储
    wx.setStorageSync('cartList', cartList);

    // 添加成功后给用户提示
    wx.showToast({
      title: '加入成功',
      // 提示的延迟时间
      duration: 1000,
      // 显示透明蒙层，防止触摸穿透
      mask: true
    })

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