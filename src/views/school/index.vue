<template>
  <div class="sch">
    <!-- 顶部 -->
    <div class="top">
      <div class="uploading">
        <div
          class="source"
          v-for="(item, index) in soureList"
          :key="index"
          :class="{ active: isactive == index }"
          @click="handleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div
        class="content_item"
        v-for="item in accessories"
        :key="item.id"
        @click="handleDetail(item)"
      >
        <img :src="item.type == 0 ? publicimg : classimg" alt="" />
        <div class="item_titles">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateGoryRoot } from "@/api/home.js";
export default {
  data() {
    return {
      isactive: 0,
      soureList: ["上传资源", "已购素材"],
      accessories: [],
      publicimg: require("@/assets/image/publicFolder.png"),
      classimg: require("@/assets/image/classSource.png"),
    };
  },
  mounted() {
    this.getCateGoryRootFun();
  },
  methods: {
    handleClick(index) {
      this.isactive = index;
    },
    getCateGoryRootFun() {
      getCateGoryRoot({ from: 1 }).then((res) => {
        console.log(res);
        this.accessories = res.data;
      });
    },
    handleDetail(item) {
      this.$router.push({
        path: "/school/public",
        query: {
          id: item.id,
          type: item.type,
          title: item.title,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sch {
  .top {
    .uploading {
      display: flex;
      align-items: center;
      height: 89px;
      padding: 32px;
      .source {
        font-size: 18px;
        color: #6e6d7a;
        font-weight: bold;
        cursor: pointer;
        margin-right: 60px;
      }
      .active {
        color: #e5423e;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: -33px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #e5423e;
          border-radius: 10px;
        }
      }
    }
  }
  .content {
    background-color: #f5f5fb;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-left: 32px;
    height: calc(100vh - 89px - 66px);
    .content_item {
      width: 414px;
      height: 320px;
      background: #ffffff;
      border-radius: 4px;
      text-align: center;
      margin-right: 28px;
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: 0.3s;
      .item_titles {
        font-size: 18px;
        color: #0d0b22;
      }
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-top: 89px;
        margin-bottom: 53px;
      }
      &:hover {
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
        transform: translateY(-6px);
      }
    }
  }
}
</style>