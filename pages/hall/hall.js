// pages/hall/hall.js
const API = require('../api/api');

const {
    $Message
} = require('../../dist/base/index');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        clientHeight: '',
        ajaxMsg: 'hello',
        currentPageIndex: 1,
        totalPageIndex: 1,

        toView: 'red',
        scrollTop: 100,
        current: 'homepage',
        currentClickOrderId: '',
        userInfo: {},
        hasUserInfo: false,
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
            },
        ],
        shopList: [],
        SheetVisible: false,
        SheetActions: [{
                name: '进行中',
            },
            {
                name: '已完成'
            },
        ],
        ModalVisible: false,
        created_shop_account: '',
        created_shop_password: ''
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
        var that = this;
        that.setData({
            current: detail.currentItemId
        });
        console.log(detail)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getOrderList();
        this.getShopList();
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

    },

    getOrderList: function() {
        API.get('/hall/getOrderList', {}, (res) => {
            console.log(res);
            this.setData({
                orderList: res.data
            })
        })
    },
    getShopList: function() {
        API.get('/hall/getShopList', {}, (res) => {
            console.log(res);
            this.setData({
                shopList: res.data
            })
        })
    },

    handleOpenSheet(e) {
        this.setData({
            SheetVisible: true,
            currentClickOrderId: e.currentTarget.dataset.id
        });
        console.log(this.data.currentClickOrderId)
    },

    handleCancelSheet() {
        this.setData({
            SheetVisible: false
        });
    },
    createShop() {
        let params = {
            shop_account: '123',
            shop_password: '123'
        };
        API.post('/hall/createShop', params, (res) => {
            this.setData({
                created_shop_account: res.data.shopAccount,
                created_shop_password: "abc123",
                ModalVisible: true
            });
            // 更新商店数据
            this.getShopList();
        })
    },
    handleOrder({
        detail
    }) {


        let params = {
            ord_id: this.data.currentClickOrderId
        };
        // 点击了'进行中'按钮则
        if (detail.index == 0) {
            params.newStatus = 1;
        } else {
            // '已完成'
            params.newStatus = 2;
        }
        this.changeStatus(params);



    },
    changeStatus(params) {
        /**
         *   TODO maybe edit the URL and setData of  the specific to Partially update.
         *   
         */
        API.get('/hall/handleOrder', params, (res) => {
            console.log(res);
            if (res.data.code != 1) {
                $Message({
                    content: '更改失败',
                    type: 'error'
                });
                return false;
            }
            $Message({
                content: '更改成功！',
                type: 'success'
            });
            this.setData({
              SheetVisible: false
            })
        });
        // refresh OrderList
        this.getOrderList();
    },
    handleCloseModal() {
        this.setData({
            ModalVisible: false
        });
    },



})