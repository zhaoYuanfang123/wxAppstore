// pages/myRebate/myRebate.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cashNum:'',
     balance:'',//可提现金额
     placeh:''
  },
  changeMoney(e){
     this.setData({
       cashNum:e.detail.value
     })
  },
  cashAll(){
     const {balance} = this.data
     var that = this;
     that.setData({
       cashNum:balance
     })
  },
  toDetail(){
    wx.navigateTo({
      url: '/pages/myRebateDetail/myRebateDetail?balance='+this.data.balance,
    })
  },
  getInfo(){
    utils.rebateSet({},res=>{
      this.setData({
        placeh:'最低'+res.data.data.rebate.settlement_min_money+'元起'
      })
      // console.log(res,'ffff')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 会员信息
  user_Detail(){
    var that = this;
    utils.userDetail(fnc);
    function fnc(res){
      that.setData({
        balance:res.data.data.userInfo.balance,
      })
    }
  },
  // 立即提现
  withdraw(){
    var that = this;
    if(that.data.cashNum){
      utils.myRebateWithdraw({money:this.data.cashNum},res=>{
        console.log(res,'提现')
        if(res.data.code == 1){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(()=>{
            that.toDetail()
          },3000)
           
        }
      })
    }else{
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
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
      this.user_Detail();
      this.getInfo();
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