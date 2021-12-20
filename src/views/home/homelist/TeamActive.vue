<template>
  <div class="team_active">
    <!-- 集体上面 -->
    <div class="team_top">
      <!-- 活动顶部 -->
      <div class="active_top">
        <div class="el-icon-back" @click="backlast"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>集体教学</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 选项卡 -->
      <div class="active_wrap">
        <div
          class="active_list"
          v-for="(item, index) in teamList"
          :key="index"
          @click="handleactive(index, item)"
          :class="{ active: actindex == index }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <!-- 活动内容 -->
    <div class="team_content">
      <div
        class="team_love"
        v-for="(item, index) in team_detail"
        :key="index"
        @click="handleToBase(item)"
      >
        <img :src="item.cover_url" alt="" />
        <div class="love_intr">
          <h2>{{ item.title }}</h2>
          <p>
            <span>【课程目标】</span>
            <span class="info">{{ item.slogan }}</span>
          </p>
          <p>
            <span>【适合年龄】</span>
            <span class="info">{{ item.fit_age }}</span>
          </p>
          <p>
            <span>【五大领域】</span>
            <span class="info">{{ item.field }}</span>
          </p>
          <p>
            <span>【课程体系】</span>
            <span class="info">{{ item.curriculum_system }}</span>
          </p>
          <p>
            <span>【配套材料】</span>
            <span class="info">{{ item.supporting_materials }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSeriesCategory, searchSerialsSome } from "@/api/home";
export default {
  data() {
    return {
      teamList: [],
      actindex: 0,
      id: 0,
      team_detail: [],
    };
  },
  methods: {
    backlast() {
      this.$router.back();
    },
    handleactive(index, item) {
      this.actindex = index;
      this.id = item.id;
      this.searchSerialsSomeFun();
    },
    handleToBase(item) {
      this.$router.push({
        path: "/baseread",
        query: { id: item.pack_id },
      });
    },
    async getSeriesCategoryFun() {
      let res = await getSeriesCategory();
      //   console.log(res);
      this.teamList = res.data;
      this.classify = res.data[0].id;
      this.searchSerialsSomeFun();
    },
    searchSerialsSomeFun() {
      let params = {
        keyword: "",
        type: 1,
        material_type: "",
        classify: this.id,
        tags: [],
      };
      searchSerialsSome(params).then((res) => {
        console.log(res);
        this.team_detail = res.data;
      });
    },
  },
  mounted() {
    this.getSeriesCategoryFun();
  },
};
</script>

<style lang="less">
.team_top {
  .active_top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 30px;
    margin-left: 35px;

    .el-icon-back {
      width: 21px;
      height: 16px;
      color: #6e6d7a;
      font-weight: 600;
      cursor: pointer;
    }
    .el-breadcrumb {
      margin-left: 32px;
    }
  }
  .active_wrap {
    height: 80px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    padding-left: 36px;
    .active_list {
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
}
.team_content {
  background: #f5f5fb;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  .team_love {
    width: 852px;
    height: 292px;
    background: #ffffff;
    box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);
    border-radius: 4px;
    display: flex;
    padding: 30px;
    margin: 20px;
    img {
      width: 176px;
      height: 234px;
      border-radius: 4px;
      margin-right: 35px;
    }
    .love_intr {
      h2 {
        font-size: 24px;
        font-weight: bold;
        color: #0d0b22;
        margin-bottom: 29px;
      }
      p {
        width: 562px;
        color: #6e6d7a;
        font-size: 18px;
        letter-spacing: 0.8px;
        line-height: 34px;
        display: flex;
        align-items: center;
        .info {
          display: inline-block;
          width: 400px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>