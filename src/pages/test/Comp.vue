<template>
    <div>全局组件
        <div>{{temp}}</div>
        <Third></Third>
    </div>
</template>
<script>
export default {
    name: 'Comp', 
    data(){
        return{
            temp : this.radio
        };
    },
    activated() {
        console.log('触发keep-alive');
    },
    created() {
        console.log('created----123');
    }
};
</script>