<template>
  <b-container>
    <b-row no-gutters>
      <b-col md="4" class="d-none d-sm-block">
        <b-button v-b-toggle.collapse-1 block class=" mt-3">{{
          $t("_id.tgqqj4")
        }}</b-button>
        <b-collapse id="collapse-1" visible>
          <b-list-group class="list-group">
            <b-list-group-item
              v-for="(val, key) in support_asid.data"
              :key="key"
              :to="{ path: val.href }"
              >{{ val.title }}</b-list-group-item
            >
          </b-list-group>
        </b-collapse>
      </b-col>
      <b-col md="8">
        <b-tabs content-class="mt-3" justified>
          <b-tab v-for="(val, key) in downs" :key="key" :title="val.title">
            <b-list-group>
              <b-list-group-item
                v-for="(v1, k1) in fileTypeFilter(val.data, 'pdf')"
                :key="k1 + 123"
                :href="v1.href"
                >{{ v1.title }}</b-list-group-item
              >
              <b-list-group-item
                v-for="(v1, k1) in fileTypeFilter(val.data, 'soft')"
                :key="k1 + 678"
              >
                <b-button
                  variant="link"
                  v-b-toggle="`coll${encodeURI(v1.title)}`"
                  >{{ v1.title }}</b-button
                >
                <b-collapse
                  :id="`coll${encodeURI(v1.title)}`"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <h5>{{ $t("_id.x9qyll") }}: {{ v1.title }}</h5>
                  <p>{{ $t("_id.ef2ovw") }}: {{ v1.date }}</p>
                  <p>{{ $t("_id.puz8nn") }}: {{ v1.platform }}</p>
                  <p>{{ $t("_id.qi5zqr") }}: {{ v1.language }}</p>
                  <p>{{ $t("_id.vysc3s") }}: {{ v1.size }}</p>
                  <p>{{ $t("_id.t03jjv") }}: {{ v1.version }}</p>
                  <p>{{ $t("_id.bwem5c") }}: {{ v1.updateReason }}</p>
                  <b-button :href="v1.down" variant="success">{{
                    $t("_id.e02jgq")
                  }}</b-button>
                </b-collapse>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GeneralGetInfo } from "../../api/axios";
export default {
  async asyncData({ $axios, params }) {
    const title = params.id;
    const support_asid = await GeneralGetInfo($axios, {
      table: "Page",
      title: "support_asid"
    });
    const downs = await GeneralGetInfo($axios, {
      table: "Support",
      parent: title
    });

    return { support_asid, downs, title };
  },
  methods: {
    fileTypeFilter(file, type) {
      let result = [];
      for (let i of file) {
        if (i.type == type) result.push(i);
      }

      return result;
    }
  },
  head() {
    return {
      title: `${this.title}-雷迪司`,
      meta: [
        { name: "keywords", content: `${this.title}-雷迪司` },
        { name: "description", content: `${this.title}-雷迪司` }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.list-group {
  margin: 1rem 0;
}
.tabs {
  margin: 1rem;
}
</style>
