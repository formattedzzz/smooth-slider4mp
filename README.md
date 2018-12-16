# silder4mp

> 一个体验平滑、独立的微信小程序左滑删除组件

## Build Setup

``` bash
npm install

npm run dev

npm run build

npm run build --report
```

逛了一圈GitHub发现关于小程序左滑删除的组件 发现效果都不理想 原因在于 他们的实现大多基于 touch 事件来改变 显示内容 view 的 transform 属性或者animationdata 这样做必然频繁的触发 setData 函数 从小程序性能优化来说的urgly 而且实现效果也不理想 再有页面的上下滑动会和组件的左滑同时触发 很幸运小程序为我们提供的一个使用频率非常低的组件 move-area 和 move-view 我们可以巧妙的运用其合理布局来解决上述两个问题

## 效果图

![](https://i.loli.net/2018/12/16/5c166c5d817ca.png)

## 使用

> 组件基于 mpvue 框架实现 把对应组件拷贝到项目中即可

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

- items: <Array>
```
['删除', '查看']
或(默认值)
[
  {
    text: 'DELE',
    bckground: '#FF0000',
    width: 64
  },
  {
    text: 'MORE',
    bckground: '#CCCCCC',
    width: 64
  }
]
```

- mode: <String>  默认：'follow' 跟随模式 可选：'cover' 覆盖模式

- data 显示数据 因为 mpvue 框架对slot的支持非常糟糕且考虑到实际需要比较简单所以内容布局是写好的
```
{
  img: '',
  title: '',
  desc: '',
  info: '',
  icon: ''
}
```
- index 索引值供回调使用 <String|Number>

## 原生小程序版本

> 还没写完 将支持使用slot插入内容





