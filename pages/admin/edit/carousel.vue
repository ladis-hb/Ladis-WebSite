<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-card sub-title="请选择的图片必须尺寸一致，宽最低1024，高最低512，推荐尺寸1920*768，4张以上">
          <b-card-body>
            <b-form-group label="轮播图片:" label-cols="2" label-align="right">
              <b-form-select v-model="imgs" :options="SourceFile"></b-form-select>
            </b-form-group>
            <b-button variant="success" @click="setCarousel">sumbit</b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { setCarousel } from "../../../api/axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      imgs: []
    };
  },

  computed: {
    ...mapState(["SourceFile"])
  },

  methods: {
    async setCarousel() {
      let data = await setCarousel({ imgs });
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
