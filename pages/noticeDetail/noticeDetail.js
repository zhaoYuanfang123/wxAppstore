// pages/noticeDetail/noticeDetail.js
var utils=require("../../utils/util.js");
var wxParse = require('/../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getDetail(options.id);
     if(options.tabTextid == 10){
      this.read(options.id)
     }
     
  },
  getDetail(id){
    var that = this;
     let data = {
      article_id:id
     }
     utils.noticeDetail(data,res=>{
        wxParse.wxParse('article', 'html', res.data.data.detail.article_content, that,5);
        that.setData({
          content:res.data.data.detail
        })
        // console.log(res,'公告详情')
     })

  },
  // 标记已读
  read(id){
    let data = {
      article_id:id
    }
    utils.noticeRead(data,res=>{
       console.log(res,'标记已读')
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