import Vue from "vue";
import VueRouter from "vue-router";
import config from "./config";
import Admin from "../views/admin/Admin.vue";
import Login from "../views/login/Login.vue";
/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error);
// };
Vue.use(VueRouter);
let rou = countss(config);
function countss(config:any) {
  let counts:any = [];
  if (config instanceof Array) {
    config.forEach(item => {
      if(item.children){
        counts = [...counts,...countss(item.children)];
      }else{
        counts.push(item);
      }
    });
  }else{
    counts.push(config);
  }
  return counts
}

let routes: any = [
  {
    path: "/",
    name: "管理员后台页面",
    component: Admin,
    redirect: "/user",
    children: rou
  },
  {
    path: "/login",
    name: "登录后台页面",
    component: Login,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
