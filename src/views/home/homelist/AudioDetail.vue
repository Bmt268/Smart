<template>
  <div class="audio_detail">
    <div class="audio_title">{{ audio.title }}</div>
    <div class="audio_middle">
      <img src="@/assets/image/audio/audio.png" alt="" />
    </div>
    <div class="audio_strip">
      <el-slider
        v-model="rate"
        @change="changeProcess"
        :show-tooltip="false"
      ></el-slider>
    </div>
    <div class="audio_bottom">
      <div class="audio_times">
        <div class="time_now">{{ fomatdate(currenttime) }}/</div>
        <div class="time_total">{{ fomatdate(totaltime) }}</div>
      </div>

      <div class="audio_btn">
        <div class="btn_prev" @click="handlePrev">
          <img src="@/assets/image/audio/prev.png" alt="" />
        </div>
        <div class="btn_play" @click="handlePause">
          <img src="@/assets/image/audio/play.png" alt="" v-show="show" />
          <img src="@/assets/image/audio/pause.png" alt="" v-show="!show" />
        </div>
        <div class="btn_next" @click="handleNext">
          <img src="@/assets/image/audio/next.png" alt="" />
        </div>
      </div>

      <div class="audio_button">
        <div class="loop">
          <img :src="imageType" alt="" @click="changeBtn" />
        </div>
        <div class="list" @click="hiddenList">
          <img src="@/assets/image/audio/list.png" alt="" />
        </div>
      </div>
      <audio
        :src="audio.url"
        @timeupdate="updatetime"
        ref="audio"
        autoplay
      ></audio>

      <!-- 列表 -->
      <div class="audio_list" v-show="hidden">
        <div class="list_title">
          <span>总{{ musicList.length }}首</span>
        </div>
        <div class="list_content" ref="listContent">
          <div
            class="list_item"
            v-for="(item, index) in musicList"
            :key="index"
            :class="{ checkitem: checkindex == index }"
            @click="handleMusic(index, item)"
          >
            <div class="music_name">{{ item.title }}</div>
            <div class="music_time">{{ fomatdate(item.duration) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomInit } from "@/common/util.js";
export default {
  data() {
    return {
      rate: 0,
      currenttime: 0,
      totaltime: 0,
      show: false,
      musicList: [],
      checkindex: 0,
      hidden: false,
      model: "loop",
      modelindex: 0,
    };
  },
  props: {
    audio: {
      type: Object,
    },
  },
  mounted() {
    // 获取总时长
    this.$refs.audio.addEventListener("canplaythrough", (e) => {
      this.totaltime = e.target.duration;
    });
    this.$refs.audio.addEventListener("ended", () => {
      if (this.model === "loop") {
        this.$refs.audio.currentTime = 0;
      } else {
        this.handleNext();
      }
      this.$refs.audio.play();
    });
    this.musicList = JSON.parse(localStorage.getItem("readList"));
    console.log(this.audio);
    this.checkindex = this.musicList.findIndex((item) => {
      return item.contentId == this.$route.query.id;
    });
  },
  computed: {
    imageType() {
      return this.model === "loop"
        ? require("@/assets/image/audio/loop.png")
        : this.model === "random"
        ? require("@/assets/image/audio/random.png")
        : require("@/assets/image/audio/return.png");
    },
  },
  methods: {
    fomatdate(time) {
      let date = time | 0;
      let minutes = (date / 60) | 0;

      let seconds = date % 60;

      return minutes + ":" + String(seconds).padStart(2, "0");
    },
    // 歌曲播放进度时长
    updatetime(e) {
      this.currenttime = e.target.currentTime;
      this.rate = (this.currenttime / this.totaltime) * 100;
    },
    // 改变进度条拖拽
    changeProcess(e) {
      console.log(e);
      this.currenttime = (e / 100) * this.totaltime;
      this.$refs.audio.currentTime = this.currenttime;
    },
    isPaly() {
      if (this.show == true) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    // 点击暂停播放
    handlePause() {
      this.show = !this.show;
      this.isPaly();
    },
    // 上一首
    handlePrev() {
      this.checkindex--;
      this.show = false;

      if (this.checkindex < 0) {
        this.checkindex = this.musicList.length - 1;
      }
      this.randomPlay();
      this.$emit("clickMusic", this.musicList[this.checkindex]);
    },
    // 下一首
    handleNext() {
      this.checkindex++;
      this.show = false;
      if (this.checkindex > this.musicList.length - 1) {
        this.checkindex = 0;
      }
      this.randomPlay();
      this.scrollTo();
      this.$emit("clickMusic", this.musicList[this.checkindex]);
    },
    // 音乐列表歌曲切换
    handleMusic(index, item) {
      this.checkindex = index;
      this.show = false;
      this.$emit("clickMusic", item);
    },
    hiddenList() {
      this.hidden = !this.hidden;
    },
    // 循环随机按钮
    changeBtn() {
      let list = ["loop", "return", "random"];
      this.modelindex++;
      if (this.modelindex > 2) {
        this.modelindex = 0;
      }
      this.model = list[this.modelindex];
    },
    //  随机播放
    randomPlay() {
      if (this.model == "random") {
        this.checkindex = getRandomInit(0, this.musicList.length);
      }
    },
    scrollTo() {
      let offset = document.querySelectorAll(".list_item");
      let top = offset[0].clientHeight * this.checkindex;
      this.$refs.listContent.scrollTo({
        top,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="less">
.audio_detail {
  width: 1154px;
  height: 695px;
  background: #ffffff;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid rgba(191, 191, 191, 0.4);
  position: relative;
  .audio_title {
    text-align: center;
    padding: 32px 0 60px 0;
    font-size: 18px;
  }
  .audio_middle {
    width: 360px;
    height: 360px;
    margin: 0 402px;
    img {
      width: 100%;
    }
  }
  .audio_strip {
    padding: 0 127px;
    margin-top: 83px;
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
  }
  .audio_bottom {
    display: flex;
    justify-content: space-between;
    margin: 0 128px;
    margin-top: 20px;
    align-items: center;
    .audio_times {
      display: flex;
      color: #6e6d7a;
      font-size: 16px;
    }
    .audio_btn {
      display: flex;
      align-items: center;
      .btn_prev,
      .btn_next {
        width: 19px;
        height: 22px;
      }
      .btn_play {
        width: 44px;
        height: 44px;
        margin: 0 40px;
      }
      img {
        width: 100%;
        cursor: pointer;
      }
    }
    .audio_button {
      display: flex;
      .loop {
        width: 24px;
        height: 24px;
        margin-right: 47px;
      }
      .list {
        width: 24px;
        height: 24px;
      }
      img {
        width: 100%;
        cursor: pointer;
      }
    }
  }
  .audio_list {
    width: 297px;
    height: 574px;
    background: #fcfcfc;
    box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);
    border-radius: 4px;
    position: absolute;
    top: 0;
    right: 0;
    .list_title {
      margin-left: 25px;
      height: 52px;
      line-height: 52px;
      color: #a7acc7;
      font-size: 12px;
      border-bottom: 1px solid #bfbfbf;
    }
    .list_content {
      height: 522px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      .list_item {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        height: 44px;
        line-height: 44px;
        cursor: pointer;

        .music_name {
          color: #0d0b22;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
        }
        .music_time {
          color: #a7acc7;
          font-size: 16px;
        }
        &:nth-child(odd) {
          background: #f7f7f9;
        }
      }
      .checkitem {
        position: relative;
        .music_name {
          color: #e5423e;
          font-size: 16px;
        }
        &::before {
          content: "";
          width: 12px;
          height: 12px;
          background: url(~@/assets/image/audio/wave.png) no-repeat;
          background-size: cover;
          position: absolute;
          left: 6px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>