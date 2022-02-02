<template>
  <div class="class_wrap">
    <div class="class_top">
      <div class="class_back">
        <div class="back_arrow">
          <img
            src="@/assets/image/home/classback.png"
            alt="返回图片"
            @click="backlast"
          />
        </div>
        <div class="back_alphabet">返回</div>
      </div>
      <div class="class_search">
        <div class="entering">
          <div class="tran_search"></div>
          <input type="text" placeholder="搜索“幼升小、特色课等”" />
        </div>
        <div class="standby">
          <img src="@/assets/image/home/black.png" alt="" />
        </div>
        <div class="bonus">
          <img src="@/assets/image/home/bonus.png" alt="" />
        </div>
      </div>
    </div>
    <div class="start_class">
      <!-- 日历 -->
      <div class="calendar">
        <div
          class="calendar_date"
          v-for="(item, index) in weekdata"
          :key="item.title"
          @click="handledate(index)"
          :class="{ active_date: weekindex === index }"
        >
          <div class="week">{{ item.title }}</div>
          <div class="ext_date">{{ item.day }}</div>
        </div>
      </div>
      <!-- 活动 -->
      <div class="activities">
        <div
          class="tivity"
          v-for="(item, index) in activelist"
          :key="item.id"
          :class="{ active: activeindex === index }"
          @click="handleindex(index)"
        >
          {{ item.title }}
        </div>
      </div>
      <!-- 素材内容 -->
      <div class="source_material">
        <div class="left_arrow">
          <img src="@/assets/image/home/leftarrow.png" alt="" />
        </div>
        <div class="source_content">
          <div class="source_top">
            <img src="@/assets/image/home/arrange.png" alt="" v-if="!showimg" />
            <img
              src="@/assets/image/home/arrangecheck.png"
              alt=""
              v-else
              @click="handleimg"
            />
            <img
              class="recommend"
              src="@/assets/image/home/recommend.png"
              alt=""
              v-if="!showimg"
              @click="handleimg"
            />
            <img
              class="recommends"
              src="@/assets/image/home/recom.png"
              alt=""
              v-else
            />
          </div>
          <!-- 排课素材 -->
          <div class="material_content" v-if="!showimg">
            <div
              class="class_detail"
              v-for="(item, index) in detailList"
              :key="item.id"
              @click="handleDetail(item, index)"
            >
              <div class="bbimg">
                <img :src="item.coverImageUrl" alt="" />
              </div>
              <div class="bbname">
                <div class="bbtitle">{{ item.title }}</div>
                <div class="bbkind">{{ type[item.contentType] }}</div>
              </div>
              <div class="bbintro">
                {{ item.intro }}
              </div>
            </div>
          </div>
          <!-- 推荐素材 -->
          <div class="material_content" v-else>
            <div
              class="class_detail"
              v-for="(item, index) in recomList"
              :key="item.id"
              @click="handleDetail(item, index)"
            >
              <div class="bbimg">
                <img :src="item.coverImageUrl" alt="" />
              </div>
              <div class="bbname">
                <div class="bbtitle">{{ item.title }}</div>
                <div class="bbkind">{{ type[item.contentType] }}</div>
              </div>
              <div class="bbintro">
                {{ item.intro }}
              </div>
            </div>
            <div class="nodata" v-if="recomList.length == 0">暂无数据</div>
          </div>
        </div>
      </div>
      <!-- 点名 -->
      <div class="class_call"></div>
    </div>
  </div>
</template>

<script>
import { getProcess, getProcessClass } from "@/api/home.js";
export default {
  data() {
    return {
      activeindex: 0,
      weekindex: 0,
      showimg: false,
      weekdata: [],
      activelist: [],
      detailList: [],
      recomList: [],
      type: ["活动", "图片", "绘本", "音乐", "", "", "", "", "游戏", "视频"],

      // processStudyId: "",
    };
  },
  mounted() {
    this.getweek();
    this.getProcessFun();
  },
  methods: {
    backlast() {
      this.$router.go(-1);
    },
    // 点击活动列表
    handleindex(index) {
      this.activeindex = index;
      console.log(this.activeindex);
      this.getProcessClassFun();
    },
    // 点击日历
    handledate(index) {
      this.weekindex = index;
      this.getProcessFun();
    },
    // 点击素材
    handleimg() {
      console.log(123);
      this.showimg = !this.showimg;
    },
    // 点击跳转详情
    handleDetail(item) {
      let result = this.showimg ? this.recomList : this.detailList;
      localStorage.setItem("readList", JSON.stringify(result));
      this.$router.push({
        path: "/materialdetail",
        query: {
          id: item.contentId,
          type: item.contentType,
          specialId: item.id,
        },
      });
    },
    getweek() {
      const dateOfToday = Date.now();
      const dayOfToday = (new Date().getDay() + 7 - 1) % 7;
      const daysOfThisWeek = Array.from(new Array(7)).map((_, i) => {
        const date = new Date(
          dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24
        );
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      });
      let week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      daysOfThisWeek.forEach((item, index) => {
        this.weekdata.push({
          title: week[index],
          date: item,
          day: item.substring(item.length - 2),
        });
      });
      console.log(this.weekdata);
    },
    // 活动列表
    getProcessFun() {
      let params = {
        roomId: localStorage.getItem("roomid"),
        date: this.weekdata[this.weekindex].date.replace(/-/g, ""),
      };
      getProcess(params).then((res) => {
        console.log(res);
        this.activelist = res.data;
        this.processStudyId = res.data[this.activeindex].processStudyId;
        this.getProcessClassFun();
      });
    },
    // 素材信息
    getProcessClassFun() {
      let params = {
        roomId: localStorage.getItem("roomid"),
        date: this.weekdata[this.weekindex].date.replace(/-/g, ""),
        processStudyId: this.activelist[this.activeindex].processStudyId,
      };
      getProcessClass(params).then((res) => {
        console.log(res, "class");
        this.detailList = res.data.arranged;
        this.recomList = res.data.recommended;
      });
    },
  },
  // watch: {
  //   activeindex(a, b) {
  //     console.log(a, b);
  //     this.processStudyId = this.activelist[a].processStudyId;
  //     this.getProcessClassFun();
  //   },
  // },
};
</script>

<style lang="less">
.class_wrap {
  overflow: hidden;
  background: url(~@/assets/image/home/classbg.png) no-repeat;
  background-size: 100% 100%;
  .class_top {
    margin: 32px 44px;
    display: flex;
    justify-content: space-between;
    .class_back {
      display: flex;
      align-items: center;
      .back_arrow {
        width: 56px;
        height: 56px;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
      .back_alphabet {
        margin-left: 16px;
        font-size: 22px;
        font-weight: 500;
        color: #ffffff;
        letter-spacing: 2px;
      }
    }
    .class_search {
      display: flex;
      .entering {
        position: relative;
        width: 320px;
        height: 56px;
        background: url(~@/assets/image/home/search.png) no-repeat;
        background-size: 320px 56px;
        .tran_search {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 0;
          left: 0;
          cursor: pointer;
        }
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding-left: 60px;
          color: #ffffff;
        }
        ::placeholder {
          font-size: 14px;
          color: #ffffff;
        }
      }
      .standby {
        width: 60px;
        height: 60px;
        margin-left: 40px;

        img {
          width: 100%;
        }
      }
      .bonus {
        width: 53px;
        height: 60px;
        margin-left: 40px;
        img {
          width: 100%;
        }
      }
    }
  }

  .start_class {
    display: flex;
    .calendar {
      margin: 92px 55px 175px 39px;
      .calendar_date {
        width: 64px;
        height: 64px;
        margin-bottom: 45px;
        text-align: center;
        padding-top: 5px;
        cursor: pointer;

        .week {
          font-size: 16px;
          color: #ffffff;
        }
        .ext_date {
          font-size: 24px;
          color: #ffffff;
        }
      }
      .active_date {
        background: #ff856e;
        border-radius: 50%;
        border-color: #ff856e;
      }
    }
    .activities {
      margin-top: 30px;
      margin-bottom: 155px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tivity {
        width: 170px;
        height: 56px;
        background: #ffffff;
        box-shadow: 0px 4px 12px 0px #c4e5fe;
        border-radius: 28px;
        text-align: center;
        line-height: 56px;
        font-size: 18px;
        color: #a15229;
      }
      .active {
        background: #ff856e;
        color: #ffffff;
      }
    }
    .source_material {
      margin-top: 30px;
      margin-left: 53px;
      margin-right: 57px;
      display: flex;
      .left_arrow {
        margin-top: 333px;
        img {
          width: 24px;
          height: 41px;
        }
      }
      .source_content {
        .source_top {
          display: flex;
          width: 415px;
          height: 75px;
          img {
            cursor: pointer;
            width: 100%;
          }
          .recommend {
            margin-left: -40px;
          }
          .recommends {
            margin-left: -20px;
          }
        }
        .material_content {
          width: 1418px;
          height: 820px;
          background: #ffffff;
          border-radius: 0px 36px 36px 36px;
          padding: 43px 8px 0 42px;
          display: flex;
          flex-wrap: wrap;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          .class_detail {
            width: 294px;
            height: 330px;
            box-sizing: border-box;
            background: #ffffff;
            box-shadow: 0px 3px 12px 0px #c4e5fe;
            border-radius: 32px;
            margin-right: 48px;
            margin-bottom: 36px;
            padding: 24px 22px;
            .bbimg {
              width: 250px;
              height: 188px;
              background: #d8d8d8;
              border-radius: 31px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .bbname {
              margin-top: 26px;
              display: flex;
              justify-content: space-between;
              .bbtitle {
                color: #595e7c;
                font-size: 16px;
                font-weight: 600;
              }
              .bbkind {
                margin-right: 10px;
                width: 43px;
                height: 21px;
                background: #ff856e;
                border-radius: 18px;
                text-align: center;
                color: #ffffff;
                font-size: 14px;
                line-height: 21px;
              }
            }
            .bbintro {
              margin-top: 12px;
              width: 243px;
              height: 40px;
              font-size: 14px;
              color: #6e6d7a;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>