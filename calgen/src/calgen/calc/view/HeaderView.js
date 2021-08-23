import { FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Switch, TextField, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import * as actions from 'calgen/calc/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './HeaderView.css';

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
  const numberDigits = useSelector(state => state.calcReducer.numberDigits)
  const count = useSelector(state => state.calcReducer.count)
  const blank = useSelector(state => state.calcReducer.blank)
  const brackets = useSelector(state => state.calcReducer.brackets)

  const settings = {
    questionType: questionType,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
    numberCount: numberCount,
    numberDigits: numberDigits,
    count: count,
    blank: blank,
    brackets: brackets
  }

  const labelProps = { item: true, xs: 2, container: true, direction: "row", justify: "flex-end" }
  const fieldProps = { item: true, xs: 4, container: true, direction: "row", justify: "flex-start" }

  const doUpdate = newVal => {
    dispatch(actions.updateSettings(newVal))
    history.push(actions.getQueryParamsUrl({ ...settings, ...newVal }))
  }

  return (
    <Grid className="noprint" container justify="center">
      <OnLoad />
      <Grid container spacing={3} justify="center" alignItems="center" style={{ width: '90%' }}>
        <Grid {...labelProps}>
          <FormLabel>题型</FormLabel>
        </Grid>
        <Grid {...fieldProps} xs={10}>
          <RadioGroup row value={questionType} onChange={event => doUpdate({ questionType: parseInt(event.target.value) })}>
            <FormControlLabel value={0x01} control={<Radio color="primary" />} label="仅加法" />
            <FormControlLabel value={0x10} control={<Radio color="primary" />} label="仅减法" />
            <FormControlLabel value={0x11} control={<Radio color="primary" />} label="加法+减法" />
            <FormControlLabel value={0x100} control={<Radio color="primary" />} label="乘法" />
          </RadioGroup>
        </Grid>
        <Grid {...labelProps}>
          <FormLabel>数字个数</FormLabel>
        </Grid>
        <Grid {...fieldProps}>
          <Select value={numberCount} onChange={event => doUpdate({ numberCount: parseInt(event.target.value) })} >
            <MenuItem value={2}>2 (a + b = z)</MenuItem>
            <MenuItem value={3}>3 (a + b + c = z)</MenuItem>
            <MenuItem value={4}>4 (a + b + c + d = z)</MenuItem>
            <MenuItem value={5}>5 (a + b + c + d + e = z)</MenuItem>
          </Select>
        </Grid>
        <Grid {...labelProps}>
          <FormLabel>题目数量</FormLabel>
        </Grid>
        <Grid {...fieldProps}>
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={1} max={2000} value={count}
            onChange={event => doUpdate({ count: Math.min(2000, parseInt(event.target.value) || 1) })} />
        </Grid>
        <Grid {...labelProps}>
          <FormLabel>{(questionType & 0x1100) === 0 ? '数值范围' : '数字位数'}</FormLabel>
        </Grid>
        {(questionType & 0x1100) === 0 && <Grid {...fieldProps}>
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={-100000} max={rangeMax - 1} value={rangeMin}
            onChange={event => doUpdate({ rangeMin: parseInt(event.target.value) })} />
          <span className="calc-range-char">~</span>
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={rangeMin} max={100000} value={rangeMax}
            onChange={event => doUpdate({ rangeMax: parseInt(event.target.value) })} />
        </Grid>}
        {/* including multiply and divide */}
        {(questionType & 0x1100) !== 0 && <Grid {...fieldProps}>
          {Array.from(Array(numberCount), (_e, i) => {
            return <span key={`Key ${i}`} style={{ marginLeft: 20 }}>
              <Typography>{`数字${i + 1}`}</Typography>
              <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
                min={1} max={5} value={numberDigits[i]}
                onChange={event => {
                  let newNumberDigits = numberDigits.slice(0)
                  newNumberDigits[i] = Math.min(5, parseInt(event.target.value) || 1)
                  doUpdate({ numberDigits: newNumberDigits });
                }} />
            </span>
          })
          }
        </Grid>}
        <Grid {...labelProps}>
          <FormLabel>填空位置</FormLabel>
        </Grid>
        <Grid {...fieldProps}>
          <RadioGroup row value={blank} onChange={event => doUpdate({ blank: parseInt(event.target.value) })}>
            <FormControlLabel value={1} control={<Radio color="primary" />} label="仅右边" />
            <FormControlLabel value={2} control={<Radio color="primary" />} label="仅左边" />
            <FormControlLabel value={3} control={<Radio color="primary" />} label="两边" />
          </RadioGroup>
        </Grid>
        <Grid {...labelProps}>
          <FormLabel>包含括号</FormLabel>
        </Grid>
        <Grid {...fieldProps}>
          <FormControlLabel control={<Switch color="primary" checked={brackets === 1} onChange={event => doUpdate({ brackets: event.target.checked ? 1 : 0 })} />} />
        </Grid>
        <Grid {...labelProps}>
        </Grid>
        <Grid {...fieldProps}>
        </Grid>
        <Grid item xs={12} container justify="center">
          <button className="gen-button" onClick={() => dispatch(actions.generateQuestions(questionType, rangeMin, rangeMax, numberCount, numberDigits, count, blank, brackets))}>生成</button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HeaderView