import { calcReducers } from 'calgen/calc/reducer'
import { layoutReducers } from 'calgen/layout/reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  calcReducer: calcReducers, layoutReducers
})

export default rootReducer
