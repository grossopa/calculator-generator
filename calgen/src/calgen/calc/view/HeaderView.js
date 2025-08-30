import { FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Switch, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import * as actions from 'calgen/calc/actions';
import * as Operator from 'calgen/model/Operator';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './HeaderView.css';
import HowToUseView from 'calgen/calc/view/HowToUseView';

const LABEL_PROPS = { item: true, xs: 2, container: true, direction: "row", justifyContent: "flex-end", alignItems: "center" }
const FIELD_PROPS = { item: true, xs: 4, container: true, direction: "row", justifyContent: "flex-start", alignItems: "center" }

function SettingForm(props) {
  return <React.Fragment>
    <Grid {...LABEL_PROPS}>
      <FormLabel>{props.formLabel}</FormLabel>
    </Grid>
    <Grid {...FIELD_PROPS} {...props.fieldProps}>
      {props.children}
    </Grid>
  </React.Fragment>
}

function OnLoad() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.initSettingsFromLocationSearch(window.location.search))
  }, [dispatch])
  return null;
}

function HeaderView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  const isDivideWithExtra = (Operator.DIVIDE_WITH_EXTRA_VAL & questionType) === Operator.DIVIDE_WITH_EXTRA_VAL

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

  var numberSettingLabel = (questionType & 0x0100) === 0 ? '数值范围' : '数字位数'
  var numberSettingDigit = numberCount
  if ((questionType & (Operator.DIVIDE_VAL | Operator.DIVIDE_WITH_EXTRA_VAL)) !== 0) {
    numberSettingLabel = '除数数字位数'
    numberSettingDigit = numberCount - 1
  }
  if (questionType === Operator.DIVIDE_WITH_EXTRA_VAL) {
    numberSettingDigit = 1
  }

  const questionTypes = Operator.fromQuestionType(questionType)
  const operatorLabel = questionTypes.map(q => q.value).join("/")

  const doUpdate = newVal => {
    dispatch(actions.updateSettings(newVal))
    navigate(actions.getQueryParamsUrl({ ...settings, ...newVal }))
  }

  return (
    <Grid className="noprint" container justifyContent="center" alignItems="flex-start">
      <OnLoad />
      <Grid container item xs={9} spacing={3} justifyContent="center" alignItems="center" style={{ width: '90%' }}>
        <SettingForm formLabel="题型" fieldProps={{ xs: 10 }}>
          <RadioGroup row value={questionType} onChange={event => doUpdate({ questionType: parseInt(event.target.value) })}>
            <FormControlLabel value={Operator.ADD_VAL} control={<Radio color="primary" />} label="仅加法" />
            <FormControlLabel value={Operator.MINUS_VAL} control={<Radio color="primary" />} label="仅减法" />
            <FormControlLabel value={Operator.ADD_VAL | Operator.MINUS_VAL} control={<Radio color="primary" />} label="加法和减法" />
            <FormControlLabel value={Operator.MULTIPLY_VAL} control={<Radio color="primary" />} label="乘法" />
            <FormControlLabel value={Operator.DIVIDE_VAL} control={<Radio color="primary" />} label="除法" />
            <FormControlLabel value={Operator.DIVIDE_WITH_EXTRA_VAL} control={<Radio color="primary" />} label="除法+余数" />
            <FormControlLabel value={Operator.MULTIPLY_VAL | Operator.DIVIDE_VAL} control={<Radio color="primary" />} label="乘法和除法" />
            <FormControlLabel value={Operator.ADD_VAL | Operator.MINUS_VAL | Operator.MULTIPLY_VAL | Operator.DIVIDE_VAL} control={<Radio color="primary" />} label="四则运算" />
          </RadioGroup>
        </SettingForm>

        {!isDivideWithExtra && <SettingForm formLabel="数字个数">
          <Select value={numberCount} onChange={event => doUpdate({ numberCount: parseInt(event.target.value) })} >
            <MenuItem value={2}>2: (a {operatorLabel} b = z)</MenuItem>
            <MenuItem value={3}>3: (a {operatorLabel} b {operatorLabel} c = z)</MenuItem>
            <MenuItem value={4}>4: (a {operatorLabel} b {operatorLabel} c {operatorLabel} d = z)</MenuItem>
            <MenuItem value={5}>5: (a {operatorLabel} b {operatorLabel} c {operatorLabel} d {operatorLabel} e = z)</MenuItem>
          </Select>
        </SettingForm>}

        <SettingForm formLabel="题目数量">
          <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
            min={1} max={2000} value={count}
            onChange={event => doUpdate({ count: Math.min(2000, parseInt(event.target.value) || 1) })} />
        </SettingForm>

        <SettingForm formLabel={numberSettingLabel}>
          {(questionType & 0x11100) === 0 && <React.Fragment>
            <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
              min={-100000} max={rangeMax - 1} value={rangeMin}
              onChange={event => doUpdate({ rangeMin: parseInt(event.target.value) })} />
            <span className="calc-range-char">~</span>
            <TextField type="number" InputLabelProps={{ shrink: true }} inputProps={{ style: { textAlign: 'right' } }} style={{ width: 50 }}
              min={rangeMin} max={100000} value={rangeMax}
              onChange={event => doUpdate({ rangeMax: parseInt(event.target.value) })} />
          </React.Fragment>}
          {(questionType & 0x11100) !== 0 && <React.Fragment>
            {Array.from(Array(numberSettingDigit), (_e, i) => {
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
            })}
          </React.Fragment>}
        </SettingForm>

        <SettingForm formLabel="填空位置">
          <RadioGroup row value={blank} onChange={event => doUpdate({ blank: parseInt(event.target.value) })}>
            <FormControlLabel value={2} control={<Radio color="primary" />} label="右边" />
            <FormControlLabel value={1} control={<Radio color="primary" />} label="左边" />
            <FormControlLabel value={3} control={<Radio color="primary" />} label="两边" />
          </RadioGroup>
        </SettingForm>

        {!isDivideWithExtra && <React.Fragment>
          <SettingForm formLabel="包含括号">
            <RadioGroup row value={blank} onChange={event => doUpdate({ blank: parseInt(event.target.value) })}>
              <FormControlLabel control={<Switch color="primary" checked={brackets === 1} onChange={event => doUpdate({ brackets: event.target.checked ? 1 : 0 })} />} />
            </RadioGroup>
          </SettingForm>
        </React.Fragment>}

        <SettingForm />
      </Grid>

      <Grid item xs={3}>
        <HowToUseView />
      </Grid>

      <Grid item xs={12} container justifyContent="center">
        <button className="gen-button" onClick={() => dispatch(actions.generateQuestions(questionType, rangeMin, rangeMax, numberCount, numberDigits, count, blank, brackets))}>生成</button>
      </Grid>
    </Grid>
  )
}

export default HeaderView