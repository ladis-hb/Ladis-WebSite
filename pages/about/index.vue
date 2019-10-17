<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="3">
        <b-list-group class="my-4 text-light">
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('公司简介')"
          >{{ $t("index.b8tcvn") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('服务承诺')"
          >{{ $t("index.9rjbx5") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('经营理念')"
          >{{ $t("index.uqcwsg") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            :to="{ path: '/buy/' }"
          >{{ $t("index.974lfm") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            :to="{ path: '/buy/' }"
          >{{ $t("index.n747ex") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            :to="{ path: '/news/' }"
          >{{ $t("index.lbgpnd") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('加入我们')"
          >{{ $t("index.al7aii") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('联系我们')"
          >{{ $t("index.cld4co") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('使用声明')"
          >{{ $t("footer.amhzvr") }}</b-list-group-item>
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            button
            @click="vrFilter('隐私政策')"
          >{{ $t("footer.5d7lkm") }}</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9">
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      title: "公司简介"
    };
  },

  methods: {
    vrFilter(title) {
      this.title = title;
      this.$router.push({ path: `/about/${title}` });
      //this.$root.$emit("bv::toggle::collapse", this.bodyMap.get(title));
    }
  },

  head() {
    return {
      title: `${this.title}-雷迪司`
    };
  }
};
</script>

<style lang="scss" scoped></style>
