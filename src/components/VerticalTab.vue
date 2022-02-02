<template>
  <div class="tabs">
    <!-- 左边 -->
    <div class="tabs_left">
      <div class="base1" v-show="optionsindex === 0">
        {{ tabbase.intro }}
      </div>
      <div class="base2" v-show="optionsindex === 1">
        <div class="active-pro">活动流程</div>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            :name="index"
            v-for="(item, index) in tabbase.process"
            :key="index"
          >
            <template slot="title">
              <span class="num">{{ index + 1 }}</span>
              <span>{{ item.type }}</span>
            </template>
            <div v-html="item.description"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="base3" v-show="optionsindex === 2">
        <video :src="tabbase.training" controls></video>
      </div>
      <div class="base4" v-show="optionsindex === 3">
        <img
          :src="item.small_card"
          alt=""
          v-for="(item, index) in tabbase.cards"
          :key="index"
        />
      </div>
      <div class="base5" v-show="optionsindex === 4">
        <div v-for="item in tabbase.tools" :key="item">{{ item }}</div>
      </div>
      <div class="base6" v-show="optionsindex === 5">
        <img
          :src="item.small_card"
          alt=""
          v-for="(item, index) in tabbase.cards"
          :key="index"
        />
      </div>
      <div class="base7" v-show="optionsindex === 6">
        <div class="course_audio">
          <div class="course_title">狮子叫声</div>
          <div class="course_auto">
            <img src="@/assets/image/home/audio.png" alt="" />
          </div>
          <el-slider v-model="rate"></el-slider>
          <div class="course_time">
            <div class="time_left">0:12</div>
            <div class="time_right">1:18</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="tabs_right">
      <div
        class="right_item"
        v-for="(item, index) in options"
        :key="index"
        :class="{ active: optionsindex == index }"
        @click="handleOption(index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsindex: 0,
      options: [
        { name: "基础信息", id: 1 },
        { name: "教案详情", id: 2 },
        { name: "培训视频", id: 3 },
        { name: "操作卡", id: 4 },
        { name: "教具", id: 5 },
        { name: "课程图片", id: 6 },
        { name: "课程音频", id: 7 },
      ],
      activeName: 0,
      rate: 0,
    };
  },
  props: {
    tabbase: {
      type: Object,
    },
  },
  methods: {
    handleOption(index) {
      this.optionsindex = index;
    },
  },
};
</script>

<style lang="less">
.tabs {
  display: flex;
  .tabs_left {
    width: 528px;
    .base1,
    .base5 {
      width: 445px;
      height: 238px;
      font-size: 16px;
      font-weight: 400;
      color: #6e6d7a;
      margin-top: 32px;
      margin-left: 34px;
      line-height: 34px;
    }
    .base2 {
      padding: 32px;
      height: 740px;
      overflow-y: auto;

      .active-pro {
        font-size: 18px;
        margin-bottom: 40px;
        color: #0d0b22;
      }
      .num {
        width: 32px;
        height: 32px;
        background: #e5f3ff;
        border-radius: 50%;
        line-height: 32px;
        text-align: center;
        color: #1b7ff6;
        margin-right: 16px;
        font-weight: 400;
        font-size: 18px;
      }
    }
    .base3 {
      video {
        width: 100%;
      }
    }
    .base4,
    .base6 {
      img {
        width: 400px;
        height: 300px;
        border-radius: 8px;
        margin-top: 40px;
        margin-left: 64px;
      }
    }
    .base7 {
      padding: 40px 64px;
      .course_audio {
        width: 400px;
        height: 300px;
        background: #f9f9f9;
        border-radius: 8px;
        margin-bottom: 40px;
        padding-top: 22px;
        padding-bottom: 16px;
        .course_title {
          color: #0d0b22;
          font-size: 18px;
          margin-left: 18px;
        }
        .course_auto {
          margin: 17px 120px 0 120px;
          img {
            width: 160px;
            height: 160px;
          }
        }
        .el-slider__runway {
          height: 3px;
        }
        .el-slider__bar {
          background: #e5423e;
          height: 3px;
        }
        .el-slider__button {
          width: 10px;
          height: 10px;
          background: #cd110f;
          border: 1px solid #cd110f;
          box-shadow: 0 0 0 4px rgba(229, 66, 62, 0.3);
        }
        .el-slider__button-wrapper {
          top: -16px;
        }
        .course_time {
          display: flex;
          justify-content: space-between;
          padding: 0 16px;

          font-size: 18px;
          color: #6e6d7a;
        }
      }
    }
  }
  .tabs_right {
    width: 64px;
    height: 740px;
    background: #fafafa;
    display: flex;
    flex-wrap: wrap;
    .right_item {
      width: 64px;
      height: 106px;
      font-size: 16px;
      writing-mode: tb-rl;
      line-height: 64px;
      text-align: center;
      border-bottom: 1px solid #bfbfbf;
      cursor: pointer;
    }
    .active {
      color: #e5423e;
    }
  }
}
</style>
