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
        text: "Home",
        href: "/"
      });
      routers.forEach(r => {
        rout += "/" + r;
        item.push({ text: r, href: rout });
      });
      console.log(item);

      return item;
    }
  }
};
</script>

<style lang="scss" scoped></style>
