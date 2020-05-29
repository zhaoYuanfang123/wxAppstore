// pages/orderDetail/orderDetail.js
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {pic:'/images/shopImg.png',name:'红烧牛肉面',guige:'大份、辣、双份牛肉',price:'32.80',num:1},
      {pic:'/images/shopImg.png',name:'红烧牛肉面',guige:'大份、辣、双份牛肉',price:'32.80',num:1},
      {pic:'/images/shopImg.png',name:'红烧牛肉面',guige:'大份、辣、双份牛肉',price:'32.80',num:1}
    ],
    order_id:'',
    orderInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
     this.setData({
      order_id:options.order_id
     })
     this.getDetail()
  },
  getDetail(){
      utils.orderDetail({order_id:this.data.order_id },res=>{
        wx.hideLoading();
        res.data.data.order.address.phone = res.data.data.order.address.phone.substr(0,3) + "****" + res.data.data.order.address.phone.substr(7);
        this.setData({
          orderInfo:res.data.data.order
        })
          console.log(res,'订单详情')
      })
  },
    // 结算订单
    submitOrder(){
      var that = this;
      var data = {
       shop_id:that.data.orderInfo.shop_id,
       delivery:that.data.orderInfo.delivery_type.value,//10 配送 20 自提
       pay_type:that.data.orderInfo.pay_type.value,//10 余额 20 微信支付
      //  linkman:that.data.infoName,//联系人姓名
      //  phone:that.data.infoPhone,//联系人手机号码
       remark:that.data.orderInfo.buyer_remark
      }
      utils.Settleorder(data,(response)=>{
        if(response.data.code ==1){
         wx.requestPayment({
           timeStamp: response.data.data.payment.timeStamp,
           nonceStr: response.data.data.payment.nonceStr,
           package: 'prepay_id='+response.data.data.payment.prepay_id,
           signType: 'MD5',
           paySign: response.data.data.payment.paySign,
           success (res) { 
              wx.navigateTo({
                url: '/pages/placeOrderSuccess/placeOrderSuccess?order_id='+response.data.data.order_id,
              })
           },
           fail (res) { }
         })
        }
        console.log(res,'提交订单')
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