import * as actions from 'calgen/calc/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './QuickBarView.css';

function QuickBarView() {

  const dispatch = useDispatch()
  const history = useHistory()

  const buttons = [
    { label: "10以内加法", options: { questionType: 1, rangeMin: 0, rangeMax: 10, numberCount: 2, count: 50, blank: 1, brackets: 0 } },
    { label: "10以内减法", options: { questionType: 16, rangeMin: 0, rangeMax: 10, numberCount: 2, count: 50, blank: 1, brackets: 0 } },
    { label: "20以内加法", options: { questionType: 1, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 1, brackets: 0 } },
    { label: "20以内减法", options: { questionType: 16, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 1, brackets: 0 } },
    { label: "20以内加减法", options: { questionType: 17, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 1, brackets: 0 } },
    { label: "20以内加减法(两边）", options: { questionType: 17, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 3, brackets: 0 } },
    { label: "100以内加减法", options: { questionType: 17, rangeMin: 0, rangeMax: 100, numberCount: 2, count: 50, blank: 1, brackets: 0 } },
    { label: "100以内加减法(两边）", options: { questionType: 17, rangeMin: 0, rangeMax: 100, numberCount: 2, count: 50, blank: 3, brackets: 0 } }
  ]
  return (
    <section className='quickbar-cont noprint'>
      {buttons.map(b =>
        <button key={b.label} className='quickbar-btn' onClick={() => {
          dispatch(actions.updateSettings(b.options))
          history.push(actions.getQueryParamsUrl(b.options))
          dispatch(actions.generateQuestions(b.options.questionType, b.options.rangeMin, b.options.rangeMax,
            b.options.numberCount, b.options.count, b.options.blank, b.options.brackets))
        }}>{b.label}</button>
      )}

    </section>
  )
}

export default QuickBarView
