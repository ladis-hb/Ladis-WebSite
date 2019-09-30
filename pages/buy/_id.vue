<template>
  <b-container>
    <b-row>
      <b-col cols="12" class=" py-2 border-bottom">
        <h3>{{ id }} 销售服务中心</h3>
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" md="4" v-for="(val, key) in area" :key="key">
            <b-card :title="val.data.title" class="m-2">
              <b-card-body
                ><div v-if="val.data.new">
                  <p>电话：{{ val.data.content.tel }}</p>
                  <p>联系人:{{ val.data.content.linkman }}</p>
                  <p>手机：{{ val.data.content.phone }}</p>
                  <p>地址：{{ val.data.content.address }}</p>
                  <p>备注：{{ val.data.content.remark }}</p>
                </div>
                <pre v-else>{{ val.data.content }}</pre></b-card-body
              >
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    let { id } = params;
    let area = [];
    let city = new Set();
    area = await $axios.$get(`/api/Get_buy_li`, { params: { city: id } });
    return { area, id };
  }
};
</script>

<style lang="scss" scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
