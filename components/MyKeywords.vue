<template>
  <div>
    <b-form-group label="页面标题:" label-align="right" label-cols="2">
      <b-form-input @input="Ctitle" v-model.trim="PageTitle" />
    </b-form-group>
    <b-form-group label="页面关键字:" label-align="right" label-cols="2">
      <b-form-textarea @input="Ckeywords" v-model="Pagekeywords" />
    </b-form-group>
    <b-form-group label="页面描述:" label-align="right" label-cols="2">
      <b-form-textarea @input="Cdescription" v-model="Pagedescription" />
    </b-form-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    keywords: String,
    description: String
  },
  data() {
    return {
      daPageTitle: "",
      daPagekeywords: "",
      daPagedescription: ""
    };
  },
  computed: {
    PageTitle: {
      get() {
        return (this as any).title;
      },
      set(val) {
        (this as any).daPageTitle = val;
      }
    },
    Pagekeywords: {
      get() {
        return (this as any).keywords;
      },
      set(val) {
        (this as any).daPagekeywords = val;
      }
    },
    Pagedescription: {
      get() {
        return (this as any).description;
      },
      set(val) {
        (this as any).daPagedescription = val;
      }
    }
  },
  methods: {
    Ctitle() {
      this.$emit("update:title", this.$data.daPageTitle);
    },
    Ckeywords() {
      this.$emit("update:keywords", this.$data.daPagekeywords);
    },
    Cdescription() {
      this.$emit("update:description", this.$data.daPagedescription);
    }
  }
});
</script>