Page({

  /**
   * 页面的初始数据
   */
  data: {
    now:null,//实况天气
    forecast:null,//未来几天的天气
    hourly:null,//小时的预报
    lifestyle:null, //生活指数
    basic:null,
    update:null  //更新时间
  },
  // 生活指数的弹窗
  showLifetyle:function(event){
    var txt = event.currentTarget.dataset.message;
    var title = event.currentTarget.dataset.title;
    wx.showModal({
      title: title,
      content: txt,
      showCancel:false
    })
    console.log(event);
  },
  chooseCity: function () {  //地图选点
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var weidu = res.latitude;
        var jingdu = res.longitude;
        that.getWeatherData(jingdu, weidu);
        console.log(res);
      },
    })
  },
  getWeatherData: function (jingdu, weidu){  //获取天气数据
    let that = this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather?location=' + jingdu + ',' + weidu + '&key=91339617beca4fb08eb28c43b90a64a2',
      success:function(data){
        // 给data中的属性值
        that.setData({
          now:data.data.HeWeather6[0].now,
          forecast:data.data.HeWeather6[0].daily_forecast,
          hourly: data.data.HeWeather6[0].hourly,
          lifestyle: data.data.HeWeather6[0].lifestyle,
          basic: data.data.HeWeather6[0].basic,
          update: data.data.HeWeather6[0].update
        });
        console.log(data);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取当前位置
    wx.getLocation({
      success: function (res) {
        var weidu = res.latitude; //维度
        var jingdu = res.longitude; //经度
        that.getWeatherData(jingdu, weidu);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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