<template lang="html">
    <div class="manage">
        <div class="manage-top">
            <div class="manage-image">
                <img :src="userInfo.avatarUrl" />
            </div>
            <div class="manage-userinfo">
                <div class="manage-name">{{userInfo.nickName}}</div>
                <div class="manage-phone">联系电话：{{phone_num}}</div>
            </div>
            <button
                class="user-btn"
                open-type="getUserInfo"
                @getuserinfo="userInfoHandler">
            </button>
        </div>
        <div class="manage-list">
            <a href="/pages/personinfo/main">
                <span class="icon iconfont icon-wode-"></span>
                <p>个人信息</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
            </a>
            <a href="/pages/trahistory/main?active=0">
                <span class="icon iconfont icon-icon--"></span>
                <p>我的踪迹</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
            </a>
            <a href="/pages/myaccount/main">
                <span class="icon iconfont icon-zhanghuxinxi"></span>
                <p>我的账户</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
            </a>
            <a href="/pages/customer/main">
                <span class="icon iconfont icon-msnui-telephone"></span>
                <p>客服中心</p>
                <span class="icon iconfont icon-icon-arrow-right2"></span>
            </a>
        </div>
    </div>
</template>

<script>
import {manage} from '../../utils/data.js';
export default {
    data () {
        return {
            userBtn: true,
            userInfo: {
                nickName: '点击授权',
                avatarUrl: manage.avatarUrl
            }
        };
    },
    methods: {
        async userInfoHandler (e) {
            try {
                let userInfo = await this.$UTIL.AuthorIzation(e);
                this.userInfo = userInfo;
                this.userBtn = false;
            } catch (err) {
                console.log(err);
            };
        }
    },
    computed: {
        phone_num () {
            return this.$store.state.phone_num;
        }
    },
    created () {
        const _this = this;
        this.$UTIL.AuthorIzation().then(result => {
            _this.userInfo = result;
            _this.userBtn = false;
        });
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

.manage-list a {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    line-height: 40px;
    border-bottom: 1px #f2f1f1 dashed;
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

</style>
