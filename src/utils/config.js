const hostName = 'https://www.wuchangwang.cn/miniwc';
// const hostName = 'http://8228d2da.ngrok.io/WCW/miniwc';
module.exports = {
    foreign: { // 国外
        balance: `${hostName}/main/foreign/balance.htm`, // 国外运踪 校验通过余额支付红包支付 不满足返回，拉取微信支付 11
        WxSweep: `${hostName}/main/foreign/WxSweep.htm`, // 国外微信支付接口
        queryTraceHistroy: `${hostName}/foreign/queryTraceHistroy.htm`, // 国外运宗历史查询
        queryInstant: `${hostName}/foreign/queryInstant.htm`, // 国外充值轮询接口
        queryDetails: `${hostName}/foreign/queryDetails.htm` // 国外运宗历史详情
    },
    domestic: { // 国内
        balance: `${hostName}/main/domestic/balance.htm`, // 国内运踪 校验通过余额支付 红包支付 不满足返回，拉取微信支付 12
        WxSweep: `${hostName}/main/domestic/WxSweep.htm`, // 国内微信支付接口
        queryDomesticList: `${hostName}/domestic/queryDomesticList.htm`, // 国内运宗历史查询
        queryInstant: `${hostName}/domestic/queryInstant.htm`, // 国内充值轮询接口
        queryDetails: `${hostName}/domestic/queryDetails.htm` // 国内运踪历史详情
    },
    util: {
        openid: `${hostName}/mini/getOpenid.htm`, // 获取openid
        login: `${hostName}/main/landing.htm`, // 返回结果：返回当前登陆人信息
        register: `${hostName}/main/getRegister.htm`, // 授权获取手机号之后存储后台

        phoneNum: `${hostName}/mini/getPhoneNum.htm`,
        queryTraceType: `${hostName}/main/queryTraceType.htm`, // 获取余额
        queryCustomers: `${hostName}/main/queryCustomers.htm`, // 客服中心
        querySend: `${hostName}/main/querySend.htm`, // 站点搜索接口
        queryHbDetails: `${hostName}/main/queryHbDetails.htm`, // 红包列表
        queryCZRecord: `${hostName}/main/queryCZRecord.htm`, // 充值明细
        saveWxXd: `${hostName}/main/saveWxXd.htm`, // 微信充值订单
        query: `${hostName}/main/query.htm`, // 直接充值金额轮询
        saveJsInstant: `${hostName}/main/saveJsInstant.htm`, // 国内即时追踪单点提交查询
        grantWXInfor: `${hostName}/main/grantWXInfor.htm`, // 保存微信头像，微信用户名
        validatePhone: `${hostName}/main/validatePhone.htm`,
        sendPhone: `${hostName}/main/sendPhone.htm`,
        queryAccount: `${hostName}/main/queryAccount.htm`,
        updateAccount: `${hostName}/main/updateAccount.htm` // 保存个人信息
    }
};
