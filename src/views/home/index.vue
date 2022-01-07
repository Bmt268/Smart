<template>
  <div class="home">
    <!-- 轮播图 -->
    <el-carousel>
      <el-carousel-item v-for="item in bannerlist" :key="item.image">
        <img :src="item.image" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 活动 -->
    <div class="category">
      <!-- 六大分类 -->
      <div class="kind">
        <div
          class="kind_item"
          v-for="(item, index) in kindList"
          :key="index"
          @click="handleKindList(item)"
        >
          <img :src="item.src" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <!-- 集体活动 -->
      <div class="active" @click="activeDetail">
        <img src="@/assets/image/home/active.png" alt="" />
      </div>
      <!-- 开始上课 -->
      <div class="classing">
        <img src="@/assets/image/home/@2x.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getBannerList } from "@/api/home";
export default {
  data() {
    return {
      kindList: [
        {
          title: "绘本",
          id: 3,
          src: require("@/assets/image/home/1.png"),
        },
        {
          title: "视频",
          id: 5,
          src: require("@/assets/image/home/2.png"),
        },
        {
          title: "游戏",
          id: 6,
          src: require("@/assets/image/home/3.png"),
        },
        {
          title: "音乐",
          id: 4,
          src: require("@/assets/image/home/4.png"),
        },
        {
          title: "区角",
          id: 10,
          src: require("@/assets/image/home/5.png"),
        },
        {
          title: "图片",
          id: 2,
          src: require("@/assets/image/home/6.png"),
        },
      ],
      bannerlist: [],
    };
  },
  mounted() {
    this.getBannerListFun();
  },
  methods: {
    // 获取轮播图
    getBannerListFun() {
      getBannerList({ need_first: 1 }).then((res) => {
        this.bannerlist = res.data;
      });
    },
    // 六大分类跳转点击
    handleKindList(item) {
      this.$router.push({
        path: "/homelist",
        query: { id: item.id },
      });
    },
    // 集体活动跳转点击
    activeDetail() {
      this.$router.push({
        path: "/teamactive",
      });
    },
  },
};
</script>

<style lang="less">
.home {
  padding: 32px;
  background: #f5f5fb;
  .el-carousel__item img {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
    width: 1746px;
    height: 486px;
    object-fit: cover;
  }
  .category {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
  }
  .kind {
    width: 1088px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .kind_item {
    display: flex;
    width: 33.33%;
    align-items: center;
    padding-left: 62px;
    cursor: pointer;
  }
  .kind_item img {
    width: 100px;
    height: 100px;
    margin-right: 39px;
  }
  .kind_item span {
    color: #6e6d7a;
    font-size: 32px;
  }
  .active {
    width: 264px;
    height: 316px;
    margin: 0 32px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  .classing {
    width: 334px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .el-carousel {
    height: 460px;
  }
  .el-carousel__container {
    height: 460px;
  }
}
</style>