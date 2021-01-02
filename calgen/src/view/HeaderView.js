import React, { useState } from 'react';
import IteratedGen from 'service/IteratedGen';
import * as Operator from 'model/Operator';

const generate = (rangeMin, rangeMax, numberCount, count, type, setQuestions) => {
    let operators = []
    if ((type & 0x01) !== 0) {
        operators.push(Operator.ADD)
    }
    if ((type & 0x10) !== 0) {
        operators.push(Operator.MINUS)
    }

    let iteratedGen = new IteratedGen();
    let questions = []
    console.log(rangeMin, rangeMax, operators)
    for (let i = 0; i < count; i++) {
        let index = parseInt(i / 3)
        if (i % 3 === 0) {
            questions[index] = []
        }
        questions[index].push(iteratedGen.generate(rangeMin, rangeMax, numberCount - 1, operators).toDisplayString(true))
    }
    setQuestions(questions)
}

function HeaderView() {
    const [questions, setQuestions] = useState([])
    const [type, setType] = useState(1)
    const [numberCount, setNumberCount] = useState(2)
    const [count, setCount] = useState(50)
    const [rangeMin, setRangeMin] = useState(0)
    const [rangeMax, setRangeMax] = useState(20)

    console.log(type)

    return (
        <content>
            <section>
            <h1>小学数学计算题生成器</h1>
            <div>by Jack Yin</div>
            <div className="options-cont">
                <label>题型</label>
                <select onChange={event => setType(parseInt(event.target.value))} value={type}>
                    <option value={0}>请选择...</option>
                    <option value={0x01}>仅加法</option>
                    <option value={0x10}>仅减法</option>
                    <option value={0x11}>加减法</option>
                </select>
                <label>数值范围</label>
                <input type="number" min={-100000} max={rangeMax - 1} value={rangeMin} 
                    onChange={event => setRangeMin(parseInt(event.target.value))}/>
                <span>~</span>
                <input type="number" min={rangeMin} max={100000} value={rangeMax}
                    onChange={event => setRangeMax(parseInt(event.target.value))}/>
                <label>数字个数</label>
                <select onChange={event => setNumberCount(parseInt(event.target.value))} value={numberCount}>
                    <option value={2}>2 (a + b = z)</option>
                    <option value={3}>3 (a + b + c = z)</option>
                    <option value={4}>4 (a + b + c + d = z)</option>
                    <option value={5}>5 (a + b + c + d + e = z)</option>
                </select>
                <label>题目数量</label>
                <input type="text" min={0} max={2000} 
                    onChange={event => setCount(parseInt(event.target.value))} value={count} />
                <button onClick={() => generate(rangeMin, rangeMax, numberCount, count, type, setQuestions)}>生成</button>
            </div>

            </section>
                <section>
                <table>
                    <tbody>
        {questions.map(q => 
            <tr>
                <td>{q[0]}<br />&nbsp;</td>
                <td>{q[1]}<br />&nbsp;</td>
                <td>{q[2]}<br />&nbsp;</td>
            </tr>
        )}
        </tbody>
        </table>
                </section>
        </content>
    )
}

export default HeaderView