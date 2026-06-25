<template>
  <div class="flex">
    <div id="myPie" class="w-[500px] h-[400px] box-border" />
    <div id="myPie1" class="w-[500px] h-[400px] box-border ml-2" />
    <div id="myPie2" class="w-[500px] h-[400px] box-border ml-2" />
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
import { debounce } from "../../../store/utils";
// import getPie3D from "./pie3D";
import getPie3D1 from "./pie3D1";
import getPie3D from "./pie3D2";
import p1 from "@/assets/img/1.jpg";
import "echarts-gl";
defineOptions({
  name: "PiePage"
});
onMounted(() => {
  initBar();
  initBar1();
  initBar2();
  window.addEventListener("resize", debouncedChartResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", debouncedChartResize);
});

let myChartBar;
let myChartBar1;
let myChartBar2;
const initBar = () => {
  let chartDom = document.getElementById("myPie");
  myChartBar = echarts.getInstanceByDom(chartDom!);
  if (myChartBar == null) {
    myChartBar = echarts.init(chartDom);
  }

  const option = getPie3D(
    [
      {
        name: "a",
        value: 45,
        number: 45,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#00d8ff"
        }
      },
      {
        name: "b",
        value: 30,
        number: 30,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#018ef1"
        }
      },
      {
        name: "c",
        value: 15,
        number: 15,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#f8bc87"
        }
      },
      {
        name: "d",
        value: 10,
        number: 10,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#6b2a9d"
        }
      }
    ],
    0.15
  );
  option && myChartBar.setOption(option);
};

const initBar1 = () => {
  let chartDom = document.getElementById("myPie1");
  myChartBar1 = echarts.getInstanceByDom(chartDom!);
  if (myChartBar1 == null) {
    myChartBar1 = echarts.init(chartDom);
  }

  const option = getPie3D1(
    [
      {
        name: "a",
        value: 45,
        number: 45,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#00d8ff"
        }
      },
      {
        name: "b",
        value: 30,
        number: 30,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#018ef1"
        }
      },
      {
        name: "c",
        value: 15,
        number: 15,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#f8bc87"
        }
      },
      {
        name: "d",
        value: 10,
        number: 10,
        height: 5,
        unit: "aa",
        itemStyle: {
          color: "#6b2a9d"
        }
      }
    ],
    1
  );
  option && myChartBar1.setOption(option);
};

const initBar2 = () => {
  let chartDom = document.getElementById("myPie2");
  myChartBar2 = echarts.getInstanceByDom(chartDom!);
  if (myChartBar2 == null) {
    myChartBar2 = echarts.init(chartDom);
  }

  var img = new Image();
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var option;
  img.onload = function () {
    var width = (canvas.width = img.width);
    var height = (canvas.height = img.height);
    ctx.drawImage(img, 0, 0, width, height);
    var imgData = ctx.getImageData(0, 0, width, height);
    var data = [];
    for (var i = 0; i < imgData.data.length / 4; i++) {
      var r = imgData.data[i * 4];
      var g = imgData.data[i * 4 + 1];
      var b = imgData.data[i * 4 + 2];
      var lum = 255 - (0.2125 * r + 0.7154 * g + 0.0721 * b);
      lum = (lum - 125) / 10 + 50;
      data.push([i % width, height - Math.floor(i / width), lum]);
    }
    myChartBar2.setOption(
      (option = {
        tooltip: {},
        backgroundColor: "#fff",
        xAxis3D: {
          type: "value"
        },
        yAxis3D: {
          type: "value"
        },
        zAxis3D: {
          type: "value",
          min: 0,
          max: 100
        },
        grid3D: {
          axisPointer: {
            show: false
          },
          viewControl: {
            distance: 100
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              shadow: true,
              intensity: 2
            },
            ambientCubemap: {
              exposure: 2,
              diffuseIntensity: 0.2,
              specularIntensity: 1
            }
          }
        },
        series: [
          {
            type: "surface",
            silent: true,
            wireframe: {
              show: false
            },
            itemStyle: {
              color: function (params) {
                var i = params.dataIndex;
                var r = imgData.data[i * 4];
                var g = imgData.data[i * 4 + 1];
                var b = imgData.data[i * 4 + 2];
                return "rgb(" + [r, g, b].join(",") + ")";
              }
            },
            data: data
          }
        ]
      })
    );
  };
  img.src = p1;
  option && myChartBar2.setOption(option);
};

const chartResize = () => {
  if (myChartBar) {
    if (myChartBar != null && myChartBar != "" && myChartBar != undefined) {
      myChartBar.dispose(); //销毁
    }
    initBar();
  }
  if (myChartBar1) {
    if (myChartBar1 != null && myChartBar1 != "" && myChartBar1 != undefined) {
      myChartBar1.dispose(); //销毁
    }
    initBar1();
  }
  if (myChartBar2) {
    if (myChartBar2 != null && myChartBar2 != "" && myChartBar2 != undefined) {
      myChartBar2.dispose(); //销毁
    }
    initBar2();
  }
};
const debouncedChartResize = debounce(chartResize, 200, false);
</script>
