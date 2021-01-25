import * as actions from 'calc/actions';
import React, { useEffect } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './HeaderView.css'

function OnLoad() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.initSettingsFromLocationSearch(window.location.search))
  }, [dispatch])
  return null;
}

function HeaderView() {
  const dispatch = useDispatch()
  const history = useHistory()

  const questionType = useSelector(state => state.calcReducer.questionType)
  let rangeMin = useSelector(state => state.calcReducer.rangeMin)
  rangeMin = isNaN(rangeMin) ? '' : rangeMin
  let rangeMax = useSelector(state => state.calcReducer.rangeMax)
  rangeMax = isNaN(rangeMax) ? '' : rangeMax
  const numberCount = useSelector(state => state.calcReducer.numberCount)
  const count = useSelector(state => state.calcReducer.count)
  const blank = useSelector(state => state.calcReducer.blank)

  const settings = {
    questionType: questionType,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
    numberCount: numberCount,
    count: count,
    blank: blank
  }

  const doUpdate = newVal => {
    dispatch(actions.updateSettings(newVal))
    history.push(actions.getQueryParamsUrl({ ...settings, ...newVal }))
  }

  return (
    <Container className="noprint" style={{textAlign:'center'}}>
      <OnLoad />
      <Typography variant="h4" component="h1" align="center">小学数学计算题生成器</Typography>
      <Grid container direction="column" justify="flex-start" alignItems="center">
        <table className="options-table">
          <tbody>
            <tr>
              <td>
                <label>题型</label>
                <select value={questionType} onChange={event => doUpdate({ questionType: parseInt(event.target.value) })}>
                  <option value={0}>请选择...</option>
                  <option value={0x01}>仅加法</option>
                  <option value={0x10}>仅减法</option>
                  <option value={0x11}>加减法</option>
                </select>
              </td>
              <td>
                <label>数字个数</label>
                <select value={numberCount} onChange={event => doUpdate({ numberCount: parseInt(event.target.value) })}>
                  <option value={2}>2 (a + b = z)</option>
                  <option value={3}>3 (a + b + c = z)</option>
                  <option value={4}>4 (a + b + c + d = z)</option>
                  <option value={5}>5 (a + b + c + d + e = z)</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>数值范围</label>
                <input type="number" min={-100000} max={rangeMax - 1} value={rangeMin}
                  onChange={event => doUpdate({ rangeMin: parseInt(event.target.value) })} />
                <span>~</span>
                <input type="number" min={rangeMin} max={100000} value={rangeMax}
                  onChange={event => doUpdate({ rangeMax: parseInt(event.target.value) })} />
              </td>
              <td>
                <label>题目数量</label>
                <input type="number" min={1} max={2000} value={count}
                  onChange={event => doUpdate({ count: Math.min(2000, parseInt(event.target.value) || 1) })} />
              </td>
            </tr>
            <tr>
              <td>
                <label>填空位置</label>
                <select value={blank} onChange={event => doUpdate({ blank: parseInt(event.target.value) })}>
                  <option value="1">仅右边</option>
                  <option value="2">仅左边</option>
                  <option value="3">两边</option>
                </select>
              </td>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <button className="gen-button" onClick={() => dispatch(actions.generateQuestions(questionType, rangeMin, rangeMax, numberCount, count, blank))}>生成</button>
    </Container>
  )
}

export default HeaderView