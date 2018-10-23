// pages/user/index.js
const API = require('../api/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        clientHeight: '',
        current: 'homepage',
        currentPageIndex: 1,
        totalPageIndex: 1,
        userInfo: {},
        userId: '',
        hasUserInfo: false,
        userOrderList: []
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
    handleScan() {
        let params = {
            success(res) {
                console.log(res.result);
            }
        }
        wx.scanCode(params)
    },
    handleForm() {
        wx.navigateTo({
            url: './form/form'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        API.getUserInfo((res) => {
            this.setData({
                userInfo: res,
                hasUserInfo: true
            })
        });
        let user_id = this.data.user_id;
        API.get('/user/getOrderList', user_id, (res) => {
            this.setData({
                userOrderList: res.data
            })
        })
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
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})