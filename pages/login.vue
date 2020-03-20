<template>
  <b-container
    class="h-100 d-flex flex-column justify-content-center align-items-center"
  >
    <b-row>
      <b-col cols="12">
        <div class=" border rounded-lg shadow-sm px-5 pt-4 pb-5">
          <h5>login</h5>
          <hr />
          <b-form>
            <b-form-group
              label="用户:"
              label-cols="12"
              label-cols-md="3"
              label-for="accontUser"
              label-align="left"
              label-align-md="right"
            >
              <b-form-input
                type="text"
                id="accontUser"
                placeholder="输入用户名"
                v-model.trim="accont.user"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="密码:"
              label-cols="12"
              label-cols-md="3"
              label-for="accontPasswd"
              label-align="left"
              label-align-md="right"
            >
              <b-form-input
                type="password"
                id="accontPasswd"
                placeholder="输入密码"
                v-model="accont.passwd"
              ></b-form-input>
            </b-form-group>
            
            <b-button block variant="info" @click="login">登录</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import md5 from "md5";
export default {
  layout: "login",
  data() {
    return {
      accont: {
        user: this.$route.params.user || "",
        passwd: this.$route.params.passwd || ""
      }
    };
  },
  methods: {
    async login() {
      let { user, passwd } = this.$data.accont;
      if (user == "" || passwd == "")
        return this.$bvModal.msgBoxOk("用户名不能为空或非法字符",{title:"login error",buttonSize:"sm"})

      await this.$auth
        .loginWith("local", { data: { user, passwd: md5(passwd) } })
        .catch(() => {
          this.$bvModal.msgBoxOk("请确认账号或密码是否正确?",{title:"login error",buttonSize:"sm"})
        });
    }
  },
  head() {
    return {
      title: "官网资讯发布"
    };
  },
};
</script>

<style lang="scss" scoped></style>
