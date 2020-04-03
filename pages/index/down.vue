<template>
  <b-card>
    <b-card-header class="bg-dark text-light m-3">
      <span>服务支持</span>
      <b-button class="float-right" size="sm" variant="primary" to="addDown">添加</b-button>
    </b-card-header>
    <b-card-body>
        <b-tabs>
            <b-tab title="下载" class=" text-dark"></b-tab>
            <b-tab title="问题"></b-tab>
        </b-tabs>

    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return{

        }
    }
})
</script>
<style lang="scss" scoped>
.nav-item>a{
    font-style: normal;
    color: black;
}
</style>