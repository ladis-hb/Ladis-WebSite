<template>
  <b-container>
    <b-row>
      <b-col cols="12" class=" py-2 border-bottom">
        <h3>{{ id }} 销售服务中心</h3>
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" md="4" v-for="(val, key) in area" :key="key">
            <b-card :title="val.title" class="m-2">
              <b-card-body
                ><p>{{ val.content }}</p></b-card-body
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
    let {
      data: { data }
    } = await $axios.get(`/api/Get_arg?table=buy_list&title=buy_map`);
    data.forEach(element => {
      if (id) {
        if (element.parent == id) {
          if (city.has(element.title)) return;
          city.add(element.title);
          area.push(element);
        }
      }
    });
    return { area, id };
  },
  created() {
    console.log(this.area);
  }
};
</script>

<style lang="scss" scoped></style>
