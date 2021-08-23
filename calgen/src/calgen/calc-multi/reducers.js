import * as Consts from 'calgen/calc/consts'

export const calcMultiReducers = (state = {
  questionType: 1,
  numberCount: 2,
  count: 50,
  blank: 2,
  brackets: 0
}, action) => {
    switch (action.type) {
        case Consts.UPDATE_SETTINGS:
            state = { ...state, ...action.value }
            break;
        case Consts.GENERATE_QUESTIONS:
            state = { ...state, questions: action.questions }
            break;
        default:
            break;
    }

    return state;
}