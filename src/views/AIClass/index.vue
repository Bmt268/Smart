<template>
  <div class="aiclass">
    <div class="aicontent">
      <!-- 标题 -->
      <div class="aitop">
        <div class="modify" @click="show = true">修改环节</div>
        <div class="aidate">
          {{ titledate.year }}年{{ titledate.month }}月第{{ titledate.week }}周
        </div>
        <div class="aioptions">
          <div class="thisweek">本周</div>
          <div class="edittimetable">编辑课表</div>
          <div class="lesson_plan">教学计划</div>
          <div class="distribution" @click="clickField">领域分布</div>
          <div class="operation">
            <div class="oper">操作</div>
            <i
              :class="{
                'el-icon-arrow-down': !hidden,
                'el-icon-arrow-up': hidden,
              }"
              @click="hidden = !hidden"
            ></i>
          </div>
        </div>
      </div>
      <!-- 领域分布 -->
      <div class="field" v-show="field">
        <div class="field_name">排课统计</div>
        <div id="main" class="radar_content"></div>
      </div>

      <!-- 操作弹窗 -->
      <div class="oper_window" v-show="hidden">
        <div class="download">下载课表</div>
        <div class="batch_print">批量打印操作卡</div>
      </div>
      <!-- 表格内容 -->
      <div class="aiform">
        <table>
          <tr class="trtop">
            <th class="first"></th>
            <th class="second">环节</th>
            <th v-for="item in weeklist" :key="item.date">
              <div>{{ item.name }}</div>
              <div class="number">
                {{ item.date.substring(item.date.length - 2) }}
              </div>
            </th>
          </tr>

          <tr v-for="(item, index) in classlist.teachDataArr" :key="index">
            <td class="timezone">{{ item.timeZone }}</td>
            <td colspan="8">
              <table
                class="newtable"
                v-for="(item1, index1) in item.timeData"
                :key="index1"
              >
                <tr>
                  <td class="second">{{ item.process[index1].title }}</td>
                  <td
                    v-for="(item2, index2) in item1.processData"
                    :key="index2"
                  >
                    <div
                      class="boydiv"
                      v-for="(item3, index3) in item2"
                      :key="index3"
                    >
                      {{ item3.title }}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <!-- 修改环节 -->
      <revise-progress v-if="show" @clickClose="clickClose"></revise-progress>
    </div>
  </div>
</template>

<script>
import {
  getScheduleList,
  getWeekOfMonth,
  getmaterialcheduling,
} from "@/api/home.js";
import ReviseProgress from "@/views/AIClass/components/ReviseProgress";
export default {
  components: { ReviseProgress },
  data() {
    return {
      hidden: false,
      titledate: "",
      weeklist: [],
      process: [],
      classlist: [],
      show: false,
      max: 4,
      radardate: {},
      field: false,
    };
  },
  mounted() {
    this.getWeekOfMonthFun();
  },
  methods: {
    // 环节日期
    getScheduleListFun() {
      getScheduleList({
        year: this.titledate.year,
        month: this.titledate.month,
        week: this.titledate.week,
        roomId: localStorage.getItem("roomid"),
        guide: "done",
      }).then((res) => {
        let arr = [
          { name: "周一" },
          { name: "周二" },
          { name: "周三" },
          { name: "周四" },
          { name: "周五" },
          { name: "周六" },
          { name: "周日" },
        ];
        this.weeklist = res.data.dates.map((item, index) => {
          return { name: arr[index].name, date: item };
        });
        this.classlist = res.data;
        this.classlist.teachDataArr.forEach((item) => {
          item.process = this.process.splice(0, item.timeData.length);
        });
        this.radardate = this.classlist.map;
        for (const key in this.radardate) {
          if (Object.hasOwnProperty.call(this.radardate, key)) {
            const element = this.radardate[key];
            if (element > this.max) {
              this.max = element;
            }
          }
        }
        this.drawRadar();
      });
    },
    // 标题日期
    getWeekOfMonthFun() {
      getWeekOfMonth({ type: 3 }).then((res) => {
        this.titledate = res.data;
        this.getScheduleListFun();
        this.getmaterialchedulingFun();
      });
    },
    // 环节列表
    getmaterialchedulingFun() {
      getmaterialcheduling({
        roomId: localStorage.getItem("roomid"),
        date: 20220202,
      }).then((res) => {
        console.log(res);
        this.process = res.data;
      });
    },
    clickClose() {
      this.show = false;
    },
    // 雷达图
    drawRadar() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      console.log(myChart);
      let option = {
        radar: {
          // shape: 'circle',

          indicator: [
            { name: "社会", max: this.max, color: "#6E6D7A" },
            { name: "健康", max: this.max, color: "#6E6D7A" },
            { name: "艺术", max: this.max, color: "#6E6D7A" },
            { name: "语言", max: this.max, color: "#6E6D7A" },
            { name: "科学", max: this.max, color: "#6E6D7A" },
          ],
          axisName: {
            fontSize: 12,
          },
          axisLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          radius: ["0%", "70%"],
          center: ["50%", "50%"],
          splitNumber: 4,
        },
        series: [
          {
            name: "排课统计",
            type: "radar",
            data: [
              {
                value: [
                  this.radardate.society,
                  this.radardate.health,
                  this.radardate.art,
                  this.radardate.language,
                  this.radardate.science,
                ],
                name: "学科",
                itemStyle: {
                  color: "rgba(229, 66, 62, 1)",
                },
                symbolSize: 6,
                areaStyle: {
                  color: "rgba(229, 66, 62, 0.2)",
                },
                lineStyle: {
                  width: 1,
                },
              },
            ],
          },
        ],
        splitLine: {
          lineStyle: {
            width: 0.5,
            color: "#D8D8D8",
          },
        },
      };
      myChart.setOption(option);
    },
    clickField() {
      this.field = !this.field;
    },
  },
};
</script>

<style lang="less">
.aiclass {
  padding: 32px 91px;
  background: #f5f5fb;
  .aicontent {
    width: 1738px;
    background: #ffffff;
    border-radius: 4px;
    position: relative;
    .aitop {
      display: flex;
      justify-content: space-between;
      padding: 33px 14px 32px 24px;
      .modify {
        width: 100px;
        height: 45px;
        border: 2px solid #bfbfbf;
        border-radius: 3px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #6e6d7a;
        cursor: pointer;
      }
      .aidate {
        font-size: 32px;
        color: #0d0b22;
      }
      .aioptions {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 18px;
        color: #6e6d7a;
        .thisweek {
          width: 63px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          border: 1px solid #bfbfbf;
          margin-right: 8px;
        }
        .edittimetable {
          width: 137px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          border: 1px solid #bfbfbf;
          margin-right: 8px;
        }
        .lesson_plan {
          width: 137px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          border: 1px solid #bfbfbf;
          margin-right: 8px;
        }
        .distribution {
          width: 137px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          border: 1px solid #bfbfbf;
          margin-right: 8px;
          cursor: pointer;
        }
        .operation {
          width: 137px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          border: 1px solid #bfbfbf;
          position: relative;
          .oper {
            margin-left: -20px;
          }
          .el-icon-arrow-down {
            position: absolute;
            top: 15px;
            right: 14px;
            cursor: pointer;
          }
          .el-icon-arrow-up {
            position: absolute;
            top: 15px;
            right: 14px;
            cursor: pointer;
          }
        }
      }
    }
    // 领域分布
    .field {
      width: 400px;
      height: 425px;
      background: #ffffff;
      box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.3);
      position: absolute;
      top: 102px;
      right: 0;
      z-index: 4;
      .field_name {
        color: #0d0b22;
        font-size: 18px;
        margin-top: 35px;
        margin-left: 30px;
      }
      .radar_content {
        width: 350px;
        height: 350px;
        margin-top: 20px;
        margin-left: 30px;
      }
    }

    .oper_window {
      width: 137px;
      height: 97px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #f1f1f1;
      position: absolute;
      top: 88px;
      right: 14px;
      padding: 8px 1px 8px 7px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 16px;
      color: #6e6d7a;
      cursor: pointer;
      z-index: 2;
      :hover {
        background: #f4f4f4;
      }
      .download {
        height: 36px;
        line-height: 36px;
      }
      .batch_print {
        height: 36px;
        line-height: 36px;
      }
    }
    .aiform {
      border-bottom: 1px solid #bfbfbf;

      .trtop {
        border: 1px solid #bfbfbf;
        border-bottom: none;
      }
      tr {
        th {
          width: 217px;
          height: 74px;
          background: #f7f7f9;
          opacity: 0.7;
          border-left: 1px solid #bfbfbf;
          text-align: center;
          color: #0d0b22;
          .number {
            font-size: 24px;
          }
        }
        td {
          height: 125px;
          // border: 1px solid #bfbfbf;
          text-align: center;
          font-size: 18px;
          color: #0d0b22;
        }
        .first {
          width: 71px;
        }
        .second {
          width: 144px;
        }
      }
      .timezone {
        border-top: 1px solid #bfbfbf;
        border-left: 1px solid #bfbfbf;
      }
      .newtable {
        width: 100%;
        td {
          border-top: 1px solid #bfbfbf;
          border-right: 1px solid #bfbfbf;

          width: 217px;
          // border-top: none;
          // border-right: none;
          .boydiv {
            width: 217px;
          }
        }
        .second {
          width: 144px;
          border-left: 1px solid #bfbfbf;
          border-bottom: none;
        }
      }
    }
  }
}
</style>