<template>
  <b-col md="3" class="aside">
    <h3 class="bg-dark">产品分类</h3>
    <b-list-group v-for="(val,key) in list" :key="key">
      <b-list-group-item class="bg-dark head-a">
        <b-link :href="val.href">{{val.title}}</b-link>
      </b-list-group-item>
      <b-list-group-item v-for="(val1,key1) in val.args" :key="key1">
        <b-link :href="val1.href">{{val1.title}}</b-link>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
export default {
  name: "ladis-list",
  props: {
    list: {
      type: Array,
      default: [
        {
          title: "UPS电源",
          href: "/products/node_13.shtml",
          args: [{ title: "后备式UPS电源", href: "/products/node_81.shtml" }]
        }
      ]
    }
  }
};
</script>

<style scoped >
@media screen and (max-width: 768px) {
  .aside {
    display: none;
  }
}
.aside {
  padding: 2rem 1rem;
}
h3 {
  color: white;
  padding: 0.5rem;
  font-style: oblique;
  text-align: center;
}
.head-a a {
  color: white;
}
</style>


