<template>
  <el-row id="noteBook" class="noteBook">
    <el-col :span="24">
      <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom:5px"></el-input> -->

      <!-- 树形结构 -->
      <!-- <div class="down-tree" :style="{ height: screenHeight-110 + 'px' }">
        <el-scrollbar :style="{ height: screenHeight-110 + 'px' }">
          <el-tree
            ref="tree"
            :data="treedata"
            :props="defaultProps"
            @node-click="handleNodeClick"
            @click="handleCreate"
          />
        </el-scrollbar>
      </div> -->

      <!-- 表格for test -->
      <el-button size="small" type="primary" @click="showDialog">新增</el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="笔记本id" width="auto"></el-table-column>
        <el-table-column prop="name" label="笔记本name" width="auto"></el-table-column>
        <el-table-column label="操作" width="auto">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="small" type="primary" @click="modifyDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增笔记本的弹框 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible">
        <el-form ref="addForm" :rules="rules" :model="addForm">
          <el-form-item prop="name">
            <el-input placeholder="Please input notebook name" v-model="addForm.name"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleAdd">
            <strong>确定</strong>
          </el-button>
        </el-form>
      </el-dialog>

      <!-- 编辑笔记本的弹框 -->
      <!-- <el-dialog title="提示" :visible.sync="dialogForm1Visible">
        <el-form ref="editForm" :rules="rules" :model="editForm">
          <el-form-item prop="name">
            <el-input placeholder="Please input notebook name" v-model="editForm.name"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleModify">
            <strong>确定</strong>
          </el-button>
        </el-form>
      </el-dialog> -->
    </el-col>

    <!-- <el-col :span="20">
      <mavon-editor
        :style="{ height: screenHeight-86 + 'px'}"
        v-model="markdownValue"
        :ishljs="true"
        placeholder="......"
      />
    </el-col> -->
  </el-row>
</template>


<script>
//import { mapGetters } from "vuex";
import {
  getNotebookList,
  deleteNoteBook,
  addNoteBook,
  modifyNoteBook
} from "@/api/notebook";

export default {
  name: "noteBook",
  data() {
    return {
      usrId: this.$store.getters["usrId"],
      screenHeight: document.body.clientHeight,

      value: "",
      filterText: "",
      markdownValue: "",
      // value: `<h1><a id="Home_0"></a>Home</h1> <h2><a id="by_ruizhong_1"></a>by ruizhong</h2> <blockquote> <p>test code</p> </blockquote> <pre><div class="hljs"><code class="lang-python">i=<span class="hljs-number">10</span> print(i) </code></div></pre> <ul> <li>test html</li> <li></li> </ul>`,
      // defaultData: "preview",
      treedata: [
        {
          label: "Notebook1",
          children: [
            {
              label: "note1"
            },
            {
              label: "note2"
            },
            {
              label: "note3"
            },
            {
              label: "note4"
            },
            {
              label: "note5"
            },
            {
              label: "note6"
            }
          ]
        },
        {
          label: "Notebook2",
          children: [
            {
              label: "note1"
            },
            {
              label: "note2"
            },
            {
              label: "note3"
            },
            {
              label: "note4"
            },
            {
              label: "note5"
            },
            {
              label: "note6"
            }
          ]
        },
        {
          label: "Notebook3",
          children: [
            {
              label: "note1"
            },
            {
              label: "note2"
            },
            {
              label: "note3"
            },
            {
              label: "note4"
            },
            {
              label: "note5"
            },
            {
              label: "note6"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },

      //表格的数据
      tableData: [],

      //新增笔记本弹框数据
      addForm: {
        name: ""
      },
      editForm: {
        name: "",
        id: ""
      },

      rules: {
        name: [
          {
            required: true,
            message: "Please input notebook name!",
            trigger: "blur"
          }
        ]
      },
      dialogFormVisible: false,
      dialogForm1Visible: false
    };
  },
  computed: {
    //...mapGetters(['usrId'])
  },
  //激活函数
  activated() {
    console.log(this.usrId);
  },
  watch: {
    screenHeight(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          console.log(that.screenHeight);
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    //显示表单弹框
    showDialog() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleCreate() {},
    handleNodeClick() {
      //console.log(this.usrId)
    },

    //获取当前用户的所有笔记本列表
    getNotebookList() {
      // let data = {
      //   "id": this.usrId
      // };
      getNotebookList()
        .then(res => {
          //debugger;
          console.log(res.notebookList);
          //把表格根据后台数据赋值
          this.tableData = res.notebookList;
        })
        .catch(error => {
          // this.$message.error(error)
        });
    },

    //新增笔记本
    handleAdd() {
      let data = {
        name: this.addForm.name
      };
      this.$confirm("确认新增该笔记本吗?", "提示", {
        type: "warning"
      }).then(() => {
        addNoteBook(data)
          .then(res => {
            //debugger;
            this.dialogFormVisible = false;
            this.getNotebookList();
            //this.dialogFormVisible = false;
          })
          .catch(error => {});
      });
    },

    //删除笔记本
    handleDel(index, row) {
      console.log(index)
      console.log(row)
      let data = {
        id: row.id
      };
      this.$confirm("确认删除该笔记本吗?", "提示", {
        type: "warning"
      }).then(() => {
        //var param={"id":row.id}
        deleteNoteBook(data)
          .then(res => {
            this.getNotebookList();
          })
          .catch(error => {});
      });
    },

    //编辑笔记本
    modifyDialog(index, row) {
      this.dialogForm1Visible = true;
      this.editForm = row;
    },
    //编辑笔记本
    handleModify() {
      let data = {
        id: this.editForm.id,
        name: this.editForm.name
      };
      this.$confirm("确认修改该笔记本吗?", "提示", {
        type: "warning"
      }).then(() => {
        modifyNoteBook(data)
          .then(res => {
            //debugger;
            this.dialogForm1Visible = false;
            this.getNotebookList();
            //this.dialogForm1Visible = false;
          })
          .catch(error => {});
      });
    }
  },
  //钩子函数
  mounted() {
    //console.log(this.usrId)
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };

    this.getNotebookList();
  }
};
</script>


<style lang="scss">
.noteBook {
  // height:100%;
  //设置容器的样式
  .down-tree {
    flex: 1; //父元素采用flex布局
    max-width: 200px; //设置最小宽度
    //height: 540px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    // border: 1px solid rgba(211, 219, 222, 1);
    padding: 14px;
    box-shadow: 0 0 10px #e2e2e2;
    //设置滚动条高度，隐藏横向滚动条
    .el-scrollbar {
      //height: 540px;
      // overflow-x: hidden;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
  //设置字体大小
  .el-tree-node__label {
    font-size: 15px;
    font-weight: bolder;
    text-align: left;
  }
  //修改前面展开的图标
  .el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  .el-tree .el-icon-caret-right:before {
    // background: url("el-icon-moblie-phone") no-repeat;
    content: "\e78a";
    display: block;
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-size: 15px;
    color: black;
    font-weight: bold;
  }
  .el-tree .el-icon-caret-right.is-leaf:before {
    // background: url("el-icon-moblie-phone") no-repeat;
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-size: 15px;
    color: black;
    font-weight: bold;
  }
  .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: "\e784";
    display: block;
    width: 18px;
    height: 18px;
    font-size: 18px;
    background-size: 15px;
    color: black;
    font-weight: bold;
  }
  // //判断子节点设置不同的样式
  // .el-tree-node__expand-icon::before {
  //   // background: url("../views/SystemMg/MEWSRule/images/子菜单.png") no-repeat;
  //   content: "\e784";
  //   display: block;
  //   width: 18px;
  //   height: 18px;
  //   font-size: 18px;
  //   background-size: 15px;
  // }
  //设置每一项的背景颜色
  .el-tree-node__content {
    background: rgba(255, 255, 255, 1);
    height: 50px;
  }
  //设置当前选中项目的颜色
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #fde9be !important; //背景颜色
    color: #ff6100; //字体颜色
  }
}
</style>
