import * as actions from 'calc/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './HeaderView.css'

const getQueryParamsUrl = (questionType, rangeMin, rangeMax, numberCount, count) => {
    return `?questionType=${questionType}&rangeMin=${rangeMin}&rangeMax=${rangeMax}&numberCount=${numberCount}&count=${count}`
}

function OnLoad() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.initSettingsFromLocationSearch(window.location.search))
    }, [])
    return null;
}

function HeaderView() {
    const dispatch = useDispatch()
    const history = useHistory()

    const questionType = useSelector(state => state.calcReducer.questionType)
    const rangeMin = useSelector(state => state.calcReducer.rangeMin)
    const rangeMax = useSelector(state => state.calcReducer.rangeMax)
    const numberCount = useSelector(state => state.calcReducer.numberCount)
    const count = useSelector(state => state.calcReducer.count)

    return (
        <section className="options-cont">
            <OnLoad />
            <h1>小学数学计算题生成器</h1>
            <table className="options-table">
                <tbody>
                    <tr>
                        <td>
                            <label>题型</label>
                            <select value={questionType}
                                onChange={event => {
                                    const val = parseInt(event.target.value)
                                    dispatch(actions.updateSettings({ questionType: val }))
                                    history.push(getQueryParamsUrl(val, rangeMin, rangeMax, numberCount, count))
                                }}>
                                <option value={0}>请选择...</option>
                                <option value={0x01}>仅加法</option>
                                <option value={0x10}>仅减法</option>
                                <option value={0x11}>加减法</option>
                            </select>
                        </td>
                        <td>
                            <label>数字个数</label>
                            <select value={numberCount} onChange={event => {
                                const val = parseInt(event.target.value)
                                dispatch(actions.updateSettings({ numberCount: val }))
                                history.push(getQueryParamsUrl(questionType, rangeMin, rangeMax, val, count))
                            }} >
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
                                onChange={event => {
                                    const val = parseInt(event.target.value)
                                    dispatch(actions.updateSettings({ rangeMin: val }))
                                    history.push(getQueryParamsUrl(questionType, val, rangeMax, numberCount, count))
                                }} />
                            <span>~</span>
                            <input type="number" min={rangeMin} max={100000} value={rangeMax}
                                onChange={event => {
                                    const val = parseInt(event.target.value)
                                    dispatch(actions.updateSettings({ rangeMax: val }))
                                    history.push(getQueryParamsUrl(questionType, rangeMin, val, numberCount, count))
                                }} />
                        </td>
                        <td>
                            <label>题目数量</label>
                            <input type="text" min={0} max={2000}
                                onChange={event => {
                                    const val = parseInt(event.target.value)
                                    dispatch(actions.updateSettings({ count: val }))
                                    history.push(getQueryParamsUrl(questionType, rangeMin, rangeMax, numberCount, val))
                                }
                                } value={count} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="gen-button" onClick={() => dispatch(actions.generateQuestions(questionType, rangeMin, rangeMax, numberCount, count))}>生成</button>
        </section>
    )
}

export default HeaderView