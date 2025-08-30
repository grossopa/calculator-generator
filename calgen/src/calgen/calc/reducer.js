import * as Consts from 'calgen/calc/consts'

export const calcReducers = (state = {
  questionType: 1,
  rangeMin: 0,
  rangeMax: 20,
  numberCount: 2,
  numberDigits: [1,1],
  count: 50,
  blank: 2,
  brackets: 0,
  questions: []
}, action) => {
    switch (action.type) {
        case Consts.UPDATE_SETTINGS:
            state = { ...state, ...action.value }
            // to align the number digits with number count
            if (state.numberCount !== state.numberDigits.length) {
                var arr = []
                for (let i = 0; i < state.numberCount; i++) {
                    arr.push(state.numberDigits[i] || 1);
                }
                state.numberDigits = arr
            }
            break;
        case Consts.GENERATE_QUESTIONS:
            state = { ...state, questions: action.questions }
            break;
        default:
            break;
    }

    return state;
}