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
import { MessageBox } from "element-ui";
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
        return MessageBox.alert("用户名不能为空或非法字符", "格式错误");

      await this.$auth
        .loginWith("local", { data: { user, password: md5(passwd) } })
        .catch(() => {
          MessageBox.alert("请确认账号或密码是否正确?", "login error");
        });

      /* if (user == "") {
        return MessageBox.alert("用户名不能为空或非法字符", "格式错误");
      }
      if (passwd == "") {
        return MessageBox.alert("密码不能为空", "格式错误");
      }
      let result = await this.$axios.$get("/administrator/login", {
        params: { user, passwd: md5(passwd) }
      });
      if (result.code !== 5) return MessageBox(result.msg, "login error");
      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem("user", result.data.user);
      {
        if (keep) {
          localStorage.setItem("user", user);
          localStorage.setItem("passwd", passwd);
          localStorage.setItem("keep", "true");
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("passwd");
          localStorage.removeItem("keep");
        }
      }
      {
        this.$store.commit("setUser", result.data.user);
        this.$store.commit("setToken", result.data.token);
      }
      {
        this.$router.push({ path: "/admin/edit/news", query: { type: "hy" } });
      } */
    }
  },
  head() {
    return {
      title: "官网资讯发布"
    };
  },
  /* mounted() {
    let { params } = this.$route;
    if (params.user) return;
    if (Boolean(localStorage.getItem("keep")) || false) {
      this.accont.user = localStorage.getItem("user");
      this.accont.passwd = localStorage.getItem("passwd");
      this.accont.keep = Boolean(localStorage.getItem("keep"));
    }
  } */
};
</script>

<style lang="scss" scoped></style>
