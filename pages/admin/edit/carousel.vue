<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12"
        ><b-card>
          <b-card-body> </b-card-body>
        </b-card>
      </b-col>

      <b-col cols="12" class="my-3">
        <b-card>
          <b-card-body> </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["user,token"])
  },

  methods: {
    async Get_pic_Source() {
      let data = await this.$axios.$get("/uploads/Get_pic_Source", {
        params: { user: this.user, token: user.token }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
