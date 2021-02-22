<template>
  <el-upload
    ref="upload"
    :action="action"
    list-type="picture-card"
    :limit="limit"
    :file-list="fileList"
    :disabled="disabled"
    :before-upload="beforeUpload"
    :on-preview="preview"
    :on-remove="handleRemove"
    :on-exceed="onExceed"
    :on-success="onSuccess"
    :on-error="onError"
    :headers="headers"
  >
    <template v-if="fileList.length < limit" #default>
      <i class="el-icon-plus" />
    </template>
    <template #tip>
      <div v-html="tip" />
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <el-image :src="dialogImageUrl" lazy />
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import { toArray, checkImgExists } from '../../utils'
export default {
  props: {
    modelValue: {
      type: [Array, String],
      default: _ => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: '#'
    },
    headers: {
      type: Object,
      default: _ => {}
    },
    limit: { type: Number, default: 1 },
    accept: { type: String, default: '' },
    format: { type: Array, default: _ => [] },
    maxSize: { type: Number, default: 0 }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: toArray(this.$props.modelValue).map(this.parseFile),
      tip: '',
      tempIndex: 1
    }
  },
  mounted() {
    setTimeout(() => {
      this.uploadAction()
    }, 20)
  },
  methods: {
    parseFile(file = '', index) {
      let uid = ''
      if (this.fileList && this.fileList[index] && this.fileList[index].url === file) {
        // 如果文件没变化  id不变 避免重绘
        uid = this.fileList[index].uid || Date.now() + this.tempIndex++
      }
      return {
        url: file,
        name: file.split('/').pop(),
        status: 'success',
        uid: uid || (Date.now() + this.tempIndex++)
      }
    },
    uploadAction() {
      const el = this.uploadEl()
      if (this.fileList && this.fileList.length >= this.limit) {
        el.style.display = 'none'
      } else {
        el.style.display = 'inline-block'
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.uploadAction()
    },
    preview(file) {
      if (file.status !== 'success') {
        return false
      }
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const { format, maxSize } = { format: this.format, maxSize: this.maxSize }
      const { name, size } = file
      if (format && format.length > 0 && format.indexOf(name.split('.').reverse()[0]) === -1) {
        this.$message.warning(`格式错误，仅支持后缀名为 ${format.join('、')} 的文件!`)
        return false
      }
      if (maxSize && maxSize < size / 1024) {
        this.$message.warning(`文件大小不能超过 ${maxSize}KB !`)
        return false
      }
      return true
    },
    onExceed() {
      this.$message.warning(`最多只能上传${this.limit}个`)
    },
    uploadEl() {
      return this.$refs.upload.$el.getElementsByClassName('el-upload')[0]
    },
    onError(err, file, fileList) {
      console.error(err)
      this.$notify.error({
        title: '上传失败',
        message: err
      })
    },
    onSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.$notify.error({
          title: response.message || '上传失败',
          message: file.name
        })
        this.fileList = _.remove(fileList, item => {
          return item.response.code === 0
        })
        return
      }
      const responseUrl = response.payload?.url
      if (!responseUrl) {
        this.$notify.error({
          message: '上传接口错误'
        })
        return
      }
      if (checkImgExists(responseUrl)) {
        this.$notify.success({
          title: '上传成功',
          message: file.name
        })
      } else {
        this.$notify.error({
          title: '图片地址不可用',
          message: responseUrl
        })
      }
      file.url = responseUrl
      fileList[0].url = responseUrl
      this.fileList = fileList
      const list = fileList.map(item => {
        return item.response.payload.url
      })
      this.$emit('update:modelValue', this.limit === 1 ? list[0] : list)
      this.uploadAction()
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  ::v-deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  ::v-deep(.el-upload-list--picture-card .el-upload-list__item-status-label i) {
    top: -1px;
    position: absolute;
    right: 13px;
  }
</style>
