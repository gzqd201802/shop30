// 引入之前封装的 request 方法
const {
  request
} = require("../../utils/request.js");

Page({

  // 1. 获取用户信息按钮的事件
  getUserInfo(event) {
    // 1.1 解构用户登录需要用到的四个参数
    const {
      encryptedData,
      iv,
      rawData,
      signature
    } = event.detail;

    // 2. 继续获取登录的 code
    wx.login({
      success: res => {
        // 2.1 获取 code
        const {
          code
        } = res;

        // 3. 调用登录接口获取 token
        // 需要传入 5 个必要参数
        this.getTokenData({
          encryptedData,
          iv,
          rawData,
          signature,
          code
        });
      }
    });
  },

  // 3.0 封装登录接口获取 token
  getTokenData(params) {
    // 调用登录接口
    request({
      url: 'users/wxlogin',
      method: 'POST',
      data: {
        ...params
      }
    }).then(res => {
      // 防止 res 返回值为 null，程序报错
      if (res) {
        // 4. 解构返回值的 token
        const {
          token
        } = res;
        // 4.1 把 token 保存到本地
        wx.setStorageSync('token', token);
        // 4.2 返回上一页
        wx.navigateBack();
      }

    })
  }

})