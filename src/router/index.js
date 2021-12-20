import Vue from "vue";
import VueRouter from "vue-router";
import mainLayout from "@/layouts/mainLayout.vue";
import Home from "@/views/home/index.vue";
import Login from "@/views/login/index.vue";

Vue.use(VueRouter);
// 通用路由
const commonRouterMap = [
  {
    path: "/user/login",
    component: Login
  }
];

// 首页
const homeRouterMap = [
  {
    path: "/",
    component: mainLayout,
    redirect: "/home",
    hidden: true,
    children: [
      {
        path: "home",
        name: "homeIndex",
        component: Home
      },
      {
        path: "homelist",
        name: "homeList",
        component: () =>
          import(
            /* webpackChunkName: "homelist" */ "../views/home/homelist/HomeList.vue"
          )
      },
      {
        path: "read",
        name: "Read",
        component: () =>
          import(
            /* webpackChunkName: "read" */ "../views/home/homelist/Read.vue"
          )
      },
      {
        path: "teamactive",
        name: "TeamActive",
        component: () =>
          import(
            /* webpackChunkName: "teamactive" */ "../views/home/homelist/TeamActive.vue"
          )
      },
      {
        path: "baseread",
        name: "BaseRead",
        component: () =>
          import(
            /* webpackChunkName: "baseread" */ "../views/home/homelist/BaseRead.vue"
          )
      }
    ]
  }
];
const schoolRouterMap = [
  {
    path: "/school",
    component: mainLayout,
    redirect: "/school/sourceUploadFirst",
    children: [
      {
        path: "sourceUploadFirst",
        name: "sourceUploadFirst",
        component: () =>
          import(/* webpackChunkName: "school" */ "../views/school/index.vue")
      }
    ]
  }
];
// 课表
const classRouterMap = [
  {
    path: "/AIClass",
    component: mainLayout,
    redirect: "/AIClass/index",
    children: [
      {
        path: "index",
        name: "AIClass",
        component: () =>
          import(/* webpackChunkName: "AIClass" */ "../views/AIClass/index.vue")
      }
    ]
  }
];

const mycollectRouterMap = [
  {
    path: "/mycollect",
    component: mainLayout,
    redirect: "/mycollect/index",
    children: [
      {
        path: "index",
        name: "mycollect",
        component: () =>
          import(
            /* webpackChunkName: "mycollect" */ "../views/mycollect/index.vue"
          )
      }
    ]
  }
];

const managementRouterMap = [
  {
    path: "/management",
    component: mainLayout,
    redirect: "/management/index",
    children: [
      {
        path: "index",
        name: "management",
        component: () =>
          import(
            /* webpackChunkName: "management" */ "../views/management/index.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes: [
    ...commonRouterMap,
    ...homeRouterMap,
    ...schoolRouterMap,
    ...classRouterMap,
    ...mycollectRouterMap,
    ...managementRouterMap
  ]
});

export default router;
