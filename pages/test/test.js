// 右侧每一类的 bar 的高度（固定）
const RIGHT_BAR_HEIGHT = 20;   
// 右侧每个子类的高度（固定）
const RIGHT_ITEM_HEIGHT = 100;   
// 左侧每个类的高度（固定）
const LEFT_ITEM_HEIGHT = 50       

Page({
  data: {
    constants:[
      {
        "id": "1",
        "ids": "id1",
        "name": "爆款",
        "category": [
          {
            "category_id": 1,
            "category_name": "招牌鸭脖",
            "num":0,
            'price':'23',
          },
          {
            "category_id": 2,
            "category_name": "category2",
            "num": 0,
            price:232,
          },
          {
            "category_id": 3,
            "category_name": "category3",
            "num": 0,
            price:223,
          }
        ],
      },
      {
        "id": "2",
        "ids": "id2",
        "name": "超辣",
        "category": [
          {
            "category_id": 4,
            "category_name": "category4",
            "num": 0,
            price:213,
          },
          {
            "category_id": 5,
            "category_name": "category5",
            "num": 0,
            price:237,
          },
          {
            "category_id": 6,
            "category_name": "category6",
            "num": 0,
            'price':'23',
          },
          {
            "category_id": 7,
            "category_name": "category7",
            "num": 0,
            'price':'23',
          },
          {
            "category_id": 8,
            "category_name": "category8",
            "num": 0,
            'price':'23',
          }, {
            "category_id": 9,
            "category_name": "category9",
            "num": 0,
            'price':'23',
          },
          {
            "category_id": 10,
            "category_name": "category10",
            "num": 0,
            'price':'2312',
          },
          {
            "category_id": 11,
            "category_name": "category11",
            "num": 0,
            'price':'23',
          },
          {
            "category_id": 12,
            "category_name": "category12",
            "num": 0,
            'price':'120',
          },
          {
            "category_id": 13,
            "category_name": "category13",
            "num": 0,
            'price':'12',
          },
          {
            "category_id": 14,
            "category_name": "category14",
            "num": 0,
            'price':'2376',
          },
          {
            "category_id": 15,
            "category_name": "category15",
            "num": 0,
            'price':'2113',
          },
          {
            "category_id": 16,
            "category_name": "category16",
            "num": 0,
            'price':'2300',
          },
        ]
      },
      {
        "id": "3",
        "ids": "id3",
        "name": "甜辣",
        "category": [
          {
            "category_id": 17,
            "category_name": "category17",
            "num": 0,
            'price':'2300',
          },
          {
            "category_id": 18,
            "category_name": "category18",
            "num": 0,
            'price':'2300',
          },
          {
            "category_id": 19,
            "category_name": "category19",
            "num": 0,
            'price':'2300',
          }
        ],
      },
      {
        "id": "4",
        "ids": "id4",
        "name": "不辣",
        "category": [
          {
            "category_id": 20,
            "category_name": "category20",
            "num": 0,
            'price':'2300',
          },
          {
            "category_id": 21,
            "category_name": "category21",
            "num": 0,
            'price':'2130',
          },
          {
            "category_id": 22,
            "category_name": "category22",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 23,
            "category_name": "category23",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 24,
            "category_name": "category24",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 25,
            "category_name": "category25",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 26,
            "category_name": "category26",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 27,
            "category_name": "category27",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 28,
            "category_name": "category28",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 29,
            "category_name": "category29",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 30,
            "category_name": "category30",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 31,
            "category_name": "category31",
            "num": 0,
            'price':'30',
          },
          {
            "category_id": 32,
            "category_name": "category32",
            "num": 0,
            'price':'30',
          }
        ],
      },
      {
        "id": "5",
        "ids": "id5",
        "name": "招牌系列",
        "category": [
          {
            "category_id": 33,
            "category_name": "category33",
            "num": 0,
          },
          {
            "category_id": 34,
            "category_name": "category34",
            "num": 0,
          },
          {
            "category_id": 35,
            "category_name": "category35",
            "num": 0,
          }
        ],
      },
      {
        "id": "6",
        "ids": "id6",
        "name": "藤椒系列",
        "category": [
          {
            "category_id": 36,
            "category_name": "category36",
            "num": 0,
          },
          {
            "category_id": 37,
            "category_name": "category37",
            "num": 0,
          },
          {
            "category_id": 38,
            "category_name": "category38",
            "num": 0,
          }
        ],
      },
      {
        "id": "7",
        "ids": "id7",
        "name": "name7",
        "category": [
          {
            "category_id": 39,
            "category_name": "category39",
            "num": 0,
          },
          {
            "category_id": 40,
            "category_name": "category40",
            "num": 0,
          },
          {
            "category_id": 41,
            "category_name": "category41",
            "num": 0,
          }
        ],
      },
      {
        "id": "8",
        "ids": "id8",
        "name": "name8",
        "category": [
          {
            "category_id": 39,
            "category_name": "category39",
            "num": 0,
          },
          {
            "category_id": 40,
            "category_name": "category40",
            "num": 0,
          },
          {
            "category_id": 41,
            "category_name": "category41",
            "num": 0,
          }
        ],
      },
      {
        "id": "9",
        "ids": "id9",
        "name": "name9",
        "category": [
          {
            "category_id": 39,
            "category_name": "category39",
            "num": 0,
          },
          {
            "category_id": 40,
            "category_name": "category40",
            "num": 0,
          },
          {
            "category_id": 41,
            "category_name": "category41",
            "num": 0,
          }
        ],
      },


      
  ],
    //是否显示下面的购物车
    HZL_isCat:0,
    //购物车的商品
    HZL_my_cat:[],
    // 购物车的数量
    HZL_num:0,
    //分类的数组
    HZL_categories: [
      '点单',
      '评论'
    ],
    total:0,
    //swiper滑动的数组
    HZL_swiper_ID:0,     
    // 左 => 右联动 右scroll-into-view 所需的id
    HZL_toView: null,  
    // 当前左侧选择的
    HZL_currentLeftSelect: null,   
    // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
    HZL_eachRightItemToTop: [],       
    HZL_leftToTop: 0,
    navbarHeight:'',
    cartHeight:'',
    dibuche:'',
    myaddress:'',
    mchId:'',
    latitude:'',
    longitude:'',
    mch_id:'',
    mch:{},
    commont:[],
    myparentIndex:'0',
    myindex:'0'
  },
  onLoad: function (t) {
    // var that = this;
    var a = this;
    // getApp().page.onLoad(a, t);
    console.log(t)
    if(t.mch_id){
      a.setData({
        mch_id:t.mch_id
      })
    }
    // var e = getApp().core.getStorageSync(getApp().const.STORE), o = t.cat_id;
    // void 0 !== o && o && (a.data.cat_style = e.cat_style = -1, 
    // getApp().core.showLoading({
    //     title: "正在加载",
    //     mask: !0
    // }),
    // a.childrenCat(o)
    // ),
    // a.setData({
    //     store: e
    // });
    //导航栏的文字
    wx.setNavigationBarTitle({
      title: '快速点餐',
    }),
      // 导航栏的文字颜色和背景的颜色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#8B1B10',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
  

    var query = wx.createSelectorQuery();
    //选择id


    query.select('.zongFather').boundingClientRect(function (rect) {
      console.log(rect)    
        a.setData({
          mymarginTop: rect.height
        })   
    }).exec();
    //高度大小
    wx.getSystemInfo({
      success: function (res) {
        var HZL_height = res.windowHeight - 260
        var HZL_height1 = res.windowHeight - 210
        a.setData({
          HZL_height: HZL_height,
          HZL_height1: HZL_height1
        })
      }
    });
    a.setData({
      HZL_currentLeftSelect: a.data.constants[0].id,
      HZL_eachRightItemToTop: a.HZL_getEachRightItemToTop()
    })
    // a.getLocation()
   
    
  },
  yue:function(){
    var query = wx.createSelectorQuery();
    var a = this
    //选择id
    query.select('.zongFather').boundingClientRect(function (rect) {
      console.log(rect)
      if (rect) {
        a.setData({
          mymarginTop: rect.height
        }) 

        a.dibu()
      } else {
        a.setData({
          mymarginTop: rect.height
        }) 
        a.dibu()

      }

    }).exec();
  },
    //打开规则提示
    showRule: function (e) {
      console.log(e)
      var index = e.currentTarget.dataset.index;   //当前下标
      var parentIndex = e.currentTarget.dataset.parentindex;    //左侧下标
      console.log(index)
      console.log(parentIndex)
      console.log(this.data.constants[parentIndex].category[index])
      this.setData({
        isRuleTrue: true,
        myindex:e.currentTarget.dataset.index,
        myparentIndex : e.currentTarget.dataset.parentindex,
        myuunum:this.data.constants[parentIndex].category[index].num,
        myCover_pic:"../../image/11.png",
   
        myxianjia:this.data.constants[parentIndex].category[index].price,
   
      
      })
    },
    //关闭规则提示
    hideRule: function () {
      this.setData({
        isRuleTrue: false
      })
    },
  //获取经纬度
  getLocation: function (e) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude:latitude,
          longitude:longitude
        })
        that.list()
      }
    })
  },

  //预览图片，放大预览
  preview(e) {
    console.log(e.currentTarget.dataset.src)
    let currentUrl = e.currentTarget.dataset.current
    var imglist = e.currentTarget.dataset.urls
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  // 底部结算距离底距离
  dibu:function(){
    //高度大小
    var a = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        // var HZL_height = res.windowHeight - 60 - parseInt(a.data.navbarHeight) - parseInt(a.data.mymarginTop)
        // var HZL_height1 = res.windowHeight - 20 - parseInt(a.data.navbarHeight) - parseInt(a.data.mymarginTop)
        // a.setData({
        //   HZL_height: HZL_height,
        //   HZL_height1: HZL_height1,
          
          
        // })
        var query = wx.createSelectorQuery();
        query.select('.HZL_cat').boundingClientRect(function (rect) {
          console.log(rect.height)
          a.setData({
            cartHeight:rect.height
          })
          a.carhe()
        }).exec();
      }
    });
  },
  carhe:function(){
    this.setData({
      dibuche:parseInt(this.data.navbarHeight)+parseInt(this.data.cartHeight)
    })
  },
  onShow: function () {

    

  },

  //记录swiper滚动的
  HZL_swiperchange: function(e){
    var that = this;
    that.setData({
      HZL_swiper_ID: e.detail.current,
    })
  },
  //点击分类栏
  HZL_categories:function(e){
    var that = this;
    that.setData({
      HZL_swiper_ID: e.currentTarget.dataset.index
    })
  },

  // 获取每个右侧的 bar 到顶部的距离，用来做后面的计算。
  HZL_getEachRightItemToTop: function () {  
    var obj = {};
    var totop = 0;
    var constants  = this.data.constants
    console.log(constants)
    if(constants.length == 0){
      return false;
    }
     // 右侧第一类肯定是到顶部的距离为 0
    obj[constants[0].id] = totop     
    // 循环来计算每个子类到顶部的高度
    for (let i = 1; i < (constants.length + 1); i++) {  
      totop += (RIGHT_BAR_HEIGHT + constants[i - 1].category.length * RIGHT_ITEM_HEIGHT)
      // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
      obj[constants[i] ? constants[i].id : 'last'] = totop    
    }
    return obj
  },
  // 监听右侧的滚动事件与 HZL_eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
  right: function (e) {
    // console.log(e)
    for (let i = 0; i < this.data.constants.length; i++) {
      let left = this.data.HZL_eachRightItemToTop[this.data.constants[i].id]
      let right = this.data.HZL_eachRightItemToTop[this.data.constants[i + 1] ? this.data.constants[i + 1].id : 'last']
      // console.log(left)
      // console.log(right)
      if (e.detail.scrollTop < right && e.detail.scrollTop >= left) {
        console.log(this.data.constants[i].id)
        this.setData({
          HZL_currentLeftSelect: this.data.constants[i].id,
          HZL_leftToTop: LEFT_ITEM_HEIGHT * i
        })
      }
    }
  },
  // 左侧类的点击事件，点击时，右侧会滚动到对应分类
  left: function (e) {
    console.log(e)
    var id = e.target.id
    var ids = 'id' + id
    console.log(ids)
    this.setData({
      HZL_toView: ids,
      HZL_currentLeftSelect: id
    })
  },


  //是否显示下面的购物车
  HZL_isCat:function(e){
    var that = this;
    if (that.data.HZL_isCat == 0 && that.data.HZL_num > 0) {
      that.setData({
        HZL_isCat: 1
      })
    } else if (that.data.HZL_isCat == 1 && that.data.HZL_num > 0) {
      that.setData({
        HZL_isCat: 0
      })
    }
  },

  //关闭
  HZL_isCat_close:function(e){
    this.setData({
      HZL_isCat: 0
    })
  },

  //清空
HZL_zero:function(e){
    for (var i = 0; i < this.data.constants.length; i++) {
      for (var j = 0; j < this.data.constants[i].category.length; j++) {
        this.data.constants[i].category[j].num = 0
      }
    }
    this.setData({
      HZL_isCat: 0,
      HZL_num: 0,
      HZL_my_cat: [],
      total:0,
      constants: this.data.constants,
    })
},
//  总价
  totalPrice:function(){
    var mycat = this.data.HZL_my_cat
    console.log(mycat)
    var total = 0
    for(var i=0;i<mycat.length;i++){
      total+=parseFloat(mycat[i].price)
    }
    console.log(total)
    this.setData({
      total:total.toFixed(2)
    })
  },
  // 增加
  HZL_jia:function(e){
    var index = e.currentTarget.dataset.index;   //当前下标
    var parentIndex = e.currentTarget.dataset.parentindex;    //左侧下标
    console.log(index)
    console.log(parentIndex)
    var that = this
    var constants = that.data.constants
    // constants[parentIndex].category[index].num = this.data.constants[parentIndex].category[index].num
   
    var HZL_my_cat = that.HZL_my_jia(parentIndex, index)
    that.setData({
      HZL_num: that.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: that.data.constants,
    })
    that.totalPrice()
    console.log(that.data.constants[that.data.myparentIndex].category[that.data.myindex].num)
    that.setData({
        myuunum:that.data.constants[that.data.myparentIndex].category[that.data.myindex].num
    })
  },

  //减少
  HZL_jian:function(e){
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jian(parentIndex, index)

    if (this.data.HZL_num == 0) {
      this.data.HZL_isCat = 0;
    } else {
      this.data.HZL_isCat = 1;
    }

    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
    this.totalPrice()
    this.setData({
      myuunum:this.data.constants[this.data.myparentIndex].category[this.data.myindex].num
  })
  },

  // 下面购物车增加
  HZL_jia1: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jia(parentIndex, index)
    // var mynum = this.data.constants[this.data.myparentIndex].goodsLlist[this.data.myindex].num
    // console.log(mynum)
    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
    this.totalPrice()
  },

  //下面购物车减少
  HZL_jian1: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    console.log(index)
    console.log(parentIndex)
    var HZL_my_cat = this.HZL_my_jian(parentIndex, index)

    if (this.data.HZL_num == 0) {
      this.data.HZL_isCat = 0;
    } else {
      this.data.HZL_isCat = 1;
    }

    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
      HZL_isCat: this.data.HZL_isCat
    })
    this.totalPrice()
  },

  //封装加的方法
  HZL_my_jia: function (parentIndex, index) {
    this.data.HZL_num++;
    var index = index;
    var parentIndex = parentIndex;
    var id = this.data.constants[parentIndex].category[index].goods_id;
    var name = this.data.constants[parentIndex].category[index].name;
    var cover_pic = this.data.constants[parentIndex].category[index].cover_pic;
    var num = ++this.data.constants[parentIndex].category[index].num ;
    var price = num * this.data.constants[parentIndex].category[index].price;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { num: num,price:price, name: name,mark: mark, index: index, parentIndex: parentIndex ,id:id,cover_pic:cover_pic};
    var HZL_my_cat = this.data.HZL_my_cat;
    HZL_my_cat.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (obj.mark == HZL_my_cat[i].mark) {
        HZL_my_cat.splice(i, 1, obj)
      }
      if (arr.indexOf(HZL_my_cat[i]) == -1) {
        arr.push(HZL_my_cat[i]);
      }
    }

    return arr
  },

  //封装减的方法
  HZL_my_jian: function (parentIndex, index) {
    this.data.HZL_num--;
    var index = index;
    var parentIndex = parentIndex;
    var id = this.data.constants[parentIndex].category[index].goods_id;
    var name = this.data.constants[parentIndex].category[index].name;
    var cover_pic = this.data.constants[parentIndex].category[index].cover_pic;
    var num = --this.data.constants[parentIndex].category[index].num;
    var price = num * this.data.constants[parentIndex].category[index].price;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { num: num,price:price, name: name, mark: mark, index: index, parentIndex: parentIndex,id:id,cover_pic:cover_pic };
    var HZL_my_cat = this.data.HZL_my_cat;
    HZL_my_cat.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (obj.mark == HZL_my_cat[i].mark) {
        HZL_my_cat.splice(i, 1, obj)
      }
    }
    

    var arr1 = [];
    //当数量大于1的时候加
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (arr1.indexOf(HZL_my_cat[i]) == -1) {
        arr1.push(HZL_my_cat[i]);
        if (HZL_my_cat[i].num > 0) {
          arr.push(arr1[i])
        }
      }
    }

    return arr
  },
 
  onShareAppMessage: function () { 
    console.log( this.data.mchId)
    let url = '/pages/cat/cat?mch_id=' + this.data.mchId;
    console.log(url)

    return {
      title: "快速点餐",
      path:url 
    } 
  }

})