import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const steps = [
  { label: '选择需要的习题', description: '' },
  { label: '打印（A4）', description: '' },
  { label: '软件批改（作业帮等）', description: '' },

]

function HowToUseStepper() {
  return <Stepper orientation="vertical">
    {steps.map((step, index) => (
      <Step active={true} completed={false} key={step.label}>
        <StepLabel>
          <Typography>{step.label}</Typography>
        </StepLabel>
        <StepContent>
          <Typography>{step.description}</Typography>
        </StepContent>
      </Step>
    ))}
  </Stepper>
}

function HowToUseView() {

  return <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        如何使用
      </Typography>
      <HowToUseStepper />
    </CardContent>
  </Card>
}

export default HowToUseView