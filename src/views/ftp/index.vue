<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="150px" style="width:1200px">
        <el-col :span="16">
          <el-form-item label="服务器" prop="host">
            <el-input v-model="form.host" placeholder="127.0.0.1" clearable :style="{width: '100%'}" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="user">
                <el-input v-model="form.user" placeholder="用户名" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="form.password"
                  placeholder="请输入密码"
                  clearable
                  show-password
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作" prop="method">
            <el-select v-model="form.method" placeholder="login" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in methodOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.method==1 || form.method==2" label="路径" prop="dir">
            <el-input v-model="form.dir" placeholder="/home/usr" clearable :style="{width: '100%'}" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button v-loading="isLoading" type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col>
          <el-collapse-transition>
            <div v-show="hasUpload">
              <el-form-item>
                <el-table :data="tableData">
                  <el-table-column
                    v-for="(item,index) in theadData"
                    :key="index"
                    :label="item"
                    :prop="item"
                    :show-overflow-tooltip="true"
                  />
                  <!-- 动态生成列结束 -->
                </el-table>
              </el-form-item>
            </div>
          </el-collapse-transition>
        </el-col>
        <el-col />
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { getList } from '@/api/ftp'

export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        host: '159.75.123.97',
        user: 'uftp',
        password: 'axziOblYTpz5Yh663KaA',
        method: 0,
        dir: undefined
      },
      isLoading: 0,
      hasUpload: 0,
      theadData: [],
      tableData: [],
      rules: {
        host: [{
          required: true,
          message: '127.0.0.1',
          trigger: 'blur'
        }, {
          pattern: /((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}/,
          message: '请输入正确IP地址',
          trigger: 'blur'
        }],
        user: [{
          required: true,
          message: '用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        method: [{
          required: true,
          message: 'login',
          trigger: 'change'
        }],
        dir: [{
          required: true,
          pattern: /^\/(\w+\/?)+$/,
          message: '请输入正确路径',
          trigger: 'blur'
        }]
      },
      methodOptions: [{
        'label': 'login',
        'value': 0
      }, {
        'label': 'upload',
        'value': 1
      }, {
        'label': 'download',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$message('Submit..Wait about 60s')
        // TODO 提交表单
        this.isLoading = 1
        this.hasUpload = 0
        this.tableData = []
        this.theadData = []
        getList(this.form).then(response => {
          // this.theadList =
          for (var key in response[0]) {
            this.theadData.push(key)
          }
          console.log(this.theadList)
          for (let i = 0; i <= 9; i++) {
            this.tableData.push(response[i])
          }
          this.hasUpload = 1
          this.isLoading = 0
          console.log(this.tableData)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    resetForm() {
      this.isLoading = 0
      this.$refs['form'].resetFields()
      this.hasUpload = 0
      this.tableData = []
      this.theadData = []
    }
  }
}

</script>
<style>
</style>
