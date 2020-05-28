// pages/placeOrder/placeOrder.js
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabText:[{id:10,name:'外卖配送'},{id:20,name:'上门自提'}],
     checkIndex:0,
     defaultAddress:false,
     address:'',
     list:[],
     shopId:'',
     shopName:'',
     order_total_num:'',
     order_price:'',
     cj_array: ['1份', '2份', '3份', '4份','5份','6份','7份','8份','9份','10份','10份以上'],
     index:0,
     remark:false,
     textareaVal:'',
     shopInfo:'',//店铺详情
     infoName:'',
     infoPhone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var op = JSON.parse(options.data)
    that.setData({
      shopId:op.shop_id,
      shopName:op.shopName
    })
    that.getCartList(op.shop_id);
    that.getAddressList();
    that.getShopDetail();
  },
   // 获取购物车列表
   getCartList(id){
    var that = this;
    var data = {
      shop_id:id
    }   
    utils.cartList(data,(res)=>{
       that.setData({
        list:res.data.data.goods_list,
        order_total_num:res.data.data.order_total_num,
        order_price:res.data.data.order_price
       })
        // console.log(res,'购物车列表')
    })
  },
  choose(e){
    this.setData({
      checkIndex:e.currentTarget.dataset.index
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  showRemark(){
    this.setData({
      remark:true
    })
  },
  hideRemark(){
    this.setData({
      remark:false
    })
  },
  changeText(e){
     that.setData({
      textareaVal:e.detail.value
     })
  },
  // 获取收获地址列表
  getAddressList(){
    var that = this;
    utils.addressList({},res=>{
      var address_=''
      if(res.data.data.default_id){
        address_ = res.data.data.list.map(item=>{
           item.id = res.data.data.default_id
           return item
        })
        console.log(address_,'adddddd')
        that.setData({
          defaultAddress:true,
          address:address_[0]
        })
      }else{
        that.setData({
          defaultAddress:false
        })
      }
      console.log(res,'收货地址列表')
    })
  },
  toAddress(){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },
  checkAddress(){
    wx.navigateTo({
      url: '/pages/addressManagement/addressManagement',
    })
  },
  // 获取店铺详情
  getShopDetail(){
    var that = this;
    var data = {
      shop_id:that.data.shopId
    }
    utils.shopDetail(data,(res)=>{
        that.setData({
          shopInfo:res.data.data.detail
        })
        console.log(res,'店铺详情')
    })
  },
  // 结算订单
  submitOrder(){
     var that = this;
     if(that.data.checkIndex == 1){
       if(that.data.infoName == ''){
            wx.showToast({
              title: '请输入联系人姓名',
              icon: 'none',
              duration: 2000
          })
          return false;
       }else if(that.data.infoPhone == ''){
            wx.showToast({
              title: '请输入联系人电话',
              icon: 'none',
              duration: 2000
          })
          return false;
       }else if(!(/^1[34578]\d{9}$/.test(that.data.infoPhone))){
            wx.showToast({
              title: '手机号码有误',
              icon: 'none',
              duration: 2000
          })
          return false;
       }
     }
     var data = {
      shop_id:that.data.shopId,
      delivery:that.data.tabText[that.data.checkIndex].id,//10 配送 20 自提
      pay_type:20,//10 余额 20 微信支付
      linkman:that.data.infoName,//联系人姓名
      phone:that.data.infoPhone,//联系人手机号码
      remark:that.data.textareaVal
     }
     utils.Settleorder(data,(response)=>{
       if(response.data.code ==1){
        wx.requestPayment({
          timeStamp: response.data.data.payment.timeStamp,
          nonceStr: response.data.data.payment.nonceStr,
          package: 'prepay_id='+response.data.data.payment.prepay_id,
          signType: 'MD5',
          paySign: response.data.data.payment.paySign,
          success (res) { 
             wx.navigateTo({
               url: '/pages/placeOrderSuccess/placeOrderSuccess?order_id='+response.data.data.order_id,
             })
          },
          fail (res) { }
        })
       }
       console.log(res,'提交订单')
     })
  },
  changeName(e){
    this.setData({
      infoName:e.detail.value
    })
  },
  changePhone(e){
    this.setData({
      infoPhone:e.detail.value
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