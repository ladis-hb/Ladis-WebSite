<template>
  <div class=" bg-dark p-2 d-flex flex-row flex-wrap">
    <b-link href="/sitemap">{{ $t("footer.9c708c") }}</b-link>
    <b-link href="/about/联系我们">{{ $t("footer.fp5qvs") }}</b-link>
    <b-link href="/about/加入我们">{{ $t("footer.ce1e0h") }}</b-link>
    <b-link href="/about/使用声明">{{ $t("footer.amhzvr") }}</b-link>
    <b-link href="/about/隐私政策">{{ $t("footer.5d7lkm") }}</b-link>
    <span class=" ml-auto">
      <span> <em>© 2019 All Rights Reserved</em> 雷迪司 </span>
      <span>
        &nbsp; 浙
        <em>ICP</em>备
        <em>09040710号</em>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "ladis-footer"
};
</script>

<style scoped>
em,
span,
a {
  color: aliceblue;
}
</style>
