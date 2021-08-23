
import CalcIndexView from 'calgen/calc/index';
import CalcMultiIndexView from 'calgen/calc-multi/index'
import * as Consts from 'calgen/layout/consts';
import { useSelector } from 'react-redux';

function LayoutContentView() {

  const selectedTab = useSelector(state => state.layoutReducers.selectedTab)

  return (
    <section>
      {selectedTab === Consts.TAB_ADDMINUS && <CalcIndexView />}
      {selectedTab === Consts.TAB_MULTIPLY && <CalcMultiIndexView />}
    </section>
  )
}

export default LayoutContentView
