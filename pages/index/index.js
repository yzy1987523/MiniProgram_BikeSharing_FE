var myUtil=require("../../utils/myUtil.js")
Page({

  /**
   * 页面的初始数据，只有当前页面可以访问
   */
  data: {
    longitude0: 0,
    latitude0: 0,
    controls: [],
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      success: function(res) {
        that.setData({
          longitude0: res.longitude,
          latitude0: res.latitude
        })       
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        var windWidth = res.windowWidth;
        var windHeight = res.windowHeight;
        that.setData({
          controls: [{
              id: 1,
              iconPath: '/images/img1.png',
              position: {
                width: 40,
                height: 40,
                left: 40,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 2,
              iconPath: '/images/qrcode.png',
              position: {
                width: 100,
                height: 40,
                left: (windWidth - 100) / 2,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 3,
              iconPath: '/images/pay.png',
              position: {
                width: 40,
                height: 40,
                left: windWidth - 40,
                top: windHeight - 100,
              },
              clickable: true,
            },
            {
              id: 4,
              iconPath: '/images/warn.png',
              position: {
                width: 40,
                height: 40,
                left: windWidth - 40,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 5,
              iconPath: '/images/add.png',
              position: {
                width: 40,
                height: 40,
                left: 20,
                top: 20,
              },
              clickable: true,
            },
            {
              id: 6,
              iconPath: '/images/location.png',
              position: {
                width: 20,
                height: 35,
                left: windWidth*0.5-10,
                top: windHeight*0.5-35,
              },
              clickable: true,
            },

          ]
        })
      },
    })
  },
  controltap: function(e) {
    var cid = e.controlId;
    var that = this;
    switch (cid) {
      case 1:
        {
          this.mapContext.moveToLocation();
          break;
        }
      case 2:
        {
          
          var status=myUtil.get("status")
          //根据用户状态进入不同页面
          //跳转到注册页面
          if (status == 0) {
            wx.navigateTo({
              url: '../register/register', //..是上级目录
            })
          } else if (status == 1) {
            wx.navigateTo({
              url: '../deposite/deposit',
            })
          } else if (status == 2) {
            wx.navigateTo({
              url: '../identify/identify',
            })
          }
          break;
        }
      case 5:
        {
          //获取当前已有车辆
          // var bikes = that.data.markers;
          //获取到移动后的位置的中心点
          this.mapContext.getCenterLocation({
            success: function(res) {
              var log = res.longitude;
              var lat = res.latitude;
              // //将车辆设置到移动后的位置
              // bikes.push({
              //   iconPath: '/images/bike.png',
              //   width: 40,
              //   height: 40,
              //   longitude: log,
              //   latitude: lat
              // });
              // that.setData({
              //   markers: bikes
              // })
              //发送请求：将添加的单车数据发送到后台（SpringBoot）
              wx.request({
                url: 'http://localhost:80/bike/add',
                data: {
                  longitude: log,
                  latitude: lat,
                  status: 0
                },
                method: 'POST',
                success: function(res) {
                  console.log(res)

                }
              })
            }
          })
        }
    }
  },
  regionchange: function(e) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapContext = wx.createMapContext('myMap');
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
// 自定义方法
function findBikes(longitude, latitude, that) {
  wx.request({
    url: 'http://localhost:80/bike/findNear',
    method: 'GET',
    data: {
      longitude: longitude,
      latitude: latitude
    },
    success: function (res) {
      var bikes = res.data.map((geoResult) => {
        return {
          longitude: geoResult.content.location[0],
          latitude: geoResult.content.location[1],
          iconPath: '/images/bike.png',
          width: 35,
          height: 40,
          id: geoResult.content.id
        }
      })

      // 将bike数组set到当前页面的marker
      that.setData({
        markers: bikes
      })

    }
  })
}
