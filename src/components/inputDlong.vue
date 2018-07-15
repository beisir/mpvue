<template lang="html">
    <div :class="['input-dlong', inputTost ? 'input-dlong-1' : '']">
        <div class="dlong-title">
            <input type="text" :focus="inputTost" v-model="iptVal" @focus="eventFocus" @input="enterInput" />
            <span class="input-close" @click="closeLong">取消</span>
        </div>
        <scroll-view class="dlong-scroll" :scroll-y="true">
            <ul>
                <li v-for="(dlongItem, dlongIndex) in dlongList"
                    @click="dlongText(dlongItem)"
                    :key="dlongItem.value">{{dlongItem.value}}</li>
            </ul>
        </scroll-view>
    </div>
</template>

<script>
import {util} from '../utils/config.js';
export default {
    props: {
        // ipnutTxt: {
        //     type: String,
        //     default: ''
        // },
        inputTost: {
            type: Boolean,
            default: false
        },
        dlongName: {
            type: String,
            default: ''
        },
        codeName: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            dlongList: [],
            iptVal: ''
        };
    },
    methods: {
        /**
         * input焦点聚焦时 清空输入框文字 和渲染内容
         */
        eventFocus () {
            this.dlongList = [];
            this.iptVal = '';
        },
        /**
         * 点击渲染内容列表 获取渲染对象
         * @param {object} val - 当前数据对象
         */
        dlongText (val) {
            let dlongName = this.dlongName;
            let codeName = this.codeName;
            this.$emit('dlongEvent', {
                val: val.value,
                dlongName: dlongName,
                codeName: codeName,
                code: val.data
            });
        },
        /**
         * 派发关闭弹框事件
         * @param {} null
         */
        closeLong () {
            this.$emit('closeEvent', false);
        },
        /**
         * 文字输入框事件
         * @param {e} 键盘输入框事件对象
         */
        enterInput (e) {
            // 获取当前输入文字
            let value = e.mp.detail.value;
            if (value !== '') {
                this.getData(value);
            };
        },
        async getData (options) {
            try {
                let result = await this.$ajax({
                    url: util.querySend,
                    method: 'POST',
                    data: {
                        standName: options
                    }
                }, true);
                this.dlongList = result.data.suggestions;
            } catch (e) {
                console.log(e);
            };
        }
    }
};
</script>

<style lang="css">
.input-dlong {
    position: fixed;
    width: 100%;
    height:100%;
    background: #fff;
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
    height: 55px;
    padding:0 10px;
    display: flex;
    align-items: center;

}
.dlong-title input {
    height: 30px;
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
    line-height: 40px;
    border-bottom: solid #888 1px;
}
.input-close {
    padding: 5px 10px;
    border:solid #888 1px;
    float: right;
    margin-left: 8px;
}
</style>
