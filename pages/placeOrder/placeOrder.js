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
     infoPhone:'',
     express_price:'',
     array: ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30','23:59',
    ],
    timeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
    var that = this;
    var op = JSON.parse(options.data)
    that.setData({
      shopId:op.shop_id,
      shopName:op.shopName
    })
    let time = []
    that.data.array.forEach((item,index) => {
      if(new Date().getHours() == item.split(":")[0]){
        time.push({item:item,index: index})
      }
    });
    this.setData({
      timeIndex:new Date().getMinutes() >30?time[1].index:time[0].index
    })
    that.getAddressList();
    that.getShopDetail();
    that.getorderInfo()
  },
  // 结算订单信息
  getorderInfo(){
    let data = {
      shop_id:this.data.shopId ,
      delivery:this.data.tabText[this.data.checkIndex].id//10 配送 20 自提
    }
    utils.SettleorderInfo(data,res=>{
      wx.hideLoading();
       this.setData({
         list:res.data.data.goods_list,
         order_price:res.data.data.order_pay_price,
         express_price:res.data.data.express_price,
         order_total_num:res.data.data.order_total_num
       })
       console.log(res,'结算订单信息')
    })
  },
  choose(e){
    this.setData({
      checkIndex:e.currentTarget.dataset.index
    })
    this.getorderInfo();
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeTime(e){
    this.setData({
      timeIndex:e.detail.value
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
      wx.hideLoading();
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
      wx.hideLoading();
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
       console.log(response,'提交订单')
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