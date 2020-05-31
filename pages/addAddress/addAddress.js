// pages/addAddress/addAddress.js
var utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
       name:'',
       phone:'',
       detail:'',
       region:'',
       address_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.type == 'edit'){
       that.setData({
         address_id:options.address_id
       })
       that.getDetail(options.address_id)
    }
  },
  // 地址详情
  getDetail(id){
    var that = this
    let data = {
      address_id : id
    }
     utils.addressDetail(data,res=>{
         console.log(res,'xq');
         let _reg = res.data.data.detail.region;
         let arr=[];
         arr.push(_reg.city);
         arr.push(_reg.province);
         arr.push(_reg.region);
        that.setData({
          name:res.data.data.detail.name,
          phone:res.data.data.detail.phone,
          detail:res.data.data.detail.detail,
          region:arr
        })
     })
  },
  bindRegionChange: function(e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  // 保存
save(){
  var that = this;
   if(that.data.name == ''){
       wx.showToast({
          title: '请输入收货人姓名',
          icon: 'none',
          duration: 2000
      })
      return false;
   }
   if(that.data.phone == ''){
        wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000
      })
      return false;
   }
   if(!(/^1[34578]\d{9}$/.test(that.data.phone))){
          wx.showToast({
            title: '手机号码有误',
            icon: 'none',
            duration: 2000
        })
        return false;
   }
   if(that.data.region == ''){
      wx.showToast({
          title: '请选择省市区',
          icon: 'none',
          duration: 2000
      })
      return false;
   }
   if(that.data.detail == ''){
        wx.showToast({
            title: '请输入详细地址',
            icon: 'none',
            duration: 2000
        })
        return false;
   }
   that.submit()
},
submit(){
     let region_ = this.data.region.join(',')
     let data = {
       name:this.data.name,
       phone:this.data.phone,
       detail:this.data.detail,
       region:region_
     }
     utils.addAddress(data,res=>{
        if(res.data.code == 1){
          wx.showToast({
              title:res.data.msg ,
              icon: 'none',
              duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }
     })
},
changeName(e){
  this.setData({
    name:e.detail.value
  })
},
changePhone(e){
  this.setData({
    phone:e.detail.value
  })
},
changeDetail(e){
  this.setData({
    detail:e.detail.value
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