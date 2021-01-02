import React, { useState } from 'react';

function QuestionView() {
    const [questions] = useState([])

    return (
        
        <table>
        {questions.map(q => 
            <tr>
                <td>{q[0]}<br />&nbsp;</td>
                <td>{q[1]}<br />&nbsp;</td>
                <td>{q[2]}<br />&nbsp;</td>
            </tr>
        )}
        </table>
    )
}

export default QuestionView