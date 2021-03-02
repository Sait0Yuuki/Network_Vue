<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="网址">
        <el-input v-model="form.name" placeholder="www.google.com" style="width:800px">
          <el-select slot="prepend" v-model="form.protocol" placeholder="http://" style="width:100px">
            <el-option label="http://" value="1" />
            <el-option label="https://" value="2" />
          </el-select>
          <el-select slot="append" v-model="form.method" placeholder="GET" style="width:100px">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
          </el-select>
          <el-select slot="append" v-model="form.encode" placeholder="UTF-8" style="width:100px; margin-left:30px">
            <el-option label="UTF-8" value="UTF-8" />
            <el-option label="GBK" value="GBK" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-switch v-model="form.args" inactive-text="参数设置" />
        <el-switch v-model="form.header" inactive-text="Header" style="margin-left:10px" />
        <el-switch v-model="form.cookie" inactive-text="Cookie设置" style="margin-left:10px" />
        <el-switch v-model="form.proxy" inactive-text="代理设置" style="margin-left:10px" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
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
      form: {
        protocol: '',
        name: '',
        method: '',
        encode: '',
        args: false,
        header: false,
        cookie: false,
        proxy: false,

        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
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
</style>
