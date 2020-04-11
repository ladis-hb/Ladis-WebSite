<template>
  <b-container class="h-100 overflow-auto" fluid>
    <b-row>
      <b-col cols="12" class="ql-editor">
        <h2 class="ql-align-center">使用说明</h2>
        <p>1，编辑文件之前需要先上传素材（图片，视频，软件，pdf文件等），已提供在编辑的时候选择</p>
        <p>1.1，先进入素材管理，上传素材或者选择已有素材</p>

        <b-img src="~/assets/readme/1.png" />

        <p>
          <br />
        </p>
        <p>1.2，根据素材大小，上传需要花费的时间不等，上传完成之后会有上传成功的提示弹窗，请在提示出来以后在编辑内容，否则容易遗失素材。</p>
        <p>1.3，上传素材之后可以在已选素材里面查看已选择的素材，可以多次选择</p>
        <p>
          <br />
        </p>

        <img src="~/assets/readme/2.png"/>

        <p>
          <br />
        </p>
        <p>1.4，当已选素材里面有内容，编辑的时候才会有图片或文件可供选择。</p>
        <p>
          <br />
        </p>
        <p>
          <img  src="~/assets/readme/3.png"/>
        </p>
        <p>，</p>
        <p>1.5，剩下的请自行操作，</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      content: ``
    };
  }
};
</script>