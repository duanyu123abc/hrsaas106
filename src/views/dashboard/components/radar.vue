<template>
  <!-- 雷达图 图标必须给宽和高-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
// 完整引入
// import * as echarts from 'echarts'

// 按需引入
// 1.引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 2.引入雷达图，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts'
// 3.引入提示框，标题组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([LegendComponent, RadarChart, TitleComponent, TooltipComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['张三', '李四']
      },
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [10, 1, 100, 5, 100, 0],
              name: '张三'
            },
            {
              value: [50, 50, 50, 50, 50, 10],
              name: '李四'
            }
          ]
        }
      ]
    })
  }

}
</script>

<style>
.radar-echart {
    width: 600px;
    height: 400px;
}
</style>
