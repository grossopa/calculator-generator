import * as Consts from 'calgen/layout/consts'

export const switchTab = (newTabValue) => {
  return { type: Consts.LAYOUT_SWITCH_TAB, value: newTabValue }
}