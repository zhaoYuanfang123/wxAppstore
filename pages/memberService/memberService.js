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
      wx.getStorage({
        key: 'userInfo',
        success (res) {
          if(res.data){
             that.setData({
               user_data:JSON.parse(res.data)
             })
             that.user_grade()
          }
        }
      })
      
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
       utils.buyGrade(data,(res)=>{
          console.log(res)
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