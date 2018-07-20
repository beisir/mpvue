<template lang="html">
    <div class="manage">
        <div class="manage-top">
            <div class="manage-image">
                <img :src="userInfo.avatarUrl" />
            </div>
            <div class="manage-userinfo">
                <div class="manage-name">{{userInfo.nickName}}</div>
                <div class="manage-phone">联系电话：{{new_phone}}</div>
            </div>
            <button
                v-if="userBtn"
                class="user-btn"
                open-type="getUserInfo"
                @getuserinfo="saveUserInfo">
            </button>
        </div>
        <div class="manage-list">
            <a class="aBtn"
                v-for="(pageItem, pageIndex) in pageList"
                :key="pageItem.icon"
                :href="pageItem.path">
                <span :class="['icon iconfont', pageItem.icon]"></span>
                <p>{{pageItem.title}}</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
                <!-- <button class="aBtn-button" type="button" v-else @click="goPage(0)"></button> -->
            </a>
            <a class="aBtn" @click="toggerCustomer">
                <span class="icon iconfont icon-msnui-telephone"></span>
                <p>客服中心</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
            </a>
        </div>
        <div class="manage-bottom">
            <a href="/pages/switchpage/main">切换账号</a>
        </div>
        <button
            v-if="phoneBtn"
            class="fiexd"
            open-type="getPhoneNumber"
            @getphonenumber="userInfoHandler">
        </button>
    </div>
</template>

<script>
import {manage} from '../../utils/data.js';
import {util} from '../../utils/config.js';
export default {
    data () {
        return {
            pageList: [
                {
                    title: '个人信息',
                    path: '/pages/personinfo/main',
                    icon: 'icon-wode-'
                },
                {
                    title: '查询历史',
                    path: '/pages/trahistory/main?active=0',
                    icon: 'icon-icon--'
                },
                {
                    title: '我的账户',
                    path: '/pages/myaccount/main',
                    icon: 'icon-zhanghuxinxi'
                }
            ],
            phoneBtn: true,
            userBtn: true,
            userInfo: {
                nickName: '点击授权',
                avatarUrl: manage.avatarUrl
            }
        };
    },
    methods: {
        // 获取手机号 等用户信息
        async getPhoneNum () {
            const _this = this;
            try {
                let openid = await this.$UTIL.Login();
                let data = await this.$ajax({
                    url: util.queryAccount,
                    data: {
                        openId: openid.openid
                    }
                }, true);
                if (data.state === '34' || data.state === '35') {
                    if (data.data && data.data.phone_num) {
                        _this.phoneBtn = false;
                        _this.$store.commit('new_phone', data.data.phone_num);
                    } else {
                        _this.phoneBtn = true;
                    };
                    if (data.data && data.data.wxHead && data.data.wxName) {
                        this.userInfo = {
                            nickName: data.data.wxName,
                            avatarUrl: data.data.wxHead
                        };
                        this.userBtn = false;
                    } else {
                        this.userBtn = true;
                    };
                } else {
                    wx.showToast({
                        title: data.msg || '错误',
                        icon: 'none'
                    });
                };
            } catch (e) {
                console.log(e);
            };
        },
        // 获取保存微信用户头像 微信名称
        async saveUserInfo (e) {
            try {
                let userInfo = await this.$UTIL.AuthorIzation(e);
                let openid = await this.$UTIL.Login();
                let options = await this.$ajax({
                    url: util.grantWXInfor,
                    method: 'POST',
                    data: {
                        openId: openid.openid,
                        wxName: userInfo.nickName, // 微信昵称
                        wxHead: userInfo.avatarUrl // 微信头像
                    }
                });
                if (options.state === '200') {
                    this.userInfo = userInfo;
                    this.userBtn = false;
                } else {
                    this.userInfo = {
                        nickName: '点击授权',
                        avatarUrl: manage.avatarUrl
                    };
                    this.userBtn = true;
                };
                wx.showToast({
                    title: options.msg,
                    icon: 'none'
                });
            } catch (e) {
                console.log(e);
            };
        },
        // 保存手机号码
        async userInfoHandler (e) {
            try {
                let result = await this.$UTIL.getMobilePhone(e);
                let openid = await this.$UTIL.Login();
                let registerInfo = await this.$ajax({
                    url: util.register,
                    data: {
                        openId: openid.openid,
                        userName: result
                    }
                });
                if (registerInfo.state === '20') {
                    let index = e.mp.currentTarget.dataset.index;
                    this.$store.commit('phone_num', result);
                    this.phoneBtn = false;
                } else {
                    this.phoneBtn = true;
                    wx.showToast({
                        title: registerInfo.msg,
                        icon: 'none'
                    });
                };
            } catch (err) {
                console.log(err);
            };
        },
        // 跳转客服页面
        toggerCustomer () {
            wx.switchTab({
                url: '/pages/customer/main'
            });
        }
    },
    onShow () {
        this.getPhoneNum();
    },
    computed: {
        new_phone () {
            return this.$store.state.new_phone;
        }
    }
};
</script>

<style lang="css">
.fiexd {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
}
.manage-top {
    padding: 20px;
    position: relative;
    display: flex;
}

.user-btn {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* background-color: #ff0000; */

    opacity: 0;
}

.manage-image {
    width: 80px;
    height: 80px;
}
.manage-image img {
    width: 100%;
    height: 100%;
}

.manage-userinfo {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 30px;
}

.manage-list .aBtn {
    background-color: none;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    line-height: 40px;
    position: relative;
}
.aBtn-button {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 5000;
    opacity: 0;
}
.manage-list p {
    padding-left: 30px;
    flex: 1;
}
.manage-list .iconfont {
    color: #fea200;
}
.manage-list .icon-icon-arrow-right2 {
    font-size: 18px;
}
.manage-bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
}
.manage-bottom a {
    display: block;
    line-height: 50px;
    width: 100%;
    text-align: center;
    border-top: 1px solid #eee;
}
</style>
