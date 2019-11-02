<template>
    <div>
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
        <keep-alive>
            <Comp :radio="radio"></Comp>
        </keep-alive>
        <button @click="aboutHandle()">about</button>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    name:'Test',
    data() {
        return {
            radio: '1'
        };
    },
    computed: {},
    created() {},
    mounted() {
        let userInfo = {
            name: '111',
            personcard: '222',
            mobile: '333'
        };
        this.userInfo(userInfo);
        // this.$httpServer.post('/url',{data:111});
    },
    methods: {
        ...mapActions(['getUserInfo']),
        ...mapMutations(['userInfo']),
        aboutHandle(){
            this.$router.push('/about');
        }
    }
};
</script>
<style lang="scss" scoped>

</style>