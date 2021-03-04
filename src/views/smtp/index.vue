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
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          value: '',
          optional: []
        },
        arg: '',
        cookie: '',
        proxy: {
          ip: '',
          port: ''
        }
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
    dynamicArg() {
      if (this.hasArg === true) {
        this.form.args.push({
          value: ''
        })
      } else {
        this.form.args.splice(0, 1)
      }
    },
    dynamicCookie() {
      if (this.hasCookie === true) {
        this.form.cookies.push({
          value: ''
        })
      } else {
        this.form.cookies.splice(0, 1)
      }
    },
    dynamicProxy() {
      if (this.hasProxy === true) {
        this.form.proxys.push({
          ip: '',
          port: '0'
        })
      } else {
        this.form.proxys.splice(0, 1)
      }
    },
    onSubmit() {
      this.$message('submit!')
      this.domain = '11341241'
      console.log(this.form)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
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
</style>
