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
    action_skew21: !1,
    summary:[
      {price:0,quantity:0,}
    ],
  },
  showPurchase:function() {
    var p = this.data.isPurchase;
    if(p) {
      this.setData({
        action_skew21:true
      })
      if(this.data.summary.quantity==0||this.data.summary.quantity==null){
        this.setData({
          isPurchase: false,
          action_skew21:false,
        });
      }else{
        setTimeout(()=>{
          this.setData({
            isPurchase: false,
            action_skew21:false,
          });
        },600)
      }
      
    }else{
      this.setData({
        action_skew21:false,
        isPurchase: true
      });
    }
  },
   // 无规格，直接加入购物车
  addNum(e){
     console.log(e);
     var that = this;
     let data = {
      shop_id : that.data.shopId,
      goods_id : e.currentTarget.dataset.goodsid,
      goods_num:1,
      goods_sku_id :e.currentTarget.dataset.skuid
     }
     utils.addCart(data,(res)=>{
       console.log(res)
       wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      })
     })
  },
  // 显示选择规格弹框
  showgg:function(e){
    var that = this;
    var par = [];//选择规格id
    var idStr = '';//选择规格id字符串
    var sel_skuname='';//选择规格名字的字符串
    console.log(e);
   var _sku = e.currentTarget.dataset.sku;
   _sku.spec_attr.forEach((item,index)=>{
     item.spec_items.forEach((it,j)=>{
       it['sec']=false;
     })
     item.spec_items[0].sec=true;
     par.push(item.spec_items[0])
   })
    par.forEach((item,index)=>{
       idStr += item.item_id+'_';
       sel_skuname += item.spec_value+'、';
    })
    idStr = idStr.substr(0,idStr.length-1);
    sel_skuname = sel_skuname.substr(0,sel_skuname.length-1)
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
     var _sku = that.data.skuArr;//sku数组
     console.log(e,'sssssss')
  //    var par=[];//选择规格id数组
  //    var idStr = '';//选择规格id字符串
  //    var sel_skuname='';//选择规格名字的字符串
  //    _sku.spec_attr.forEach((item,index)=>{
  //     par.push(item.spec_items[_index])
  //   })

  //   par.forEach((item,index)=>{
  //     idStr += item.item_id+'_';
  //     sel_skuname += item.spec_value+'、';
  //  })
  //  idStr = idStr.substr(0,idStr.length-1);
  //  sel_skuname = sel_skuname.substr(0,sel_skuname.length-1);
  //  // 寻找默认规格的价格
  //  var defSku_price = _sku.spec_list.filter((value,index)=>{
  //   if(value.spec_sku_id == idStr){
  //       return value
  //   }
  // })
  console.log(_sku,'sku')
  _sku.spec_attr = _sku.spec_attr.map((item,index) => {
    if(_indexs == index){
      item.select = _index;
      // console.log(item.spec_items[item.select].spec_value,"马云")
      return item;
    }
    item.spec_items[item.select].spec_value
    return item;
  })

  that.setData({
      // skuPrice:defSku_price[0].form.goods_price,
      // select_skuName:sel_skuname,
      skuArr:_sku
  })
  console.log(this.data.skuArr.spec_attr)
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
    var data = {
      shop_id:that.data.shopId,
      latitude:that.data.latitude,
      longitude:that.data.longitude
    }
    utils.shopDetail(data,(res)=>{
        that.setData({
          shopInfo:res.data.data.detail
        })
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
        console.log(res,'购物车列表')
    })
  },
  onShow:function(){
    var that = this;
  },
  onLoad:function(options){
    var that=this;
    that.setData({
      shopId:options.id,
      latitude:options.latitude,
      longitude:options.longitude
    })
    that.getCategory();
    that.shopDetail();
    that.getCartList();
    // 获取当前机型
    wx.getSystemInfo({
      success (res) {
        if(res.model == 'iPhone 5' || res.model == 'Nexus 5' || res.model == 'Nexus 5X' || res.model == 'Nexus 6'){
             that.setData({
              bodyPadding:50
             })
        }else{
          that.setData({
            bodyPadding:70
           })
        }
      }
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
      that.getGoodsList();
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
    console.log(_menu,'商品列表')
    that.setData({
      foodList:_menu
    })

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
  //添加购物车
  addcard:function(){
    var that=this;
    var sum=0;
    wx.navigateTo({
              url: '../clientCart/clientCart?id=9',
            })
  },
   /*加入购物车动效*/
    _flyToCartEffect:function(events){
        //获得当前点击的位置，距离可视区域左上角

        var touches=events.touches[0];
        var diff={
                // x:'25px',
                // y:25-touches.clientY+'px'
                x:'-45px',
                y:'70px'
            },
            style='display: block;-webkit-transform:translate('+diff.x+','+diff.y+') rotate(350deg) scale(0)';  //移动距离
        this.setData({
            isFly:true,
            translateStyle:style
        });
        var that=this;
        setTimeout(()=>{
            that.setData({
                isFly:false,
                translateStyle:'-webkit-transform: none;',  //恢复到最初状态
                isShake:true,
            });
            setTimeout(()=>{
                var counts=that.data.cartTotalCounts+that.data.productCounts;
                that.setData({
                    isShake:false,
                    cartTotalCounts:counts
                });
            },200);
        },1000);
    },
})
