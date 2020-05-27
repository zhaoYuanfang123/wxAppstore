// pages/notice.js
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabText:[{id:10,name:'未读'},{id:20,name:'已读'}],
    checkIndex:0,
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // var that = this;
      // this.getList(that.data.tabText[that.data.checkIndex].id)
  },
 getList(id){
   var that = this;
   let data = {
     readed:id
   }
   utils.noticeList(data,res=>{
     that.setData({
       list:res.data.data.list
     })
      console.log(this.data.list,'未读列表')
   })
 },
 choose(e){
  this.setData({
    checkIndex:e.currentTarget.dataset.index
  })
  this.getList(e.currentTarget.dataset.id)
},
toDetail(e){
  wx.navigateTo({
    url: '/pages/noticeDetail/noticeDetail?id='+e.currentTarget.dataset.id+'&tabTextid='+this.data.tabText[this.data.checkIndex].id,
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
    var that = this;
    this.getList(that.data.tabText[that.data.checkIndex].id)
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