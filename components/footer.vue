<template>
  <div class="footer">
    <div class="footer1">
      <a href="/map/index.shtml">网站地图</a>
      <a href="/about/node_33.shtml">联系我们</a>
      <a href="/join/node_34.shtml">加入我们</a>
      <a href="/about/node_43.shtml">使用声明</a>
      <a href="/about/node_42.shtml">隐私政策</a>
    </div>

    <div class="footer2">
      <span>
        <em>© 2019 All Rights Reserved</em> 雷迪司
      </span>
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
