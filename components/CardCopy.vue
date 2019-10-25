<template>
  <b-card>
    <b-row no-gutters>
      <b-col cols="12" md="3">
        <b-card-img-lazy :src="img" :alt="text" class="pic-1"></b-card-img-lazy>
      </b-col>
      <b-col cols="12" md="9">
        <b-card-body>
          <span class=" d-flex flex-column justify-content-center ml-4">
            <span class=" my-1"
              ><b class=" text-primary font-weight-bold">{{ title }}</b
              ><i>{{ time }}</i></span
            >
            <strong>{{ text }}</strong>
            <a class="my-4 mt-auto card-link" :href="href" target="_blank"
              >查看详情></a
            >
          </span>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "CardCopy",
  props: {
    img: { type: String },
    text: { type: String },
    title: { type: String },
    time: { type: String },
    href: { type: String }
  }
};
</script>

<style lang="scss" scoped>
.pic-1 {
  max-height: 230px;
}
</style>
