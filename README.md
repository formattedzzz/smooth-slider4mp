# silder4mp

一个体验平滑、独立的微信小程序左滑删除组件

## Build Setup

``` bash
npm install

npm run dev

npm run build

npm run build --report
```

逛了一圈GitHub发现关于小程序左滑删除的组件发现效果都不理想，原因在于:他们的实现大多基于touch事件来改变显示内容view的transform属性或者animationdata，这样做必然频繁的触发setData函数，从小程序性能优化来说的非常的urgly，在长列表数据渲染时层负担较重，而且实现效果也不平滑,再有页面的上下滑动会和组件的左滑同时触发，很幸运小程序为我们提供的一个使用频率非常低的组件move-area和move-view可以派上用场，我们可以巧妙的运用其合理布局来优雅地解决上述两个问题

## 效果图

![](https://i.loli.net/2018/12/16/5c166c5d817ca.png)

## 使用

组件基于mpvue框架实现,把对应组件拷贝到项目中即可

```js
<template>
<div class='page'>
  <block v-for="(item, index) in mockdata" :key="index" >
    <slide-left v-bind="item" :index="item.index" @handle="handle"></slide-left>
  </block>
  <div style="padding: 20px; text-align: center;">{{handleres}}</div>
</div>
</template>

<script>
  import slideLeft from '@/components/slideLeft'
  import mockdata from './mock'
  export default {
    data () {
      return {
        handleres: null,
        mockdata
      }
    },
    methods: {
      handle (data) {
        this.handleres = JSON.stringify(data)
      }
    },
    components: {
      slideLeft
    }
  }
</script>
```

## 配置

- 操作项配置。属性名 items： <Array>

```
可以简单地传入一个String数组：['删除', '操作']
也可传入一个json数组：
[
  {
    text: 'DELE',           // 显示的内容
    bckground: '#FF0000',   // 背景色
    width: 64               // 宽度50-80 默认64     
  },
  {
    text: 'MORE',
    bckground: '#CCCCCC',
    width: 64
  }
]
```

- 模式项配置。属性名 mode： <String> 默认：'follow' 跟随模式 可选：'cover' 覆盖模式

- 数据项配置。v-bind="data"

因为mpvue框架对slot的支持非常糟糕且考虑到稳定性且实际需要比较简单所以内容布局是写好的

```
{
  img: '',     // 图片
  title: '',   // 标题
  desc: '',    // 描述
  info: '',    // 信息（对应时间，可选）
  icon: ''     // 状态小图标（可选，原生版本可以直接slot）
}
```

- 索引值配置。属性名 index：<String|Number> 供回调使用

## 原生小程序版本

正在写。。将使用slot插入显示内容





