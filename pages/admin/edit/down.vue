<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-tabs v-model="active">
          <b-tab title="软件上传">
            <b-form class=" m-5">
              <b-form-group
                label="*软件平台:"
                label-cols="2"
                label-align="right"
              >
                <b-form-select
                  :options="soft.system"
                  v-model="soft.selectSystem"
                ></b-form-select>
              </b-form-group>
              <b-form-group label="*标题:" label-cols="2" label-align="right">
                <b-form-input v-model="soft.title"></b-form-input>
              </b-form-group>
              <b-form-group label="说明:" label-cols="2" label-align="right">
                <b-form-input v-model="soft.platform"></b-form-input>
              </b-form-group>
              <b-form-group label="*语言:" label-cols="2" label-align="right">
                <b-form-select
                  :options="soft.language"
                  v-model="soft.selectLanguage"
                ></b-form-select>
              </b-form-group>
              <b-form-group label="版本:" label-cols="2" label-align="right">
                <b-form-input v-model="soft.version"></b-form-input>
              </b-form-group>
              <b-form-group
                label="更新说明:"
                label-cols="2"
                label-align="right"
              >
                <b-form-input v-model="soft.update"></b-form-input>
              </b-form-group>
              <b-form-group label="*文件:" label-cols="2" label-align="right">
                <b-form-file v-model="soft.file"></b-form-file>
              </b-form-group>
              <b-button block @click="Submit('soft')" variant="success"
                >提交</b-button
              >
            </b-form>
          </b-tab>
          <b-tab title="彩页上传"></b-tab>
          <b-tab title="视频教程"></b-tab>
          <b-tab title="常见问题"></b-tab>
          <b-tab title="资质"></b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      active: this.$route.query.index || 0,
      soft: {
        system: ["windows", "linux", "mac", "other"],
        selectSystem: "",
        title: "ceshi",
        platform: "ceshi pla",
        language: ["简体中文", "英文"],
        selectLanguage: "",
        version: "1.00",
        update: "test",
        file: null
      }
    };
  },

  computed: {
    ...mapState(["user", "token"])
  },
  methods: {
    async Submit(type) {
      let format = new FormData();
      let data = this.$data[type];
      let keys = Object.keys(data);
      format.append("user", this.user);
      format.append("token", this.token);
      format.append("type", type);
      keys.forEach(el => {
        format.append(el, data[el]);
      });
      await this.$axios.$put("/upload/down", format);
    }
  }
};
</script>

<style lang="scss" scoped></style>
