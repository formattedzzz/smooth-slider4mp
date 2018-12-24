
const computed = require('./computed.js')
const defaultOptions = [
  {
    text: '删除',
    background: '#ff0000',
    width: 64
  },
  {
    text: '操作',
    background: '#cccccc',
    width: 64
  }
]
Component({
  behaviors: [computed],
  properties: {
    img: {
      type: String,
      value: 'https://i.loli.net/2018/12/16/5c163b8a8e299.png'
    },
    title: {
      type: String,
      value: 'Jack Ma'
    },
    desc: {
      type: String,
      value: '今天董事会别迟到了'
    },
    info: {
      type: String,
      value: '上午 11:00'
    },
    icon: {
      type: String,
      value: ''
    },
    items: {
      type: Object,
      value: defaultOptions
    },
    index: {
      type: [String, Number],
      value: 0
    },
    dist: {
      type: Number,
      value: 30
    },
    height: {
      type: Number,
      value: 64
    }
  },
  data: {
    x: 0
  },
  computed: {
    renderItems () {
      let {items} = this.data
      return items.map((item, index) => {
        let right = index === 0 ? 0 : Number(items[0].width) * 2
        return Object.assign({}, item, {
          style: `width: ${Number(item.width) * 2}rpx;background: ${item.background};right: ${right}rpx`
        })
      })
    },
    moveViewWdith () {
      let {items} = this.data
      let width = 0
      items.forEach((item) => {
        width += item.width
      })
      return `width: ${750 + width * 2}rpx;`
    }
  },
  ready() {
    this.setData({
      items: this.properties.items,
      dist: this.properties.dist,
      height: this.properties.height,
      index: this.properties.index
    })
    const {windowWidth} = wx.getSystemInfoSync()
    this.widthFixRate = windowWidth / 375
    let {items, dist} = this.data
    if (items.length > 2) {
      items.splice(0, 2)
      this.setData({
        items
      })
    }
    if (dist > 40 || dist < 20) {
      this.setData({
        dist: 30
      })
    }
    items.forEach((item, index) => {
      if (typeof item !== 'object') {
        items[index] = {
          text: item,
          background: ['#ff0000', '#cccccc'][index],
          width: 64
        }
      } else {
        if (!item.width || item.width > 80 || item.width < 50) {
          item.width = 64
        }
        if (!item.background) {
          item.background = ['#ff0000', '#cccccc'][index]
        }
      }
    })
    this.setData({
      items
    })
  },
  methods: {
    moveChange (e) {
      // console.log('change', e.target.x)
      this.lastX = e.detail.x
    },
    touchEnd (e) {
      // console.log('end', this.lastX)
      let {dist, items} = this.data
      let totalWidth = 0
      items.forEach((item) => {
        totalWidth += item.width
      })
      this.x = this.lastX
      if (this.lastX < -dist) {
        this.setData({
          x: -(totalWidth * this.widthFixRate)
        })
      } else {
        this.setData({
          x: 0
        })
      }
    },
    closeSlide () {
      this.setData({
        x: 0
      })
    },
    handleAction (e) {
      let {item} = e.target.dataset
      this.triggerEvent('handle', {
        index: this.data.index,
        text: item.text
      })
    }
  }
})