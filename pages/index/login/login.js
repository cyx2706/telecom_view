// pages/index/login/login.js
const API = require('../../api/api');
const {
    $Message
} = require('../../../dist/base/index');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        account: '',
        password: '',
        currentRole: ''
    },

    formSubmit: function(e) {
        let nextNavigateURL = app.globalData.nextNavigateURL;
        let formData = e.detail.value;
        // role 为用户时 则参数为:
        let params_user = {
            usr_tel: formData.account
        };
        let params = {
            ...formData,
            ...params_user
        }
        console.log(params);
        let role = nextNavigateURL.split('/').pop();

        API.post(`/login/${role}`, params, (res) => {
            if (res.status == 1) {
                $Message({
                    content: '登录成功',
                    type: 'success'
                });
                wx.navigateTo({
                    url: '../' + nextNavigateURL
                });
            } else {
                $Message({
                    content: '登录失败',
                    type: 'error'
                });
            }
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (app.globalData.nextNavigateURL) {
            let role = app.globalData.nextNavigateURL.split('/').pop();
            console.log('role' + role);
            this.setData({
                currentRole: role
            })

        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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