import * as Consts from 'calgen/calc/consts'
import IteratedGen from 'calgen/service/IteratedGen'
import TreeGen from 'calgen/service/TreeGen'
import DigitsBasedIteratedGen from 'calgen/service/DigitsBasedIteratedGen'
import * as Operator from 'calgen/model/Operator'

export const initSettingsFromLocationSearch = search => {
  let kvarr = search.replace('?', '').split('&');
  var newValue = {}
  for (let i = 0; i < kvarr.length; i++) {
    let temparr = kvarr[i].split('=');
    if (temparr.length > 1) {
      if (temparr[0] === 'numberDigits') {
        newValue[temparr[0]] = temparr[1].split(',').map(s => parseInt(s))
      } else {
        newValue[temparr[0]] = parseInt(temparr[1])
      }
    }
  }
  
  return { type: Consts.UPDATE_SETTINGS, value: newValue }
}

export const updateSettings = (newValue) => {
  return { type: Consts.UPDATE_SETTINGS, value: newValue }
}

export const generateQuestions = (questionType, rangeMin, rangeMax, numberCount, numberDigits, count, blank, brackets) => {
  const operators = Operator.fromQuestionType(questionType)

  var generator
  var formula

  const questions = []
  for (let i = 0; i < count; i++) {
    if ((questionType & Operator.DIVIDE_WITH_EXTRA_VAL) === Operator.DIVIDE_WITH_EXTRA_VAL) {
      generator = new DigitsBasedIteratedGen()
      formula = generator.generateDividerWithExtra(numberDigits[0]).toDisplayString(blank)
    } else if ((questionType & 0x1100) !== 0) {
      generator = new DigitsBasedIteratedGen();
      formula = generator.generate(numberDigits, numberCount - 1, operators).toDisplayString(blank)
    } else {
      generator = brackets === 1 ? new TreeGen() : new IteratedGen();
      formula = generator.generate(rangeMin, rangeMax, numberCount - 1, operators).toDisplayString(blank)
    }

    questions.push(formula)
  }
  return { type: Consts.GENERATE_QUESTIONS, questions: questions }
}

export const getQueryParamsUrl = params => {
  const { questionType, rangeMin, rangeMax, numberCount, count, blank, brackets } = params
  const numberDigits = params.numberDigits || []
  return `?questionType=${questionType}&rangeMin=${rangeMin}&rangeMax=${rangeMax}&numberCount=${numberCount}&numberDigits=${numberDigits.join(",")}&count=${count}&blank=${blank}&brackets=${brackets}`
}