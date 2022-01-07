<template>
  <div class="manage">
    <!-- 上 -->
    <div class="manage_tab">
      <div
        class="tab_title"
        v-for="(item, index) in tabs"
        :key="item.name"
        @click="handleActive(index, item)"
        :class="{ active: activeindex === index }"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="manage_content">
      <component :is="management"></component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeindex: 0,
      tabs: [
        {
          name: "基本设置",
          tabcom: () => import("@/views/management/manage/Baseset"),
        },
        {
          name: "招生管理",
          tabcom: () => import("@/views/management/manage/Enrollment"),
        },
        {
          name: "园所官网",
          tabcom: () => import("@/views/management/manage/Officialwebsite"),
        },
        {
          name: "信息收集",
          tabcom: () => import("@/views/management/manage/Infomation"),
        },
        {
          name: "教师管理",
          tabcom: () => import("@/views/management/manage/Teacher"),
        },
        {
          name: "班级管理",
          tabcom: () => import("@/views/management/manage/Class"),
        },
        {
          name: "学生管理",
          tabcom: () => import("@/views/management/manage/Student"),
        },
      ],
      management: () => import("@/views/management/manage/Baseset"),
    };
  },

  mounted() {},
  methods: {
    handleActive(index, item) {
      this.activeindex = index;
      this.management = item.tabcom;
    },
  },
};
</script>

<style lang="less">
.manage {
  .manage_tab {
    height: 89px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    line-height: 89px;
    text-align: center;
    padding-left: 35px;
    .tab_title {
      margin-right: 60px;
      color: #6e6d7a;
      font-size: 18px;
      cursor: pointer;
    }
    .active {
      position: relative;
      color: #e5423e;
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
  .manage_content {
    width: 100%;
    background: #f5f5fb;
    padding: 32px;
  }
}
</style>