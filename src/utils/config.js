const hostName = 'https://www.wuchangwang.cn';
// const hostName = 'http://7e0048fa.ngrok.io/WCW';
module.exports = {
    foreign: { // 国外
        balance: `${hostName}/miniwc/main/foreign/balance.htm`, // 国外运踪 校验通过余额支付红包支付 不满足返回，拉取微信支付 11
        WxSweep: `${hostName}/miniwc/main/foreign/WxSweep.htm`, // 国外微信支付接口
        queryTraceHistroy: `${hostName}/miniwc/foreign/queryTraceHistroy.htm`, // 国外运宗历史查询
        queryInstant: `${hostName}/miniwc/foreign/queryInstant.htm`, // 国外充值轮询接口
        queryDetails: `${hostName}/miniwc/foreign/queryDetails.htm` // 国外运宗历史详情
    },
    domestic: { // 国内
        balance: `${hostName}/miniwc/main/domestic/balance.htm`, // 国内运踪 校验通过余额支付 红包支付 不满足返回，拉取微信支付 12
        WxSweep: `${hostName}/miniwc/main/domestic/WxSweep.htm`, // 国内微信支付接口
        queryDomesticList: `${hostName}/miniwc/domestic/queryDomesticList.htm`, // 国内运宗历史查询
        queryInstant: `${hostName}/miniwc/domestic/queryInstant.htm`, // 国内充值轮询接口
        queryDetails: `${hostName}/miniwc/domestic/queryDetails.htm` // 国内运踪历史详情
    },
    util: {
        openid: `${hostName}/miniwc/mini/getOpenid.htm`, // 获取openid
        login: `${hostName}/miniwc/main/landing.htm`, // 返回结果：返回当前登陆人信息
        register: `${hostName}/miniwc/main/getRegister.htm`, // 授权获取手机号之后存储后台

        phoneNum: `${hostName}/miniwc/mini/getPhoneNum.htm`,
        queryTraceType: `${hostName}/miniwc/main/queryTraceType.htm`, // 获取余额
        queryCustomers: `${hostName}/miniwc/main/queryCustomers.htm`, // 客服中心
        querySend: `${hostName}/miniwc/main/querySend.htm`, // 站点搜索接口
        queryHbDetails: `${hostName}/miniwc/main/queryHbDetails.htm`, // 红包列表
        queryCZRecord: `${hostName}/miniwc/main/queryCZRecord.htm`, // 充值明细
        saveWxXd: `${hostName}/miniwc/main/saveWxXd.htm`, // 微信充值订单
        query: `${hostName}/miniwc/main/query.htm`, // 直接充值金额轮询
        saveJsInstant: `${hostName}/miniwc/main/saveJsInstant.htm`, // 国内即时追踪单点提交查询
        grantWXInfor: `${hostName}/miniwc/main/grantWXInfor.htm`, // 保存微信头像，微信用户名
        validatePhone: `${hostName}/miniwc/main/validatePhone.htm`,
        sendPhone: `${hostName}/miniwc/main/sendPhone.htm`,
        queryAccount: `${hostName}/miniwc/main/queryAccount.htm`,
        updateAccount: `${hostName}/miniwc/main/updateAccount.htm` // 保存个人信息
    }
};
