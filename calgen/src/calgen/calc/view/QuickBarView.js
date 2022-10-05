import * as actions from 'calgen/calc/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './QuickBarView.css';

function QuickBarView() {

  const dispatch = useDispatch()
  const history = useHistory()

  const quickButton = b =>
    <button key={b.label} className='quickbar-btn' onClick={() => {
      dispatch(actions.updateSettings(b.options))
      history.push(actions.getQueryParamsUrl(b.options))
      dispatch(actions.generateQuestions(b.options.questionType, b.options.rangeMin, b.options.rangeMax,
        b.options.numberCount, b.options.numberDigits, b.options.count, b.options.blank, b.options.brackets))
    }}>{b.label}</button>

  const buttons1 = [
    { label: "10以内加法", options: { questionType: 1, rangeMin: 0, rangeMax: 10, numberCount: 2, count: 50, blank: 2, brackets: 0 } },
    { label: "10以内减法", options: { questionType: 16, rangeMin: 0, rangeMax: 10, numberCount: 2, count: 50, blank: 2, brackets: 0 } },
    { label: "20以内加法", options: { questionType: 1, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0 } },
    { label: "20以内减法", options: { questionType: 16, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0 } },
    { label: "20以内加减法", options: { questionType: 17, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0 } },
    { label: "20以内加减法(两边）", options: { questionType: 17, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 3, brackets: 0 } },
    { label: "100以内加减法", options: { questionType: 17, rangeMin: 0, rangeMax: 100, numberCount: 2, count: 50, blank: 2, brackets: 0 } },
    { label: "100以内加减法(两边）", options: { questionType: 17, rangeMin: 0, rangeMax: 100, numberCount: 2, count: 50, blank: 3, brackets: 0 } }
  ]
  const buttons2 = [
    { label: "个位数乘法", options: { questionType: 256, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0, numberDigits: [1,1] } },
    { label: "十位乘个位数", options: { questionType: 256, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0, numberDigits: [2,1] } },
    { label: "个位除法", options: { questionType: 4096, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0, numberDigits: [1] } },
    { label: "个位余数除法", options: { questionType: 65536, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0, numberDigits: [1] } },
    { label: "十位除法", options: { questionType: 4096, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0, numberDigits: [2] } },
    { label: "十位余数除法", options: { questionType: 65536, rangeMin: 0, rangeMax: 20, numberCount: 2, count: 50, blank: 2, brackets: 0, numberDigits: [2] } },
  ]
  return (
    <div>
      <section className='quickbar-cont noprint'>
        {buttons1.map(quickButton)}
      </section>
      <section className='quickbar-cont noprint'>
        {buttons2.map(quickButton)}
      </section>
    </div>
  )
}

export default QuickBarView
