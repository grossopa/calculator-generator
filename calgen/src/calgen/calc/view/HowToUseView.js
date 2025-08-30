import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

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