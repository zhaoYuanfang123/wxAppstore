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
var delAddress_url = '/api/address/delete';//删除收货地址
var reductCart_url='/api/cart/sub';//减少购物车
var delCart_url = '/api/cart/delete';//删除购物车
var Settleorder_url='/api/order/cart';//结算订单
var getRegion_url='/api/region/index';//获取地区
var noticeList_url = '/api/article/lists';//公告列表
var noticeDetail_url = '/api/article/detail';//公告详细
var noticeRead_url = '/api/user.article/readed';//公告标记已读
var addAddress_url = '/api/address/add';///新增收货地址
var editAddress_url = '/api/address/edit';//编辑收货地址
var setDefaultAddress_url = '/api/address/setDefault';//设置默认地址
var addressDetail_url = '/api/address/detail';//地址详情
var myOrderList_url='/api/user.order/lists';//我的订单
var payOrderList_url = '/api/pay.order/lists';//当面付列表
var cancelOrder_url = '/api/user.order/cancel';//取消订单
var orderDetail_url = '/api/user.order/detail';//订单详情
var myRebateWithdraw_url = '/api/balance.withdraw/submit' ;//我的返利提现
var myRebateBalance_url = '/api/balance.log/lists';//返利明细
var paySubmit_url='/api/pay/submit';//当面付提交
var rebateSet_url='/api/wxapp/rebate';//返利设置
var shopSet_url = '/api/wxapp/store';//商城设置
var clearCart_url ='/api/cart/clean';//清空购物车
var orderPay_url = '/api/user.order/pay';//立即支付

function formatNumber2(n) {  
  n = n.toString()  
  return n[1] ? n : '0' + n  
}  
function formatTime2(number,format) {  
  
  var formateArr  = ['Y','M','D','h','m','s'];  
  var returnArr   = [];  
  
  var date = new Date(number * 1000);  
  returnArr.push(date.getFullYear());  
  returnArr.push(formatNumber2(date.getMonth() + 1));  
  returnArr.push(formatNumber2(date.getDate()));  
  
  returnArr.push(formatNumber2(date.getHours()));  
  returnArr.push(formatNumber2(date.getMinutes()));  
  returnArr.push(formatNumber2(date.getSeconds()));  
  
  for (var i in returnArr)  
  {  
    format = format.replace(formateArr[i], returnArr[i]);  
  }  
  return format;  
}  
module.exports = {
  formatTime2: formatTime2
}
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
        //  console.log(res,'rrr')
         if(res.data.code == -1){
           wx.navigateTo({
             url: '/pages/authorization/authorization',
           })
         }else if(res.data.code == 1){
          fnc(res);
         }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
        })
         }
          
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
function storeList(data,storeListFnc){
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
   if(res.data.code == 1){
     if(res.data.data.userInfo.grade){
      res.data.data.userInfo.grade_end_time = formatTime2(res.data.data.userInfo.grade_end_time,'Y-M-D h:m:s')
     }
   }
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
function goodsCategory(data,goodsCategoryFnc){
  request('get',goodsCategory_url,data,fnc);
  function fnc(res){
    goodsCategoryFnc(res)
  }
}
module.exports.goodsCategory = goodsCategory

// 商品列表
function goodsList(data,goodsListFnc){
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

// 减少购物车
function reductCart(data,reductCartFnc){
  request('post',reductCart_url,data,fnc);
  function fnc(res){
    reductCartFnc(res)
  }
}
module.exports.reductCart = reductCart

// 删除购物车
function delCart(data,delCartFnc){
  request('post',delCart_url,data,fnc);
  function fnc(res){
    delCartFnc(res)
  }
}
module.exports.delCart = delCart
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

// 删除收货地址
function delAddress(data,delAddressFnc){
  request('post',delAddress_url,data,fnc);
  function fnc(res){
    delAddressFnc(res)
  }
}
module.exports.delAddress = delAddress

// 结算订单
function Settleorder(data,SettleorderFnc){
  request('post',Settleorder_url,data,fnc);
  function fnc(res){
    SettleorderFnc(res)
  }
}
module.exports.Settleorder = Settleorder
// 结算订单信息
function SettleorderInfo(data,SettleorderInfoFnc){
  request('get',Settleorder_url,data,fnc);
  function fnc(res){
    SettleorderInfoFnc(res)
  }
}
module.exports.SettleorderInfo = SettleorderInfo

// 获取地区
function getRegion(data,getRegionFnc){
  request('get',getRegion_url,data,fnc);
  function fnc(res){
    getRegionFnc(res)
  }
}
module.exports.getRegion = getRegion

// 公告列表
function noticeList(data,noticeListFnc){
  request('get',noticeList_url,data,fnc);
  function fnc(res){
    noticeListFnc(res)
  }
}
module.exports.noticeList = noticeList

// 公告详细
function noticeDetail(data,noticeDetailFnc){
  request('get',noticeDetail_url,data,fnc);
  function fnc(res){
    noticeDetailFnc(res)
  }
}
module.exports.noticeDetail = noticeDetail

// 公告标记已读
function noticeRead(data,noticeReadFnc){
  request('post',noticeRead_url,data,fnc);
  function fnc(res){
    noticeReadFnc(res)
  }
}
module.exports.noticeRead = noticeRead

// 新增收货地址
function addAddress(data,addAddressFnc){
  request('post',addAddress_url,data,fnc);
  function fnc(res){
    addAddressFnc(res)
  }
}
module.exports.addAddress = addAddress

// 编辑收货地址
function editAddress(data,editAddressFnc){
  request('post',editAddress_url,data,fnc);
  function fnc(res){
    editAddressFnc(res)
  }
}
module.exports.editAddress = editAddress

// 设置默认地址    
function setDefaultAddress(data,setDefaultAddressFnc){
  request('post',setDefaultAddress_url,data,fnc);
  function fnc(res){
    setDefaultAddressFnc(res)
  }
}
module.exports.setDefaultAddress = setDefaultAddress

// 地址详情    
function addressDetail(data,addressDetailFnc){
  request('get',addressDetail_url,data,fnc);
  function fnc(res){
    addressDetailFnc(res)
  }
}
module.exports.addressDetail = addressDetail

// 我的订单
function myOrderList(data,myOrderListFnc){
  request('get',myOrderList_url,data,fnc);
  function fnc(res){
    myOrderListFnc(res)
  }
}
module.exports.myOrderList = myOrderList


// 当面付列表
function payOrderList(data,payOrderListFnc){
  request('get',payOrderList_url,data,fnc);
  function fnc(res){
    payOrderListFnc(res)
  }
}
module.exports.payOrderList = payOrderList

// 取消订单
function cancelOrder(data,cancelOrderFnc){
  request('post',cancelOrder_url,data,fnc);
  function fnc(res){
    cancelOrderFnc(res)
  }
}
module.exports.cancelOrder = cancelOrder

// 订单详情
function orderDetail(data,orderDetailFnc){
  request('get',orderDetail_url,data,fnc);
  function fnc(res){
    orderDetailFnc(res)
  }
}
module.exports.orderDetail = orderDetail

// 我的返利提现 
function myRebateWithdraw(data,myRebateWithdrawFnc){
  request('post',myRebateWithdraw_url,data,fnc);
  function fnc(res){
    myRebateWithdrawFnc(res)
  }
}
module.exports.myRebateWithdraw = myRebateWithdraw

// 返利明细
function myRebateBalance(data,myRebateBalanceFnc){
  request('get',myRebateBalance_url,data,fnc);
  function fnc(res){
    myRebateBalanceFnc(res)
  }
}
module.exports.myRebateBalance = myRebateBalance

// 当面付提交
function paySubmit(data,paySubmitFnc){
  request('post',paySubmit_url,data,fnc);
  function fnc(res){
    paySubmitFnc(res)
  }
}
module.exports.paySubmit = paySubmit

// 返利设置
function rebateSet(data,rebateSetFnc){
  request('get',rebateSet_url,data,fnc);
  function fnc(res){
    rebateSetFnc(res)
  }
}
module.exports.rebateSet = rebateSet

// 商城设置
function shopSet(data,shopSetFnc){
  request('get',shopSet_url,data,fnc);
  function fnc(res){
    shopSetFnc(res)
  }
}
module.exports.shopSet = shopSet

// 清空购物车
function clearCart(data,clearCartFnc){
  request('post',clearCart_url,data,fnc);
  function fnc(res){
    clearCartFnc(res)
  }
}
module.exports.clearCart = clearCart

// 立即支付
function orderPay(data,orderPayFnc){
  request('post',orderPay_url,data,fnc);
  function fnc(res){
    orderPayFnc(res)
  }
}
module.exports.orderPay = orderPay