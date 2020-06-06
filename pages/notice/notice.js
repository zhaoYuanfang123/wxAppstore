// pages/notice.js
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabText:[{id:10,name:'未读'},{id:20,name:'已读'}],
    checkIndex:0,
    list:'',
    pageNum: 1, //分页
    loading:false,
    noMore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      // var that = this;
      // this.getList(that.data.tabText[that.data.checkIndex].id)
  },
 getList(isPage){
   var that = this;
   let data = {
     readed:that.data.tabText[that.data.checkIndex].id,
     page:that.data.pageNum
   }
   utils.noticeList(data,res=>{
    this.setData({
      loading: false
    })
    if(isPage){
      //下一页的数据拼接在原有数据后面
      that.setData({
        list: that.data.list.concat(res.data.data.list.data),
      })
   }else{
     that.setData({
      list:res.data.data.list.data
     })
   }
   if(res.data.data.list.data.length == 0){
    that.setData({
      noMore:true
    })
  }
     if(that.data.checkIndex == 0){
        that.setData({
          tipNum:res.data.data.list.total
        })
     }
     wx.hideLoading();
      // console.log(this.data.list,'未读列表')
   })
 },
 //到达底部
scrollToLower: function (e) {
  if (!this.data.loading && !this.data.noMore){
    this.setData({
      loading: true,
      pageNum: this.data.pageNum + 1
    })
    this.getList(true);
    
  }
},
 choose(e){
  wx.showLoading({
    title:'加载中'
  })
  this.setData({
    checkIndex:e.currentTarget.dataset.index,
    pageNum:1
  })
  this.getList(false)
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
    wx.showLoading({
      title:'加载中'
    })
    this.getList(false)
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