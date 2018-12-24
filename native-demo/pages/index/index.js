
const mockdata = require('./mock.js')
Page({
  data: {
    mockdata
  },
  handle (data) {
    console.log(data)
    this.setData({
      handleres: JSON.stringify(data)
    })
  }
})
