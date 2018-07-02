<template lang="html">
    <div class="customer">
        <div class="customer-title">物畅网</div>
        <div class="customer-container">
            <div class="customer-tr">
                <div class="customer-name">王玉</div>
                <ul class="customer-list">
                    <li>电话：13031115726</li>
                    <li>QQ：1459341196</li>
                    <li>邮箱：hsy7426@163.com</li>
                </ul>
                <div class="customer-contacts"><a class="customer-link" href="">联系他</a></div>
            </div>
            <div class="customer-tr">
                <div class="customer-name">王玉</div>
                <ul class="customer-list">
                    <li>电话：13031115726</li>
                    <li>QQ：1459341196</li>
                    <li>邮箱：hsy7426@163.com</li>
                </ul>
                <div class="customer-contacts"><a class="customer-link" href="">联系他</a></div>
            </div>
            <div class="customer-tr">
                <div class="customer-name">王玉</div>
                <ul class="customer-list">
                    <li>电话：13031115726</li>
                    <li>QQ：1459341196</li>
                    <li>邮箱：hsy7426@163.com</li>
                </ul>
                <div class="customer-contacts"><a class="customer-link" href="">联系他</a></div>
            </div>
            <div class="customer-tr">
                <div class="customer-name">王玉</div>
                <ul class="customer-list">
                    <li>电话：13031115726</li>
                    <li>QQ：1459341196</li>
                    <li>邮箱：hsy7426@163.com</li>
                </ul>
                <div class="customer-contacts"><a class="customer-link" href="">联系他</a></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
