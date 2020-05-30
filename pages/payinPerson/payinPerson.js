// pages/payinPerson/payinPerson.js
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList:[],
    shopindex:0,
    shopArr:[],
    money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'o')
    wx.showLoading({
      title:'加载中'
    })
    this.setData({
      latitude:options.latitude,
      longitude:options.longitude,
      type:options.type //1是当面付，2是购买食材
    })
    this.getStoreList()
  },
  // 门店列表
  getStoreList(){
    var that = this;
    let data={
     latitude:that.data.latitude,
     longitude:that.data.longitude
    }
    utils.storeList(data,res=>{
     wx.hideLoading();
     let shop = [];
     res.data.data.list.forEach((item)=>{
       shop.push(item.shop_name)
     })
     that.setData({
       storeList:res.data.data.list,
       shopArr:shop
     })
    });
  },
  bindPickerChange: function(e) {
    this.setData({
      shopindex: e.detail.value
    })
  },
  changeMoney(e){
    this.setData({
      money:e.detail.value
    })
  },
  // 立即支付
  pay(){
    if(this.data.money){
      let data = {
        shop_id:this.data.storeList[this.data.shopindex].shop_id,
        pay_price:this.data.money,
        pay_type:20,//10 余额 20 微信支付
        order_source:this.data.type == 1 ? 10 :20
      }
      utils.paySubmit(data,response=>{
        if(response.data.code ==1){
          wx.requestPayment({
            timeStamp: response.data.data.payment.timeStamp,
            nonceStr: response.data.data.payment.nonceStr,
            package: 'prepay_id='+response.data.data.payment.prepay_id,
            signType: 'MD5',
            paySign: response.data.data.payment.paySign,
            success (res) { 
               wx.showToast({
                 title: '当面付成功',
                 icon:'none',
                 duration: 2000
               })
               setTimeout(()=>{
                app.globalData.orderIndex = 3
                wx.switchTab({
                  url: '/pages/order/order'
                })
               },3000)
            },
            fail (res) { }
          })
         }
          // console.log(response,'当面付')
      })
    }else{
      wx.showToast({
        title: '请输入金额',
        icon:'none',
        duration: 2000
      })
    }
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