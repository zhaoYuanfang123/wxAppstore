// pages/authorization/authorization.js
const app = getApp();
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },
    // 获取用户信息
    adduserinfo: function(e) {
      var that = this;
      if (e.detail.userInfo) {
        console.log(e)
      
        //  登陆
        wx.login({
          success (res) {
            console.log(res)
            if (res.code) {
              //发起网络请求
              wx.request({
                method:'post',
                url: app.globalData.baseUrl+'/api/user/login',
                data: {
                  code: res.code,
                  wxapp_id:10001,
                  user_info:JSON.stringify(e.detail.userInfo),
                  encrypted_data:e.detail.encryptedData,
                  iv:e.detail.iv,
                  signature:e.detail.signature,
                  token:''
                },
                success:(loginres)=>{
                   console.log(loginres,'111');
                   wx.setStorageSync('token', loginres.data.data.token);
                   that.user_Detail();
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      } else {
        console.log('jujue')
      }
    },
  // 会员信息
  user_Detail(){
    var that = this;
    utils.userDetail(fnc);
    function fnc(res){
      // 缓存用户信息
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(res.data.data.userInfo),
      })
      wx.navigateBack({
        delta: 1
     })
      //  console.log(res,'会员信息')
    }
  },
  // 取消
  quxiao(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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