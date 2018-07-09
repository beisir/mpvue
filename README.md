# my-project

> A Mpvue project

## Build Setup

``` bash
## 注释代码 可能以后会用到
range.vue
html
<!-- 客户标签选择框 -->
<!-- <div class="range-fexid" v-if="scrolltost">
    <div class="fexid-content">
        <span class="close-btn" @click="scrolltost=false">X</span>
        <scroll-view :scroll-y="true" class="fexid-scroll">
            <ul class="fexid-list">
                <li
                    v-for="(optItem, optIndex) in optionalArr"
                    :class="optItem.flag ? 'list-cur' : ''"
                    :key="optItem.text"
                    @click="optionaSelect(optIndex)"
                    >{{optItem.text}}</li>
            </ul>
        </scroll-view>
        <div class="fexid-comfim">
            <span @click="optionAcomfim">确定</span>
        </div>
    </div>
</div> -->

data: {}
// optionalArr: [{flag: false,text: '我的就是'}], // 客户标签选择标签
// scrolltost: false, // 客户标签选择
// selectOptionl: '', // 渲染数组

methods:

/* 客户标签选择 */
/* optionaSelect (index) {
    let optionalArr = this.optionalArr;
    optionalArr[index].flag = !optionalArr[index].flag;
    this.optionalArr = optionalArr;
    // console.log(this.optionalArr);
    // this.optionAcomfim();
},
optionAcomfim () {
    let optionalArr = this.optionalArr;
    let selectOptionl = [];
    optionalArr.map(item => {
        if (item.flag) {
            selectOptionl.push(item.text);
        };
    });
    this.selectOptionl = selectOptionl.join('、');
    this.scrolltost = false;
}, */





```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
