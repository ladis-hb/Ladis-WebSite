<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="4">
        <b-list-group class="list-group">
          <b-list-group-item class="list-head" variant="dark">常见热点问题</b-list-group-item>
          <b-list-group-item
            v-for="(val,key) in support_asid.data"
            :key="key"
            :to="{path:val.href}"
          >{{val.title}}</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" md="8">
        <b-tabs content-class="mt-3" justified>
          <b-tab v-for="(val,key) in downs" :key="key" :title="val.title">
            <b-list-group>
              <b-list-group-item
                v-for="(v1,k1) in val.data"
                :key="k1"
                v-if="v1.type=='pdf'"
                :href="v1.href"
              >{{v1.title}}</b-list-group-item>
              <b-list-group-item v-for="(v1,k1) in val.data" :key="k1" v-if="v1.type=='soft'">
                <b-button variant="link" v-b-toggle="`coll${encodeURI(v1.title)}`">{{v1.title}}</b-button>
                <b-collapse
                  :id="`coll${encodeURI(v1.title)}`"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <h5>软件名称: {{v1.title}}</h5>
                  <p>发布时间: {{v1.date}}</p>
                  <p>平台: {{v1.platform}}</p>
                  <p>语言: {{v1.language}}</p>
                  <p>文件大小: {{v1.size}}</p>
                  <p>版本: {{v1.version}}</p>
                  <p>版本更新原由: {{v1.updateReason}}</p>
                  <b-button :href="pig(v1.down)" variant="success">下载</b-button>
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
export default {
  async asyncData({ $axios, params, error, payload }) {
    var support_asid = await $axios.$get("/api/Get_support_asid");
    if (payload) {
    } else {
      var downs = await $axios.$get(
        `/api/Get_support_down_list?table=${encodeURI(params.id)}`
      );
    }
    var title = params.id;

    return { support_asid, downs, title };
  },

  created() {
    console.log(this.title);
  },
  methods: {
    pig(p) {
      return `http://www.ladis.com.cn/${p}`;
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

<style lang='scss' scoped >
.list-group {
  margin: 1rem 0;
  .list-head {
  }
}
.tabs {
  margin: 1rem;
}
</style>
