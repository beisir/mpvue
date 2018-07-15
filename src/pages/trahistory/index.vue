<template lang="html">
    <div class="trahistory">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn" />
            <swiper style="height: 550px;"
                :current="currentTab"
                @change="changeEvent">
                <swiper-item>
                    <selectFile :currentTab="currentTab" />
                </swiper-item>
                <swiper-item>
                    <selectFile2 :currentTab="currentTab" />
                </swiper-item>
            </swiper>

    </div>
</template>

<script>

import titleBar from '../../components/titleBar.vue';
import selectFile from '../../components/selectFile.vue';
import selectFile2 from '../../components/selectFile2.vue';
export default {
    props: ['active'],
    data () {
        return {
            currentTab: 0,
            titleList: [
                {
                    key: 'detail',
                    text: '国外运踪历史记录'
                },
                {
                    key: 'news',
                    text: '国内运踪历史记录'
                }
            ]
        };
    },
    methods: {
        toogerFn (index) {
            this.currentTab = index;
        },
        changeEvent (e) {
            this.currentTab = e.mp.detail.current;
        }
    },
    onLoad () {
        this.currentTab = this.active;
    },
    components: {
        titleBar,
        selectFile,
        selectFile2
    }
};
</script>

<style lang="css">
.tra-container {
    padding: 5px 15px;
    border-bottom: solid 1px #e8e8e8;
}
.tra-time {
    display: flex;
    align-items: center;
    height: 45px;
    justify-content:center;

}
.tra-time .tra-left {
    margin-left: 15px;
    margin-right: 40px;
    position: relative;
}
.tra-line::after {
    content: '';
    width: 20px;
    height: 2px;
    right: -30px;
    top: 50%;
    position: absolute;
    background-color: #000000;
}

.tra-input {
    width: 115px;
    position: relative;
}
.tra-input .valid-picker {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 200;
}
.tra-input input {
    font-size: 12px;
    border: #e8e8e8 1px solid;
    padding-left: 10px;
}
.tra-input .tra-btn {
    padding: 3px 15px;
    background: #4aa0e6;
    color: #ffffff;
    border-radius: 3px;
    margin-left: 20px;

}

.tra-detail {
}
.tra-detail li {
    padding: 5px 10px;
    border-bottom: 1px solid rgb(242, 240, 242);
}
.tra-detail li p, .tra-date {
    font-size: 12px;
    color: #4c4c4d;
}
.tra-pls a {
    font-size: 12px;
    color: #0076ff;
}
.tra-pls {
    height: 40px;
    line-height: 40px;
}
.tra-pls span {
    float: left;
    color: #fea202;
}
.tra-pls a {
    float: right;
}
</style>
