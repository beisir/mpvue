<template lang="html">
    <div class="explain">
        <div class="range-text">
            <ul v-for="(explainItem, explainIndex) in explainList" :key="explainIndex">
                <li v-for="(item, index) in explainItem" :key="item">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['explainList']
};
</script>
<style media="screen">
    .range-text ul {
        margin-top: 10px;
    }
</style>
