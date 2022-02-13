<template>
  <div class="modify_link">
    <div class="revise_content">
      <div class="conten_top">
        <div class="class_list">
          <div class="revise_class">托班</div>
          <div class="revise_class">小班</div>
          <div class="revise_class">中班</div>
          <div class="revise_class">大班</div>
          <div class="revise_class">大大班</div>
        </div>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="process_content">
        <div class="process_options">
          <div class="time_option">时间</div>
          <div class="move_option">拖动</div>
          <div class="process_option">环节</div>
          <div class="rename_option">环节重命名</div>
          <div class="delete_option">删除</div>
        </div>
        <div class="process_time">
          <div class="process_scroll">
            <div class="time_top" v-for="(item, index) in process" :key="index">
              <div class="morning">{{ typelist[index] }}</div>
              <div class="time_list">
                <draggable
                  v-model="process[index]"
                  forceFallback="true"
                  group="process"
                  animation="1000"
                  @start="onStart"
                  @end="onEnd"
                  handle=".el-icon-rank"
                  :sort="true"
                >
                  <transition-group>
                    <div
                      class="row_list"
                      v-for="item1 in process[index]"
                      :key="item1.processStudyId"
                    >
                      <i class="el-icon-rank"></i>
                      <el-select v-model="item1.srcProcessStudyId">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.srcProcessStudyName"
                          :value="item.srcProcessStudyId"
                        >
                        </el-option>
                      </el-select>
                      <input
                        type="text"
                        placeholder="请对环节重新命名"
                        class="rename_park"
                      />
                      <i class="el-icon-close"></i>
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </div>
          </div>
          <div class="add_bottom">
            <i class="el-icon-circle-plus-outline"></i>
            <div class="add_process">添加环节</div>
          </div>
        </div>
      </div>
      <div class="double_btn">
        <div class="process_cancel">取消</div>
        <div class="process_sure">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getScheduleProcessList, getProcessdistinct } from "@/api/home.js";
export default {
  data() {
    return {
      options: [],
      value: "入园",
      activeList: [[]],
      activeindex: 0,
      typelist: ["上午", "中午", "下午", "晚上"],
      drag: false,
    };
  },
  components: {
    draggable,
  },
  props: {},
  mounted() {
    this.getScheduleProcessListFun();
  },
  computed: {
    process() {
      let arr = this.activeList[this.activeindex];
      let type = ["am", "noon", "pm", "night"];
      let list = [];
      type.forEach((item) => {
        let am = arr.filter((item1) => {
          return item1.ampm === item;
        });
        list.push(am);
      });
      console.log(list);
      return list;
    },
  },
  methods: {
    handleClose() {
      this.$emit("clickClose");
    },
    // 修改内容
    getScheduleProcessListFun() {
      getScheduleProcessList().then((res) => {
        console.log(res);
        this.activeList = res.data;
        this.getProcessdistinctFun();
      });
    },
    // 选择器里的options
    getProcessdistinctFun() {
      getProcessdistinct().then((res) => {
        console.log(res);
        this.options = res.data;
      });
    },
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
  },
};
</script>

<style lang="less">
.modify_link {
  background: #333333;
  background: rgba(51, 51, 51, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  .revise_content {
    width: 1128px;
    height: 842px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .conten_top {
      width: 1128px;
      height: 80px;
      background: #ffffff;
      box-shadow: 0px 4px 12px 0px #f4f4f4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 53px;
      padding-right: 41px;
      .class_list {
        display: flex;
        .revise_class {
          font-size: 24px;
          color: #959595;
          margin-right: 111px;
        }
      }
      .el-icon-close {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .process_content {
      padding-left: 53px;
      padding-right: 37px;
      .process_options {
        width: 1038px;
        height: 46px;
        background: #fafafa;
        border-radius: 8px;
        margin-top: 17px;
        display: flex;
        align-items: center;
        color: #0d0b22;
        font-weight: 500;
        font-size: 18px;
        .time_option {
          margin-left: 28px;
          margin-right: 108px;
        }
        .move_option {
          margin-right: 141px;
        }
        .process_option {
          margin-right: 235px;
        }
        .rename_option {
          margin-right: 181px;
        }
      }
      .process_time {
        width: 1038px;
        border-radius: 8px;
        border: 1px solid #dcdcdc;
        margin-top: 19px;
        .process_scroll {
          height: 513px;

          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 9px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: #eaebf0;
          }
        }
        .time_top {
          border-bottom: 1px solid #dcdcdc;
          display: flex;
          align-items: center;
          .morning {
            width: 80px;
            height: 100%;
            text-align: center;
          }
          .time_list {
            padding: 16px;
            border-left: 1px solid #dcdcdc;
            .row_list {
              width: 924px;
              height: 77px;
              background: #fafafa;
              border-radius: 12px;
              line-height: 77px;
              margin-bottom: 16px;
              &:last-child {
                margin-bottom: 0;
              }
              .el-icon-rank {
                margin-left: 87px;
                margin-right: 99px;
                font-size: 20px;
                color: #6e6d7a;
              }
              .el-input__inner {
                width: 146px;
                height: 44px;
                line-height: 44px;
                box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
                border-radius: 4px;
                border: 1px solid #bfbfbf;
              }
              ::placeholder {
                font-size: 18px;
                color: #6e6d7a;
              }
              .rename_park {
                margin-left: 104px;
                margin-right: 112px;
                width: 248px;
                height: 44px;
                box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
                border-radius: 4px;
                border: 1px solid #bfbfbf;
                padding: 0 20px;
              }
              .el-icon-close {
                font-size: 20px;
                color: #6e6d7a;
              }
            }
          }
        }
        .add_bottom {
          height: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #6e6d7a;
          font-size: 18px;
          border-top: 1px solid #dcdcdc;
          .add_process {
            margin-left: 10px;
          }
          .el-icon-circle-plus-outline {
            font-style: 20px;
            margin-top: 4px;
            color: #979797;
          }
        }
      }
    }
    .double_btn {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 41px;
      .process_cancel {
        width: 188px;
        height: 44px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        text-align: center;
        line-height: 44px;
        color: #0d0b22;
        font-size: 18px;
        margin-right: 76px;
        margin-left: 338px;
      }
      .process_sure {
        width: 188px;
        height: 44px;
        background: #e5423e;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        text-align: center;
        line-height: 44px;
        color: #ffffff;
        font-size: 18px;
      }
    }
  }
}
</style>