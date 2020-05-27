// pages/addressManagement/addressManagement.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     default_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
    this.getList()
  },
  // 获取收货地址列表
  getList(){
    var that = this;
    utils.addressList({},(res)=>{
        that.setData({
          list:res.data.data.list,
          default_id:res.data.data.default_id
        })
        wx.hideLoading();
        console.log(res,'收货地址列表')
    })
  },
  addAddress(){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress?type=add',
    })
  },
  edit(e){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress?type=edit&address_id='+e.currentTarget.dataset.id,
    })
  },
  // 默认地址
  radioDefault:function(e){
    var id = e.currentTarget.dataset.id;
    var that = this;
    let data = {
      address_id :id
    }
     utils.setDefaultAddress(data,res=>{
       if(res.data.code == 1){
         that.getList()
       }
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