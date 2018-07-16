<template lang="html">
    <div class="personinfo">
        <ul class="personinfo-container">
            <li>
                <span>姓名</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的姓名" v-model="personinfo.real_name" placeholder-class="input" />
                </div>
            </li>
            <li>
                <span>QQ号</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的QQ号" v-model="personinfo.qq_num" placeholder-class="input" />
                </div>
            </li>
            <li>
                <span>微信号</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的微信号" v-model="personinfo.wechat_num" placeholder-class="input" />
                </div>
            </li>
        </ul>
        <div class="personinfo-submit">
            <span @click="savePersoninfo">保存</span>
        </div>
    </div>

</template>

<script>
import {util} from '../../utils/config.js';
export default {
    data () {
        return {
            personinfo: {
    			phone_num: '',                //用户手机号
    			email: '',               //用户邮箱
    			qq_num: '',                     //QQ号
    			wechat_num: '',                      //微信号
    			real_name: '',                     //用户姓名
    			user_img: ''
            }
        };
    },
    methods: {
        savePersoninfo () {
            let personinfo = this.personinfo;
            let text = '';
            if (personinfo.qq_num.trim() === '') {
                text = '请填写QQ号';
            } else if (personinfo.wechat_num.trim() === '') {
                text = '请填写微信号';
            } else if (personinfo.real_name.trim() === '') {
                text = '请填写用户姓名';
            };
            if (text.length) {
                wx.showToast({
                    title: text,
                    icon: 'none'
                });
            } else {
                this.sendPersoninfo({
        			qq_num: personinfo.qq_num, // QQ号
        			wechat_num: personinfo.wechat_num, // 微信号
        			real_name: personinfo.wechat_num // 用户姓名
                });
            };
        },
        async sendPersoninfo (params) {
            try {
                let openid = await this.$UTIL.Login();
                let options = await this.$ajax({
                    url: util.updateAccount,
                    method: 'POST',
                    data: Object.assign({
                        openId: openid.openid
                    }, params)
                });
                wx.showToast({
                    title: options.msg,
                    icon: 'none'
                });
            } catch (e) {
                console.log(e);
            };

        },
        async getQueryAccount () {
            try {
                let openid = await this.$UTIL.Login();
                let result = await this.$ajax({
                    url: util.queryAccount,
                    data: {
                        openId: openid.openid
                    }
                });
                if (result && result.data){
                    if (result.state === '20') {
                        this.personinfo.phone_num = result.data.phone_num;
                        this.personinfo.qq_num = result.data.qq_num;
                        this.personinfo.wechat_num = result.data.wechat_num;
                        this.personinfo.real_name = result.data.real_name;
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: 'none'
                        });
                    };
                };
            } catch (e) {
                console.log(e);
            };
        }
    },
    onLoad () {
        this.getQueryAccount();
    }
};
</script>

<style lang="css">
.personinfo-container {
    padding: 30px;
}
.personinfo-container li {
    height: 50px;
    display: flex;
    align-items: center;
}

.personinfo-container span {
    flex: 1;
}

.personinfo-input {
    flex: 3;
}
.personinfo-input input {
    border: solid 1px #f2f1f1;
    height: 30px;
    padding: 0 10px;

}
.personinfo-code input{
    width: 115px;
    float: left;
}
.personinfo-code span{
    font-size: 12px;
    color: #ffffff;
    float: right;
    background-color: #4aa0e6;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border-radius: 3px;
}

.personinfo-submit {
    text-align: center;
}

.personinfo-submit span{
    color: #ffffff;
    padding: 8px 20px;
    background-color: #fea202;
    border-radius: 3px;
}
</style>
