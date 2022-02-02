<template>
  <div class="aiclass">
    <div class="aicontent">
      <!-- 标题 -->
      <div class="aitop">
        <div class="modify">修改环节</div>
        <div class="aidate">2021年3月第2周</div>
        <div class="aioptions">
          <div class="thisweek">本周</div>
          <div class="edittimetable">编辑课表</div>
          <div class="lesson_plan">教学计划</div>
          <div class="distribution">领域分布</div>
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
      <!-- 操作弹窗 -->
      <div class="oper_window" v-show="hidden">
        <div class="download">下载课表</div>
        <div class="batch_print">批量打印操作卡</div>
      </div>
      <!-- 表格内容 -->
      <div class="aiform">
        <table>
          <tr>
            <th class="first"></th>
            <th class="second">环节</th>
            <th>
              <div>周一</div>
              <div class="number">10</div>
            </th>
            <th>
              <div>周二</div>
              <div class="number">10</div>
            </th>
            <th>
              <div>周三</div>
              <div class="number">10</div>
            </th>
            <th>
              <div>周四</div>
              <div class="number">10</div>
            </th>

            <th>
              <div>周五</div>
              <div class="number">10</div>
            </th>
            <th>
              <div>周六</div>
              <div class="number">10</div>
            </th>
            <th>
              <div>周日</div>
              <div class="number">10</div>
            </th>
          </tr>

          <tr>
            <td rowspan="4">上午</td>
            <td>入园</td>
            <td></td>
            <td>小船和雨伞</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>早餐</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>集体教学</td>
            <td></td>
            <td></td>
            <td>小船和雨伞</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>户外活动</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>中午</td>
            <td>午餐</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="3">下午</td>
            <td>集体活动</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>离园</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>122</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { getScheduleList } from "@/api/home.js";
export default {
  data() {
    return {
      hidden: false,
    };
  },
  methods: {},
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
      tr {
        border: 1px solid #bfbfbf;
        th {
          width: 217px;
          height: 74px;
          background: #f7f7f9;
          opacity: 0.7;
          border: 1px solid #bfbfbf;
          text-align: center;
          color: #0d0b22;
          .number {
            font-size: 24px;
          }
        }
        td {
          height: 125px;
          border: 1px solid #bfbfbf;
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
    }
  }
}
</style>