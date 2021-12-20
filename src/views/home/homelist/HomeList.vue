<template>
  <div class="homelist">
    <!-- 选项卡 -->
    <div class="nav_wrap">
      <div
        class="nav_list"
        v-for="(item, index) in choice"
        :key="index"
        @click="handlenav(index, item)"
        :class="{ active: navindex == index }"
      >
        {{ item.title }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="ma_cont">
      <material
        v-for="(item, index) in material_content"
        :key="index"
        :citem="item"
        @handleRead="chandleRead"
      >
      </material>
    </div>
  </div>
</template>

<script>
import Material from "@/components/Material";

import { getCategoryMaterial, getMaterialSpecial } from "@/api/home.js";
export default {
  data() {
    return {
      navindex: 0,
      id: "",
      choice: "",
      material_content: [],
      offset: 0,
      category_id: 0,
    };
  },
  components: {
    Material,
  },
  methods: {
    handlenav(abc, item) {
      this.navindex = abc;
      this.category_id = item.id;
      this.getMaterialSpecialFun();
    },
    chandleRead(citem) {
      this.$router.push({
        path: "/read",
        query: { special_id: citem.special_id },
      });
      // console.log(citem);
    },
    // 选项卡
    getCategoryMaterialFun() {
      getCategoryMaterial({ navigate_id: this.id }).then((res) => {
        // console.log(res);
        this.choice = res.data;
        this.category_id = res.data[0].id;
        this.getMaterialSpecialFun();
      });
    },
    // 选项下面内容
    getMaterialSpecialFun() {
      let params = {
        offset: this.offset,
        num: 20,
        category_id: this.category_id,
        tags: [],
      };
      getMaterialSpecial(params).then((res) => {
        console.log(res);
        this.material_content = res.data.pack_list;
      });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getCategoryMaterialFun();
  },
};
</script>

<style lang="less">
.nav_wrap {
  height: 80px;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  padding-left: 36px;
  .nav_list {
    font-weight: bold;
    color: #6e6d7a;
    font-size: 18px;
    text-align: center;
    line-height: 80px;
    margin-right: 60px;
    cursor: pointer;
  }
  .active {
    color: #e5423e;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 6px;
      background: #e5423e;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 3px;
    }
  }
}
.ma_cont {
  min-height: 100vh;
  display: flex;
  background: #f5f5fb;
  padding: 32px;
  flex-wrap: wrap;
}
</style>