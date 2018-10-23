// pages/common/OrderCard/OrderCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // * NOTE  dataSource: OrderList.item 
        dataSource: {
            type: Object,
            value: {},
            observer: function() {}
        },
        showChangeBtn: {
            type: Boolean,
            value: true,
            observer: function() {}
        },
        thumb: {
            type: String,
            value: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
        }
    },


    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        _handleChangeStatus() {
            this.triggerEvent("handleChangeStatus");
        }
    }
})