import React from 'react';
import { useSelector } from 'react-redux';
import './QuestionView.css'

function QuestionView() {
    const questions = useSelector(state => state.calcReducer.questions)

    return (
        <section className='question-cont'>
            <table className='question-table'>
                <tbody>
                    {questions && questions.map(q =>
                        <tr key={q[0] + q[1] + q[2]} className='question-table-tr'>
                            <td className='question-table-td'>{q[0]}</td>
                            <td className='question-table-td'>{q[1]}</td>
                            <td className='question-table-td'>{q[2]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default QuestionView
