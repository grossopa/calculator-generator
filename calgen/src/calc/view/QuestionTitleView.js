import React from 'react';
import { useSelector } from 'react-redux';
import './QuestionTitleView.css'

function QuestionTitleView() {
    const count = useSelector(state => state.calcReducer.count)

    return (
        <section className='question-title-cont'>
            <h2>小学数学计算题&nbsp;&nbsp;(共{count}题）</h2>
            <h3>班级：<span className="question-title-underscore" />姓名：<span className="question-title-underscore" />学号：<span className="question-title-underscore" /></h3>
        </section>
    )
}

export default QuestionTitleView
