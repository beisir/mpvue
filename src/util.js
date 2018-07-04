/**
 * [wechatLogin() 登陆信息 主要获取openid ，sesstionKey ]
 * [{params: Object({callback: '获取成功返回回调函数', 'session': Boolean值 ，是否获取最新，sesstionKey})}]
 * [-------------------------------------------------]
 */
import ajax from './utils/http.js';

function wechatLogin (callback, session) {
    function ISlogin () {
        wx.login({
            success: res => {
                ajax({
                    url: 'http://095ab2eb.ngrok.io/springmvc/app/getOpenid',
                    data: {
                        code: res.code
                    }
                }).then(options => {
                    wx.setStorage({
                        key: 'openID',
                        data: options
                    });
                    callback(options);
                });
            }
        });
    };
    if (session) {
        ISlogin();
    } else {
        wx.getStorage({
            key: 'openID',
            success (res) {
                // console.log(res);
                if (res.errMsg.includes('ok')) {
                    callback(res.data);
                };
            },
            fail () {
                ISlogin();
            }
        });
    };
};

/**
 * [AuthorIzation() 授权登陆 ]
 * [{params: Object({e ：如果有e的参数带表手动触发获取授权，没有情况下获取缓存授权信息})}]
 * [-------------------------------------------------]
 */
const AuthorIzation = (e) => {
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

const getMobilePhone = (e) => {
    return new Promise((resolve, reject) => {
        let {encryptedData, iv, errMsg} = e.mp.detail;
        if (errMsg.includes('ok')) {
            encryptedData && wechatLogin(({session_key}) => {
                ajax({
                    url: 'http://095ab2eb.ngrok.io/springmvc/app/getPhoneNum',
                    method: 'POST',
                    header: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
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
                        reject();
                    };
                });
            }, true);
        } else {
            wx.showToast({
                title: '拒绝了手机号码授权',
                icon: 'none'
            });
        };
    });
};

export default {
    wechatLogin: wechatLogin,
    AuthorIzation: AuthorIzation,
    getMobilePhone: getMobilePhone
};
