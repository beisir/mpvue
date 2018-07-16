<template lang="html">
    <div class="switch">
        <!-- <div class="switch-banner">
            <img src="" alt="">
        </div> -->
        <div class="switch-banner">
            <ul class="switch-ul">
                <li class="switch-li border">
                    <span class="sps">填写手机号</span>
                    <input type="text" v-model="phone" placeholder="填写手机号">
                    <span class="switch-code" v-if="isshow" @click="getCode">获取验证码</span>
                    <span class="switch-code" v-else>{{shengyu}}</span>
                </li>
                <li class="switch-li">
                    <span class="sps">验证码</span>
                    <input type="text" v-model="code" placeholder="输入验证码">
                </li>
            </ul>
            <button type="button" class="switch-btn" @click="switchSubmit">开始</button>
        </div>
    </div>
</template>

<script>
import {util} from '../../utils/config.js';
export default {
    data () {
        return {
            code: '',
            phone: '',
            isshow: true,
            shengyu: '60重新发送'
        }
    },
    methods: {
        async switchSubmit () {
            const _this = this;
            if (this.code.trim() !== '') {
                try {
                    let openid = await this.$UTIL.Login();
                    let data = await this.$ajax({
                        url: util.validatePhone,
                        data: {
                            openId: openid.openid,
                            phone_num: _this.phone,
    	                    checkCode: _this.code
                        }
                    });
                    wx.showToast({
                        title: data.msg,
                        icon: 'none'
                    });
                    // if (data.state === '200') {
                    //
                    // } else {
                    //
                    // }
                    console.log(data);
                } catch (e) {
                    console.log(e);
                };
            } else {
                wx.showToast({
                    title: '请输入验证码',
                    icon: 'none'
                });
            };
        },
        timerOut () {
            const _this = this;
            let count = 60;
            let timer = setInterval(function (){
                count--;
                if (count <= 0) {
                    clearInterval(timer);
                    _this.isshow = true;
                } else {
                    _this.shengyu = count + '重新发送';
                };
            }, 1000);
        },
        async getCode () {
            try {
                let phone = this.phone.trim();
                if (phone !== '') {
                    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if (reg.test(phone)) {
                        // let openid = await this.$UTIL.Login();
                        let data = await this.$ajax({
                            url: util.sendPhone,
                            data: {
                                phone_num: phone
                            }
                        });
                        if (data.state === '30') {
                            this.isshow = false;
                            this.timerOut();
                        };
                        wx.showToast({
                            title: data.msg,
                            icon: 'none'
                        });
                    } else {
                        wx.showToast({
                            title: '手机号码格式错误',
                            icon: 'none'
                        });
                    }
                } else {
                    wx.showToast({
                        title: '请填写手机号码',
                        icon: 'none'
                    });
                }
            } catch (e) {
                console.log(e);
            };
        }
    }
};
</script>

<style lang="css">
page {
    width: 100%;
    height: 100%;
}
.switch {
    width: 100%;
    height: 100%;
    background-color: #f0eff4;
}
.switch-ul {
    background-color: #fff;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
}
.switch-ul .switch-li {
    height: 50px;
    display: flex;
    align-items: center;
}
.switch-ul .border {
    border-bottom: 1px solid #ccc;
}
.switch-ul .switch-li .sps {
    width: 120px;
}

.switch-ul .switch-li .switch-code {
    width: 90px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #ccc;
}
.switch-btn {
    width: 96%;
    margin: 20px auto;
    background-color: #6df16d;
    color: #fff;
    border-color: #9fd99f;
}
</style>
