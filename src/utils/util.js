
import ajax from './http.js';
import {util} from './config.js';
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
                    url: util.login,
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
                        resolve();
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
                            resolve();
                        };
                    };
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
    WeChatPayment (price) {
        const _this = this;
        return new Promise(async (resolve, reject) => {
            try {
                let {openid} = await _this.Login();
                let result = await ajax({
                    url: util.recharge,
                    method: 'POST',
                    data: {
                        openid: openid,
                        amount: price
                    }
                });
                let { timestamp, noncestr, wxpackage, paySign } = result.payInfo;
                wx.requestPayment({
                    timeStamp: timestamp,
                    nonceStr: noncestr,
                    package: wxpackage,
                    signType: 'MD5',
                    paySign: paySign,
                    success (res) {
                        // 如果支付成功 发送推送消息模板
                        let prepay_id = wxpackage.split('=')[1];
                        if (res.errMsg.includes('ok')) {
                            resolve(prepay_id);
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

/**
 * [Login() 登陆信息 主要获取openid ，sesstionKey ]
 * [{params: Object({callback: '获取成功返回回调函数', 'session': Boolean值 ，是否获取最新，sesstionKey})}]
 * [-------------------------------------------------]
 */
// import ajax from './http.js';
// function ISlogin (resolve) {
//     wx.login({
//         success: res => {
//             ajax({
//                 url: 'http://65a26c67.ngrok.io/springmvc/app/getOpenid',
//                 data: {
//                     code: res.code
//                 }
//             }).then(options => {
//                 wx.setStorage({
//                     key: 'openID',
//                     data: options
//                 });
//                 resolve(options);
//             });
//         }
//     });
// };
// function Login (session) {
//     return new Promise((resolve, reject) => {
//         if (session) {
//             ISlogin(resolve);
//         } else {
//             wx.getStorage({
//                 key: 'openID',
//                 success (res) {
//                     if (res.errMsg.includes('ok')) {
//                         resolve(res.data);
//                     };
//                 },
//                 fail () {
//                     ISlogin(resolve);
//                 }
//             });
//         };
//     });
// };
//
// /**
//  * [AuthorIzation() 授权登陆 ]
//  * [{params: Object({e ：如果有e的参数带表手动触发获取授权，没有情况下获取缓存授权信息})}]
//  * [-------------------------------------------------]
//  */
// const AuthorIzation = (e) => {
//     return new Promise((resolve, reject) => {
//         wx.getStorage({
//             key: 'userInfo',
//             success (options) {
//                 if (options.errMsg.includes('ok')) {
//                     resolve(options.data);
//                 } else {
//                     wx.showToast({
//                         title: '获取错误',
//                         icon: 'none'
//                     });
//                     resolve();
//                 };
//             },
//             fail () {
//                 if (e !== undefined) {
//                     let { userInfo, errMsg } = e.mp.detail;
//                     if (errMsg.includes('ok')) {
//                         wx.setStorageSync('userInfo', userInfo);
//                         resolve(userInfo);
//                     } else {
//                         wx.showToast({
//                             title: '授权失败',
//                             icon: 'none'
//                         });
//                         resolve();
//                     };
//                 };
//             }
//         });
//     });
// };
//

//
//
//
//
//
//
//
//
//
//
//
//
//
// const getMobilePhone = (e) => {
//     return new Promise((resolve, reject) => {
//         let {encryptedData, iv, errMsg} = e.mp.detail;
//         if (errMsg.includes('ok')) {
//             encryptedData && Login(({session_key}) => {
//                 ajax({
//                     url: 'http://095ab2eb.ngrok.io/springmvc/app/getPhoneNum',
//                     method: 'POST',
//                     header: {
//                         'Content-type': 'application/x-www-form-urlencoded'
//                     },
//                     data: {
//                         encrypData: encryptedData,
//                         ivData: iv,
//                         sessionKey: session_key
//                     }
//                 }).then(phoneNum => {
//                     if ((typeof phoneNum) === 'object' && phoneNum.phoneNumber) {
//                         wx.setStorageSync('mobile', phoneNum.phoneNumber);
//                         resolve(phoneNum.phoneNumber);
//                     } else {
//                         wx.showToast({
//                             title: '获取失败，请重试',
//                             icon: 'none'
//                         });
//                         reject();
//                     };
//                 });
//             }, true);
//         } else {
//             wx.showToast({
//                 title: '拒绝了手机号码授权',
//                 icon: 'none'
//             });
//         };
//     });
// };

// export default {
//     Login: Login,
//     AuthorIzation: AuthorIzation,
//     getMobilePhone: getMobilePhone
// };
