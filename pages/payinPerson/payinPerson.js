// pages/storeDetail/storeDetail.js
//index.js
//获取应用实例
let scrollDdirection = 0; // 用来计算滚动的方向
const app = getApp();
var utils=require("../../utils/util.js")
let fenliangPrice = 0;
let dapeiPrice = 0;
function computePrice(productPrice, count) {
  return productPrice * count;
}
Page({

  data: {
    order_price:'',//购物车总价
    order_total_num:'',//购物车商品数量
    express_price:'',//配送费
    goodsnum:1,
    select_goods_id:'',//选择的商品id
    idStr:'',//选择的商品的skuid
    scrollHeight: 0, // 滚动视图的高度
    toView: 'position0' ,// 滚动视图跳转的位置
    scrollTopLeft: 0, //  左边滚动位置随着右边分类而滚动
    selectedSub: 0, // 选中的分类
    shopInfo:'',//店铺信息
    select_skuName:'',//选择的规格的名称字符串
    skuPrice:'',//选择规格的价格
    goodsName:'',//商品名称
    skuArr:[],
    shopId:'',//店铺id
    bodyPadding:'',//padding值
    Guige:false,
    foodList:[],
    cartList:[
      {id:1,pic:'/images/shopImg.png',name:'海鲜披萨',price:'52.80',yprice:'90.00',num:1,guige:'8寸、至尊海鲜口味'},
      {id:1,pic:'/images/shopImg.png',name:'海鲜披萨',price:'52.80',yprice:'90.00',num:1,guige:'8寸、至尊海鲜口味'},
      {id:1,pic:'/images/shopImg.png',name:'海鲜披萨',price:'52.80',yprice:'90.00',num:1,guige:'8寸、至尊海鲜口味'}
    ],
    isPurchase: false,    
    hide_good_box: true,
    feiBox: ""
  },
  cartAdd(e){
   var that = this;
  if(that.data.type == 1){
    var data = {
      shop_id : that.data.shopId,
      goods_id : e.currentTarget.dataset.goodsid,
      goods_num:1,
      goods_sku_id :e.currentTarget.dataset.skuid,
      order_type:20 // 10外卖 20当面付 30食材购买
     }
  }
   if(that.data.type == 2){
     var data = {
      shop_id : that.data.shopId,
      goods_id : e.currentTarget.dataset.goodsid,
      goods_num:1,
      goods_sku_id :e.currentTarget.dataset.skuid,
      order_type:30 // 10外卖 20当面付 30食材购买
     }
   }
   utils.addCart(data,(res)=>{
     wx.showToast({
      title: res.data.msg,
      icon: 'none',
      duration: 2000
    })
    that.getCartList();//更新购物车列表
   })
  },
  // 购物车列表数量减
  cartReduce(e){
    console.log(e)
    var that = this;
    var dd = that.data.cartList;
    if(that.data.type == 1){
      var data = {
        shop_id : that.data.shopId,
        goods_id : e.currentTarget.dataset.goodsid,
        goods_sku_id :e.currentTarget.dataset.skuid,
        order_type:20 // 10外卖 20当面付 30食材购买
      }
    }
    if(that.data.type == 2){
      var data = {
        shop_id : that.data.shopId,
        goods_id : e.currentTarget.dataset.goodsid,
        goods_sku_id :e.currentTarget.dataset.skuid,
        order_type:30 // 10外卖 20当面付 30食材购买
      }
    }
    if(e.currentTarget.dataset.num == 1){
      that.delCart(data)
    }else{
      utils.reductCart(data,(res)=>{
        if(res.data.code == 1){
            that.getCartList();//更新购物车列表
        }else{
         wx.showToast({
           title: res.data.msg,
           icon: 'none',
           duration: 2000
         })
        }
      })
    }
    
    
  },
    // 删除购物车
    delCart(data){
      var that = this;
      if(that.data.type == 1){
          var data = {
            shop_id:data.shop_id,
            goods_sku_id:data.goods_id+'_'+data.goods_sku_id,
            order_type:20 // 10外卖 20当面付 30食材购买
          }
      }
      if(that.data.type == 2){
           var data = {
            shop_id:data.shop_id,
            goods_sku_id:data.goods_id+'_'+data.goods_sku_id,
            order_type:30 // 10外卖 20当面付 30食材购买
           }
      }
      utils.delCart(data,res=>{
          that.getCartList()//更新购物车列表
      })
    },
  // 减
  reduceF(e){
    console.log(e,'ee');
    var that = this;
    var parentindex = e.currentTarget.dataset.parentindex;
    var childindex = e.currentTarget.dataset.childindex;
    var list = that.data.foodList;
    list[parentindex].child[childindex].addNum--;
    that.setData({
     foodList:list
    })
   if(that.data.type == 1){
    var data = {
      shop_id : that.data.shopId,
      goods_id : e.currentTarget.dataset.goodsid,
      goods_sku_id :e.currentTarget.dataset.skuid,
      order_type:20 // 10外卖 20当面付 30食材购买
    }
   }
    if(that.data.type == 2){
      var data = {
        shop_id : that.data.shopId,
        goods_id : e.currentTarget.dataset.goodsid,
        goods_sku_id :e.currentTarget.dataset.skuid,
        order_type:30 // 10外卖 20当面付 30食材购买
      }
    }
    if(e.currentTarget.dataset.num == 1){
      that.delCart(data)
    }else{
      utils.reductCart(data,(res)=>{
        if(res.data.code == 1){
         that.getCartList();//更新购物车列表
        }else{
         wx.showToast({
           title: res.data.msg,
           icon: 'none',
           duration: 2000
         })
        }
       //  console.log(res,'减少购物车')
      })
    }
     
  },
  // 加
  add(e){
    var that = this;
    var parentindex = e.currentTarget.dataset.parentindex;
    var childindex = e.currentTarget.dataset.childindex;
    var list = that.data.foodList;
    list[parentindex].child[childindex].addNum++;
    that.setData({
     foodList:list,
    //  feiBox: list[parentindex].child[childindex].goods_image
    })
 
    if(that.data.type == 1){
      var data = {
        shop_id : that.data.shopId,
        goods_id : e.currentTarget.dataset.goodsid,
        goods_num:1,
        goods_sku_id :e.currentTarget.dataset.skuid,
        order_type:20 // 10外卖 20当面付 30食材购买
       }
    }
    if(that.data.type == 2){
      var data = {
        shop_id : that.data.shopId,
        goods_id : e.currentTarget.dataset.goodsid,
        goods_num:1,
        goods_sku_id :e.currentTarget.dataset.skuid,
        order_type:30 // 10外卖 20当面付 30食材购买
      }
    }
    utils.addCart(data,(res)=>{
      wx.showToast({
       title: res.data.msg,
       icon: 'none',
       duration: 2000
     })
     that.getCartList();//更新购物车列表
    })
  },
  showPurchase:function() {
     this.setData({
       isPurchase:true
     })
  },
  hideCartList(){
    this.setData({
      isPurchase:false
    })
  },   
  // 无规格，直接加入购物车
  addNum(e){
    //  console.log(e,'ll');
    //  var that = this;
    //  var parentindex = e.currentTarget.dataset.parentindex;
    //  var childindex = e.currentTarget.dataset.childindex;
    //  var list = that.data.foodList;
    //  list[parentindex].child[childindex].addNum++;
    //  that.setData({
    //   foodList:list
    //  })
    //  let data = {
    //   shop_id : that.data.shopId,
    //   goods_id : e.currentTarget.dataset.goodsid,
    //   goods_num:1,
    //   goods_sku_id :e.currentTarget.dataset.skuid
    //  }
    //  utils.addCart(data,(res)=>{
    //    console.log(res)
    //    wx.showToast({
    //     title: res.data.msg,
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   that.getCartList();//更新购物车列表
    //  })
  },
  // 显示选择规格弹框
  showgg:function(e){
    console.log(e,'显示选择规格弹框')
    var that = this;
    var par = [];//选择规格id
    var idStr = '';//选择规格id字符串
    var sel_skuname='';//选择规格名字的字符串
   var _sku = e.currentTarget.dataset.sku;
   _sku.spec_attr.forEach((item,index)=>{
    //  par.push(item.spec_items[0]);
     par.push({group_name:item.group_name,spec_value:item.spec_items[0].spec_value,item_id:item.spec_items[0].item_id})
   })
   console.log(par,'pp')
    par.forEach((item,index)=>{
       idStr += item.item_id+'_';
       sel_skuname += item.group_name+'：'+item.spec_value+'；  ';
    })
    idStr = idStr.substr(0,idStr.length-1);
    that.setData({
      idStr:idStr,
      select_goods_id:e.currentTarget.dataset.goodsid,
    })
    // sel_skuname = sel_skuname.substr(0,sel_skuname.length-1);

    // 寻找默认规格的价格
    var defSku_price = _sku.spec_list.filter((value,index)=>{
      if(value.spec_sku_id == idStr){
          return value
      }
    })
    _sku.spec_attr = _sku.spec_attr.map(item => {
      item.select = 0;
      return item;
    })
    that.setData({
      skuArr: _sku,
      goodsName:e.currentTarget.dataset.goodname,
      Guige:true,
      skuPrice:defSku_price[0].form.goods_price,
      select_skuName:sel_skuname
    })
  },
  // 切换规格
  checkSku(e){
      var that = this;
      var _index = e.currentTarget.dataset.index;
      var _indexs = e.currentTarget.dataset.i;
      var _sku = that.data.skuArr;
      var idStr = that.data.idStr.split("_");
      var nameObj=[];
      var sel_skuname='';//选择规格名字的字符串
      var newStr;

      idStr[_indexs] = _sku.spec_attr[_indexs].spec_items[_index].item_id;
      newStr = idStr
      idStr = idStr.join("_");
      that.setData({
        idStr:idStr
      })
    
      // 查找规格名字
      _sku.spec_attr.forEach((item,i)=>{
        item.spec_items.forEach((val,j)=>{
         if(val.item_id == newStr[i]){
            nameObj.push({group_name:item.group_name,spec_value:val.spec_value})
         }
        })
     })
     nameObj.forEach((item,index)=>{
        sel_skuname += item.group_name+'：'+item.spec_value+'；  ';
      })
      // console.log(nameObj,'nameObj')
      that.setData({
          select_skuName:sel_skuname
      })

      // 查找价格
      _sku.spec_list.forEach(val => {
          if(val.spec_sku_id == idStr){
              that.setData({
                skuPrice: val.form.goods_price,
                // skuPrice: val.form.goods_price + '(' + idStr + ')'
              })
          }
      })
      _sku.spec_attr = _sku.spec_attr.map((item,index) => {
        if(_indexs == index){
          item.select = _index;
          return item;
        }
        item.spec_items[item.select].spec_value
        return item;
      })
      that.setData({
          skuArr:_sku
      })
  },
  // 有规格加入购物车
  addCart(){
     var that = this;
     if(that.data.type == 1){
      var data = {
        shop_id : that.data.shopId,
        goods_id : that.data.select_goods_id,
        goods_num:that.data.goodsnum,
        goods_sku_id :that.data.idStr,
        order_type:20 // 10外卖 20当面付 30食材购买
       }
     }
     if(that.data.type == 2){
       var data = {
        shop_id : that.data.shopId,
        goods_id : that.data.select_goods_id,
        goods_num:that.data.goodsnum,
        goods_sku_id :that.data.idStr,
        order_type:30 // 10外卖 20当面付 30食材购买
       }
     }
     utils.addCart(data,(res)=>{
        // console.log(res,'有规格加入购物车');
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        that.setData({
          guige:false
        })
        that.getCartList();//更新购物车列表
     })
  },
  // 关闭选择规格弹框
  closeguige(){
    this.setData({
      Guige:false
    })
  },
  // 获取店铺详情
  shopDetail(){
    var that = this;
    let data;
    if(that.data.latitude==undefined || that.data.longitude == undefined){
       data={
        shop_id:that.data.shopId,
       }
    }else{
      data = {
        shop_id:that.data.shopId,
        latitude:that.data.latitude,
        longitude:that.data.longitude
      }
    }
    
    utils.shopDetail(data,(res)=>{
        that.setData({
          shopInfo:res.data.data.detail
        })
        wx.setNavigationBarTitle({
          title: that.data.type == 1?'当面付':'食材购买'
        })
        wx.hideLoading();
        // console.log(res,'店铺详情')
    })
  },
  // 获取购物车列表
  getCartList(){
    var that = this;
    if(that.data.type == 1){
      var data = {
        shop_id:that.data.shopId,
        order_type:20 // 10外卖 20当面付 30食材购买
      }
    }
    if(that.data.type == 2){
      var data = {
        shop_id:that.data.shopId,
        order_type:30 // 10外卖 20当面付 30食材购买
      }
    }
    utils.cartList(data,(res)=>{
      if(!res.data.data.goods_list.length){
        that.hideCartList()
      }
       that.setData({
        cartList:res.data.data.goods_list,
        order_total_num:res.data.data.order_total_num,
        express_price:res.data.data.express_price,
        order_price:res.data.data.order_price
       })
       that.getGoodsList();
       wx.hideLoading();
        // console.log(res,'购物车列表')
    })
  },
  onShow:function(){
    var that = this;
    //可视窗口x,y坐标
    this.busPos = {};
    this.busPos['x'] = app.globalData.ww * .85;
    this.busPos['y'] = app.globalData.hh * .85;
    var query1 = wx.createSelectorQuery();
    var query2 = wx.createSelectorQuery();
    var query3 = wx.createSelectorQuery();
    var height1,height2,height3;
     query1.select('.container1').boundingClientRect(function(rect) {
      height1 = rect.height;
      query2.select('.topBox').boundingClientRect(function(rect) {
        height2 = rect.height
        query3.select('.footer').boundingClientRect(function(rect) {
          height3 = rect.height;
          that.setData({
            bodyPadding:height1-(height2+height3)-10
          })
        }).exec();
      }).exec();
    }).exec();
    that.getCategory();
    that.shopDetail();
    that.getCartList();
  },
  onLoad:function(options){
    var that=this;
    that.setData({
      shopId:options.id,
      latitude:options.latitude,
      longitude:options.longitude,
      type:options.type //1是当面付，2是购买食材
    })


  },
  // 获取商品分类
  getCategory(){
    wx.showLoading({
      title:'加载中'
    })
    var that = this;
    if(that.data.type == 1){
      var data = {
        shop_id:that.data.shopId,
        order_type:20 // 10外卖 20当面付 30食材购买
      }
    }
    if(that.data.type == 2){
      var data = {
        shop_id:that.data.shopId,
        order_type:30 // 10外卖 20当面付 30食材购买
      }
    }
    
    utils.goodsCategory(data,fnc);
    function fnc(res){
      that.setData({
        muneBar:res.data.data.list
      })
      wx.hideLoading();
      // console.log(res,'商品分类')
    }
  },
  // 获取商品列表
  getGoodsList(){
    var that = this;
    var menu = that.data.muneBar;
    if(that.data.type == 1){
      var data = {
        shop_id:this.data.shopId,
        order_type:20 // 10外卖 20当面付 30食材购买
      }
    }
    if(that.data.type == 2){
      var data = {
        shop_id:this.data.shopId,
        order_type:30 // 10外卖 20当面付 30食材购买
      }
    }
    utils.goodsList(data,(response) =>{
      // console.log(JSON.stringify(response),'商品列表')
      var child = [] ;
      var dat = response.data.data.list.data;
      let _menu = menu.map(item => {
        item.child = dat.filter(itemChild => {
            if(item.category_id == itemChild.category.category_id){
                return itemChild
            }
        })
        return item;
    })
    _menu.forEach((item,index)=>{
      item.child.forEach((it,j)=>{
         it['addNum'] = 0
      })
    })
    let dd = _menu.map((items,indexs) => {
      let cartLists = that.data.cartList.map((item,index) => {
          if(items.child.length){
               let child = items.child.map((itemChild,indexChild) =>{
                  if(itemChild.goods_id == item.goods_id){
                    items.child[indexChild].addNum += item.total_num
                  }
               })
          }
          return items; 
      })
     items = cartLists[0]
     return items
  })
    // console.log(dd,'商品列表11')
    // console.log(_menu,'商品列表')
    that.setData({
      foodList:_menu
    })
    wx.hideLoading();

    });
  },
  onReady:function() {
    var that=this; 
  },
  muneTap: function (e) {
    const {selectedSub } = this.data
    const {index } = e.currentTarget.dataset
    let left_ = 0
    if (index > 3) {
      left_ = (index - 3) * 50 // 左边侧栏item高度为50，可以根据自己的item高度设置
    }
    this.setData({
      selectedSub: index,
      toView: `position${index}`,
      scrollTopLeft: left_
    })      
  },
  scrollTo(e) {
    const scrollTop = e.detail.scrollTop; //滚动的Y轴
    const { selectedSub, foodList} = this.data;
    if (scrollDdirection < scrollTop) {
        // 向上滑动
        scrollDdirection = scrollTop
        // 计算偏移位置
        if (selectedSub < foodList.length - 1 && scrollTop >= foodList[selectedSub + 1].offsetTop) {
            this.setData({
              selectedSub: selectedSub + 1
            })
         }
    } else {
      // 向下滑动
      scrollDdirection = scrollTop
      // 计算偏移位置
      if (selectedSub > 0 && scrollTop < foodList[selectedSub - 1].offsetTop && scrollTop > 0) {
        this.setData({
          selectedSub: selectedSub - 1
        })
      }
    }
},
  payaddCart(){
    var that = this;
    if(that.data.cartList.length){
      var data = {
        shop_id:that.data.shopId,
        delivery:20,//10 配送 20 自提
        pay_type:20,//10 余额 20 微信支付
        order_type: that.data.type == 1?20:30,//10外卖 20当面付 30食材购买
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
                 url: '/pages/placeOrderSuccess/placeOrderSuccess?order_id='+response.data.data.order_id+'&shop_id='+response.data.data.shop_id,
               })
            },
            fail (err) {
              wx.switchTab({
                url: '/pages/order/order'
              })
             }
          })
         }
        //  console.log(response,'提交订单')
       })
    }else{
      wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 2000
      })
    }
    
  },
  // 清空购物车
  clearCart(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定清空此商家的购物车吗？',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          if(that.data.type == 1){
            var data = {
              shop_id:that.data.shopId,
              order_type:20 // 10外卖 20当面付 30食材购买
            }
          }
          if(that.data.type == 2){
            var data = {
              shop_id:that.data.shopId,
              order_type:30 // 10外卖 20当面付 30食材购买
            }
          }
          utils.clearCart(data,res=>{
            // console.log(res,'清除')
            wx.hideLoading()
            that.getCartList();
            that.hideCartList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})
