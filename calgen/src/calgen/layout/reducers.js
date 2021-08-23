import * as Consts from 'calgen/layout/consts'

export const layoutReducers = (state = {
  selectedTab: Consts.TAB_ADDMINUS
}, action) => {
    switch (action.type) {
        case Consts.LAYOUT_SWITCH_TAB:
            state = { ...state, selectedTab : action.value }
            break;
        default:
            break;
    }

    return state;
}