<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <!-- 下拉图标 -->
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale ">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale ">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    changeLanguage(lang) {
      // 设置的类型  先写入到cookie
      Cookie.set('language', lang) // 切换多语言
      //   改变当前的多语言
      this.$i18n.locale = lang // 设置给本地的i18n插件  当前的多语言类型改成对应的类型
      this.$message.success('切换多语言成功')
    }
  }
}
</script>

<style>

</style>
