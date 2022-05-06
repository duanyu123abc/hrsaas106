<template>
  <div>
    <!-- action 为上传地址  #不会报错 -->
    <!-- file-list是上传的文件列表  可以绑定到上传组件上 让上传组件来显示 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :file-list="fileList"
      :class="{ disabled :fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px" />
    <!-- sync修饰符关闭弹窗 -->
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云cos包
// 实例化COS对象
const cos = new COS({
  SecretId: 'AKIDiJkxve7LL5bruiJhspWyDH7qLaaKo45q', // 身份识别ID
  SecretKey: 'bw2sSmqOitQltsb5KJ3ZqrOsCH6g070d' // 身份秘钥
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录当前正在上传的uid
      percent: 0, // 当前百分比
      showPercent: false
    }
  },
  computed: {
    //   如果为true 表示就不应该显示加号
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    //  点击预览事件
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // file是要删除的文件
    // fileList是删过之后的文件
    handleRemove(file, fileList) {
    //   this.fileList = this.fileList.filter(item => item.uid !== file.uid) // 将当前的删除文件排除在外
      this.fileList = fileList
    },
    // 不能用push 因为这个钩子会执行两次
    changeFile(file, fileList) {
      // file是当前的文件
      // fileList是当前的最新数组
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      // 先检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        //   如果不存在
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 上传终止
      }
      //   检查文件大小 5M
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'qianduanxuexi-1311725916', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 默认标准模式即可
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // data返回数据之后该如何处理
          console.log(err || data)
          //   data中有一个statusCode=200 说明成功
          if (!err || data.statusCode === 200) {
            //   说明上传成功 要获取返回的地址
            // 要确定上传成功的是哪一张图片
            this.fileList = this.fileList.map(item => {
              // 去找谁的id等于刚刚记录下来的id
              if (item.uid === this.currentFileUid) {
                //   将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload 为true 表示这张图片已经上传完毕
              }
              return item
            })
            // 关闭进度条 重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)

            // 将上传成功的地址回写到了fileList中
          }
        })
      }
    }
  }

}
</script>

<style>
.disabled .el-upload--picture-card {
    display: none;
}
</style>
