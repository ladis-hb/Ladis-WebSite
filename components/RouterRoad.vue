<template>
  <b-breadcrumb :items="item" class=" bg-light"></b-breadcrumb>
</template>

<script>
export default {
  name: "RouterRoad",
  computed: {
    item() {
      let routers = this.$route.path.split("/");
      routers.shift();
      let item = [];
      let rout = "";
      item.push({
        text: "主页",
        href: "/"
      });
      routers.forEach(r => {
        if(r == "en") return
        rout += "/" + (r == "productsList" ? "products" : r);
        item.push({ text: r == "productsList" ? "所有产品" : r, href: rout });
      });
      return item;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-item {
  a {
    color: black;
  }
}
</style>
