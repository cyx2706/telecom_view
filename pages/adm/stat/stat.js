// pages/adm/stat/stat.js
const wxCharts = require('../../../utils/wxcharts-min.js');

const API = require('../../api/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    initCharts() {
        API.get('/hall/statistics', {}, (res) => {
            // this.setData({
            //     Stat: res.data
            // })
            console.log(res.data);
            let count=0;
            res.data.map(e=>{
              count+=e.ord_num;
            })
            let series = res.data.map(e => {
              
                return {
                    name: e.shop_name,
                    data: count
                }
            });
            console.log(series);
            new wxCharts({
                canvasId: 'pieCanvas',
                type: 'ring',
                series: series,
                width: 340,
                height: 300,
                dataLabel: true
            });
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function(options) {
        this.initCharts();
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