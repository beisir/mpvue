<template lang="html">
    <div class="personinfo">
        <ul class="personinfo-container">
            <li>
                <span>姓名</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的姓名" placeholder-class="input" />
                </div>
            </li>
            <li>
                <span>电话</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的手机号码" placeholder-class="input" />
                </div>
            </li>
            <li>
                <span>验证码</span>
                <div class="personinfo-input personinfo-code">
                    <input type="text" placeholder="请输入验证码" placeholder-class="input" />
                    <span>获取验证码</span>
                </div>
            </li>
            <li>
                <span>QQ号</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的QQ号" placeholder-class="input" />
                </div>
            </li>
            <li>
                <span>微信号</span>
                <div class="personinfo-input">
                    <input type="text" placeholder="请输入您的微信号" placeholder-class="input" />
                </div>
            </li>
        </ul>
        <div class="personinfo-submit">
            <span>保存</span>
        </div>
    </div>

</template>

<script>
export default {
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
