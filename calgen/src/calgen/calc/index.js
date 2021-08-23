import Paper from '@material-ui/core/Paper';
import HeaderView from 'calgen/calc/view/HeaderView';
import QuestionTitleView from 'calgen/calc/view/QuestionTitleView';
import QuestionView from 'calgen/calc/view/QuestionView';
import QuickBarView from 'calgen/calc/view/QuickBarView';
import React from 'react';

function CalcIndexView() {

  return (
    <div>
      <HeaderView />
      <QuickBarView />
      <Paper className="question-pager">
        <QuestionTitleView />
        <QuestionView />
      </Paper>
    </div>
  )
}

export default CalcIndexView