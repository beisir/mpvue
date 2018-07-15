const hostName = 'https://www.wuchangwang.cn';
// const hostName = 'http://localhost:5757/weapp';
module.exports = {
    range: {
        foreign: `${hostName}/miniwc/main/foreign/balance.htm`,
        domestic: `${hostName}/miniwc/main/domestic/balance.htm`
    },
    util: {
        login: `${hostName}/miniwc/main/landing.htm`,

        register: `${hostName}/miniwc/main/getRegister.htm`,
        /* 登陆获取openid */
        openid: `${hostName}/miniwc/mini/getOpenid.htm`,
        /* 获取用户手机号 */
        phoneNum: `${hostName}/miniwc/mini/getPhoneNum.htm`,
        /* 充值红包  */
        recharge: `${hostName}/springmvc/app/recharge`,
        app: 'https://www.easy-mock.com/mock/5b39baec73a49f4fe3433dd9/xcx/form',
        queryTraceType: `${hostName}/miniwc/main/queryTraceType.htm`,

        foreign: `${hostName}/miniwc/main/foreign/WxSweep.htm`, // guowai
        domestic: `${hostName}/miniwc/main/domestic/WxSweep.htm` // guonei
    },
    historyDetail: {
        queryTraceHistroy: `${hostName}/miniwc/foreign/queryTraceHistroy.htm`
    },
    queryDomesticList: {
        queryDomesticList: `${hostName}/miniwc/domestic/queryDomesticList.htm`
    },
    customers: {
        queryCustomers: `${hostName}/miniwc/main/queryCustomers.htm`,
        queryDomestic: `${hostName}/miniwc/domestic/queryDomesticList.htm`
    },
    querySend: {
        querySend: `${hostName}/miniwc/main/querySend.htm`
    },
    redList: {
        queryHbDetails: `${hostName}/miniwc/main/queryHbDetails.htm`
    },
    queryCZRecord: {
        queryCZRecord: `${hostName}/miniwc/main/queryCZRecord.htm`
    },
    queryInstant: {
        foreign: `${hostName}/miniwc/foreign/queryInstant.htm`,
        domestic: `${hostName}/miniwc/domestic/queryInstant.htm`
    },
    saveWxXd: {
        saveWxXd: `${hostName}/miniwc/main/saveWxXd.htm`,
        query: `${hostName}/miniwc/main/query.htm`
    },
    foreign_queryDetails: {
        queryDetails: `${hostName}/miniwc/foreign/queryDetails.htm`
    },
    domestic_queryDetails: {
        queryDetails: `${hostName}/miniwc/domestic/queryDetails.htm`
    }

};
