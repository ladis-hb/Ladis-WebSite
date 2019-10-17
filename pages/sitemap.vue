<template>
  <b-container fluid>
    <b-row>
      <b-col
        cols="12"
        md="6"
        v-for="(group, key) in Rout"
        :key="key"
        class=" my-2"
      >
        <b-card :sub-title="key" class=" list-2 overflow-auto">
          <b-card-body>
            <b-list-group>
              <b-list-group-item
                :href="val.rout"
                v-for="(val, key) in group"
                :key="key"
                >{{ val.title }}</b-list-group-item
              >
            </b-list-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { async } from "q";
export default {
  layout: "map",
  data() {
    return {
      router: this.routers || []
    };
  },
  computed: {
    Rout() {
      let group = ["products", "support", "buy", "VR", "Case", "News"];
      let Rout = {
        products: [],
        support: [],
        buy: [],
        VR: [],
        Case: [],
        News: [],
        other: []
      };
      for (let { rout, title, createdAt } of this.routers) {
        let type = rout.split("/")[1] || "other";
        if (!group.includes(type)) type = "other";
        Rout[type].push({ rout, createdAt, title });
      }
      return Rout;
    }
  },
  async asyncData({ $axios }) {
    let routers = await $axios.$get("/api/Get_arg", {
      params: { table: "Router" }
    });

    return { routers };
  }
};
</script>

<style lang="scss" scoped>
.list-2 {
  max-height: 300px;
}
</style>
