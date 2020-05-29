// pages/searchShop/searchShop.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zonghe:'综合',
    comprehensive:[
      {name:'综合排序',type:'all'},
      {name:'销量最高',type:'sales'},
      {name:'起送价最低',type:'delivery_fee'},
      {name:'配送费最低',type:'express_price'}
    ],
    zhCheckecIndex:0,
    showzh:false,
    showModal: false,
    showsx:false,
    storeList:'',
    latitude:'',
    longitude:'',
    searchText:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      latitude:options.latitude,
      longitude:options.longitude,
      searchText:options.searchText
    })
    that.getStoreList()
  },
  // 点击综合
  submitzh: function() {
    this.setData({
    showModal: true,
    showzh:true,
    showsx:false
    })
},
// 点击筛选
submitsx: function() {
  this.setData({
  showModal: true,
  showsx:true,
  showzh:false
  })
},
sxList(e){
  var that = this;
  that.setData({
    zonghe:that.data.comprehensive[e.currentTarget.dataset.index].name,
    zhCheckecIndex:e.currentTarget.dataset.index,
    showModal:false
  })
  that.getStoreList();
},
close: function() { 
  this.setData({
  showModal: false
  })
},
// 点击综合选项
showzh(){
  this.setData({
    showzh:true,
    showsx:false
  })
  },
  // 点击筛选选项
showsx(){
  this.setData({
    showsx:true,
    showzh:false
  })
},
  // 门店列表
  getStoreList(){
    var that = this;
    let data={
     latitude:that.data.latitude,
     longitude:that.data.longitude,
     search:that.data.searchText,
     sortType:that.data.comprehensive[that.data.zhCheckecIndex].type,
     sortPrice:0
    }
    utils.storeList(data,res=>{
     that.setData({
       storeList:res.data.data.list
     })
    });
  },
  toshopDetail(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/storeDetail/storeDetail?id='+id+'&latitude='+that.data.latitude+'&longitude='+that.data.longitude
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