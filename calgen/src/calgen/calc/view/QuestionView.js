import React from 'react';
import { useSelector } from 'react-redux';
import './QuestionView.css'

function QuestionView() {
  const questions = useSelector(state => state.calcReducer.questions)

  let columnCount = 3
  let maxLength = 0
  for (let i = 0; i < questions.length; i++) {
    maxLength = Math.max(questions[i].length, maxLength)
  }

  if (maxLength >= 30) {
    columnCount = 1
  } else if (maxLength >= 18) {
    columnCount = 2
  } else {
    columnCount = 3
  }

  const groupedQuestions = []
  for (let i = 0; i < questions.length; i++) {
    let index = Math.floor(i / columnCount)
    if (i % columnCount === 0) {
      groupedQuestions[index] = []
    }

    groupedQuestions[index].push(questions[i])
  }

  return (
    <section className='question-cont'>
      <table className='question-table'>
        <tbody>
          {groupedQuestions && groupedQuestions.map(q =>
            <tr key={q.join('')} className='question-table-tr'>
              {q.map(qq => <td key={qq} className='question-table-td'>{qq}</td>)}
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export default QuestionView
