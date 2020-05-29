// pages/myRebateDetail/myRebateDetail.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     balance:'',
     pageNum: 1,    //分页记录数
     loading:false,
     noMore:false,
     list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      balance:options.balance
    })
    this.getList(false);
  },
  getList(isPage){
    var that = this;
    let data = {
      page:that.data.pageNum
    }
    utils.myRebateBalance(data,res=>{
      this.setData({
        loading: false
      })
      if(isPage){
        //下一页的数据拼接在原有数据后面
        that.setData({
         list: this.data.list.data.concat(res.data.data.list.data),
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
      console.log(res,'明细')
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