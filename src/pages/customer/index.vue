<template lang="html">
    <div class="customer">
        <div class="customer-title">物畅网</div>
        <div class="customer-container">
            <div class="customer-tr"
                v-for="(telItem, telIndex) in phoneList"
                :key="telItem.name">
                <div class="customer-name">{{telItem.name}}</div>
                <ul class="customer-list">
                    <li>电话：{{telItem.tel}}</li>
                    <li>QQ：{{telItem.QQ}}</li>
                    <li>邮箱：{{telItem.email}}</li>
                </ul>
                <div class="customer-contacts">
                    <a class="customer-link" @click="callTel(telItem.tel)">联系他</a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            phoneList: [
                {
                    name: '王玉',
                    tel: '13031115726',
                    QQ: 1459341196,
                    email: 'hsy7426@163.com'
                },
                {
                    name: '王玉',
                    tel: '13031115726',
                    QQ: 1459341196,
                    email: 'hsy7426@163.com'
                },
                {
                    name: '王玉',
                    tel: '13031115726',
                    QQ: 1459341196,
                    email: 'hsy7426@163.com'
                },
                {
                    name: '王玉',
                    tel: '13031115726',
                    QQ: 1459341196,
                    email: 'hsy7426@163.com'
                }
            ]
        };
    },
    methods: {
        callTel (tel) {
            console.log(tel);
            wx.makePhoneCall({
                phoneNumber: tel
            });
        }
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
