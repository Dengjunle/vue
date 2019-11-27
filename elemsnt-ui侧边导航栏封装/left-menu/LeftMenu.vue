<template>
  <div>
    <label v-for="item in leftMenu" :key="item.path">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :index="item.path"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
        <left-menu :leftMenu="item.children" ></left-menu>
      </el-submenu>
      <el-menu-item v-if="!item.children" :index="item.path">{{item.name}}</el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: "left-menu",
  props: ["leftMenu"],
  mounted() {
  }
};
</script>

<style lang="scss"></style>
