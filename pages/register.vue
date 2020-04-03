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
              <b-form-input id="user" v-model.trim="accont.user" :state="statUser"></b-form-input>
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
                trim
                type="password"
                :state="statPasswd"
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
                :state="accont.ck_passwd === accont.passwd"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="邮箱："
              label-align="left"
              label-align-md="right"
              label-for="mail"
              label-cols="12"
              label-cols-md="2"
            >
              <b-form-input id="mail" v-model.trim="accont.mail" :state="statMail"></b-form-input>
            </b-form-group>
            <b-form-group label-cols-md="2">
              <b-button
                block
                variant="success"
                class=" register-btn"
                @click="Register"
                :disabled="!statMail || !statPasswd || !statUser || accont.passwd !== accont.ck_passwd"
                >注册</b-button
              >
            </b-form-group>
          </b-form>
        </section>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
import md5 from 'md5'
import gql from 'graphql-tag'
import { ApolloMongoResult } from '../server/typing/interface'
export default Vue.extend({
  auth: false,
  data() {
    return {
      accont: {
        user: '',
        passwd: '',
        ck_passwd: '',
        mail: '',
      },
      ckPW: true,
    }
  },
  computed:{
    statUser(){
      const user:string = this.accont.user
      return user !== "" && user.length<20 && user.length > 3
    },
    statPasswd(){
      const user:string = this.accont.passwd
      return user !== "" && user.length<20 && user.length > 3
    },
    statMail(){
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.$data.accont.mail)
    }
  },
  methods: {
    async Register() {
      const { user, passwd, mail } = this.accont
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation registerUser($user: String, $passwd: String, $mail: String) {
            register(user: $user, passwd: $passwd, mail: $mail) {
              ok
              msg
            }
          }
        `,
        variables: {
          user,
          passwd: md5(passwd),
          mail,
        },
      })
      const data: ApolloMongoResult = result.data.register
      if (data.ok === 1) {
        const isQ = await this.$bvModal.msgBoxConfirm(
          `${data.msg},是否跳转到登录页面`,
          { title: 'Success', buttonSize: 'sm' }
        )
        if (isQ) this.$router.push({ path: '/login', params: { user, passwd } })
      } else {
        this.$bvModal.msgBoxOk(data.msg as string, { buttonSize: 'sm', title: 'Error' })
      }
    },
  },
})
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
