const {
  request
} = require("../../utils/request.js");

// 变量也可以在 Page 函数外部创建
// let timer = null;

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: "",
    // 搜索历史数据
    historyList: ['小米', '大米'],
    tipsList: [],
    showTips: false
  },

  // 添加自定义数据，存放定时器的变量名
  timer: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 解构页面参数
    const {
      query
    } = options;
    // 设置页面数据
    this.setData({
      query
    })
  },

  // bindinput="inputChange" 当输入框的值改变的时候触发
  inputChange(event) {
    // console.log("当输入框的值改变的时候触发", event);
    const {
      value
    } = event.detail;
    // console.log(value);
    // 在请求前，先判断用户输入框是否为空
    if (!value.trim()) {
      // 隐藏搜索提示
      this.setData({
        showTips: false
      });
      // 如果没有内容，return 退出函数，不发起请求了
      return;
    }
    // 清除上一个启动的定时器
    clearTimeout(this.timer);
    // 通过定时器让请求等一等，再发送，减少多余请求
    this.timer = setTimeout(() => {
      // 调用方法，获取搜索提示数据
      this.getTipsData(value);
    }, 500);

  },
  inputBlur(){
    this.setData({
      showTips: false
    });
  },
  // 获取搜索提示数据
  getTipsData(value) {
    request({
        url: 'goods/qsearch',
        data: {
          query: value
        }
      })
      .then(res => {
        // console.log(res);
        this.setData({
          tipsList: res || []
        });
        if (res) {
          this.setData({
            showTips: true
          });
        } else {
          this.setData({
            showTips: false
          });
        }
      });
  },


  // bindconfirm="inputSubmit" 当用户按下键盘右下角完成时候触发
  inputSubmit(event) {
    // console.log("当用户按下键盘右下角完成时候触发,模拟器按回车键触发");
    const {
      value
    } = event.detail;
    // console.log(value);
    let {
      historyList
    } = this.data;
    // 1.0 界面更新
    // 把输入的数据添加到历史中, unshift 数组前添加
    historyList.unshift(value);
    // 数组去重
    historyList = [...new Set(historyList)]
    // 设置页面数据更新视图
    this.setData({
      historyList
    });
    // 2.0 本地存储更新**
    // 2.1 异步版本
    // wx.setStorage({
    //   // 键名称需要写成字符串
    //   key: "historyList",
    //   // 值应该要保留数据格式，一般是个变量
    //   data: historyList
    // });
    // 2.2 同步版本
    wx.setStorageSync('historyList', historyList);
    // 按键盘搜索按钮，应该也要跳转到列表页，把输入框的内容作为页面参数传递
    wx.redirectTo({
      url: '/pages/goods_list/goods_list?query=' + value,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 通过同步方法，获取本地存储数据，如果没有数据就通过短路运算设置默认空数组 []
    const historyList = wx.getStorageSync('historyList') || [];
    // 更新视图
    this.setData({
      historyList
    });
  },

  // 清空所有搜索历史 
  removeHistory() {
    // 1.0 视图消失
    this.setData({
      historyList: []
    });
    // 2.0 本地存储单条数据消失
    wx.removeStorageSync('historyList');
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