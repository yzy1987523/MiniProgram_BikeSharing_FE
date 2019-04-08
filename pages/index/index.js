Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitube:0,
    latitude:0,
    controls:[],    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getLocation({
      success: function(res) {
        var long=res.longitude;
        var lat=res.latitude;
        that.setData({
          longitube:long,
          latitude:lat,
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        var windWidth=res.windowWidth;
        var windHeight = res.windowHeight;
        that.setData({
          controls:[
            {
              id:1,
              iconPath:'/images/p1.png',
              position:{
                width:100,
                height:40,
                left:(windWidth-100)/2,
                top: windHeight - 60,
              },
              clickable:true,
            },
            {
              id: 2,
              iconPath: '/images/p2.png',
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
              iconPath: '/images/p3.png',
              position: {
                width: 100,
                height: 40,
                left: (windWidth - 100) / 2,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 4,
              iconPath: '/images/p4.png',
              position: {
                width: 100,
                height: 40,
                left: (windWidth - 100) / 2,
                top: windHeight - 60,
              },
              clickable: true,
            },

          ]
        })
      },
    })
  },
  controltap:function(e){
    var cid=e.controlId;
    if(cid==1){
      this.mapCtx.moveToLocation();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx=wx.createMapContext('myMap');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
