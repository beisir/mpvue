
import ajax from './http.js';
import {util, domestic, foreign} from './config.js';
class UTIL {
    constructor () {
        this.introduce = `
            /**
             * [UTRL { } 畅物网物流小程序 公共方法 ]
             * [{ 微信支付, 手机号码授权， openid获取, 用户信息授权  }]
             * [-------------------------------------------------]
             */
        `;
    };

    /**
     * [ISlogin() 是否登陆 ]
     * [{params: Object({resolve: 成功回调})}]
     * [-------------------------------------------------]
     */
    ISlogin (resolve) {
        wx.login({
            success: res => {
                ajax({
                    url: util.openid,
                    data: {
                        code: res.code
                    }
                }).then(options => {
                    wx.setStorage({
                        key: 'openID',
                        data: options
                    });
                    resolve(options);
                });
            }
        });
    };

    /**
     * [Login() 登陆信息 主要获取openid ，sesstionKey ]
     * [{params: Object({callback: '获取成功返回回调函数', 'session': Boolean值 ，是否获取最新，sesstionKey})}]
     * [-------------------------------------------------]
     */
    Login (session) {
        const _this = this;
        return new Promise((resolve, reject) => {
            if (session) {
                _this.ISlogin(resolve);
            } else {
                wx.getStorage({
                    key: 'openID',
                    success (res) {
                        if (res.errMsg.includes('ok')) {
                            resolve(res.data);
                        };
                    },
                    fail () {
                        _this.ISlogin(resolve);
                    }
                });
            };
        });
    };
    /**
     * [AuthorIzation() 用户信息授权 ]
     * [{params: Object({e: 用户触发事件对象})}]
     * [ps: 在1.7版本之后，将不会自动调取授权弹框 ,所有授权将改为手动触发]
     * [-------------------------------------------------]
     */
    AuthorIzation (e) {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: 'userInfo',
                success (options) {
                    if (options.errMsg.includes('ok')) {
                        resolve(options.data);
                    } else {
                        wx.showToast({
                            title: '获取错误',
                            icon: 'none'
                        });
                        reject('失败');
                    };
                },
                fail () {
                    if (e !== undefined) {
                        let { userInfo, errMsg } = e.mp.detail;
                        if (errMsg.includes('ok')) {
                            wx.setStorageSync('userInfo', userInfo);
                            resolve(userInfo);
                        } else {
                            wx.showToast({
                                title: '授权失败',
                                icon: 'none'
                            });
                            reject('失败');
                        };
                    }
                }
            });
        });
    };
    /**
     * [getMobilePhone() 获取微信手机号 ]
     * [{params: Object({e: 用户触发事件对象})}]
     * [ps: 获取手机号码必须为用户手动行为触发 授权框]
     * [-------------------------------------------------]
     */
    getMobilePhone (e) {
        const _this = this;
        return new Promise(async (resolve, reject) => {
            let {encryptedData, iv, errMsg} = e.mp.detail;
            if (errMsg.includes('ok')) {
                let {session_key} = await _this.Login(true);
                console.log(session_key);
                ajax({
                    url: util.phoneNum,
                    method: 'POST',
                    data: {
                        encrypData: encryptedData,
                        ivData: iv,
                        sessionKey: session_key
                    }
                }).then(phoneNum => {
                    if ((typeof phoneNum) === 'object' && phoneNum.phoneNumber) {
                        wx.setStorageSync('mobile', phoneNum.phoneNumber);
                        resolve(phoneNum.phoneNumber);
                    } else {
                        wx.showToast({
                            title: '获取失败，请重试',
                            icon: 'none'
                        });
                        reject('失败');
                    };
                });
            } else {
                reject('拒绝');
                wx.showToast({
                    title: '拒绝了手机号码授权',
                    icon: 'none'
                });
            };
        });
    };
    // // 微信支付
    WeChatPayment (isurl, msg) {
        const _this = this;
        return new Promise(async (resolve, reject) => {
            try {
                let url = isurl === '1' ? domestic.WxSweep : foreign.WxSweep;
                let params = isurl === '1' ? {internaId: msg} : {traQueryId: msg};
                let {openid} = await _this.Login();
                let result = await ajax({
                    url: url,
                    method: 'POST',
                    data: Object.assign({
                        openId: openid
                    }, params)
                });
                if (typeof result === 'string') {
                    wx.showToast({
                        title: '系统异常',
                        icon: 'none'
                    });
                    return false;
                }
                wx.requestPayment({
                    timeStamp: result.timeStamp,
                    nonceStr: result.nonceStr,
                    package: result['package'],
                    signType: 'MD5',
                    paySign: result.paySign,
                    success (res) {
                        // 如果支付成功 发送推送消息模板
                        let prepay_id = result['package'].split('=')[1];
                        if (res.errMsg.includes('ok')) {
                            resolve({
                                prepay_id: prepay_id,
                                r: result.r
                            });
                            wx.showToast({
                                title: '支付成功',
                                icon: 'none'
                            });
                        } else {
                            reject('失败');
                        };
                    },
                    fail (res) {
                        reject(res);
                        let errMsg = res.errMsg.includes('cancel') ? '取消支付' : '支付失败，请重试';
                        wx.showToast({
                            title: errMsg,
                            icon: 'none'
                        });
                    }
                });
            } catch (err) {
                console.log(err);
                wx.showToast({
                    title: '请求错误',
                    icon: 'none'
                });
            }
        });
    };

    WeChatRechat (price) {
        const _this = this;
        return new Promise(async (resolve, reject) => {
            try {
                let {openid} = await _this.Login();
                let result = await ajax({
                    url: util.saveWxXd,
                    method: 'POST',
                    data: {
                        openId: openid,
                        recAmount: price
                    }
                });
                let { timeStamp, nonceStr, paySign } = result.map;
                wx.requestPayment({
                    timeStamp: timeStamp,
                    nonceStr: nonceStr,
                    package: result.map['package'],
                    signType: 'MD5',
                    paySign: paySign,
                    success (res) {
                        // 如果支付成功 发送推送消息模板
                        let prepay_id = result.map['package'].split('=')[1];
                        if (res.errMsg.includes('ok')) {
                            resolve({
                                prepay_id: prepay_id,
                                r: result
                            });
                            wx.showToast({
                                title: '支付成功',
                                icon: 'none'
                            });
                        } else {
                            reject('失败');
                        };
                    },
                    fail (res) {
                        reject(res);
                        let errMsg = res.errMsg.includes('cancel') ? '取消支付' : '支付失败，请重试';
                        wx.showToast({
                            title: errMsg,
                            icon: 'none'
                        });
                    }
                });
            } catch (err) {
                wx.showToast({
                    title: '请求错误',
                    icon: 'none'
                });
            }
        });
    };
}

export default new UTIL();
