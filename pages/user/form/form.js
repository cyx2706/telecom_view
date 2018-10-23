// pages/user/form/form.js
const API = require('../../api/api');
const {
    $Message
} = require('../../../dist/base/index');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList: [],
        username: '',
        tel: '',
        address: '',
        shop_id: '',
        position: 'right',
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({
            shop_id: e.detail.value
        });
    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let shop_id = this.data.shop_id;
        let params = {
            shop_id,
            ...e.detail.value
        };
        console.log(params);
        API.post('/user/submit', params, (res) => {
            if (res.status == 1) {
                $Message({
                    content: '提交成功',
                    type: 'success'
                });
              wx.navigateTo({
                url: '/pages/user/user',
              });


            } else {

                $Message({
                    content: '失败',
                    type: 'error'
                });
              
            }
        });
    },
    formReset: function() {
        console.log('form发生了reset事件')
    },

    handleShopChange(e) {
        this.setData({
            current: e.detail.value,
        });
    },

    getShopList() {
        API.get('/user/getShopList', {}, (res) => {
            console.log(res);
            let result = res.data.map(e => {
                let {
                    shop_name,
                    shop_id
                } = e;
                //  此处因为i-radio不支持dataset..所以直接使用shop_id代替.
                return {
                    id: shop_id,
                    name:shop_name,
                }
            });
            this.setData({
                shopList: result
            })
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getShopList();
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