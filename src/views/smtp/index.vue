<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="100px">
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
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        address: undefined,
        server: undefined,
        port: 21
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
