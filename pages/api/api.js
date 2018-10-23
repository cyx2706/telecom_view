const baseURL = 'http://127.0.0.1:8080';

function resolveURL(url) {

    if (~url.indexOf('http')) {
        return url;
    }

    return baseURL + url;
}
/*
data 参数说明
最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：

对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
对于 POST 方法且 header['content-type'] 为 application/json 的数据，会对数据进行 JSON 序列化
对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
*/
function request(url, method = 'GET', data, callback) {
    wx.request({
        url: resolveURL(url),
        data: data,
        method: method,
        success: (res) => {
            callback(res.data);
        }
    })
}

function get(url, data, cb) {
    request(url, 'GET', data, cb);
}

function post(url, data, cb) {
    request(url, 'POST', data, cb);
}


function getUserInfo(callback) {
    const app = getApp();
    if (app.globalData.userInfo) {
        callback(app.globalData.userInfo);
    } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo
                callback(res.userInfo);
            }
        })
    }

}

function setWindowHeight(context) {
    // const app = getApp();
    if (!context.globalData.windowHeight) {

        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getSystemInfo({
            success: res => {
                context.globalData.windowHeight = res.windowHeight
            }
        })
    }
}

module.exports = {
    get,
    post,
    request,
    getUserInfo,
    setWindowHeight
}