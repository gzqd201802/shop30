/* 该文件主要用于封装 request 请求 */

// function request(){

// }
const request = (param) => {

  // 基准路径
  const baseURL = 'https://api.zbztb.cn/api/public/v1/';

  // 显示加载提示框
  wx.showLoading({
    title: '疯狂加载中...',
  });

  return new Promise((resolve, reject) => {
    // 请求发送
    wx.request({
      // 展开传递的请求对象
      ...param,
      // url 请求地址 = 基准路径 + 参数中 url
      url: baseURL + param.url,
      // 请求成功的回调函数
      success: res => {
        const {
          message
        } = res.data;
        // 请求成功执行 resolve，并传输 message 数据
        resolve(message);
      },
      // 请求失败的回调函数
      fail: err => {
        reject(err);
      },
      // 请求结束都会执行
      complete: res => {
        // 隐藏记载提示框
        wx.hideLoading();
      }
    });
  })
}

// 把模块进行导出，导出一个对象
module.exports = {
  request
}