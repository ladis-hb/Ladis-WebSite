<template>
  <div class="section">
    <div class="col-12">
      <div class="row">
        <div class="col-6 colsm-2">
          <ul>
            <li>
              <strong>{{ $t("section.gk11oe") }}</strong>
            </li>
            <li>
              <a href="/products/UPS电源">{{ $t("section.4t9bzs") }}</a>
            </li>
            <li>
              <a href="/products/数据中心">{{ $t("section.4r35dn") }}</a>
            </li>
            <li>
              <a href="/products/机房空调">{{ $t("section.f7h57b") }}</a>
            </li>
          </ul>
        </div>
        <div class="col-6 colsm-2">
          <ul>
            <li>
              <strong>{{ $t("section.q5vjss") }}</strong>
            </li>
            <li>
              <a href="/buy">{{ $t("section.ps0tuh") }}</a>
            </li>
            <li>
              <a href="/support/">{{ $t("section.y2a257") }}</a>
            </li>
            <li>
              <a href="/support/常见问题">{{ $t("section.o5n0th") }}</a>
            </li>
          </ul>
        </div>
        <div class="col-6 colsm-2">
          <ul>
            <li>
              <strong>{{ $t("section.21ws8d") }}</strong>
            </li>
            <li>
              <a href="/buy">{{ $t("section.u7wjbw") }}</a>
            </li>
            <li>
              <a href="https://lgsm.tmall.com/">{{ $t("section.6v39gj") }}</a>
            </li>
            <li>
              <a href="https://leidisi.tmall.com/" target="_bank">{{
                $t("section.k9mydj")
              }}</a>
            </li>
            <li>
              <a href="https://leidisi.tmall.com/" target="_bank">{{
                $t("section.pfuunc")
              }}</a>
            </li>
          </ul>
        </div>
        <div class="col-6 colsm-2">
          <ul>
            <li>
              <strong>{{ $t("section.567cgp") }}</strong>
            </li>
            <li>
              <a href="/about/">{{ $t("section.v0otza") }}</a>
            </li>
            <li>
              <a href="/news/">{{ $t("section.qis2vp") }}</a>
            </li>
          </ul>
        </div>
        <div class="col-6 colsm-2">
          <ul>
            <li>
              <strong>{{ $t("section.ri1giq") }}</strong>
            </li>
            <li>
              <a href="http://www.pesiv.com" target="_bank">{{
                $t("section.l7qkwb")
              }}</a>
            </li>
            <li>
              <a href="http://116.62.48.175:81" target="_bank">{{
                $t("section.wkyimq")
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ladis-section",
  data() {
    return {};
  }
};
</script>

<style scoped>
@media (min-width: 576px) {
  .colsm-2 {
    flex: 0 0 20%;
    max-width: 20%;
    height: fit-content;
  }
}

* {
  color: rgba(255, 255, 255, 0.5);
}
.section {
  height: min-content;
  width: 100%;
  background-color: #333;
  padding: 10px 25px;
}
.main {
  width: 100%;
}
.col-20 {
  width: 17%;
  border-right: ridge 1px;
  margin: 5px;
}
a:hover {
  color: white;
}
</style>
