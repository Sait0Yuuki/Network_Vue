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
        <el-switch v-model="hasArg" inactive-text="参数设置" class="switch" />
        <el-switch v-model="hasHeader" inactive-text="Header" class="switch" />
        <el-switch v-model="hasCookie" inactive-text="Cookie设置" class="switch" @change="dynamicCookie()" />
        <el-switch v-model="hasProxy" inactive-text="代理设置" class="switch" @change="dynamicProxy()" />
      </el-form-item>
      <el-form-item
        v-for="(cookie,index) in form.cookies"
        :key="cookie.key"
        :prop="'cookies.' + index + '.cookie'"
      >
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="Cookie设置">
            <el-input v-model="cookie.value" type="textarea" :autosize="{ minRows: 4 }" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item
        v-for="(proxy,index) in form.proxys"
        :key="proxy.key"
        :prop="'proxys.' + index + '.proxy'"
      >
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="代理设置">
            <el-input v-model="proxy.ip" placeholder="请输入代理" style="width:200px" />
            <el-input v-model="proxy.port" style="width:100px; margin-left:20px" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-tabs v-model="headerTab" @tab-click="handleClick">
          <el-tab-pane label="Header 请求头/返回头">
            <el-input v-model="form.header" type="textarea" :autosize="{ minRows: 4 }" />
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
        header: '',
        args: [],
        cookies: [],
        proxys: []
      }
    }
  },
  methods: {
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
