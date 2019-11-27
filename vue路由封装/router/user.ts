import Home from "../views/Home.vue";
import Admin from "../views/admin/Admin.vue";
const user = {
    name: "用户管理",
    path: "/user",
    component: Home,
    // child: [
    //   {
    //     name: "用户管理列表",
    //     path: "/user",
    //     component: Home
    //   }
    // ]
  };

export { user };
