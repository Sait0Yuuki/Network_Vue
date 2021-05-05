<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="150px" style="width:1200px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="域名" prop="host">
            <el-input v-model="form.host" placeholder="google.com" clearable :style="{width: '100%'}" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="类型" prop="qtype">
            <el-select v-model="form.qtype" placeholder="请选择类型" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in qtypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="hasTable">
          <el-form-item>
            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
            >
              <el-table-column
                prop="zone"
                label="地区"
                width="180"
              />
              <el-table-column
                prop="time"
                label="耗时（秒）"
              />
              <el-table-column
                prop="ttl"
                label="TTL（秒）"
              />
              <el-table-column
                prop="host"
                label="值"
              />
            </el-table>
          </el-form-item>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>
<script>
import { getList } from '@/api/dns'

export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        host: undefined,
        qtype: undefined
      },
      hasTable: 0,
      tableData: [],
      rules: {
        host: [{
          required: true,
          message: '请输入域名',
          trigger: 'blur'
        }, {
          pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
          message: '请输入正确域名',
          trigger: 'blur'
        }],
        qtype: [{
          required: true,
          message: '请选择类型',
          trigger: 'change'
        }]
      },
      qtypeOptions: [{
        'label': 'A',
        'value': 1
      }, {
        'label': 'CAA',
        'value': 2
      }, {
        'label': 'NS',
        'value': 3
      }, {
        'label': 'CNAME',
        'value': 4
      }, {
        'label': 'TXT',
        'value': 5
      }, {
        'label': 'MX',
        'value': 6
      }, {
        'label': 'AAAA',
        'value': 7
      }],
      country: {
        '86': '中国',
        '852': '香港',
        '01': '美国'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        this.$message('Submit..')
        this.hasTable = 0
        // TODO 提交表单
        getList(this.form).then(response => {
        // console.log(typeof response)
        /*
        {"code":0,"data":{"01":[{"answer":{"time_consume":"0.28","records":[{"ttl":5,"value":"220.181.38.148","ip_location":"北京"}
        ,{"ttl":5,"value":"39.156.69.79","ip_location":"北京"}],"error":""}}],
        "852":[{"answer":{"time_consume":"0.11","records":[{"ttl":268,"value":"39.156.69.79","ip_location":"北京"},
        {"ttl":268,"value":"220.181.38.148","ip_location":"北京"}],"error":""}}],
        "86":[{"answer":{"time_consume":"0.00","records":[{"ttl":2,"value":"39.156.69.79","ip_location":"北京"},
        {"ttl":2,"value":"220.181.38.148","ip_location":"北京"}],"error":""}}]}}
        */
          this.tableData = []
          for (var item in response.data) {
            var data = response.data[item][0].answer
            for (var rec in data.records) {
              var tmp = data.records[rec]
              var obj = {
                zone: this.country[item],
                time: data.time_consume,
                ttl: tmp.ttl,
                host: tmp.value + '(' + tmp.ip_location + ')'
              }
              this.tableData.push(obj)
            }
          }
          this.hasTable = 1
        }).catch(err => {
          console.log(err)
        })
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
      this.hasTable = 0
      this.tableData = []
    }
  }
}

</script>
<style>
</style>
