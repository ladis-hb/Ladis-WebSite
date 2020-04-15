<template>
  <my-card title="空编辑器" class=" overflow-auto">
    <b-row>
      <b-col>
        <my-code :html.sync="html"></my-code>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="代码块">
          <b-textarea v-model="html" max-rows="500"></b-textarea>
        </b-card>
      </b-col>
    </b-row>
  </my-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      html: ""
    };
  }
});
</script>