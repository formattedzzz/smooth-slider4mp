module.exports = Behavior({
  lifetimes: {
    created() {
      this._computedCache = {}
      this._originalSetData = this.setData
      this.setData = this._setData
      this._doingSetData = false
    }
  },
  definitionFilter(defFields) {
    const computed = defFields.computed || {}
    const computedKeys = Object.keys(computed)
    const calcComputed = (scope) => {
      const needUpdate = {}
      const computedCache = scope._computedCache || scope.data

      for (let i = 0, len = computedKeys.length; i < len; i++) {
        const key = computedKeys[i]
        const getter = computed[key]

        if (typeof getter === 'function') {
          const value = getter.call(scope)

          if (computedCache[key] !== value) {
            needUpdate[key] = value
            computedCache[key] = value
          }
        }
      }

      return needUpdate
    }
    const initComputed = () => {
      defFields.data = defFields.data || {}
      const data = defFields.data
      const properties = defFields.properties
      const hasOwnProperty = Object.prototype.hasOwnProperty
      if (properties) {
        Object.keys(properties).forEach(key => {
          const value = properties[key]
          let oldObserver
          if (value === null || value === Number || value === String || value === Boolean || value === Object || value === Array) {
            properties[key] = {
              type: value,
            }
          } else if (typeof value === 'object') {
            if (hasOwnProperty.call(value, 'value')) {
              data[key] = value.value
            }
            if (hasOwnProperty.call(value, 'observer') && typeof value.observer === 'function') {
              oldObserver = value.observer
            }
          }
          properties[key].observer = function (...args) {
            const originalSetData = this._originalSetData

            if (this._doingSetData) {
              console.warn('can\'t call setData in computed getter function!')
              return
            }
            this._doingSetData = true
            const needUpdate = calcComputed(this)
            originalSetData.call(this, needUpdate)
            this._doingSetData = false
            if (oldObserver) oldObserver.apply(this, args)
          }
        })
      }
      calcComputed(defFields, true)
    }
    initComputed()
    defFields.methods = defFields.methods || {}
    defFields.methods._setData = function (data, callback) {
      const originalSetData = this._originalSetData

      if (this._doingSetData) {
        console.warn('can\'t call setData in computed getter function!')
        return
      }

      this._doingSetData = true
      const dataKeys = Object.keys(data)
      for (let i = 0, len = dataKeys.length; i < len; i++) {
        const key = dataKeys[i]

        if (computed[key]) delete data[key]
      }
      originalSetData.call(this, data, callback)
      const needUpdate = calcComputed(this)
      originalSetData.call(this, needUpdate)
      this._doingSetData = false
    }
  }
})
