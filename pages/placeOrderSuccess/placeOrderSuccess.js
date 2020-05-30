// pages/placeOrderSuccess/placeOrderSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:'',
    shop_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        order_id:options.order_id,
        shop_id:options.shop_id
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  toDetail(){
    wx.redirectTo({
      url: '/pages/orderDetail/orderDetail?order_id='+this.data.order_id,
    })
  },
  // 继续下单
  buy(){
    wx.redirectTo({
      url:"/pages/storeDetail/storeDetail?id="+this.data.shop_id
    })
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