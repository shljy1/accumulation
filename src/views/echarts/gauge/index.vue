<template>
  <div id="myGauge" class="w-[800px] h-[500px] box-border" />
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, watch } from "vue";
import { debounce } from "../../../store/utils";
defineOptions({
  name: "GaugePage"
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
  let chartDom = document.getElementById("myGauge");
  myChartBar = echarts.getInstanceByDom(chartDom!);
  if (myChartBar == null) {
    myChartBar = echarts.init(chartDom);
  }
  let option = {
    grid: {
      left: "5%",
      right: "0%",
      top: "25%",
      bottom: "15%",
      containLabel: false
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      textStyle: {
        fontSize: 14
      }
    },
    legend: {
      show: true,
      x: "center",
      y: "10%",
      itemWidth: 20,
      itemHeight: 12,
      textStyle: {
        fontSize: 12
      },
      data: [
        {
          name: "animals",
          itemStyle: {
            color: "#4DB3FE"
          }
        },
        {
          name: "Fruits",
          itemStyle: {
            color: "#2FE2E2"
          }
        }
      ]
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          margin: 12,
          fontSize: 14
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: ["菠萝", "樱桃", "梨", "香蕉"]
      },
      {
        type: "category",
        show: false,
        data: ["菠萝", "樱桃", "梨", "香蕉"]
      },
      {
        type: "category",
        show: false,
        data: ["菠萝", "樱桃", "梨", "香蕉"]
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "瓶",
        nameTextStyle: {
          fontSize: 14,
          align: "right",
          verticalAlign: ""
        },
        nameGap: 15,
        axisLabel: {
          fontSize: 14,
          show: true,
          formatter: "{value}"
        },
        axisLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#DCDCDC"
          }
        }
      }
    ],
    series: [
      {
        type: "bar",
        name: "animals",
        barWidth: 14,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#40ADFF" },
            { offset: 1, color: "rgba(189, 240, 255, 0.3)" }
          ])
        },
        data: [4, 5, 6, 7],
        xAxisIndex: 0
      },
      {
        name: "animals",
        type: "pictorialBar",
        xAxisIndex: 1,
        itemStyle: {
          color: "#BDF0FF"
        },
        tooltip: {
          show: false
        },
        z: 12,
        symbolPosition: "start",
        barWidth: 14,
        symbolSize: [14, 7],
        symbolOffset: [0, Number(5)],
        data: [4, 5, 6, 7]
      },
      {
        name: "animals",
        type: "pictorialBar",
        symbolPosition: "end",
        barWidth: 14,
        symbolSize: [14, 7],
        symbolOffset: [0, -Number(5)],
        xAxisIndex: 2,
        tooltip: {
          show: false
        },
        z: 12,
        itemStyle: {
          color: "#9BD4FF"
        },
        data: [4, 5, 6, 7]
      },
      {
        type: "bar",
        name: "Fruits",
        barWidth: 14,
        xAxisIndex: 0,
        barGap: "100%",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#1FE0E0" },
            { offset: 1, color: "rgba(189, 255, 251, 0.3)" }
          ])
        },
        data: [10, 11, 12, 13]
      },
      {
        name: "Fruits",
        type: "pictorialBar",
        barWidth: 14,
        symbolSize: [14, 7],
        symbolOffset: [0, Number(5)],
        barGap: "100%",
        tooltip: {
          show: false
        },
        xAxisIndex: 1,
        z: 12,
        itemStyle: {
          color: "#AAFFF9"
        },
        symbolPosition: "start",
        data: [10, 11, 12, 13]
      },
      {
        name: "Fruits",
        type: "pictorialBar",
        barWidth: 14,
        symbolSize: [14, 7],
        symbolOffset: [0, -Number(5)],
        symbolPosition: "end",
        barGap: "100%",
        tooltip: {
          show: false
        },
        z: 12,
        xAxisIndex: 2,
        itemStyle: {
          color: "#AAFFF9"
        },
        data: [10, 11, 12, 13]
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
