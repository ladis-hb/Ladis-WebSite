<template>
  <div>
    <div class="pt-5 border-bottom">
      <h5>{{ bodys.title }}</h5>
    </div>
    <div class="p-5">
      <p v-for="(val, key) in bodys.body" :key="key" style="text-indent:2em">{{ val }}</p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let bodys = await $axios.$get(`/api/Get_arg`, {
      params: { table: "About", title: params.id }
    });
    return { bodys };
  }
};
</script>

<style>
</style>