// pages/shop/shop.js
const API = require('../api/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clientHeight: '',
        currentShopId: '',
        current: 'homepage',
        currentPageIndex: 1,
        totalPageIndex: 1,
        userInfo: {},
        hasUserInfo: false,
        // NOTE  will render by sequence
        orderList: [{
                "ord_id": "310000198408015740",
                "shop_id": "610000199006153580",
                "usr_id": "340000200603215831",
                "sch_id": "440000199501176307",
                "ord_status": "未处理",
                "ord_time": "1983-05-02 17:48:21",
                "ord_tel": "18012345478",
                "ord_addr": "北京 北京市 房山区",
                "usr_name": "文军"
            },
            {
                "ord_id": "450000197709199201",
                "shop_id": "710000197308237258",
                "usr_id": "540000200008128896",
                "sch_id": "630000201408035222",
                "ord_status": "进行中",
                "ord_time": "2009-03-12 10:22:07",
                "ord_tel": "18012345478",
                "ord_addr": "四川省 德阳市 广汉市",
                "usr_name": "姜娟"
            }
        ],
    },
    handleChange({
        detail
    }) {
        this.setData({
            current: detail.key
        });
    },
    swiperTab: function({
        detail
    }) {

        this.setData({
            current: detail.currentItemId
        });
        console.log(detail)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // ! here need to set the currentShopId;
        // TODO 
        API.getUserInfo((res) => {
            this.setData({
                userInfo: res,
                hasUserInfo: true
            })
        });
        let shop_id = this.data.currentShopId;

        console.log(shop_id);
        API.get('/shop/getOrderList/', shop_id, (res) => {
            this.setData({
                orderList: res.data
            })
        });
        // API.getOrderList(shop_id, (res) => {
        //     this.setData({
        //         orderList: res.data
        //     })
        // });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        const app = getApp();
        this.setData({
            clientHeight: app.globalData.windowHeight
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})