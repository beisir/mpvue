<template lang="html">
    <div class="sementAlert" v-if="isShow">
        <div class="sementAlert-content sementAlert-animate" @click="closeDlong">
            <img class="sementAlert-banner"
                src="https://wuchangwang.cn/vendorDoc/whd/0/activ.jpg" />
            <div class="sementAlert-button">
                <!-- <button type="button" @click="closeDlong">确定</button> -->
                <button type="button" open-type="share">分享</button>
            </div>
            <span class="close-btn" @click="closeDlong">X</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isShow'],
    methods: {
        closeDlong () {
            this.$emit('closeAlert', false);
        }
    }
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
        /* height: 300px; */
        width: 70%;
        margin: 50px auto;
        /* background-color: #ffffff; */
        border-radius: 5px;
        position: relative;
    }
    .close-btn {
       width: 25px;
       line-height: 25px;
       text-align: center;
       color: #fff;
       background-color: rgba(0,0,0,0.8);
       border-radius: 50%;
       position: absolute;
       top: 0px;
       right: 0px;
    }
    .sementAlert-banner {
        width:100%;
        /* height:100px; */
    }
    .sementAlert-animate {
        animation: identifier .6s;
    }
    @keyframes identifier {
        from {
            transform: translate3d(0, -500px, 0);
        } to {
            transform: translate3d(0, 0, 0);
        }

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
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-around;
        /* padding: 15px; */
        /* margin-top: -30px; */
    }
    .sementAlert-button button {
        font-size: 14px;
        display: block;
        width: 30%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #f00;
        border-radius: 3px;
        color: #fff;
    }
    /* .sementAlert-button .cancel {
        background-color: #ccc;
    }
    .sementAlert-button .confim {
        background-color: rgb(76, 85, 91);
        color: #fff;
    } */
</style>
