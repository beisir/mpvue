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
                @getuserinfo="userInfoHandler">
            </button>
        </div>
        <div class="manage-list">
            <a class="aBtn" v-for="(pageItem, index) in pageList" :key="pageItem.title">
                <span :class="['icon iconfont', pageItem.icon]"></span>
                <p>{{pageItem.title}}</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
                <button v-if="userBtn"
                    :data-index="index"
                    class="aBtn-button"
                    open-type="getUserInfo"
                    @getuserinfo="userInfoHandler">
                </button>
                <button class="aBtn-button" type="button" v-else @click="goPage(index)"></button>
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
                    title: '我的踪迹',
                    path: '/pages/trahistory/main?active=0',
                    icon: 'icon-icon--'
                },
                {
                    title: '我的账户',
                    path: '/pages/myaccount/main',
                    icon: 'icon-zhanghuxinxi'
                }
            ],
            userBtn: true,
            userInfo: {
                nickName: '点击授权',
                avatarUrl: manage.avatarUrl
            }
        };
    },
    methods: {
        // 获取手机号
        async getPhoneNum () {
            const _this = this;
            try {
                let openid = await this.$UTIL.Login();
                let data = await this.$ajax({
                    url: util.queryAccount,
                    data: {
                        openId: openid.openid
                    }
                });
                if (data.state === '20') {
                    if (!data.data.userName) {
                        _this.userInfo = {
                            nickName: '点击授权',
                            avatarUrl: manage.avatarUrl
                        };
                        _this.userBtn = true;
                    } else {
                        this.$UTIL.AuthorIzation().then(result => {
                            _this.userInfo = result;
                            _this.userBtn = false;
                        });
                    };
                    _this.$store.commit('new_phone', data.data.phone_num);
                } else {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none'
                    });
                };
            } catch (e) {
                console.log(e);
            };
        },
        async saveUserInfo (userInfo, index) {
            // console.log(this.userBtn);
            try {
                let openid = await this.$UTIL.Login();
                let options = await this.$ajax({
                    url: util.grantWXInfor,
                    method: 'POST',
                    data: {
                        openId: openid.openid,
                        wx_name: userInfo.nickName, // 微信昵称
                        wx_head: userInfo.avatarUrl // 微信头像
                    }
                });
                this.goPage(index);
                if (options.state === '200') {
                    if (index !== undefined) {
                        this.userInfo = userInfo;
                        this.userBtn = false;
                        this.goPage(index);
                    };
                } else {
                    this.userBtn = true;
                    this.userInfo = {
                        nickName: '点击授权',
                        avatarUrl: manage.avatarUrl
                    };
                };
                wx.showToast({
                    title: options.msg,
                    icon: 'none'
                });
            } catch (e) {
                console.log(e);
            };
        },
        async userInfoHandler (e) {
            try {
                let userInfo = await this.$UTIL.AuthorIzation(e);
                console.log(userInfo)
                let index = e.mp.currentTarget.dataset.index;
                this.saveUserInfo(userInfo, index);

            } catch (err) {
                console.log(err);
            };
        },
        toggerCustomer () {
            wx.switchTab({
                url: '/pages/customer/main'
            });
        },
        goPage (index) {
            let pageList = this.pageList;
            wx.navigateTo({
                url: pageList[index].path
            });
        }
    },
    computed: {
        new_phone () {
            return this.$store.state.new_phone;
        }
    },
    onLoad () {
        const _this = this;

        this.getPhoneNum();
    }
};
</script>

<style lang="css">
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
