<template lang="html">
   <div class="">
       <TrackingList :activeIndex="1" />
       <official-account style="position:absolute;bottom:0;width:100%;height:200rpx;"></official-account>
   </div>
</template>

<script>
import TrackingList from '../../components/TrackingList';
export default {
    components: {
        TrackingList
    }
};
</script>
