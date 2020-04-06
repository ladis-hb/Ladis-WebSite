<template>
  <div>
    <b-form-group label="页面标题:" label-align="right" label-cols="2">
      <b-form-input @input="Ctitle" v-model.trim="title" />
    </b-form-group>
    <b-form-group label="页面关键字:" label-align="right" label-cols="2">
      <b-form-textarea @input="Ckeywords" v-model="keywords" />
    </b-form-group>
    <b-form-group label="页面描述:" label-align="right" label-cols="2">
      <b-form-textarea @input="description" v-model="description" />
    </b-form-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    PageTitle: String,
    Pagekeywords: String,
    Pagedescription: String
  },
  data() {
    return {
      title: this.PageTitle,
      keywords: this.Pagekeywords,
      description: this.Pagedescription
    };
  },
  methods: {
    Ctitle() {
      this.$emit("update:PageTitle", this.title);
    },
    Ckeywords() {
      this.$emit("update:Pagekeywords", this.keywords);
    },
    Cdescription() {
      this.$emit("update:Pagedescription", this.description);
    }
  }
});
</script>