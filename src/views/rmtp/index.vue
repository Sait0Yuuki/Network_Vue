<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="150px" style="width:1200px">
      <el-col :span="15">
        <el-form-item label="地址" prop="host">
          <el-input v-model="form.host" placeholder="127.0.0.1" clearable :style="{width: '100%'}" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="路径" prop="dir">
          <el-input v-model="form.dir" placeholder="/livetv/hunantv" clearable :style="{width: '100%'}" />
        </el-form-item>
      </el-col>
      <el-col :span="15">
        <el-form-item label="端口" prop="port">
          <el-input-number v-model="form.port" placeholder="端口" :step="1" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <v-chart :option="option" style="height:800%" />
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import 'echarts'
import VChart from 'vue-echarts'
import { getList } from '@/api/rtmp'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

export default {
  components: {
    VChart
  },
  props: [],
  data() {
    return {
      form: {
        host: '58.200.131.2',
        dir: '/livetv/hunantv',
        port: 1935
      },
      option: {
        title: {
          text: 'RTMP Benchmark',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['fps', 'time']
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
          data: ['1', '2', '3', '4', '5', '6']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'fps',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: 'time',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      },
      rules: {
        host: [{
          required: true,
          message: '未输入地址',
          trigger: 'blur'
        }],
        dir: [{
          required: true,
          message: '未输入路径',
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
        this.$message('Submit..Wait about 100s')
        // TODO 提交表单
        getList(this.form).then(response => {
          NProgress.start()
          this.option.title.subtext = response.resolution
          for (var index in response.fps) {
            this.option.series[0].data.push(response.fps[index])
          }
          for (var i in response.ping) {
            this.option.series[1].data.push(response.ping[i].time)
          }
          NProgress.done()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    }
  }
}

</script>
<style>
</style>
