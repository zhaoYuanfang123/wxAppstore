// 请求地址
var login_url = "/api/user/login"; //登录
var indexBanner_url = "/api/wxapp/banner"; //首页banner
var detailPosition_url = '/api/region/detailByLatLng';//当前定位详细地址
var storeListUrl = '/api/shop/lists';//门店列表
var userDetail_url = '/api/user.index/detail';//会员信息
var userGrade_url='/api/user.grade/lists';//会员级别
var goodsCategory_url='/api/category/index';//商品分类
var goodsList_url = '/api/goods/lists';//商品列表
var shopDetail_url='/api/shop/detail';//店铺详情
var cartList_url= '/api/cart/lists'; //购物车列表
var addCart_url='/api/cart/add';//加入购物车
var buyGrade_url='/api/user.grade.order/submit';//购买会员级别
var addressList_url='/api/address/lists';//收货地址列表

// 请求数据接口函数
function request(method, url, data, fnc){
  var header = "";
  
  data["wxapp_id"]='10001';
  data["token"] = wx.getStorageSync('token') || '';
  if (method == "POST") {
      header = {
          'content-type': 'application/x-www-form-urlencoded',
      }
  }
  else {
      header = {
          'content-type': 'application/json'
      }
  }
  wx.request({
      method: method,
      url: getApp().globalData.baseUrl + url, //仅为示例，并非真实的接口地址
      data: data,
      header: header,
      success: function (res) {
          fnc(res);
      },
      fail: function (res) {
        console.log(res)
          wx.showToast({
              title: '请求失败，请检查网络',
              icon: 'success',
              duration: 2000
          })
      }
  })
}
module.exports.request = request;


// 首页banner
function indexBanner(indexBannerFnc){
  var data ={};
  request('get',indexBanner_url,data,fnc)
  function fnc(res){
    indexBannerFnc(res)
  }
}
module.exports.indexBanner = indexBanner;

// 地址详情
function detailPosition(lat,lng,detailpositionFnc){
  var data = {
     lat:lat,
     lng:lng  
  }
  request('post',detailPosition_url,data,fnc)
  function fnc(res){
    detailpositionFnc(res)
  }
}
module.exports.detailPosition = detailPosition;

// 门店列表
function storeList(latitude,longitude,storeListFnc){
  var data = {
    longitude:longitude,
    latitude:latitude
  }
  request('get',storeListUrl,data,fnc)
  function fnc(res){
    storeListFnc(res)
  }
}
module.exports.storeList = storeList;

// 会员信息
function userDetail(userDetailFnc){
 var data = {};
 request('get',userDetail_url,data,fnc);
 function fnc(res){
  userDetailFnc(res)
 }
}
module.exports.userDetail = userDetail;

// 会员级别
function userGrade(userGradeFnc){
  var data={};
  request('get',userGrade_url,data,fnc);
  function fnc(res){
    userGradeFnc(res)
  }
}
module.exports.userGrade = userGrade;

// 商品分类
function goodsCategory(shop_id,goodsCategoryFnc){
  var data = {
    shop_id:shop_id
  }
  request('get',goodsCategory_url,data,fnc);
  function fnc(res){
    goodsCategoryFnc(res)
  }
}
module.exports.goodsCategory = goodsCategory

// 商品列表
function goodsList(shop_id,goodsListFnc){
  var data = {
    shop_id:shop_id
  }
  request('get',goodsList_url,data,fnc);
  function fnc(res){
    goodsListFnc(res)
  }
}
module.exports.goodsList = goodsList

// 店铺详情
function shopDetail(data,shopDetailFnc){
   request('get',shopDetail_url,data,fnc);
   function fnc(res){
    shopDetailFnc(res)
  }
}
module.exports.shopDetail = shopDetail

// 购物车列表
function cartList(data,cartListFnc){
  request('post',cartList_url,data,fnc);
  function fnc(res){
    cartListFnc(res)
  }
}
module.exports.cartList = cartList

// 加入购物车
function addCart(data,addCartFnc){
  request('post',addCart_url,data,fnc);
  function fnc(res){
    addCartFnc(res)
  }
}
module.exports.addCart = addCart

// 购买会员级别
function buyGrade(data,buyGradeFnc){
  request('post',buyGrade_url,data,fnc);
  function fnc(res){
    buyGradeFnc(res)
  }
}
module.exports.buyGrade = buyGrade

// 收货地址列表
function addressList(data,addressListFnc){
  request('get',addressList_url,data,fnc);
  function fnc(res){
    addressListFnc(res)
  }
}
module.exports.addressList = addressList