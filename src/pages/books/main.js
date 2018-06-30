import Vue from 'vue';
import Book from './index';

const app = new Vue(Book);
app.$mount();
export default {
    config: {
        navigationBarTitleText: '书籍列表'
    }
};
