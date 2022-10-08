import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Typography from '@material-ui/core/Typography'

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
      <Typography variant="h5">如何使用</Typography>
      <HowToUseStepper />
      <Typography align="right">作者 Jack Yin</Typography>
    </CardContent>
  </Card>
}

export default HowToUseView