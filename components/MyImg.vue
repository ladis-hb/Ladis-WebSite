<template>
  <b-img-lazy v-bind="mainProps" :src="img" :alt="alt" :onerror="onPic()"></b-img-lazy>
</template>

<script>
export default {
  name: "MyImg",
  props: {
    src: String,
    alt: String
  },
  data() {
    return {
      img: this.src,
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb"
      }
    };
  },
  methods: {
    onPic() {
       this.img = "http://www.ladis.com.cn" + this.src;
    }
  }
};
</script>