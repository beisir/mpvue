const hostName = 'https://bhyrzk1n.qcloud.la/weapp';
// const hostName = 'http://localhost:5757/weapp';
module.exports = {
    app: {
        hebei: `${hostName}/hebei`,
        weixin: `${hostName}/hebei`
    },
    util: {
        /* 登陆获取openid */
        login: `http://65a26c67.ngrok.io/springmvc/app/getOpenid`,
        /* 获取用户手机号 */
        phoneNum: `http://65a26c67.ngrok.io/springmvc/app/getPhoneNum`,
        /* 充值红包  */
        recharge: `http://65a26c67.ngrok.io/springmvc/app/recharge`
    }
};
