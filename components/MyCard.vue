<template>
<b-overlay :show="show" rounded="sm" class=" h-100">
  <b-card class="h-100">
    <b-card-header class="bg-dark text-light m-3">
      <b-button variant="link" @click="back" class=" text-decoration-none text-light p-0 m-0">返回 | </b-button>
      <span>{{title}}</span>
      <slot name="head"></slot>
    </b-card-header>
    <b-card-body  class=" overflow-auto mainVH py-5">
      <slot></slot>
    </b-card-body>
  </b-card>
</b-overlay>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title","load"],
  computed:{
    show(){
      return this.load
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
});
</script>
<style lang="scss" scoped>
.mainVH{
  height: calc(100vh - 147.77px) !important;
}
</style>