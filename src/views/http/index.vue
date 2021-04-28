<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px" style="width:1200px">
      <el-form-item>
        <el-input v-model="form.domain" placeholder="www.google.com">
          <el-select slot="prepend" v-model="form.protocol" placeholder="http://" style="width:100px">
            <el-option label="http://" value="http://" />
            <el-option label="https://" value="https://" />
          </el-select>
          <el-select slot="append" v-model="form.method" placeholder="GET" style="width:100px">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
          </el-select>
          <el-select slot="append" v-model="form.encode" placeholder="UTF-8" style="width:100px; margin-left:20px">
            <el-option label="UTF-8" value="UTF-8" />
            <el-option label="GBK" value="GBK" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-row style="margin-left:60px">
        <el-col :span="3">
          <el-form-item label="Header">
            <el-switch v-model="hasHeader" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="参数设置">
            <el-switch v-model="hasArg" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="Cookie">
            <el-switch v-model="hasCookie" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="代理设置">
            <el-switch v-model="hasProxy" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-show="hasHeader==1">
        <el-tabs v-model="headerTab">
          <el-tab-pane label="Header">
            <el-input v-model="form.header.key" style="width:200px" :disabled="true" />
            <el-select v-model="form.header.value" style="width:500px; margin-left:20px">
              <el-option label="text/html" value="text/html" />
              <el-option label="application/x-www-form-urlencoded;charset=utf-8" value="application/x-www-form-urlencoded;charset=utf-8" />
              <el-option label="application/json;charset=utf-8" value="application/json;charset=utf-8" />
            </el-select>
            <el-button type="primary" style="margin-left:20px" @click="addHeader()">增加一项</el-button>
            <el-form-item
              v-for="(item, index) in form.header.optional"
              :key="index"
              :prop="'optional.' + index + '.key'"
            >
              <el-input v-model="item.key" placeholder="Header Key" style="width:200px; margin-top:20px" />
              <el-input v-model="item.value" placeholder="Header Value" style="width:500px; margin-left:20px" />
              <el-button type="danger" icon="el-icon-delete" style="margin-left:20px" @click="deleteHeader(item, index)" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item v-show="hasArg==1">
        <el-tabs>
          <el-tab-pane label="参数设置">
            <el-input v-model="form.arg" type="textarea" placeholder="批量参数添加，如：name=google&domain=www.google.com" :autosize="{ minRows: 4 }" />
          </el-tab-pane>
          <el-tab-pane label="JSON参数设置">
            <el-input v-model="form.jsonarg" type="textarea" placeholder="JSON参数添加" :autosize="{ minRows: 4 }" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item v-show="hasCookie==1">
        <el-tabs>
          <el-tab-pane label="Cookie设置">
            <el-input v-model="form.cookie" type="textarea" :autosize="{ minRows: 4 }" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item v-show="hasProxy==1">
        <el-tabs>
          <el-tab-pane label="代理设置">
            <el-input v-model="form.proxy.ip" placeholder="请输入代理" style="width:200px" />
            <el-input v-model="form.proxy.port" style="width:100px; margin-left:20px" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isloading" @click="onSubmit">提交</el-button>
      </el-form-item>
      <el-form-item v-if="hasWaterfall==1" v-loading="isloading">
        <v-chart ref="waterfall" :option="option" style="height:1000%" @click="openLink" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import 'echarts'
import VChart, { THEME_KEY } from 'vue-echarts'

import { getList } from '@/api/http'
import { compactObj, isEmpty, getBarColor } from '@/data'

export default {
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'vintage'
  },
  data() {
    return {
      isloading: false,
      hasWaterfall: false,
      hasCookie: false,
      hasProxy: false,
      hasHeader: false,
      hasArg: false,
      headerTabe: 'first',
      form: {
        protocol: 'http://',
        domain: '',
        method: 'GET',
        encode: 'UTF-8',
        header: {
          key: 'Content-Type',
          value: 'text/html',
          optional: []
        },
        arg: '',
        jsonarg: '',
        cookie: '',
        proxy: {
          ip: '',
          port: ''
        }
      },
      tmp: [],
      responseList: [],
      option: {
        devicePixelRatio: 2,
        title: {
          text: 'Resource Timing',
          subtext: '',
          sublink: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          axisLabel: { // 坐标轴刻度标签的相关设置。
            formatter: function(value, index) {
              // 超出8个字符后面就用省略号代替
              if (value.length > 8) {
                const v = '...' + value.slice(-8)
                return v
              } else {
                return value
              }
            },
            interval: 0
          },
          show: false,
          data: []
        },
        series: [
          {
            name: 'requestStart',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              BorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              itemStyle: {
                BorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          },
          {
            name: 'responseEnd',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              BorderRadius: 10,
              BorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(64,158,255,0.8)'
            },
            data: []
          }
        ]
      }
    }
  },
  methods: {
    addHeader() {
      this.form.header.optional.push({
        key: '',
        value: ''
      })
    },
    deleteHeader(item, index) {
      this.form.header.optional.splice(index, 1)
    },
    openLink(params) {
      window.open(params.name)
    },
    onSubmit() {
      this.isloading = true
      this.hasWaterfall = true
      this.option.title.subtext = this.form.protocol + this.form.domain
      this.option.title.sublink = this.form.protocol + this.form.domain
      this.tmp = JSON.parse(JSON.stringify(this.form)) // deep copy
      // this.tmp = this.form
      /*
      name: "https://www.baidu.com/"
      requestStart: 5273.520000000076
      responseEnd: 5377.470000000017
       */
      compactObj(this.tmp, isEmpty)
      this.$message('submit!')
      getList(this.tmp).then(response => {
        console.log(response)
        this.option.yAxis.data = []
        this.option.series[0].data = []
        this.option.series[1].data = []
        for (var i in response) {
          this.option.yAxis.data.push(response[i].name)
          this.option.series[0].data.push(response[i].requestStart)
          var color = getBarColor(response[i].name)
          var obj = {
            value: response[i].responseEnd,
            itemStyle: {
              BorderRadius: 10,
              color: color
            }
          }
          this.option.series[1].data.push(obj)
        }
        this.isloading = false
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.switch{
  margin-left: 30px;
}
.chart {
  height: 400px;
}
</style>
