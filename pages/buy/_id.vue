<template>
  <b-container>
    <b-row>
      <b-col cols="12" class=" py-2 border-bottom">
        <h3>{{ id }} {{ $t('_id.ctksck') }}</h3>
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" md="4" v-for="(val, key) in area" :key="key">
            <b-card :title="val.title" class="m-2">
              <b-card-body
                ><div v-if="val.new">
                  <p>{{ $t('_id.sjrt39') }}：{{ val.tel }}</p>
                  <p>{{ $t('_id.jqsbos') }}:{{ val.linkman }}</p>
                  <p>{{ $t('_id.hssglh') }}：{{ val.phone }}</p>
                  <p>{{ $t('_id.dprtu7') }}：{{ val.address }}</p>
                  <p>{{ $t('_id.x7u8c6') }}：{{ val.remark }}</p>
                </div>
                <pre v-else>{{ val.content }}</pre></b-card-body
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
