<template>
  <b-card>
    <div id="ladisp1">
      <canvas id="ladisCas1" height="30" width="400" class="mw-100"></canvas>
    </div>
    <div id="ladisp2">
      <canvas id="ladisCas2" height="30" width="400" class="mw-100"></canvas>
    </div>
    <div id="ladisp3">
      <canvas id="ladisCas3" height="30" width="400" class="mw-100"></canvas>
    </div>
    <div id="ladisp4">
      <canvas id="ladisCas4" height="30" width="400" class="mw-100"></canvas>
    </div>
    <my-edit :content.sync="content"></my-edit>
    <b-textarea v-model="content"></b-textarea>
  </b-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      content: `<div>
        <p id="ladisCas1" height="30" width="400">产品规格</p>
    </div>
    <div>
        <p id="ladisCas2" height="30" width="400">产品应用</p>
    </div>

    <div>
        <p id="ladisCas3" height="30" width="400">产品大图</p>
    </div>
    <div>
        <p id="ladisCas4" height="30" width="400">相关下载</p>
    </div>
    `
    };
  },
  methods: {
    dram() {
      const main = {
        ladisCas1: {
          mainText: "产品规格",
          text: "product standard"
        },
        ladisCas2: {
          mainText: "产品应用",
          text: "product application"
        },
        ladisCas3: {
          mainText: "产品大图",
          text: "product picture"
        },
        ladisCas4: {
          mainText: "相关下载",
          text: "product download"
        }
      };
      for (let el in main) {
        const { mainText, text } = (main as any)[el];
        canvasFill(el, mainText, text);
      }

      function canvasFill(id: string, mainText: string, text: string) {
        const h = 25;
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        // 绘制下划线
        const h1 = h + 1;
        ctx.beginPath();
        ctx.moveTo(0, h1);
        ctx.lineTo(250, h1);
        ctx.closePath();
        ctx.stroke();
        // 绘制黑色块
        const w1 = 40;
        ctx.beginPath();
        ctx.moveTo(w1 - 10, 0);
        ctx.lineTo(w1, 0);
        ctx.lineTo(w1 - 20, h);
        ctx.lineTo(w1 - 30, h);
        ctx.fillStyle = "#343a40";
        ctx.closePath();
        ctx.fill();
        // 绘制蓝色块
        const w2 = 180;
        ctx.beginPath();
        ctx.moveTo(w1, 0);
        ctx.lineTo(w2, 0);
        ctx.lineTo(w2 - 20, h);
        ctx.lineTo(w1 - 20, h);
        ctx.closePath();
        ctx.fillStyle = "#1471ce";
        ctx.fill();
        // 绘制maiText
        ctx.fillStyle = "#FFFF";
        ctx.font = "20px sans-serif";
        ctx.fillText(mainText, w1 + 10, h - 5);
        //
        ctx.fillStyle = "#343a40";
        ctx.font = "15px sans-serif";
        ctx.fillText(text, 210, h - 5);
      }
    }
  },
  mounted() {
    this.dram();
  }
});
</script>