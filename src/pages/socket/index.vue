<template>
    <div>
        <input type="text" name="" v-model="text" />
        <button type="button" @click="sendSocket">发送</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            text: ''
        };
    },
    created () {
        // wx.connectSocket({
        //     url: 'ws://10.158.33.180'
        // });
        // wx.onSocketOpen((options) => {
        //     console.log(options);
        // });
        // wx.onSocketError((res) => {
        //     console.log('WebSocket连接打开失败，请检查！');
        // });
        //
        // wx.onSocketMessage((data) => {
        //     console.log(data);
        // });
    },
    methods: {
        sendSocket () {
            // wx.sendSocketMessage({
            //     data: `{"msg":"${this.text}","id":2,"type":"msg"}`,
            //     success: (result) => {
            //         console.log(result);
            //     },
            //     fail (err) {
            //         console.log(err);
            //     }
            // });
        }
    }
};
</script>
