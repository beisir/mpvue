<template lang="html">
    <div class="manage">
        <div class="manage-top">
            <div class="manage-image"><img src="https://pro.modao.cc/uploads3/images/1876/18764020/raw_1523341889.jpeg" /> </div>
            <div class="manage-userinfo">
                <div class="manage-name">王玉</div>
                <div class="manage-phone">联系电话：13031115726</div>
            </div>
        </div>
        <ul class="manage-list">
            <li>
                <span class="icon iconfont icon-27"></span>
                <p>个人信息</p>
                <span class="icon iconfont icon-27"></span>
            </li>
            <li>
                <span class="icon iconfont icon-27"></span>
                <p>我的踪迹</p>
                <span class="icon iconfont icon-27"></span>
            </li>
            <li>
                <span class="icon iconfont icon-27"></span>
                <p>我的账户</p>
                <span class="icon iconfont icon-27"></span>
            </li>
            <li>
                <span class="icon iconfont icon-27"></span>
                <p>客服中心</p>
                <span class="icon iconfont icon-27"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="css">
.manage-top {
    padding: 20px;
    display: flex;
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

.manage-list li {
    padding: 0 20px;
    display: flex;
    line-height: 40px;
    border-bottom: 1px #f2f1f1 dashed;
}
.manage-list li p {
    padding-left: 30px;
    flex: 1;
}


</style>
