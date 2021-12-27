<template>
  <div class="mycollect">
    <!-- 标题 -->
    <div class="collect_title">
      <div
        class="nav_list"
        v-for="(item, index) in tags"
        :key="index"
        :class="{ active: navindex == index }"
        @click="handlenav(index, item)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="collect_content">
      <keep-alive>
        <material
          v-for="(item, index) in collect_content"
          :key="index"
          :citem="item"
          @handleRead="chandleRead"
        >
        </material>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Material from "@/components/Material";

import { newCellectionList } from "@/api/home.js";

export default {
  data() {
    return {
      tags: [
        {
          type: 4,
          name: "专题包",
        },
        {
          type: 0,
          name: "活动",
        },
        {
          type: 2,
          name: "绘本",
        },
        {
          type: 9,
          name: "视频",
        },
        {
          type: 10,
          name: "游戏",
        },
        {
          type: 3,
          name: "音乐",
        },
        {
          type: 11,
          name: "区角",
        },
        {
          type: 1,
          name: "图片",
        },
      ],
      navindex: 0,
      collect_content: [],
      collect_type: 0,
    };
  },
  components: {
    Material,
  },
  methods: {
    handlenav(index, item) {
      this.navindex = index;
      this.collect_type = item.type;
      localStorage.setItem("collect", this.collect_type);
      this.newCellectionListFun();
    },
    chandleRead(citem) {
      if (this.collect_type == 4) {
        this.$router.push({
          path: "/read",
          query: { special_id: citem.contentId },
        });
      } else {
        this.$router.push({
          path: "/materialdetail",
          query: {
            id: citem.contentId,
            type: citem.contentType,
          },
        });
      }
    },
    newCellectionListFun() {
      newCellectionList({ type: this.collect_type }).then((res) => {
        console.log(res);
        this.collect_content = res.data;
      });
    },
  },
  mounted() {
    this.collect_type = localStorage.getItem("collect") || this.tags[0].type;
    this.navindex = this.tags.findIndex((item) => {
      return item.type == localStorage.getItem("collect");
    });
    this.newCellectionListFun();
  },
};
</script>

<style lang="less">
.collect_title {
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
.collect_content {
  min-height: 100vh;
  display: flex;
  background: #f5f5fb;
  padding: 32px;
  flex-wrap: wrap;
}
</style>