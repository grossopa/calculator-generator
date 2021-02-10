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
  const count = useSelector(state => state.calcReducer.count)
  const blank = useSelector(state => state.calcReducer.blank)
  const brackets = useSelector(state => state.calcReducer.brackets)

  const settings = {
    questionType: questionType,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
    numberCount: numberCount,
    count: count,
    blank: blank,
    brackets: brackets
  }

  const doUpdate = newVal => {
    dispatch(actions.updateSettings(newVal))
    history.push(actions.getQueryParamsUrl({ ...settings, ...newVal }))
  }

  return (
    <Grid className="noprint" container justify="center">
      <OnLoad />
      <Typography variant="h4" component="h1" align="center">小学数学计算题生成器</Typography>
      <Grid container spacing={3} justify="center" alignItems="center" style={{ width: '90%' }}>
        <Grid item xs={2} container direction="row" justify="flex-end">
          <FormLabel>题型</FormLabel>
        </Grid>
        <Grid item xs={4} container direction="row" justify="flex-start">
          <RadioGroup row defaultValue="1" value={questionType}
            onChange={event => doUpdate({ questionType: parseInt(event.target.value) })}>
            <FormControlLabel value={0x01} control={<Radio color="primary" />} label="仅加法" />
            <FormControlLabel value={0x10} control={<Radio color="primary" />} label="仅减法" />
            <FormControlLabel value={0x11} control={<Radio color="primary" />} label="加法+减法" />
          </RadioGroup>
        </Grid>
        <Grid item xs={2} container direction="row" justify="flex-end">
          <FormLabel>数字个数</FormLabel>
        </Grid>
        <Grid item xs={4} container direction="row" justify="flex-start">
          <Select value={numberCount} defaultValue={2}
            onChange={event => doUpdate({ numberCount: parseInt(event.target.value) })} >
            <MenuItem value={2}>2 (a + b = z)</MenuItem>
            <MenuItem value={3}>3 (a + b + c = z)</MenuItem>
            <MenuItem value={4}>4 (a + b + c + d = z)</MenuItem>
            <MenuItem value={5}>5 (a + b + c + d + e = z)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={2} container direction="row" justify="flex-end">
          <FormLabel>数值范围</FormLabel>
        </Grid>
        <Grid item xs={4} container direction="row" justify="flex-start">
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={-100000} max={rangeMax - 1} value={rangeMin}
            onChange={event => doUpdate({ rangeMin: parseInt(event.target.value) })} />
          <span className="calc-range-char">~</span>
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={rangeMin} max={100000} value={rangeMax}
            onChange={event => doUpdate({ rangeMax: parseInt(event.target.value) })} />
        </Grid>
        <Grid item xs={2} container direction="row" justify="flex-end">
          <FormLabel>题目数量</FormLabel>
        </Grid>
        <Grid item xs={4} container direction="row" justify="flex-start">
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={1} max={2000} value={count}
            onChange={event => doUpdate({ count: Math.min(2000, parseInt(event.target.value) || 1) })} />
        </Grid>
        <Grid item xs={2} container direction="row" justify="flex-end">
          <FormLabel>填空位置</FormLabel>
        </Grid>
        <Grid item xs={4} container direction="row" justify="flex-start">
          <RadioGroup row value={blank} defaultValue={1}
            onChange={event => doUpdate({ blank: parseInt(event.target.value) })}>
            <FormControlLabel value={1} control={<Radio color="primary" />} label="仅右边" />
            <FormControlLabel value={2} control={<Radio color="primary" />} label="仅左边" />
            <FormControlLabel value={3} control={<Radio color="primary" />} label="两边" />
          </RadioGroup>
        </Grid>
        <Grid item xs={2} container direction="row" justify="flex-end">
          <FormLabel>包含括号</FormLabel>
        </Grid>
        <Grid item xs={4} container direction="row" justify="flex-start">
          <FormControlLabel control={<Switch  color="primary" checked={brackets === 1} onChange={event => doUpdate({ brackets: event.target.checked ? 1 : 0 })} />} />
        </Grid>
        <Grid item xs={12} container justify="center">
          <button className="gen-button" onClick={() => dispatch(actions.generateQuestions(questionType, rangeMin, rangeMax, numberCount, count, blank, brackets))}>生成</button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HeaderView