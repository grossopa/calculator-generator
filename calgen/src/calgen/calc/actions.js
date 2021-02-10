import * as Consts from 'calgen/calc/consts'
import IteratedGen from 'calgen/service/IteratedGen'
import TreeGen from 'calgen/service/TreeGen'
import * as Operator from 'calgen/model/Operator'

export const initSettingsFromLocationSearch = search => {
  let kvarr = search.replace('?', '').split('&');
  var newValue = {}
  for (let i = 0; i < kvarr.length; i++) {
    let temparr = kvarr[i].split('=');
    if (temparr.length > 1) {
      newValue[temparr[0]] = parseInt(temparr[1])
    }
  }
  return { type: Consts.UPDATE_SETTINGS, value: newValue }
}

export const updateSettings = (newValue) => {
  return { type: Consts.UPDATE_SETTINGS, value: newValue }
}

export const generateQuestions = (questionType, rangeMin, rangeMax, numberCount, count, blank, brackets) => {
  const operators = []
  if ((questionType & 0x01) !== 0) {
    operators.push(Operator.ADD)
  }
  if ((questionType & 0x10) !== 0) {
    operators.push(Operator.MINUS)
  }

  const iteratedGen = brackets === 1 ? new TreeGen() : new IteratedGen();
  const questions = []
  for (let i = 0; i < count; i++) {
    let index = parseInt(i / 3)
    if (i % 3 === 0) {
      questions[index] = []
    }
    questions[index].push(iteratedGen.generate(rangeMin, rangeMax, numberCount - 1, operators).toDisplayString(blank))
  }
  return { type: Consts.GENERATE_QUESTIONS, questions: questions }
}

export const getQueryParamsUrl = params => {
  const { questionType, rangeMin, rangeMax, numberCount, count, blank, brackets } = params
  return `?questionType=${questionType}&rangeMin=${rangeMin}&rangeMax=${rangeMax}&numberCount=${numberCount}&count=${count}&blank=${blank}&brackets=${brackets}`
}