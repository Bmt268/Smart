<template>
  <div class="base">
    <!-- 上 -->
    <div class="base_nav">
      <!-- 索引栏 -->
      <div class="base_top">
        <div class="el-icon-back" @click="backlast"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>集体教学</el-breadcrumb-item>
          <el-breadcrumb-item>基础阅读</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 上内容 -->
      <div class="top_content">
        <div class="top_left">
          <img :src="topwrap.category_image" alt="" />
        </div>
        <div class="top_right">
          <div class="reading">{{ topwrap.name }}.</div>
          <div class="read_arr">一键排课</div>
          <div class="read_intro">{{ topwrap.description }}</div>
        </div>
      </div>
      <!-- 上底部 -->
      <div class="top_more">查看更多</div>
      <!-- 班级选择 -->
      <div class="top_bottom">
        <div
          class="top_class"
          v-for="(item, index) in topclass"
          :key="index"
          @click="handleclass(index, item)"
          :class="{ active: classindex == index }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 下 -->
    <div class="base_content">
      <el-collapse @change="handleChange" v-model="activeNames" accordion>
        <el-collapse-item
          :title="item.name"
          v-for="(item, index) in baseDetail"
          :key="index"
          :name="index"
        >
          <div class="base_title">
            <material
              v-for="(item1, index) in item.class"
              :key="index"
              :citem="item1"
            ></material>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Material from "@/components/Material";
import { getSerialsDetail, getThemeSerial } from "@/api/home";
export default {
  data() {
    return {
      id: "",
      topwrap: {},
      topclass: [
        { name: "小班", id: 16 },
        { name: "中班", id: 32 },
        { name: "大班", id: 64 },
      ],
      classindex: 0,
      age: 16,
      activeNames: [0],
      baseDetail: [],
    };
  },
  components: {
    Material,
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getSerialsDetailFun();
    this.getThemeSerialFun();
  },
  methods: {
    backlast() {
      this.$router.back();
    },
    getSerialsDetailFun() {
      getSerialsDetail({ project: this.id }).then((res) => {
        // console.log(res);
        this.topwrap = res.data;
      });
    },
    handleclass(index, item) {
      this.classindex = index;
      this.age = item.id;
      this.getThemeSerialFun();
    },
    getThemeSerialFun() {
      getThemeSerial({
        age: this.age,
        project: this.id,
      }).then((res) => {
        console.log(res);
        this.baseDetail = res.data.theme;
        console.log(this.baseDetail);
      });
    },
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less">
.base {
  display: flex;
  flex-direction: column;
  .base_nav {
    // display: flex;
    .base_top {
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
    .top_content {
      display: flex;
      margin-top: 32px;
      padding-left: 32px;
      .top_left {
        img {
          width: 175px;
          height: 233px;
          border-radius: 4px;
        }
      }
      .top_right {
        margin-left: 47px;
        position: relative;
        .reading {
          font-size: 24px;
          color: #0d0b22;
          font-weight: bold;
        }
        .read_arr {
          position: absolute;
          top: 15px;
          right: 34px;
          width: 116px;
          height: 44px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          line-height: 44px;
          text-align: center;
          color: #ffffff;
          background: #e5423e;
          cursor: pointer;
        }
        .read_intro {
          margin-top: 40px;
          width: 1467px;
          height: 135px;
          font-size: 18px;
          font-weight: 400;
          color: #0d0b22;
        }
      }
    }
    .top_more {
      text-align: center;
      font-size: 16px;
      color: #6e6d7a;
      cursor: pointer;
    }
    .top_bottom {
      margin-left: 32px;
      margin-top: 40px;
      display: flex;
      .top_class {
        font-size: 18px;
        margin-right: 60px;
        color: #6e6d7a;
        height: 50px;
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
  .base_content {
    background: #f5f5fb;
    padding: 32px;
    .el-collapse-item__header {
      padding-left: 35px;
    }
    .el-collapse-item__header.is-active {
      color: #e5423e;
      background: #f7f7f9;
    }
    .base_title {
      display: flex;
      flex-wrap: wrap;
      background: #f7f7f9;
    }
  }
}
</style>