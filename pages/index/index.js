//index.js 获取应用实例
const app = getApp()

Page({
    data: {
        motto: '欢迎光临, 请选择您的身份',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        // ! NOTE  the pageBtns will render by the sequence
        pageBtns: [{
                text: '用户',
                url: '../user/user'
            }, {
                text: '营业厅',
                url: '../hall/hall'
            }, {
                text: '商店',
                url: '../shop/shop'
            }, {
                text: '电信公司',
                url: '../adm/adm'
            }

        ]
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    bindPageBtnTap: function(e) {
        console.info(e.currentTarget);
        // * Before enter login page , Save the navigateTo URL in globalData. 
        const app = getApp();
        const navigateURL = e.target.dataset.url;
        app.globalData.nextNavigateURL = navigateURL
        console.log(app.globalData.nextNavigateURL);

        // 普通用户无需跳转
        // * enter login page.
        wx.navigateTo({
            url: './login/login'
        });
        // if (navigateURL == '../user/user') {
        //     wx.navigateTo({
        //         url: navigateURL
        //     })
        // } else {

        // }
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
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