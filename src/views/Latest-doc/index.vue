<template>
    <el-row id="latestdoc">
        <el-col :span="6">
            <div class="leftTop">
                
                <!-- <div style="background:whitesmoke;height:100%;border-bottom: 1px solid rgb(233, 232, 232)">
                    <el-button icon="el-icon-circle-plus-outline"
                        style="float:right;margin-right:5px;margin-top:5px;font-size: 20px;font-weight:bolder;color:#FF6100"
                        type="text" size="mini" @click="() => handleAdd()">
                    </el-button>
                </div> -->
                <el-table id="mainTable" size="mini" :data="noteList" highlight-current-row
                    style="font-size: 15px;width: 100%;height:100%;margin-left:2px"
                    :show-header="false">
                    <el-table-column label="title" type="index">
                        <!-- <template slot-scope="scope">
                      <i :disabled="scope.row.isFirst" class="el-icon-star-on" ></i>
                  </template> -->
                    </el-table-column>
                    <el-table-column label="delete" width="200">
                        <template slot-scope="scope">
                            <!-- <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button> -->
                            <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-col>
        <el-col :span="18">
            <mavon-editor v-model="markdownValue" style="height: 100%;width: 100%;margin-left: 10px;" placeholder="......" />
        </el-col>
    </el-row>
</template>


<script>
    export default {
        name: "latestdoc",
        data() {
            return {
                markdownValue: '',
                noteList:[]
            }
        },
        computed: {

        },
        methods: {
            handleAdd(){},
            handleDel(){}

        }
    }
</script>

<style>
    .leftTop{
        border-radius: 25px;
        /* box-shadow: 1px 1px 1px black; */
        /* border-top:2px solid #DCDCDC */
    }

</style>