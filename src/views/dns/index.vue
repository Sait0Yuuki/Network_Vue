<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="150px" style="width:1200px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="域名" prop="host">
            <el-input v-model="form.host" placeholder="google.com" clearable :style="{width: '100%'}" />
          </el-form-item>
        </el-col>
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
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        host: undefined,
        qtype: undefined
      },
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
        'value': 0
      }, {
        'label': 'CAA',
        'value': 1
      }, {
        'label': 'NS',
        'value': 2
      }, {
        'label': 'CNAME',
        'value': 3
      }, {
        'label': 'TXT',
        'value': 4
      }, {
        'label': 'MX',
        'value': 5
      }, {
        'label': 'AAAA',
        'value': 6
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
        // TODO 提交表单
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
