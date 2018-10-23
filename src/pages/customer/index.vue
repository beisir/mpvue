<template lang="html">
	    <div class="customer">
	        <div class="customer-title">物畅网</div>
	        <div class="customer-container"
	            v-for="(phoneItem, phoneIndex) in phoneList"
	            :key="phoneItem.departName">
	            <div class="customer-tr"
	                v-for="(telItem, telIndex) in phoneItem.bos"
	                :key="telItem.qqNum">
	                <div class="customer-name">{{telItem.cuserName}}</div>
	                <ul class="customer-list">
	                    <li>电话：{{telItem.cuserPhone}}</li>
	                    <li>QQ：{{telItem.qqNum}}</li>
	                    <li>邮箱：{{telItem.wechatNum}}</li>
	                </ul>
	                <div class="customer-contacts">
	                    <a class="customer-link" @click="callTel(telItem.cuserPhone)">联系他</a>
	                </div>
	            </div>
	        </div>

           <official-account style="position:absolute;bottom:0;width:100%;height:200rpx;"></official-account>
	    </div>
</template>

<script>
import {util} from '../../utils/config.js';
export default {
    data () {
        return {
            phoneList: [],
            sdate:"",
            edate:"",
            length:0,
            param:{},
            temList:[],
            btln:true,
            pageSize:6
        };
    },
    methods: {
	    /**
	     * 点击查询事件 将当前分页清0
	     * @param {} null
	     */
	    slectChange () {
	        this.pageNo = 0;
	        this.phoneList = [];
	        this.scrollChange();
	    },
	    /**
	     * iscroll-view 滑动事件 触底事触发上拉加载
	     * @param {} null
	     */
	    scrollChange () {
	        this.pageNo = this.pageNo + 1;
	        this.submitAbroad(this.pageNo);
	    },
	    /**
	     * 组装数据进行渲染
	     * @param {number} pageNow - 当前分页
	     */
	    submitAbroad (pageNow) {
	        const _this = this;
            
	        let params = {
	            pageNow: pageNow
	        };
	        this.queryCustomers(params);
	    },
        callTel (tel) {
            wx.makePhoneCall({
                phoneNumber: tel
            });
        },
        /**
	     * 组装数据进行渲染
	     * @param {object} params - 请求数据参数
	     */
	    async queryCustomers (params) {
	            try {
	                let openid = await this.$UTIL.Login();
	                //let url = this.currentTab === 0 ? foreign.queryTraceHistroy : domestic.queryDomesticList;
	                let url = util.queryCustomers;
	                let reslutList = await this.$ajax({
	                    url: url,
	                    method: 'POST',
	                    data: Object.assign(this.param, params)
	                });
	                // console.log(reslutList);
	                if (reslutList&&reslutList.data&& reslutList.data.length !== 0&&reslutList.data[0]['bos']!=null) {
	                    this.phoneList = this.phoneList.concat(reslutList.data);
	                    this.temList = this.temList.concat(reslutList.data[0]['bos']);
                    	if(reslutList.msg){
                    	  this.length = parseInt(reslutList.msg);
                    	}
	                } else {
	                    wx.showToast({
	                        title: '暂无数据',
	                        icon: 'none'
	                    });
	                }
	            } catch (e) {
	                console.log(e);
	            };
	    },
    },
    onPullDownRefresh () {
        const _this = this;
        if(this.temList&&_this.length === this.temList.length){
        	_this.edate = new Date();
            _this.pageNo = 1;
            _this.param = {pageSize:_this.pageSize,beginDate:_this.sdate,endDate:_this.edate};
        }else{
        	_this.param = {pageSize:_this.pageSize};
        	_this.pageNo = _this.pageNo + 1;
        	if(_this.temList&&_this.length === _this.temList.length){
                           _this.sdate = _this.edate;
            }
        }
        _this.submitAbroad(_this.pageNo);
    },
    onShow () {                           //监听页面显示
    	const _this = this;
    	_this.param = {pageSize:_this.pageSize};
    	_this.sdate = new Date();
    	_this.slectChange();
    	_this.temList = [];
//      const _this = this;
//      let url = util.queryCustomers;
//      this.$ajax({url}).then(res => {
//          console.log(res);
//          _this.phoneList = res.data;
//      });
    }
};
</script>

<style lang="css">
/* .follow-btn {
    width: 100px;
    position: absolute;
    background-color: #fea200;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    left: 50%;
    margin-left: -50px;
    bottom: 30px;
    border-radius: 3px;

} */
.customer-title {
    padding-left: 15px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color: #fea202;
}
.customer-title::before {
    content: "";
    width: 3px;
    height: 18px;
    margin-right: 10px;
    background-color: #fea202;
}
.customer-container {
    font-size: 12px;

}

.customer-tr {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 10px 0;
    border-top: 1px #f2f1f1 dashed;
}
.customer-tr:last-child {
    border-bottom: 1px #f2f1f1 dashed;
}

.customer-name {
    flex: 1;
    text-align: center;
}

.customer-list {
    flex: 3;
    padding-left: 20px;
    border-left: 1px #f2f1f1 dashed;
    border-right: 1px #f2f1f1 dashed;
}
.customer-list li {
    line-height: 20px;
}

.customer-contacts {
    flex: 1;
}

.customer-link {
    font-size: 12px;
    color: #ffffff;
    width: 40px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 3px;
    background-color: #fea202;
    text-align: center;
}
</style>
