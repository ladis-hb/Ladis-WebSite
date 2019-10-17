<template>
  <div class="footer">
    <div class="footer1">
      <a href="/sitemap">{{ $t("footer.9c708c") }}</a>
      <a href="/about/联系我们">{{ $t("footer.fp5qvs") }}</a>
      <a href="/about/加入我们">{{ $t("footer.ce1e0h") }}</a>
      <a href="/about/使用声明">{{ $t("footer.amhzvr") }}</a>
      <a href="/about/隐私政策">{{ $t("footer.5d7lkm") }}</a>
    </div>

    <div class="footer2">
      <span> <em>© 2019 All Rights Reserved</em> 雷迪司 </span>
      <span>
        &nbsp; 浙
        <em>ICP</em>备
        <em>09040710号</em>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ladis-footer"
};
</script>

<style scoped>
* {
  color: white;
  font-size: small;
}
.footer {
  width: 100%;
  height: auto;
  background-color: #343a40;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  flex-wrap: wrap;
}

.footer-nav a {
  border-right: ridge 1px;
  padding: 0 10px;
}
.footer2 {
  margin-left: auto;
}
</style>
