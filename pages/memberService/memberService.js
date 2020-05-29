// pages/memberService/memberService.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {name:'黄金会员',mainprice:3,price:5},
      {name:'白银会员',mainprice:2,price:4},
      {name:'普通会员',mainprice:1,price:3}
    ],
    checkIndex:0,
    user_data:'',
    payMoney:'',//支付金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this; 
      that.user_Detail()     
  },
  choose(e){
    var that = this;
    that.setData({
      checkIndex:e.currentTarget.dataset.index
    })
  },
    // 会员级别
    user_grade(){
      var that = this;
      utils.userGrade(fnc);
      function fnc(res){
        console.log(res,'会员级别')
        that.setData({
          list:res.data.data.list.data,
          payMoney:res.data.data.list.data[0].upgrade.buy_money
        })
      }
    },
    // 支付
    pay(){
       var that = this;
       var data={
        grade_id:that.data.list[that.data.checkIndex].grade_id,
        pay_type:20 //10 余额 20 微信支付
       }
       utils.buyGrade(data,(response)=>{
        if(response.data.code ==1){
          wx.requestPayment({
            timeStamp: response.data.data.payment.timeStamp,
            nonceStr: response.data.data.payment.nonceStr,
            package: 'prepay_id='+response.data.data.payment.prepay_id,
            signType: 'MD5',
            paySign: response.data.data.payment.paySign,
            success (res) { 
              wx.navigateBack({
                delta: 1
              })
            },
            fail (res) { }
          })
         }
          // console.log(response,'下单')
       })
    },
// 会员信息
  user_Detail(){
    var that = this;
    utils.userDetail(fnc);
    function fnc(res){
      that.setData({
        user_data:res.data.data.userInfo,
      })
      that.user_grade()
       console.log(res,'会员信息')
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