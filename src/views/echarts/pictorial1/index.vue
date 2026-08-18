<template>
  <div class="w-[600px] h-[800px] box-border bg-[#092254] relative">
    <div id="myPictorial1" class="size-full" />
    <svg
      class="winding-road"
      viewBox="50 -20 300 350"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="roadGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="5%" stop-color="rgba(46, 172, 255, 0.50)" />
          <stop offset="10%" stop-color="rgba(46, 172, 255, 0.50)" />
          <stop offset="15%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="18%" stop-color="rgba(46, 172, 255, 0.50)" />
          <stop offset="23%" stop-color="rgba(46, 172, 255, 0.50)" />
          <stop offset="30%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="32%" stop-color="rgba(46, 172, 255, 0.50)" />
          <stop offset="38%" stop-color="rgba(46, 172, 255, 0.50)" />
          <stop offset="43%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="47%" stop-color="rgba(46, 255, 224, 0.50)" />
          <stop offset="52%" stop-color="rgba(46, 255, 224, 0.50)" />
          <stop offset="58%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="63%" stop-color="rgba(46, 255, 224, 0.50)" />
          <stop offset="68%" stop-color="rgba(46, 255, 224, 0.50)" />
          <stop offset="72%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="77%" stop-color="rgba(46, 255, 224, 0.50)" />
          <stop offset="82%" stop-color="rgba(46, 255, 224, 0.50)" />
          <stop offset="88%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="90%" stop-color="rgba(46, 255, 126, 0.50)" />
          <stop offset="95%" stop-color="rgba(46, 255, 126, 0.50)" />
          <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
        </linearGradient>
      </defs>

      <path
        id="road1"
        :d="roadPath"
        fill="none"
        stroke="url(#roadGrad)"
        stroke-width="1"
      />
      <path
        :d="roadPath"
        fill="none"
        stroke="url(#roadGrad)"
        stroke-width="1.5"
        stroke-opacity="1"
        stroke-linecap="round"
        stroke-dasharray="10 36"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-138"
          dur="3s"
          repeatCount="indefinite"
          :begin="0"
        />
      </path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, watch } from "vue";
import { debounce } from "../../../store/utils";
const roadPath =
  "M200,330 C320,330 320,285 200,285 C80,285 80,240 200,240 C320,240 320,195 200,195 C80,195 80,150 200,150 C320,150 320,105 200,105 C80,105 80,60 200,60 C320,60 320,20 200,20";
defineOptions({
  name: "PictorialPage1"
});
onMounted(() => {
  initBar();
  window.addEventListener("resize", debouncedChartResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", debouncedChartResize);
});

let myChartBar;

const initBar = () => {
  let chartDom = document.getElementById("myPictorial1");
  myChartBar = echarts.getInstanceByDom(chartDom!);
  if (myChartBar == null) {
    myChartBar = echarts.init(chartDom);
  }
  const option = {
    grid: {
      left: "0%",
      top: "0%",
      bottom: "12%"
    },
    xAxis: {
      show: false,
      type: "category",
      data: ["1"]
    },
    yAxis: {
      show: false,
      type: "value"
    },
    legend: {
      orient: "vertical",
      right: "2%",
      top: "middle",
      icon: "path:// M4,5 h2 v1 h-2 z M8,5 h2 v1 h-2 z M12,5 h2 v1 h-2 z M16,5 h2 v1 h-2 z M20,5 h2 v1 h-2 z M24,5 h2 v1 h-2 z M28,5 h2 v1 h-2 z M32,5 h2 v1 h-2 z M36,5 h2 v1 h-2 z M40,5 h2 v1 h-2 M44,5 h2 v1 h-2 z M48,5 h2 v1 h-2 z",
      itemWidth: 66,
      itemGap: 10,
      selectedMode: false,
      textStyle: {
        rich: {
          value1: {
            color: "#44E582",
            padding: [0, 0, 30, -55],
            width: 55,
            height: 110,
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "YouSheBiaoTiHei"
          },
          value2: {
            color: "#3DE2CA",
            padding: [0, 0, 30, -55],
            width: 55,
            height: 110,
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "YouSheBiaoTiHei"
          },
          value3: {
            color: "#E7C54E",
            padding: [0, 0, 30, -55],
            width: 55,
            height: 110,
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "YouSheBiaoTiHei"
          },
          value4: {
            color: "#54B4F4",
            padding: [0, 0, 30, -55],
            width: 55,
            height: 110,
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "YouSheBiaoTiHei"
          },
          icon1: {
            width: 18,
            height: 82,
            backgroundColor: "#2EFF7E30",
            borderColor: "#2EFF7EBF",
            borderWidth: 2
          },
          icon2: {
            width: 18,
            height: 126,
            backgroundColor: "#2EFFE030",
            borderColor: "#2EFFE0BF",
            borderWidth: 2
          },
          icon3: {
            width: 18,
            height: 126,
            backgroundColor: "#FFDA5B30",
            borderColor: "#FFDA5BBF",
            borderWidth: 2
          },
          icon4: {
            width: 18,
            height: 132,
            backgroundColor: "#2EACFF30",
            borderColor: "#2EACFFBF",
            borderWidth: 2
          }
        }
      },
      formatter: name => {
        const map = {
          "1": "{value1|30%}{icon1| }",
          "2": "{value2|40%}{icon2| }",
          "3": "{value3|20%}{icon3| }",
          "4": "{value4|10%}{icon4| }"
        };
        return map[name] || name;
      },
      data: ["1", "2", "3", "4"]
    },
    series: [
      {
        name: "4",
        type: "bar",
        stack: "total",
        barWidth: 180,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: "transparent" },
            { offset: 0.25, color: "transparent" },
            { offset: 1, color: "#2EACFFAA" }
          ])
        },
        data: [800]
      },
      {
        type: "pictorialBar",
        symbolSize: [180, 60],
        symbolOffset: [0, "-50%"],
        z: 12,
        label: {
          show: true,
          fontSize: 16,
          align: "center",
          offset: [0, 30],
          position: "top",
          formatter: ["{a|1}", "{b|2}", "{b|3}"].join("\n"),
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 22,
              lineHeight: 33
            },
            b: {
              color: "#FFFFFF",
              fontSize: 14,
              lineHeight: 22
            }
          }
        },
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "#2EACFF20" },
            { offset: 0.8, color: "#2EACFF80" },
            { offset: 1, color: "#2EACFF" }
          ])
        },
        data: [
          {
            value: 0,
            symbolPosition: "end"
          }
        ]
      },
      {
        type: "pictorialBar",
        symbolSize: [240, 80],
        symbolOffset: [0, "-40%"],
        z: 10,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "transparent" },
            { offset: 0.6, color: "transparent" },
            { offset: 1, color: "#2EACFF" }
          ])
        },
        data: [
          {
            value: 0,
            symbolPosition: "end"
          }
        ]
      },
      {
        type: "pictorialBar",
        symbolSize: [300, 100],
        symbolOffset: [0, "-30%"],
        z: 10,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "transparent" },
            { offset: 0.6, color: "transparent" },
            { offset: 1, color: "#2EACFF" }
          ])
        },
        data: [
          {
            value: 0,
            symbolPosition: "end"
          }
        ]
      },
      {
        name: "3",
        type: "bar",
        stack: "total",
        barWidth: 180,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: "transparent" },
            { offset: 0.25, color: "transparent" },
            { offset: 1, color: "#FFB32EAA" }
          ])
        },
        data: [800]
      },
      {
        type: "pictorialBar",
        symbolSize: [180, 60],
        symbolOffset: [0, "-50%"],
        z: 12,
        label: {
          show: true,
          fontSize: 16,
          align: "center",
          offset: [0, 30],
          position: "top",
          formatter: ["{a|1}", "{b|2}", "{b|3}"].join("\n"),
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 22,
              lineHeight: 33
            },
            b: {
              color: "#FFFFFF",
              fontSize: 14,
              lineHeight: 22
            }
          }
        },
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "transparent" },
            { offset: 0.8, color: "#FFB32E80" },
            { offset: 1, color: "#FFB32E" }
          ])
        },
        data: [
          {
            value: 800,
            symbolPosition: "end"
          }
        ]
      },
      {
        name: "2",
        type: "bar",
        stack: "total",
        barWidth: 200,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: "transparent" },
            { offset: 0.25, color: "transparent" },
            { offset: 1, color: "#2EFFE0AA" }
          ])
        },
        data: [800]
      },
      {
        type: "pictorialBar",
        symbolSize: [180, 60],
        symbolOffset: [0, "-50%"],
        z: 12,
        label: {
          show: true,
          fontSize: 16,
          align: "center",
          offset: [0, 30],
          position: "top",
          formatter: ["{a|1}", "{b|2}", "{b|3}"].join("\n"),
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 22,
              lineHeight: 33
            },
            b: {
              color: "#FFFFFF",
              fontSize: 14,
              lineHeight: 22
            }
          }
        },
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "transparent" },
            { offset: 0.8, color: "#2EFFE080" },
            { offset: 1, color: "#2EFFE0" }
          ])
        },
        data: [
          {
            value: 1600,
            symbolPosition: "end"
          }
        ]
      },
      {
        name: "1",
        type: "bar",
        stack: "total",
        barWidth: 180,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: "transparent" },
            { offset: 0.25, color: "transparent" },
            { offset: 1, color: "#2EFF7EAA" }
          ])
        },
        data: [800]
      },
      {
        type: "pictorialBar",
        symbolSize: [180, 60],
        symbolOffset: [0, "-50%"],
        z: 12,
        label: {
          show: true,
          fontSize: 16,
          align: "center",
          offset: [0, 30],
          position: "top",
          formatter: ["{a|1}", "{b|2}", "{b|3}"].join("\n"),
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 22,
              lineHeight: 33
            },
            b: {
              color: "#FFFFFF",
              fontSize: 14,
              lineHeight: 22
            }
          }
        },
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "transparent" },
            { offset: 0.8, color: "#2EFF7E80" },
            { offset: 1, color: "#2EFF7E" }
          ])
        },
        data: [
          {
            value: 2400,
            symbolPosition: "end"
          }
        ]
      },
      {
        type: "bar",
        stack: "total",
        barWidth: 180,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0, 2, [
            { offset: 0, color: "transparent" },
            { offset: 0.25, color: "transparent" },
            { offset: 1, color: "#2EFF7EAA" }
          ])
        },
        data: [400]
      },
      {
        type: "pictorialBar",
        symbolSize: [180, 60],
        symbolOffset: [0, "-50%"],
        z: 12,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: "#2EFF7E20" },
            { offset: 0.8, color: "#2EFF7E80" },
            { offset: 1, color: "#2EFF7EDD" }
          ])
        },
        data: [
          {
            value: 3200,
            symbolPosition: "end"
          }
        ]
      }
    ]
  };

  option && myChartBar.setOption(option);
};

const chartResize = () => {
  if (myChartBar) {
    if (myChartBar != null && myChartBar != "" && myChartBar != undefined) {
      myChartBar.dispose(); //销毁
    }
    initBar();
  }
};
const debouncedChartResize = debounce(chartResize, 200, false);
</script>
<style lang="scss" scoped>
.winding-road {
  position: absolute;
  bottom: 5%;
  left: 0;
  transform: translateX(-5%);
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
