/* 该文件主要用于封装 request 请求 */

// function request(){

// }
const request = (param) => {

  // 1基准路径
  const baseURL = 'https://api.zbztb.cn/api/public/v1/';

  // 2显示加载提示框
  wx.showLoading({
    title: '疯狂加载中...',
  });

  // 调用 request 函数时，内部返回 Promise 对象
  // 方便我们通过 .then() 语法执行成功时候的回调函数
  return new Promise((resolve, reject) => {
    // 3请求发送
    wx.request({
      // 4展开传递的请求对象
      ...param,
      // 5url 请求地址 = 基准路径 + 参数中 url
      url: baseURL + param.url,
      // 6请求成功的回调函数
      success: res => {
        const {
          message
        } = res.data;
        // 请求成功执行 resolve，并传输 message 数据
        resolve(message);
      },
      // 7请求失败的回调函数
      fail: err => {
        reject(err);
      },
      // 8请求结束都会执行
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