<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px" style="width: 1200px">
      <el-form-item>
        <el-input v-model="form.domain" placeholder="www.google.com">
          <el-select
            slot="prepend"
            v-model="form.protocol"
            placeholder="http://"
            style="width: 100px"
          >
            <el-option label="A类型" value="http://" />
            <el-option label="CNAME类型" value="https://" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
      <el-form-item>
        <el-tabs>
          <el-tab-pane label="查询结果">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="ip" label="IP" width="180" />
              <el-table-column prop="ttl" label="TTL" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/http'
import { delNullProperty } from '@/data'

export default {
  data() {
    return {
      tableData: [{
        ip: '112.80.248.75',
        ttl: '29'
      }, {
        ip: '112.80.248.76',
        ttl: '29'
      }, {
        ip: '103.235.46.39',
        ttl: '222'
      }],
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
      responseList: []
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
      this.tmp = this.form
      delNullProperty(this.tmp)
      this.$message('submit!')
      getList(this.tmp).then(response => {
        this.responseList = response.data.items
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.switch {
  margin-left: 30px;
}
</style>
