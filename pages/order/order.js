// pages/order/order.js
var utils=require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabText:[{type:'all',name:'全部'},{type:'payment',name:'待支付'},{type:'received',name:'待收货'},{type:4,name:'当面付'}],
    checkIndex:0,
    goodsList:[],
    pageNum: 1,    //分页记录数
    loading:false,
    noMore:false,
    payList:[],
    type:'all',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  choose(e){
    wx.showLoading({
      title:'加载中'
    })
    this.setData({
      checkIndex:e.currentTarget.dataset.index,
      pageNum:1
    })
    if(e.currentTarget.dataset.type != 4){
        this.setData({
          type:this.data.tabText[this.data.checkIndex].type
        })
        this.getList(false)
    }else{
      this.getPayList(false)
    }
  },
  getList(isPage){
    var that = this;
    let data = {
      page:that.data.pageNum,
      dataType:that.data.type,//all全部 payment待付款 delivery待确认 received待出行 comment待评价
    }
    utils.myOrderList(data,res=>{
      wx.hideLoading();
      this.setData({
        loading: false
      })
      if(isPage){
         //下一页的数据拼接在原有数据后面
         that.setData({
          goodsList: this.data.goodsList.concat(res.data.data.list.data),
         })
      }else{
        that.setData({
          goodsList:res.data.data.list.data,
        })
      }
      if(res.data.data.list.data.length == 0){
        that.setData({
          noMore:true
        })
      }
       console.log(res,'商品订单列表')
    })
  },
//到达底部
scrollToLower: function (e) {
  if (!this.data.loading && !this.data.noMore){
    this.setData({
      loading: true,
      pageNum: this.data.pageNum + 1
    })
    if(this.data.checkIndex != 3){
      this.getList(true);
    }else{
      this.getPayList(true);
    }
    
  }
},
// 获取当面付列表
getPayList(isPage){
  var that = this;
  utils.payOrderList({page:that.data.pageNum},res=>{
    wx.hideLoading();
    this.setData({
      loading: false
    })
    if(isPage){
      that.setData({
        payList:this.data.payList.concat(res.data.data.list.data)
      })
    }else{
      that.setData({
        payList:res.data.data.list.data
      })
    }
    if(res.data.data.list.data.length == 0){
      that.setData({
        noMore:true
      })
    }
     console.log(res,'当面付列表')
  })
},
// 取消订单
cancelOrder(e){
  let data = {
    order_id:e.currentTarget.dataset.id
  }
 utils.cancelOrder(data,res=>{
    wx.showToast({
      title: res.data.msg,
      icon: 'none',
      duration: 2000
    })
    this.getList(false)
 })

},
// 订单详情
toDetail(e){
  console.log(e);
  
  wx.navigateTo({
    url: '/pages/orderDetail/orderDetail?order_id='+e.currentTarget.dataset.id,
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
    wx.showLoading({
      title:'加载中'
    })
    if(app.globalData.orderIndex != ''){
      console.log(11111111)
      this.setData({
        checkIndex:app.globalData.orderIndex
      })
    }
    if(app.globalData.orderIndex == 0){
      this.setData({
        checkIndex:0
      })
    }
    if(app.globalData.orderIndex == 3){
      this.getPayList(false)
    }
    this.getList(false);
    console.log(app.globalData.orderIndex,'zzz')
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