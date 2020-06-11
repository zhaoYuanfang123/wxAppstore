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
  },
  cartAdd(e){
   var that = this;
   let data = {
    shop_id : that.data.shopId,
    goods_id : e.currentTarget.dataset.goodsid,
    goods_num:1,
    goods_sku_id :e.currentTarget.dataset.skuid
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
    let data = {
      shop_id : that.data.shopId,
      goods_id : e.currentTarget.dataset.goodsid,
      goods_sku_id :e.currentTarget.dataset.skuid
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
      utils.delCart(data,res=>{
          that.getCartList()//更新购物车列表
      })
    },
  // 减
  reduceF(e){
    var that = this;
    var parentindex = e.currentTarget.dataset.parentindex;
    var childindex = e.currentTarget.dataset.childindex;
    var list = that.data.foodList;
    list[parentindex].child[childindex].addNum--;
    that.setData({
     foodList:list
    })
    let data = {
      shop_id : that.data.shopId,
      goods_id : e.currentTarget.dataset.goodsid,
      goods_sku_id :e.currentTarget.dataset.skuid
    }
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
  },
  // 加
  add(e){
    var that = this;
    var parentindex = e.currentTarget.dataset.parentindex;
    var childindex = e.currentTarget.dataset.childindex;
    var list = that.data.foodList;
    list[parentindex].child[childindex].addNum++;
    that.setData({
     foodList:list
    })
    let data = {
     shop_id : that.data.shopId,
     goods_id : e.currentTarget.dataset.goodsid,
     goods_num:1,
     goods_sku_id :e.currentTarget.dataset.skuid
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
      console.log(nameObj,'nameObj')
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
     let data = {
      shop_id : that.data.shopId,
      goods_id : that.data.select_goods_id,
      goods_num:that.data.goodsnum,
      goods_sku_id :that.data.idStr
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
          title: res.data.data.detail.shop_name
        })
        wx.hideLoading();
        // console.log(res,'店铺详情')
    })
  },
  // 获取购物车列表
  getCartList(){
    var that = this;
    var data = {
      shop_id:that.data.shopId
    }
    utils.cartList(data,(res)=>{
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
    // 获取当前机型
    // wx.getSystemInfo({
    //   success (res) {
    //     if(res.model == 'iPhone 5' || res.model == 'Nexus 5' || res.model == 'Nexus 5X' || res.model == 'Nexus 6'){
    //          that.setData({
    //           bodyPadding:0
    //          })
    //     }else{
    //       that.setData({
    //         bodyPadding:0
    //        })
    //     }
    //   }
    // })
  },
  onLoad:function(options){
    var that=this;
    wx.showLoading({
      title:'加载中'
    })
    that.setData({
      shopId:options.id,
      latitude:options.latitude,
      longitude:options.longitude
    })

  },
  // 获取商品分类
  getCategory(){
    var that = this;
    utils.goodsCategory(that.data.shopId,fnc);
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
    utils.goodsList(this.data.shopId,(response) =>{
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
                    items.child[indexChild].addNum = item.total_num
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
    // var that = this;
    // console.log(e,'eee')
    // console.log(that.data.foodList,'fooffff')
    // var index = Number(e.target.id);//0 1 2 3
    // if(index==-1){
    //   that.setData({
    //     barActive: -1,
    //   });
    // }else{
    //   var top = that.data.foodList[index].category_id;
    //   that.setData({
    //     barActive: index,
    //     foodTop: top,
    //   });
    // }
      
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
    if(this.data.cartList.length){
      var data = {
        shop_id:this.data.shopId,
        shopName:this.data.shopInfo.shop_name
      }
      wx.navigateTo({
        url: '/pages/placeOrder/placeOrder?data='+JSON.stringify(data),
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
          utils.clearCart({shop_id:that.data.shopId},res=>{
            console.log(res,'清除')
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
