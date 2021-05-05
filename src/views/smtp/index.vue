<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="150px" style="width:1200px">
      <el-col :span="15">
        <el-form-item label="邮箱" prop="address">
          <el-input v-model="form.address" placeholder="example@qq.com" clearable :style="{width: '100%'}" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="服务器" prop="server">
          <el-input v-model="form.server" placeholder="smtp.qq.com" clearable :style="{width: '100%'}" />
        </el-form-item>
      </el-col>
      <el-col :span="15">
        <el-form-item label="端口" prop="port">
          <el-input-number v-model="form.port" placeholder="端口" :step="1" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item size="large">
          <el-button v-loading="isLoading" type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item v-if="hasChart">
          <v-chart :option="option" style="height:800%" />
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import 'echarts'
import VChart from 'vue-echarts'
import { getList } from '@/api/smtp'

export default {
  components: {
    VChart
  },
  props: [],
  data() {
    return {
      isLoading: 0,
      hasChart: 0,
      form: {
        address: undefined,
        server: undefined,
        port: 25
      },
      option: {
        title: {
          text: 'SMTP Benchmark',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['connect', 'helo', 'mailfrom', 'rcptto', 'datasent', 'quit']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'connect',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: 'helo',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: 'mailfrom',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: 'rcptto',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: 'datasent',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: 'quit',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      },
      rules: {
        address: [{
          required: true,
          message: '未输入邮箱',
          trigger: 'blur'
        }, {
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '请输入正确邮箱地址',
          trigger: 'blur'
        }],
        server: [{
          pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
          message: '请输入正确域名',
          trigger: 'blur'
        }],
        port: []
      }
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
        // TODO 提交表单
        this.$message('Submit..')
        this.hasChart = 0
        this.isLoading = 1
        for (var index in this.option.series) {
          this.option.series[index].data = []
        }
        // TODO 提交表单
        getList(this.form).then(response => {
          console.log(response)
          this.option.title.subtext = response.title
          for (let i = 0; i <= 9; i++) {
            this.option.series[0].data.push(response[i].connect)
            this.option.series[1].data.push(response[i].helo)
            this.option.series[2].data.push(response[i].mailfrom)
            this.option.series[3].data.push(response[i].rcptto)
            this.option.series[4].data.push(response[i].datasent)
            this.option.series[5].data.push(response[i].quit)
          }
          this.hasChart = 1
          this.isLoading = 0
        }).catch(err => {
          console.log(err)
          this.hasChart = 0
          this.isLoading = 0
        })
      })
    },
    resetForm() {
      this.hasChart = 0
      this.isLoading = 0
      this.$refs['form'].resetFields()
    }
  }
}

</script>
<style>
</style>
