// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
// const permissionRouter = {
//   path: "/permission",
//   meta: {
//     title: "权限管理",
//     icon: "ep:lollipop",
//     rank: 10
//   },
//   children: [
//     {
//       path: "/permission/page/index",
//       name: "PermissionPage",
//       meta: {
//         title: "页面权限",
//         roles: ["admin", "common"]
//       }
//     },
//     {
//       path: "/permission/button",
//       meta: {
//         title: "按钮权限",
//         roles: ["admin", "common"]
//       },
//       children: [
//         {
//           path: "/permission/button/router",
//           component: "permission/button/index",
//           name: "PermissionButtonRouter",
//           meta: {
//             title: "路由返回按钮权限",
//             auths: [
//               "permission:btn:add",
//               "permission:btn:edit",
//               "permission:btn:delete"
//             ]
//           }
//         },
//         {
//           path: "/permission/button/login",
//           component: "permission/button/perms",
//           name: "PermissionButtonLogin",
//           meta: {
//             title: "登录接口返回按钮权限"
//           }
//         }
//       ]
//     }
//   ]
// };
const echartsRouter = {
  path: "/echarts",
  meta: {
    title: "图表",
    icon: "ep:pie-chart",
    rank: 10
  },
  children: [
    {
      path: "/echarts/pictorial/index",
      name: "PictorialPage",
      meta: {
        title: "象形柱图",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/echarts/gauge/index",
      name: "GaugePage",
      meta: {
        title: "仪表盘",
        roles: ["admin", "common"]
      }
    }
  ]
};

const elementUIRouter = {
  path: "/elementUI",
  meta: {
    title: "组件",
    icon: "ep:data-board",
    rank: 20
  },
  children: [
    {
      path: "/elementUI/table",
      meta: {
        title: "表格",
        roles: ["admin", "common"]
      },
      children: [
        {
          path: "/elementUI/table/formTable",
          component: "elementUI/table/formTable/index",
          name: "formTablePage",
          meta: {
            title: "表单表格"
          }
        },
        {
          path: "/elementUI/table/test",
          component: "elementUI/table/test/index",
          name: "testPage",
          meta: {
            title: "测试表格"
          }
        }
      ]
    },
    {
      path: "/elementUI/tree",
      meta: {
        title: "树形控件",
        roles: ["admin", "common"]
      },
      children: [
        {
          path: "/elementUI/tree/editTree",
          component: "elementUI/tree/editTree/index",
          name: "editTreePage",
          meta: {
            title: "编辑树"
          }
        }
      ]
    }
  ]
};

const canvasRouter = {
  path: "/canvas",
  meta: {
    title: "画布",
    icon: "ep:operation",
    rank: 30
  },
  children: [
    {
      path: "/canvas/fontRain/index",
      name: "fontRainPage",
      meta: {
        title: "文字雨",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/canvas/verify/index",
      name: "verifyPage",
      meta: {
        title: "验证码",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/canvas/countdown/index",
      name: "countdownPage",
      meta: {
        title: "倒计时",
        roles: ["admin", "common"]
      }
    }
  ]
};

const styleRouter = {
  path: "/style",
  meta: {
    title: "样式",
    icon: "ri:quill-pen-ai-line",
    rank: 30
  },
  children: [
    {
      path: "/style/rotate/index",
      name: "rotatePage",
      meta: {
        title: "3D旋转",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/style/hover/index",
      name: "hoverPage",
      meta: {
        title: "图片悬停",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/style/cardRotate/index",
      name: "cardRotatePage",
      meta: {
        title: "卡片翻转",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/style/drawerPhoto/index",
      name: "drawerPhotoPage",
      meta: {
        title: "抽屉相册",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/style/solidPhoto/index",
      name: "solidPhotoPage",
      meta: {
        title: "立体相册",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/style/glassCard/index",
      name: "glassCardPage",
      meta: {
        title: "玻璃卡片",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/style/loading/index",
      name: "loadingPage",
      meta: {
        title: "加载动画",
        roles: ["admin", "common"]
      }
    }
  ]
};

const threeRouter = {
  path: "/three",
  meta: {
    title: "三维",
    icon: "ri:exchange-2-line",
    rank: 40
  },
  children: [
    {
      path: "/three/ugglyBunny/index",
      name: "ugglyBunnyPage",
      meta: {
        title: "兔子动画",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/three/girl/index",
      name: "girlPage",
      meta: {
        title: "模型加载",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/three/measurement/index",
      name: "measurementPage",
      meta: {
        title: "模型测量",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/three/mirror/index",
      name: "mirrorPage",
      meta: {
        title: "镜子",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/three/car/index",
      name: "carPage",
      meta: {
        title: "汽车",
        roles: ["admin", "common"]
      }
    }
  ]
};

export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          echartsRouter,
          elementUIRouter,
          canvasRouter,
          styleRouter,
          threeRouter
        ]
      };
    }
  }
]);
