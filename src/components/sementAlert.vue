<template lang="html">
    <div class="sementAlert">
        <div class="sementAlert-content">
            <img class="sementAlert-banner"
                src="https://style.org.hc360.com/images/cpk/bImg1.png" />
            <div class="sementAlert-contaienr">
                <h3>{{'很 sad 将阿克索德教练卡睡觉了'}}</h3>
                <p>大家好才是你自己嗲激动啊睡觉滴哦啊睡觉滴哦啊睡觉滴哦啊睡觉的</p>
            </div>
            <div class="sementAlert-button">
                <a href="" class="cancel">取消</a>
                <a href="" class="confim">强制体验</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="css">
    .sementAlert {
        position: fixed;
        width: 100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        z-index:500;
        left:0;
        top:0;
        display: flex;
        justify-content: center;
        align-items:center;
    }
    .sementAlert-content {
        height: 300px;
        width: 70%;
        margin: 50px auto;
        background-color: #ffffff;
        border-radius: 5px;
        position: relative;
    }
    .sementAlert-banner {
        width:100%;
        height:100px;
    }
    .sementAlert-contaienr {
        padding: 0 15px;
        text-align: center;
    }
    .sementAlert-contaienr h3 {
        font-weight: bold;
        padding: 25px 0;
    }
    .sementAlert-contaienr p {
        font-size: 12px;
        line-height: 20px;
    }
    .sementAlert-button {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
    }
    .sementAlert-button a {
        width: 45%;
        line-height: 35px;
        text-align: center;
        border-radius: 3px;
    }
    .sementAlert-button .cancel {
        background-color: #ccc;
    }
    .sementAlert-button .confim {
        background-color: rgb(76, 85, 91);
        color: #fff;
    }
</style>
