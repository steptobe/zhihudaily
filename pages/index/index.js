//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        text:'',
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        tabTitle:[],
        tabDetail:[],
        activeIndex:13,
        left:'2rpx'

    },
    //事件处理函数

    bindClick: function(e) {
      var that = this;
      
      that.setData({ activeIndex: e.currentTarget.dataset.id });
      var testId = e.currentTarget.dataset.id;
      var index =  e.currentTarget.dataset.index;
      if(index > 3){
        var left = 80 * (index - 2);
        that.setData({ left: left });
      }else{
        that.setData({ left: left });
      }
      
      wx.request({
        url: 'https://news-at.zhihu.com/api/4/theme/' + testId, //仅为示例，并非真实的接口地址
        data: {
          
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({ tabDetail: res.data });
          console.log(res.data)
        }
      })
    },

    bindViewTap: function() {
        // wx.navigateTo({
        //     url: '../logs/logs'
        // })
    },

    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        var that = this;
        wx.request({
          url: 'https://news-at.zhihu.com/api/4/themes', //仅为示例，并非真实的接口地址
          data: {

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) { 
                
              that.data.tabTitle = res.data
              that.setData({ tabTitle: res.data }); 
              console.log(that.data.tabTitle)            
          }
        });
        wx.request({
          url: 'https://news-at.zhihu.com/api/4/theme/13', //仅为示例，并非真实的接口地址
          data: {

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({ tabDetail: res.data });
            console.log(res.data)
          }
        })
    },
    RequestData: function () {
      var that = this;
      wx.request({
        url: 'https://www.itit123.cn/itdragon/findAll',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header 默认是application/json  
        success: function (res) {
          // 操作json数据  
          var text = "";
          for (var i in res.data) {
            text += i + "." + res.data[i].title + "\r\n";
          }
          that.setData({ textdata: text });
        },
        fail: function () {
          // fail  
        },
        complete: function () {
          // complete  
        }
      })
    },  
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})