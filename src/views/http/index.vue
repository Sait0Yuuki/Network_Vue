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
      <el-form-item>
        <el-switch v-model="hasHeader" inactive-text="Header" class="switch" />
        <el-switch v-model="hasArg" inactive-text="参数设置" class="switch" />
        <el-switch v-model="hasCookie" inactive-text="Cookie设置" class="switch" />
        <el-switch v-model="hasProxy" inactive-text="代理设置" class="switch" />
      </el-form-item>
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
      <el-form-item>
        <v-chart class="chart" :option="option" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import 'echarts'
import VChart, { THEME_KEY } from 'vue-echarts'

import { getList } from '@/api/http'
import { compactObj, isEmpty } from '@/data'

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
        title: {
          text: '深圳月最低生活费组成（单位:元）'
          // subtext: 'From ExcelHome',
          // sublink: 'http://e.weibo.com/1341556070/AjQH99che'
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
          splitLine: { show: false },
          data: ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数']
        },
        series: [
          {
            name: 'requestStart',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
          },
          {
            name: 'responseEnd',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              barBorderRadius: 10,
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(64,158,255,0.8)'
            },
            data: [2900, 1200, 300, 200, 900, 300]
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
    onSubmit() {
      this.isloading = true
      this.tmp = JSON.parse(JSON.stringify(this.form)) // deep copy
      // this.tmp = this.form
      compactObj(this.tmp, isEmpty)
      this.$message('submit!')
      getList(this.tmp).then(response => {
        console.log(response)
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
