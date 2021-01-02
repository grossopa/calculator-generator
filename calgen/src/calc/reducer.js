import * as Consts from 'calc/consts'

export const calcReducer = (state = {
    questionType: 1,
    rangeMin: 0,
    rangeMax: 20,
    numberCount: 2,
    count: 50
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