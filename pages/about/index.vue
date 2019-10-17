<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="3">
        <b-list-group class=" my-4 text-light">
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('公司简介')"
            >{{ $t('index.b8tcvn') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('服务承诺')"
            >{{ $t('index.9rjbx5') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('经营理念')"
            >{{ $t('index.uqcwsg') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            :to="{ path: '/buy/' }"
            >{{ $t('index.974lfm') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            :to="{ path: '/buy/' }"
            >{{ $t('index.n747ex') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            :to="{ path: '/news/' }"
            >{{ $t('index.lbgpnd') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('加入我们')"
            >{{ $t('index.al7aii') }}</b-list-group-item
          >
          <b-list-group-item
            class=" bg-dark rounded-0  my-1 text-light"
            button
            @click="vrFilter('联系我们')"
            >{{ $t('index.cld4co') }}</b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" md="9">
        <div class=" pt-5 border-bottom">
          <h5>{{ title }}</h5>
        </div>
        <div class="p-5">
          <b-collapse
            v-for="el in this.bodys"
            :key="el._id"
            :id="el._id"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <p v-for="(val, key) in el.body" :key="key" style="text-indent:2em">
              {{ val }}
            </p>
            <b-img></b-img>
          </b-collapse>
        </div>
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
  async asyncData({ $axios }) {
    let bodys = await $axios.$get(`/api/Get_arg?table=About`);
    let bodyMap = new Map();

    bodys.forEach(Element => {
      bodyMap.set(Element.title, Element._id);
    });
    return { bodys, bodyMap };
  },
  methods: {
    vrFilter(title) {
      this.title = title;
      this.$root.$emit("bv::toggle::collapse", this.bodyMap.get(title));
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
