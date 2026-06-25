function getParametricEquation(
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 1;
      }
      return Math.sin(v) > 0 ? h * 1 : -1;
    }
  };
}

export default function getPie3D(pieData, internalDiameterRatio, cfg = {}) {
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k = internalDiameterRatio;
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      value:
        typeof pieData[i].value === "undefined"
          ? `series${i}`
          : pieData[i].value,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle = {};

      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;

      seriesItem.itemStyle = itemStyle;
    }
    seriesItem.label = {
      formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
      backgroundColor: "#eee",
      borderColor: "#aaa",
      borderWidth: 1,
      borderRadius: 4,
      rich: {
        a: {
          color: "#999",
          lineHeight: 22,
          align: "center"
        },
        hr: {
          borderColor: "#aaa",
          width: "100%",
          borderWidth: 0.5,
          height: 0
        },
        b: {
          fontSize: 16,
          lineHeight: 33
        },
        per: {
          color: "#eee",
          backgroundColor: "#334455",
          padding: [2, 4],
          borderRadius: 2
        }
      }
    };
    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.height || series[i].pieData.value
    );

    startValue = endValue;
    legendData.push(series[i].name);
  }

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    //animation: false,
    backgroundColor: "#041527",
    title: {
      text: "1111",
      subtext: "总装机MW",
      textStyle: {
        color: "#fff"
      },
      subtextStyle: {
        color: "#fff"
      },
      left: "center",
      top: "center"
    },
    legend: {
      icon: "rect",
      data: legendData,
      top: 15,
      width: 150,
      itemGap: 20,
      right: 20,
      itemWidth: 6,
      itemHeight: 6,
      formatter: function (value) {
        var res = "";
        for (var i = 0; i < pieData.length; i++) {
          if (pieData[i].name == value) {
            res = pieData[i].name + pieData[i].number;
            res = `{name|${pieData[i].name}}{value|${pieData[i].number}${pieData[i].unit}}`;
          }
        }
        return res;
      },
      textStyle: {
        fontSize: 16,
        color: "#fff",
        padding: 0,
        rich: {
          name: {
            width: 100,
            align: "left"
          },
          value: {
            width: 50,
            align: "right"
          }
        }
      },
      rich: {
        align: "center",
        text: {
          fontSize: 14,
          color: "#fff",
          fontWeight: "500",
          padding: [15, 0, 5, 0]
        }
      },
      color: "#fff"
    },
    tooltip: {
      formatter: params => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${
            params.seriesName
          }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params.color
          };"></span>${option.series[params.seriesIndex].pieData.number}${
            option.series[params.seriesIndex].pieData.unit
          }`;
        }
      }
    },
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: cfg.grid3D || {
      show: false,
      boxHeight: 15,
      viewControl: {
        alpha: 60,
        distance: (0.8 + k) * 180,
        autoRotate: false
      },
      light: {
        main: {
          intensity: 0.6
          // shadow: true
        }
        // ambientCubemap: {
        //   exposure: 0,
        //   diffuseIntensity: 1,
        //   specularIntensity: 0.5
        // }
        // ambient: {
        //   intensity: 0.02
        // }
      }
    },
    series: series
  };
  return option;
}
