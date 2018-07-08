<template lang="html">
    <div :class="['input-dlong', inputTost ? 'input-dlong-1' : '']">
        <div class="dlong-title">
            <input type="text" focus="true" v-model="ipnutTxt" />
            <span class="input-close" @click="closeLong">取消</span>
        </div>
        <scroll-view class="dlong-scroll" :scroll-y="true">
            <ul>
                <li v-for="(dlongItem, dlongIndex) in dlongList"
                    @click="dlongText(dlongItem)"
                    :key="dlongItem">{{dlongItem}}</li>
            </ul>
        </scroll-view>
    </div>
</template>

<script>
export default {
    props: {
        ipnutTxt: {
            type: String,
            default: ''
        },
        inputTost: {
            type: Boolean,
            default: false
        },
        dlongName: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            dlongList: ['撒打算1', '撒打2算', '撒4打算', '撒5打算', '撒6打算']
        };
    },
    methods: {
        dlongText (val) {
            let dlongName = this.dlongName;
            this.$emit('dlongEvent', {
                val: val,
                dlongName: dlongName
            });
        },
        closeLong () {
            this.$emit('closeEvent', false);
        }
    }
};
</script>

<style lang="css">
.input-dlong {
    position: fixed;
    width: 100%;
    height:100%;
    background:rgba(255,255,255,1);
    z-index:500;
    left:0;
    top:0;
    transform: translate3d(0, 100%, 0);
    transition: transform .6s;
}
.input-dlong-1 {
    transform: translate3d(0, 0%, 0);


}
.dlong-title {
    height:40px;
    padding:0 10px;
    display: flex;
    align-items: center;

}
.dlong-title input {
    border: solid #888888 1px;
    width: 80%;
    padding-left: 10px;

}

.dlong-scroll {
    height: 100px;
    height: 550px;
}
.dlong-scroll ul {
    padding: 0 10px;
}
.dlong-scroll ul li {
    line-height: 30px;
    border-bottom: solid #888 1px;
}
.input-close {
    padding:3px 10px;
    border:solid #888 1px;
    float: right;
    margin-left: 8px;
}
</style>
