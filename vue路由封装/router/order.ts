import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Conent from "../views/admin/Conent.vue";
const order = {
    name: "订单管理",
    path: "/about",
    redirect: "/about/list",
    component: Conent,
    children: [
      {
        name: "订单列表",
        path: "/about/list",
        component: Home,
      },
      {
        name: "订单首页",
        path: "/about/home",
        component: About
      }
    ]
  };

export { order };
