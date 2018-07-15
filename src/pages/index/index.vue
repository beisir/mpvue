<template lang="html">
    <div class="">
        <TrackingList :activeIndex="0" />
        <!-- <SementAlert /> -->
    </div>
</template>

<script>
import TrackingList from '../../components/TrackingList.vue';
import SementAlert from '../../components/sementAlert.vue';
export default {
    components: {
        TrackingList,
        SementAlert
    }
};
</script>
