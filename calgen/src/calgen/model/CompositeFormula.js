import * as BlankPosition from 'calgen/model/BlankPosition'

export default class CompositeFormula {

  children = []
  answer
  constructor(answer) {
    this.answer = answer
  }

  unshift(formula) {
    this.children.unshift(formula)
  }

  push(formula) {
    this.children.push(formula)
  }

  isEmpty() {
    return this.children.length === 0
  }

  getByIndex(index) {
    return this.children[index]
  }

  toDisplayString(fillBlank) {
    let blank = '___'
    let randomBlank = BlankPosition.valueOf(fillBlank).randomPosition(this.children.length + 1)
    
    let arr = []
    arr.push(randomBlank === 0 ? blank : this.children[0].left)
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i]
      arr.push(child.operator.value)
      arr.push(randomBlank === i + 1 ? blank : child.right)
    }

    arr.push('=')
    arr.push(randomBlank === this.children.length + 1 ? blank : this.answer)
    return arr.join('');
  }

}