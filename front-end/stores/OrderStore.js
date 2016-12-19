'use strict'

import {action, extendObservable, useStrict} from 'mobx'

useStrict(true)

function OrderStore () {
  const validCardboardGrades = ['A', 'B', 'C']
  const cardboardGradePrices = {
    A: {
      value: 0.2,
      label: getNumberLabel(0.2)
    },
    B: {
      value: 0.1,
      label: getNumberLabel(0.1)
    },
    C: {
      value: 0.05,
      label: getNumberLabel(0.05)
    }
  }

  const validPrintQualities = ['3-colors', '2-colors', 'black-only', 'no-printing', 'FantasticBoxCo-branding']
  const printPrices = {
    '3-colors': {
      value: 0.2,
      label: getNumberLabel(0.2)
    },
    '2-colors': {
      value: 0.1,
      label: getNumberLabel(0.1)
    },
    'black-only': {
      value: 0.05,
      label: getNumberLabel(0.05)
    },
    'no-printing': {
      value: 0,
      label: getNumberLabel(0)
    }
  }

  const validExtras = ['handles', 'reinforced-bottom']
  const extrasPrices = {
    'handles': {
      value: 0.1,
      label: getNumberLabel(0.1)
    },
    'reinforced-bottom': {
      value: 0.05,
      label: getNumberLabel(0.05)
    }
  }

  function getTextLabel (val) {
    return String(val)
      .replace(/\-/g, ' ')
      .split(' ')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join(' ')
  }

  function getNumberLabel (val) {
    return Number(val)
      .toFixed(2)
  }

  extendObservable(this, {
    /* Return the Store to its initial state by setting all default values */
    init: () => action(() => {
      this.width = 0
      this.height = 0
      this.length = 0
      this.quantity = 0
      this.cardboardGrade = ''
      this.printQuality = ''
      this.extras = []
    }),

    /* Step 1 pops */
    width: 0,
    height: 0,
    length: 0,
    quantity: 0,

    area: () => this.width * this.length,

    widthLabel: () => getNumberLabel(this.width),
    heightLabel: () => getNumberLabel(this.height),
    lengthLabel: () => getNumberLabel(this.length),
    quantityLabel: () => this.quantity,

    setWidth: () => (newWidth) => {
      if (newWidth !== Number(newWidth)) {
        throw new TypeError(`Width must be a {Number} not "${newWidth}"`)
      }

      if (newWidth < 0) {
        throw new RangeError(`Width must be positive number not ${newWidth}`)
      }

      action(() => (this.width = newWidth))()

      if (this.area > 2 &&
          this.cardboardGrade === 'C'
      ) {
        action(() => (this.cardboardGrade = ''))()
      }
    },

    setHeight: () => (newHeight) => {
      if (newHeight !== Number(newHeight)) {
        throw new TypeError(`Height must be a {Number} not "${newHeight}"`)
      }

      if (newHeight < 0) {
        throw new RangeError(`Height must be positive number not ${newHeight}`)
      }

      action(() => (this.height = newHeight))()
    },

    setLength: () => (newLength) => {
      if (newLength !== Number(newLength)) {
        throw new TypeError(`Length must be a {Number} not "${newLength}"`)
      }

      if (newLength < 0) {
        throw new RangeError(`Length must be positive number not ${newLength}`)
      }

      action(() => (this.length = newLength))()

      if (this.area > 2 &&
          this.cardboardGrade === 'C'
      ) {
        action(() => (this.cardboardGrade = ''))()
      }
    },

    setQuantity: () => (newQuantity) => {
      if (newQuantity !== Number(newQuantity)) {
        throw new TypeError(`Quantity must be a positive {Integer} not "${newQuantity}"`)
      }

      if (newQuantity % 1) {
        throw new TypeError(`Quantity must be a positive {Integer} not "${newQuantity}"`)
      }

      if (newQuantity < 1) {
        throw new RangeError(`Quantity must be a positive {Integer} not ${newQuantity}`)
      }

      action(() => (this.quantity = newQuantity))()
    },

    /* Step 2 pops */
    cardboardGrade: '',
    cardboardGradePrices,

    setCardboardGrade: () => (newCardboardGrade) => {
      if (!~validCardboardGrades.indexOf(newCardboardGrade)) {
        throw new TypeError(`Cardboard Grade must be one of "${validCardboardGrades.join('", "')}" not "${newCardboardGrade}"`)
      }

      if (newCardboardGrade === 'C' &&
          this.area > 2
      ) {
        throw new RangeError('Cardboard Grade "C" is available only for boxes with maximum Area of 2')
      }

      action(() => (this.cardboardGrade = newCardboardGrade))()
    },

    /* Step 3 pops */
    printQuality: '',
    printPrices,

    printQualityLabel () {
      if (!this.printQuality) {
        return ''
      }

      return getTextLabel(this.printQuality)
    },

    setPrintQuality: () => (newPrintQuality) => {
      if (!~validPrintQualities.indexOf(newPrintQuality)) {
        throw new TypeError(`Print Quantity must be one of "${validPrintQualities.join('", "')}" not "${newPrintQuality}"`)
      }

      action(() => (this.printQuality = newPrintQuality))()
    },

    /* Step 4 pops */
    extras: [],
    extrasPrices,

    extrasLabels: () => this.extras.map(getTextLabel),

    setExtras: () => (newExtras) => {
      if (!Array.isArray(newExtras)) {
        throw new TypeError(`1st argument must be an Array not {${typeof newExtras}} "${newExtras}"`)
      }

      newExtras.forEach((newExtra) => {
        if (!~validExtras.indexOf(newExtra)) {
          throw new RangeError(`Setting new Extra must be one of "${validExtras.join('", "')}" not "${newExtra}"`)
        }
      })

      if (~newExtras.indexOf('reinforced-bottom') &&
          this.cardboardGrade !== 'A'
      ) {
        throw new ReferenceError('Extra "Reinforced bottom" is available only for Cardboard Grade "A"')
      }

      action(() => (this.extras = newExtras.sort()))()
    },

    addExtra: () => (newExtra) => {
      if (~this.extras.indexOf(newExtra)) {
        throw new RangeError(`Extra "${newExtra}" was already added`)
      }

      if (!~validExtras.indexOf(newExtra)) {
        throw new RangeError(`Adding new Extra must be one of "${validExtras.join('", "')}" not "${newExtra}"`)
      }

      if (newExtra === 'reinforced-bottom' &&
          this.cardboardGrade !== 'A'
      ) {
        throw new ReferenceError('Extra "Reinforced bottom" is available only for Cardboard Grade "A"')
      }

      action(() => this.extras.push(newExtra))()
    },

    removeExtra: () => (existingExtra) => {
      const extraIndex = this.extras.indexOf(existingExtra)

      if (!~extraIndex) {
        throw new RangeError(`Extra "${existingExtra}" was not previously added`)
      }

      action(() => this.extras.splice(extraIndex, 1))()
    },

    /* Step 5 */
    price: () => {
      let price = 0

      /* Account for Cardboard grade */
      const cardboardGradePrice = this.cardboardGrade ? cardboardGradePrices[this.cardboardGrade].value : 0
      price += this.quantity * this.area * 6 * cardboardGradePrice

      /* Account for Print Quality */
      if (this.printQuality !== 'FantasticBoxCo-branding') {
        const printPrice = this.printQuality ? printPrices[this.printQuality].value : 0
        price += this.quantity * this.area * 6 * printPrice
      }

      /* Account for Extras */
      this.extras
        .forEach((extra) => {
          const extraPrice = extrasPrices[extra]
          if (!extraPrice) {
            return
          }

          price += this.quantity * extraPrice.value
        })

      /* Account discounts */
      if (this.printQuality === 'FantasticBoxCo-branding') {
        price -= price * 0.05
      }

      return !isNaN(price) ? price : 0
    },

    priceLabel: () => getNumberLabel(this.price)
  })
}

export default new OrderStore()
export const OrderStoreConstructor = OrderStore
