<template>
  <b-container>
    <b-row no-gutters>
      <b-col cols="12">
        <h4 class="text-center m-2">{{ $t("index.yp93bk") }}</h4>
        <hr />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <p style="text-align: center">
          <b-img
            border="0"
            alt="该区域服务站正在建设中，请致电统一服务电话：400-6655-778，随时为您提供维修或者更换服务"
            width="605"
            height="523"
            usemap="#Map"
            src="/_CMS_NEWS_IMG_/cms_images/fck/2017-03/18/14a73101-61f3-4ce5-8e99-7f389bec67d5.jpg"
            fluid
          />&nbsp;
          <map name="Map">
            &nbsp;
            <area
              v-for="(val, key) in map"
              :key="key"
              shape="poly"
              :alt="val.alt"
              target="_blank"
              :coords="val.coords"
              :href="val.href"
            />
          </map>
        </p>
      </b-col>
    </b-row>
    <b-row no-gutters class=" p-2">
      <b-col cols="12" md="6" v-for="(val, key) in area" :key="key">
        <div class=" p-2">
          <b-card :title="key">
            <b-card-body>
              <span v-for="(i1, k1) in val" :key="k1" class="mx-1"
                ><b-link :href="i1.href">{{ i1.title }}</b-link></span
              >
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GeneralGetInfo } from "../../api/axios";
export default {
  async asyncData({ $axios,params}) {
    let adrress = new Map();
    let city = new Set();
    let area = {};

    
    const dealers = await GeneralGetInfo( $axios,{ table: "Buy_list" }).then(
      el => el[0].data
    );
    dealers.forEach(element => {
      let { parentsUntil, link, parent } = element;
      if (city.has(parent)) return;
      else city.add(parent);
      if (!area[parentsUntil]) area[parentsUntil] = [];
      area[parentsUntil].push({ link, href: `/buy/${parent}`, title: parent });
      adrress.set(link, `/buy/${parent}`);
    });

    const map = await GeneralGetInfo( $axios,{ table: "Buy" }).then(el => {
      return el[0].data.map(element => {
        element.href = adrress.get(element.href.split(".")[0] + ".shtml");
        return element;
      });
    });
    return { map, area };
  },

  head() {
    return {
      title: `销售服务中心-雷迪司`,
      meta: [
        { name: "keywords", content: `${this.title}-雷迪司` },
        { name: "description", content: `${this.title}-雷迪司` }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
