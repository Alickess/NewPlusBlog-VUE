import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import UserManage from "../views/UserManage";
import BlogManage from "../views/BlogManage";
import PermissionManage from "../views/PermissionManage";
import RoleManage from "../views/RoleManage";
import BlogDetail from "../views/BlogDetail";
import SystemLog from "../views/SystemLog";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    component: Home,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        meta: { title: "系统首页" },
      },
      {
        path: "/user",
        component: UserManage,
        meta: { title: "用户管理" },
      },
      {
        path: "/blog",
        component: BlogManage,
        meta: { title: "博客管理" },
      },
      {
        path: "/blogDetail",
        name:"BlogDetail",
        component: BlogDetail,
        meta: { title: "博客内容" },
        props: true,
        hidden: true,
      },
      {
        path: "/role",
        component: RoleManage,
        meta: { title: "角色管理" },
      },
      {
        path: "/permission",
        component: PermissionManage,
        meta: { title: "权限管理" },
      },
      {
        path: "/systemLog",
        component: SystemLog,
        meta: { title: "系统日志" },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "登录" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
