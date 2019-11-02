<template>
    <div>Third组件</div>
</template>
<script>
export default {
    name: 'Third',
    data() {
        return {
        };
    },
    activated() {
        console.log('触发Third---keep-alive');
    },
    created() {
        console.log('created----Third');
    }
};
</script>