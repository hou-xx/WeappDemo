var baseUrl = 'http://ra1.test.cibfintech.com/dfp-robot-advisor-rest/';
function request(params) {
    if (!_validateAttr(params.url)) {
        params.fail();
        return;
    }
    var requestUrl = params.url;
    if (requestUrl.substr(0, 4) != 'http') {
        requestUrl = baseUrl + params.url;
    }
    if (!_validateAttr(params.method)) {
        params.method = 'GET';
    }
    if (!_validateAttr(params.dataType)) {
        params.dataType = 'json';
    }
    console.log('requestUrl---' + requestUrl);
    wx.request({
        url: requestUrl,
        data: params.data,
        header: params.header,
        method: params.method,
        dataType: params.dataType,
        success: function (res) {
            if (_validateAttr(params.success)) {
                params.success(res);
            }
        },
        fail: function () {
            if (_validateAttr(params.fail)) {
                params.fail('很抱歉，网络开小差了');
            }
        },
        complete: function () {
            if (_validateAttr(params.complete)) {
                params.complete();
            }
        }
    });
}
function _validateAttr(attr) {
    return attr != null && typeof (attr) != "undefined";
}

module.exports = {
  request: request
}
