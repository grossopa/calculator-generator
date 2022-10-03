import AnswerBasedGen from "calgen/service/generator/AnswerBasedGen"
import DigitsBasedGen from "calgen/service/generator/DigitsBasedGen"

class GenerateType {
  name
  genFactory

  constructor(name, genFactory) {
    this.name = name
    this.genFactory = genFactory
  }

  toString() {
    return `GeneratorType [${this.name}]`
  }
}

export const ANSWER = new GenerateType('ANSWER', () => new AnswerBasedGen())
export const DIGIT = new GenerateType('DIGIT', () => new DigitsBasedGen())