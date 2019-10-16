<template>
  <b-container>
    <b-row>
      <b-col>
        <section class="m-5 d-flex flex-column justify-content-center">
          <span class=" text-center border-bottom titles">注册</span>
          <b-form class="my-4">
            <b-form-group
              label="*账号名："
              label-align="left"
              label-align-md="right"
              label-for="user"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input id="user" v-model.trim="accont.user"></b-form-input>
            </b-form-group>
            <b-form-group
              label="*昵称："
              label-align="left"
              label-align-md="right"
              label-for="name"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input id="name" v-model.trim="accont.name"></b-form-input>
            </b-form-group>
            <b-form-group
              label="*密码："
              label-align="left"
              label-align-md="right"
              label-for="passwd"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input
                id="passwd"
                v-model="accont.passwd"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="*确认密码："
              label-align="left"
              label-align-md="right"
              label-for="ck_passwd"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input
                id="ck_passwd"
                :class="{ 'ck-form-control': !ckPW }"
                v-model="accont.ck_passwd"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="电话："
              label-align="left"
              label-align-md="right"
              label-for="tel"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input id="tel" v-model.trim="accont.tel"></b-form-input>
            </b-form-group>
            <b-form-group
              label="邮箱："
              label-align="left"
              label-align-md="right"
              label-for="mail"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input id="mail" v-model.trim="accont.mail"></b-form-input>
            </b-form-group>
            <b-form-group label-cols-md="2">
              <b-button
                block
                variant="success"
                class=" register-btn"
                @click="Register"
                >注册</b-button
              >
            </b-form-group>
          </b-form>
        </section>
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
        user: "test",
        name: "测试",
        passwd: "test123",
        ck_passwd: "test123",
        tel: "110",
        mail: "test@ladis.com"
      },
      ckPW: true
    };
  },
  computed: {
    ckPasswd() {
      return this.accont.ck_passwd;
    }
  },
  watch: {
    ckPasswd(newValue, oldValue) {
      if (newValue !== this.accont.passwd) this.ckPW = false;
      else this.ckPW = true;
    }
  },
  methods: {
    async Register() {
      let validation = this.validation();
      if (validation) {
        MessageBox.alert(`${validation.key}:带星号为必填`, "输入错误");
      } else {
        let { user, passwd, ck_passwd } = this.$data.accont;
        if (passwd !== ck_passwd)
          return MessageBox.alert("密码不一致", "密码错误");
        let result = await this.$axios.$get("/administrator/register", {
          params: Object.assign(this.$data.accont, { passwd: md5(passwd) })
        });
        if (!result.stat) return MessageBox.alert(result.msg, "注册错误");
        else
          return MessageBox.confirm(result.msg, "注册成功")
            .then(() => {
              this.$router.push({
                name: "admin-accont___zh",
                params: { user: user, passwd: ck_passwd }
              });
            })
            .catch();
      }
    },
    validation() {
      let keys = Object.keys(this.$data.accont);
      for (let key of keys) {
        if (["tel", "mail"].includes(key)) break;
        let val = this.$data.accont[key];
        if (val === "") return { key };
      }
      return false;
    }
  }
};
</script>

<style>
.titles {
  font-size: 30px;
}
.ck-form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: white;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(245, 198, 203);
}
</style>
