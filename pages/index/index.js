//index.js
//获取应用实例
const app = getApp()
var utils = require('../../utils/util.js');
Page({
  data: {
    // height:wx.getSystemInfoSync().statusBarHeight,
    navbarData:{
      back:true,
      home:true,
      title:""
    },
    swiperBanner: [],
    swiperSet:{
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 800,
      circular: true,
      indicatorCcolor: '#1890ff',
      indicatorActiveColor: '#ffffff'
    },
    menu:[
      {'icon':'/images/menu1.png','text':'默认图标'},
      {'icon':'/images/menu2.png','text':'默认图标'},
      {'icon':'/images/menu3.png','text':'默认图标'},
      {'icon':'/images/menu4.png','text':'默认图标'},
      {'icon':'/images/menu5.png','text':'默认图标'},
      {'icon':'/images/menu6.png','text':'默认图标'}
    ],
    status:null,
    navHeight:null,
    address:'',
    storeList:'',
    latitude:'',
    longitude:'',
    // tabText:['综合','筛选'],
    zonghe:'综合',
    comprehensive:[
      {name:'综合排序',type:'all'},
      // {name:'销量最高',type:'sales'},
      {name:'起送价最低',type:'delivery_fee'},
      {name:'配送费最低',type:'express_price'}
    ],
    zhCheckecIndex:0,
    showzh:false,
    showModal: false,
    showsx:false,
    searchText:'',
    wxAppname:''
  },
  submitzh: function() {
    this.setData({
    showModal: true,
    showzh:true,
    showsx:false
    })
},
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
onShow:function(){
    var that = this;   
    // 计算导航栏高度
    var sysinfo = wx.getSystemInfoSync();
    var  statusHeight = sysinfo.statusBarHeight;
    var  isiOS = sysinfo.system.indexOf('iOS') > -1;
    var navHeight;
    if (!isiOS) {
        navHeight = 48;
    } else {
        navHeight = 44;
    }
    that.setData({
        status: statusHeight,
        navHeight: navHeight
    })
    wx.showLoading({
      title:'加载中'
    })
    //首页banner图
    utils.indexBanner(res=>{
      that.setData({
        swiperBanner:res.data.data.list
      })
      wx.hideLoading();
    });
    that.getInfo();
    //判断是否获得了用户地理位置授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] == false){
          console.log(1)
           that.openConfirm()
        }else{
           // 获取当前地理位置 授权验证
            wx.getLocation({
              type: 'wgs84',
              success: function (res) {
                that.setData({
                  latitude:res.latitude,
                  longitude:res.longitude
                })
                utils.detailPosition(res.latitude,res.longitude,res=>{
                  that.setData({
                    address:res.data.data.location.address
                  })
                });
                that.getStoreList()
              },fail:function(err){
                // console.log(err)
                if(err.errCode == 2){
                  wx.showToast({
                    title: '请打开手机的定位服务',
                    icon: 'none',
                    duration: 2000
                  })
                }else{
                  that.openConfirm()
                }
                
              }
            })
        }
          
      }
    })
  },
  onLoad: function () {
  
  },
  openConfirm: function () {
    wx.showModal({
      content: '您点击了拒绝授权，无法正常使用功能，点击确定重新获取授权',
      confirmText: "确认",
      showCancel:false,
      success: function (res) {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => { }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  // 门店列表
   getStoreList(){
     var that = this;
     let data={
      latitude:that.data.latitude,
      longitude:that.data.longitude,
      sortType:that.data.comprehensive[that.data.zhCheckecIndex].type,
      sortPrice:0
     }
     utils.storeList(data,res=>{
      that.setData({
        storeList:res.data.data.list
      })
     });
   },
   toLink(e){
     if(e.currentTarget.dataset.url != ''){
           if(e.currentTarget.dataset.url == "pages/index/index" || e.currentTarget.dataset.url == "pages/notice/notice" ||  e.currentTarget.dataset.url== "pages/order/order" || e.currentTarget.dataset.url== "pages/user/user"){
            wx.switchTab({
              url:"/"+ e.currentTarget.dataset.url
            })
           }else{
              wx.navigateTo({
                url: "/"+e.currentTarget.dataset.url,
              })
           }
           
     }else{
       return
     }
     
   },
   toshopDetail(e){
     var that = this;
     var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: '/pages/storeDetail/storeDetail?id='+id+'&latitude='+that.data.latitude+'&longitude='+that.data.longitude,
     })
   },
   search(){
     wx.navigateTo({
       url: '/pages/searchShop/searchShop?latitude='+this.data.latitude+'&longitude='+this.data.longitude+'&searchText='+this.data.searchText
     })
   },
   changeSearch(e){
     this.setData({
      searchText:e.detail.value
     })
   },
   tomenberService(){
     wx.navigateTo({
       url: '/pages/memberService/memberService',
     })
   },
   toPay(e){
     wx.navigateTo({
       url: '/pages/payinPerson/payinPerson?latitude='+this.data.latitude+'&longitude='+this.data.longitude+'&type='+e.currentTarget.dataset.id
     })
   },
  //  获取商城信息
  getInfo(){
    utils.shopSet({},res=>{
      this.setData({
        wxAppname:res.data.data.store.name
      })
      app.globalData.wxAppName = res.data.data.store.name
    })
  },
})
