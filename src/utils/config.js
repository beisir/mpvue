const hostName = 'http://d4658a8b.ngrok.io';
// const hostName = 'http://localhost:5757/weapp';
module.exports = {
    util: {
        /* 登陆获取openid */
        login: `${hostName}/springmvc/app/getOpenid`,
        /* 获取用户手机号 */
        phoneNum: `${hostName}/springmvc/app/getPhoneNum`,
        /* 充值红包  */
        recharge: `${hostName}/springmvc/app/recharge`
    }
};
