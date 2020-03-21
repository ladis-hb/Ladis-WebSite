<template>
  <b-container fluid id="source">
    <b-row>
      <b-col cols="12">
        <b-card title="上传素材">
          <b-card-body>
            <b-input-group prepend="选择文件" class="mt-3">
              <b-form-file
                multiple
                v-model="files"
                :file-name-formatter="formatNames"
                placeholder="可以多选"
              ></b-form-file>
              <b-input-group-append>
                <b-button
                  variant="info"
                  @click="Put_file_Source"
                  :disabled="!files"
                  >上传</b-button
                >
              </b-input-group-append>
            </b-input-group>
            <!-- <b-form-file
                multiple
                v-model="files"
                :file-name-formatter="formatNames"
            ></b-form-file>-->

            <ul>
              <li v-for="(name, key) in fileList" :key="key">{{ name }}</li>
            </ul>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col cols="12" class="my-3">
        <b-card title="素材库">
          <b-card-body>
            <div>
              <b-input-group prepend="关键字" class="mt-3">
                <b-form-input
                  v-model.trim="keyswords"
                  placeholder="默认检索全部文件"
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="info" @click="Get_pic_Source(keyswords)"
                    >检索</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </div>
            <b-row>
              <b-col
                cols="6"
                v-for="(file, key) in sourceFileFilter"
                :key="key"
                class="my-1 list-file"
              >
                <b-card>
                  <b-card-sub-title>
                    {{ file.name }}
                    <b-button
                      variant="success"
                      pill
                      class="ml-2 mb-2"
                      @click="selectSourceFile(file)"
                      >选中素材</b-button
                    >
                  </b-card-sub-title>
                  <b-card-img-lazy
                    v-if="file.filetype === 'img'"
                    :src="file.path"
                  ></b-card-img-lazy>
                  <b-card-body v-else>
                    <b-link :href="file.path">{{ file.path }}</b-link>
                  </b-card-body>
                </b-card>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { uploadResult } from '../../server/typing/interface';
import gql from 'graphql-tag';
export default Vue.extend({
  data() {
    return {
      files: null,
      keyswords: "",
      sourceFile: []
    };
  },
  computed: {
    //  要上传的文件名列表
    fileList() {
      if (!this.files) return [];
      return (<File[]>this.$data.files).map(file => {
        return file.name;
      });
    },

    // 刷选文件
    sourceFileFilter() {
      return (<string[]>this.$data.sourceFile).map(file => {
        let filetype = <string>file.split(".").pop();
        const name = <string>file.split("/").pop();
        if (["png", "jpeg", "jpg", "git", "bmp"].includes(filetype))
          filetype = "img";
        return {
          path: file,
          name,
          filetype
        };
      });
    }
  },

  methods: {
    // 上传文件
    Put_file_Source() {
      const data = new FormData();
      /* 
      data.append("user", sessionStorage.getItem("user"));
      data.append("token", sessionStorage.getItem("token")); */
      (<Blob[]>this.$data.files).forEach(file => {
        data.append("files", file);
      });
      this.$axios.$put("/uploads/files", data).then((result:{code:number,data:uploadResult[]}) => {
        this.$bvModal.msgBoxOk("上传已完成");
        this.files = null;
        result.data.forEach(file => {
          this.$store.commit("setSourceFile", file);
        });
      });
    },
    // 获取图片
    async Get_pic_Source(filter:string ="") {
      const files = await this.$apollo.query({
        query:gql`
        query getUploadFiles($filter:String){
          getUploadFiles(filter:$filter){
            files
          }
        }
        `,
        variables:{filter}
      })
      console.log(files);
      
      /* let data = await Get_pic_Source({ filter: filter });
      this.sourceFile = data.data; */
    },
    formatNames(files:File[]) {
      if (files.length === 1) {
        return files[0].name;
      } else {
        return `${files.length} files selected`;
      }
    },
    selectSourceFile(file:uploadResult) {
      this.sourceFile = this.sourceFile.filter(f => f !== file.path);
      this.$store.commit("setSourceFile", file);
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "选取";
}
.list-file {
  transition: 2s;
  width: 0px;
}
</style>
