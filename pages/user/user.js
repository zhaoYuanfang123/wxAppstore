// pages/user/user.js
var utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_data:'',
    sq:false,
    iconlist: [{
        'iconurl': '/images/user/user_ico1.png',
        "title": '全部订单'
      },
      {
        'iconurl': '/images/user/user_ico2.png',
        "title": '待付款'
      },
      {
        'iconurl': '/images/user/user_ico3.png',
        "title": '待收货'
      },
      {
        'iconurl': '/images/user/user_ico4.png',
        "title": '当面付'
      },
    ],
    iconlist2:[{
      'iconurl': '/images/user/user_ico5.png',
      "title": '收获地址',
      'id':1
    },
    {
      'iconurl': '/images/user/user_ico6.png',
      "title": '会员服务',
      'id':2
    },
    {
      'iconurl': '/images/user/user_ico7.png',
      "title": '我的返利',
      'id':3
    },
    ]
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
               sq:true,
               user_data:JSON.parse(res.data)
             })
             that.user_Detail();
          }
        }
      })
      
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
      that.setData({
        user_data:res.data.data.userInfo,
        sq:true
      })
      // 缓存用户信息
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(res.data.data.userInfo),
      })
      //  console.log(res,'会员信息')
    }
  },

  toLink(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    if(id == 3){
      wx.navigateTo({
        url: '/pages/myRebate/myRebate',
      })
    }else if(id == 1){
      wx.navigateTo({
        url: '/pages/addressManagement/addressManagement',
      })
    }else{
      wx.navigateTo({
        url: '/pages/memberService/memberService',
      })
    }
  },
  toMemberService(){
    wx.navigateTo({
      url: '/pages/memberService/memberService',
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