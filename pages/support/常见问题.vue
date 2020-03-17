<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12" md="4">
        <b-list-group class="asid">
          <b-list-group-item variant="info">{{
            $t("常见问题.w5qbf8")
          }}</b-list-group-item>
          <b-list-group-item v-for="(val, key) in support_asid" :key="key">
            <b-button pill size="sm" v-b-toggle="'asid' + key" variant="link"
              >+</b-button
            >
            <b-button @click="slic(val.title)" variant="link">{{
              val.title
            }}</b-button>
            <b-collapse
              :id="'asid' + key"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <ul>
                <li v-for="(v1, k1) in val.child" :key="k1">
                  <b-button @click="slic(v1.title)" variant="link">{{
                    v1.title
                  }}</b-button>
                </li>
              </ul>
            </b-collapse>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" md="8">
        <b-list-group id="support_list" class="list-group1">
          <b-list-group-item variant="dark"></b-list-group-item>
          <b-list-group-item
            v-for="(val, key) in support_list.slice(
              currentPage * 10 - 10,
              currentPage * 10
            )"
            :key="key"
          >
            <b-link :to="{ path: val.href }">{{ val.title }}</b-link>
          </b-list-group-item>
        </b-list-group>

        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="support_list.length"
          aria-controls="support_list"
          class="d-flex justify-content-center"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GeneralGetInfo } from "../../api/axios";
export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      support_list: []
    };
  },

  async asyncData({ $axios }) {
    const support_asid = await GeneralGetInfo($axios, {
      table: "page",
      title: "support_problem_asid"
    }).then(el => el.data);
    const list = await $axios.$get(`/api/Get_arg?table=Support_list`);

    return { support_asid, list };
  },

  created() {
    this.slic();
  },
  methods: {
    pig(p) {
      return p;
    },
    slic(title) {
      if (title) {
        this.support_list = this.list.filter(val => {
          return val.parentsUntil == title || val.parent == title;
        });
      } else {
        this.support_list = this.list;
      }
    }
  },
  head: {
    title: "常见问题-雷迪司",
    meta: [
      { name: "keywords", content: "常见问题-雷迪司" },
      { name: "description", content: "常见问题-雷迪司" }
    ]
  }
};
</script>

<style lang="scss" scoped>
.asid {
  padding: 1rem;
  a {
    color: black;
  }
}
</style>
