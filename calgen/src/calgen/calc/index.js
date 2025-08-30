import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HeaderView from 'calgen/calc/view/HeaderView';
import QuestionTitleView from 'calgen/calc/view/QuestionTitleView';
import QuestionView from 'calgen/calc/view/QuestionView';
import QuickBarView from 'calgen/calc/view/QuickBarView';
import React from 'react';


function CalcIndexView() {

  return (
    <Grid>
      <Grid container>
        <HeaderView />
      </Grid>
      <QuickBarView />
      <Paper className="question-pager">
        <QuestionTitleView />
        <QuestionView />
      </Paper>
    </Grid>
  )
}

export default CalcIndexView