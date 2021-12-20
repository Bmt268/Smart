<template>
  <div class="read">
    <!-- 上面 -->
    <div class="read_top">
      <!-- top顶部 -->
      <div class="main_top">
        <div class="el-icon-back" @click="backlast"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>综合包</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- top 内容 -->
      <div class="top_content">
        <div class="top_left">
          <img :src="readtop.img_url" alt="" />
        </div>
        <div class="top_right">
          <div class="reading">{{ readtop.title }}</div>
          <div class="read_collect" @click="handleAdd">
            {{ readtop.collect ? "已收藏" : "+收藏" }}
          </div>
          <div class="read_intro">
            {{ readtop.intro }}
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="read_cont">
      <material
        v-for="(item, index) in read_list"
        :key="index"
        :citem="item"
      ></material>
    </div>
  </div>
</template>

<script>
import Material from "@/components/Material";

import {
  getSpecialContent,
  getSpecialImg,
  newAddCellection,
  newDleCellection,
} from "@/api/home.js";

export default {
  data() {
    return {
      id: "",
      readtop: {},
      offset: 0,
      read_list: [],
    };
  },
  components: {
    Material,
  },
  methods: {
    backlast() {
      this.$router.back();
    },
    // 上面标题
    getSpecialContentFun() {
      getSpecialContent({ id: this.id }).then((res) => {
        console.log(res);
        this.readtop = res.data.pack;
      });
    },
    // 下面图片内容
    getSpecialImgFun() {
      let params = {
        offset: this.offset,
        num: 20,
        special_id: this.id,
        tags: [],
        type: 5,
      };
      getSpecialImg(params).then((res) => {
        // console.log(res);
        this.read_list = res.data.list;
      });
    },
    // 收藏
    newAddCellectionFun() {
      let params = {
        sourceId: this.id,
        sourceType: 4,
        title: this.readtop.title,
      };
      newAddCellection(params).then((res) => {
        console.log(res);
        this.$message({
          message: "已收藏",
          type: "success",
        });
      });
    },
    newDleCellectionFun() {
      let params = {
        sourceId: this.id,
        sourceType: 4,
        title: this.readtop.title,
      };
      newDleCellection(params).then((res) => {
        console.log(res);
        this.$message({
          message: "取消收藏",
          type: "success",
        });
      });
    },
    handleAdd() {
      this.readtop.collect
        ? this.newDleCellectionFun()
        : this.newAddCellectionFun();
      this.getSpecialContentFun();
    },
  },
  mounted() {
    this.id = this.$route.query.special_id;
    this.getSpecialContentFun();
    this.getSpecialImgFun();
  },
};
</script>

<style lang="less">
.read {
  display: flex;
  flex-wrap: wrap;
  .read_top {
    padding-left: 35px;
    padding-top: 30px;

    .main_top {
      display: flex;
      justify-content: flex-start;
      align-items: center;

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
  }
  .top_content {
    display: flex;
    justify-content: center;
    margin-top: 32px;
    .top_left {
      img {
        width: 230px;
        height: 240px;
      }
    }
    .top_right {
      margin-left: 47px;
      position: relative;
      .reading {
        font-size: 32px;
        color: #0d0b22;
        font-weight: bold;
      }
      .read_collect {
        position: absolute;
        top: 25px;
        right: 50px;
        width: 104px;
        height: 44px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        line-height: 44px;
        text-align: center;
        color: #6e6d7a;
        cursor: pointer;
      }
      .read_intro {
        margin-top: 40px;
        width: 1186px;
        height: 135px;
        font-size: 18px;
        font-weight: 400;
        color: #0d0b22;
      }
    }
  }
}
.read_cont {
  min-height: 100vh;
  display: flex;
  background: #f5f5fb;
  padding: 32px;
  flex-wrap: wrap;
  width: 100%;
  .material_wrap {
    height: 600px;
  }
}
</style>