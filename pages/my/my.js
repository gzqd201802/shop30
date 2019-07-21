
const QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');

// 实例LBS地图服务对象
const lbs = new QQMapWX({
  key:'3HLBZ-ZIOWQ-TDT5U-GKEIU-GD753-2CBVD'
});



// map.js
Page({
  data: {
    // 经纬度
    latitude: 39.90469,
    longitude: 116.40717,
    // 标记点集合
    markers: [{
      iconPath: "/images/point.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    },
      {
        iconPath: "/images/eat.png",
        id: 1,
        latitude: 23.110194,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
    // 路线
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },
  onLoad(){
    this.getLocation();
  },
  // 
  getLocation(){
    // 调用前需要 用户授权 scope.userLocation
    // 获取当前的地理位置、速度。
    wx.getLocation({
      // wgs84
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: res => {
        const {
          latitude,
          longitude
        } = res;

        this.setData({
          latitude,
          longitude
        });

      }
    });
  }
})