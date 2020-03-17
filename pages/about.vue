<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12" md="3">
        <b-list-group class="my-4 text-light">
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about/公司简介"
            >{{ $t("index.b8tcvn") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about/服务承诺"
            >{{ $t("index.9rjbx5") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about/经营理念"
            >{{ $t("index.uqcwsg") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            v-if="localSite"
            href="/buy/"
            >{{ $t("index.974lfm") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            v-if="localSite"
            href="/buy/"
            >{{ $t("index.n747ex") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/news/"
            >{{ $t("index.lbgpnd") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about/加入我们"
            >{{ $t("index.al7aii") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about/联系我们"
            >{{ $t("index.cld4co") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about/使用声明"
            >{{ $t("footer.amhzvr") }}</b-list-group-item
          >
          <b-list-group-item
            class="bg-dark rounded-0 my-1 text-light"
            href="/about"
            >{{ $t("footer.5d7lkm") }}</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9" class=" p-5">
        <nuxt-child />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: `关于我们-雷迪司`
    };
  },
  computed: {
    localSite() {
      return this.$store.state.localSite;
    }
  }
};
</script>

<style lang="scss" scoped></style>
