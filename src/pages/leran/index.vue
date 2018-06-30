<template>
    <div>
        <p class="contaienr-ps">{{name}}</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: 'hello word'
        };
    },
    methods: {
        // async getDataList () {
        //     const prodbycat = await this.$ajax({
        //         url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/prodbycat'
        //     });
        //     const product = await this.$ajax({
        //         url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/product'
        //     });
        //     const project = await this.$ajax({
        //         url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/project'
        //     });
        //     const search = await this.$ajax({
        //         url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/search'
        //     });
        //     return {
        //         prodbycat: prodbycat,
        //         product: product,
        //         project: project,
        //         search: search
        //     };
        // }
        * getDataList () {
            yield this.$ajax({
                url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/prodbycat'
            });
            // yield this.$ajax({
            //     url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/product'
            // });
            // yield this.$ajax({
            //     url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/project'
            // });
            // let search = yield this.$ajax({
            //     url: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/search'
            // });
            // return search;
        }
    },
    created () {
        this.getDataList();
    }
};
</script>
<style media="screen">

</style>
