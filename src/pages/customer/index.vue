<template lang="html">
    <div class="customer">
        <div class="customer-title">物畅网</div>
        <div class="customer-container"
            v-for="(phoneItem, phoneIndex) in phoneList"
            :key="phoneItem.departName">
            <div class="customer-tr"
                v-for="(telItem, telIndex) in phoneItem.bos"
                :key="telItem.qqNum">
                <div class="customer-name">{{telItem.cuserName}}</div>
                <ul class="customer-list">
                    <li>电话：{{telItem.cuserPhone}}</li>
                    <li>QQ：{{telItem.qqNum}}</li>
                    <li>邮箱：{{telItem.wechatNum}}</li>
                </ul>
                <div class="customer-contacts">
                    <a class="customer-link" @click="callTel(telItem.cuserPhone)">联系他</a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {util} from '../../utils/config.js';
export default {
    data () {
        return {
            phoneList: []
        };
    },
    methods: {
        callTel (tel) {
            console.log(tel);
            wx.makePhoneCall({
                phoneNumber: tel
            });
        }
    },
    onLoad () {
        const _this = this;
        let url = util.queryCustomers;
        this.$ajax({url}).then(res => {
            console.log(res);
            _this.phoneList = res.data;
        });
    }
};
</script>

<style lang="css">
.customer-title {
    padding-left: 15px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: #fea202;
}
.customer-title::before {
    content: "";
    width: 3px;
    height: 18px;
    margin-right: 10px;
    background-color: #fea202;
}
.customer-container {
    font-size: 12px;

}

.customer-tr {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 10px 0;
    border-top: 1px #f2f1f1 dashed;
}
.customer-tr:last-child {
    border-bottom: 1px #f2f1f1 dashed;
}

.customer-name {
    flex: 1;
    text-align: center;
}

.customer-list {
    flex: 3;
    padding-left: 20px;
    border-left: 1px #f2f1f1 dashed;
    border-right: 1px #f2f1f1 dashed;
}
.customer-list li {
    line-height: 20px;
}

.customer-contacts {
    flex: 1;
}

.customer-link {
    font-size: 12px;
    color: #ffffff;
    width: 40px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 3px;
    background-color: #fea202;
    text-align: center;
}
</style>
