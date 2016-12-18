/* global beforeEach describe it */
'use strict'

import { expect } from 'chai'

import {OrderStoreConstructor} from '../../../front-end/stores/OrderStore'

let OrderStore
beforeEach(() => {
  OrderStore = new OrderStoreConstructor()
})

describe('OrderStore', () => {
  it('init Width', () => {
    expect(OrderStore.width).to.equal(0)
  })

  it('init Height', () => {
    expect(OrderStore.height).to.equal(0)
  })

  it('init Length', () => {
    expect(OrderStore.length).to.equal(0)
  })

  it('init Quantity', () => {
    expect(OrderStore.quantity).to.equal(0)
  })

  it('init Area', () => {
    expect(OrderStore.area).to.equal(0)
  })

  it('init Cardboard Grade', () => {
    expect(OrderStore.cardboardGrade).to.equal('')
  })

  it('init Print Quality', () => {
    expect(OrderStore.printQuality).to.equal('')
  })

  it('init Extras', () => {
    expect(Array.isArray(OrderStore.extras.slice())).to.equal(true)
    expect(OrderStore.extras.length).to.equal(0)
  })

  it('init Price', () => {
    expect(OrderStore.price).to.equal(0)
  })

  it('set Width of 1', () => {
    OrderStore.setWidth(1)
    expect(OrderStore.width).to.equal(1)
  })

  it('not set Width of -1', () => {
    expect(() => OrderStore.setWidth(-1)).to.throw()
  })

  it('dynamical calculate Area', () => {
    OrderStore.setWidth(4)
    OrderStore.setLength(5)
    expect(OrderStore.area).to.equal(20)
  })

  it('set Cardboard Grade "C" for Area of 1^M', () => {
    OrderStore.setWidth(1)
    OrderStore.setLength(1)
    expect(() => OrderStore.setCardboardGrade('C')).to.not.throw()
  })

  it('cannot set Cardboard Grade "C" for Area of 3^M', () => {
    OrderStore.setWidth(3)
    OrderStore.setLength(1)
    expect(() => OrderStore.setCardboardGrade('C')).to.throw()
  })

  it('add Extra "Reinforced bottom" for Cardboard Grade "A"', () => {
    OrderStore.setCardboardGrade('A')
    expect(() => OrderStore.addExtra('reinforced-bottom')).to.not.throw()
  })

  it('cannot add Extra "Reinforced bottom" for Cardboard Grade "B"', () => {
    OrderStore.setCardboardGrade('B')
    expect(() => OrderStore.addExtra('reinforced-bottom')).to.throw()
  })
})
