<template lang="html">
    <div class="lmmed">
        <div class="range-title">
            <span class="icon iconfont icon-27"></span>
            <p class="range-head">国内即时运踪</p>
        </div>
        <div class="lmmed-form">
            <div class="range-valid">
                <ul>
                    <li>
                        <div class="valid-box">
                            <div class="valid-left">车皮/集装箱号</div>
                            <div class="valid-input"><input placeholder="TKRU4096807" placeholder-class="input" /></div>
                            <div class="valid-btn">效验</div>
                        </div>
                        <div class="valid-prompt">示例：集装箱号：TKRU4096807  车皮号：44472058</div>
                    </li>
                </ul>
            </div>
            <button type="button" class="valid-confim">提交查询</button>       
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="css">
.lmmed .range-title {
    color: #449fbd;
    border-bottom: 0;
}
.lmmed-form {

}
</style>
