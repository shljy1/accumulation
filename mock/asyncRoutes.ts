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
    }
  ]
};

const canvasRouter = {
  path: "/canvas",
  meta: {
    title: "画布",
    icon: "ep:data-board",
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
        data: [echartsRouter, elementUIRouter, canvasRouter]
      };
    }
  }
]);
