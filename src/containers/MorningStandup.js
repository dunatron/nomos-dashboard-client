import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import StepContent from "@material-ui/core/StepContent"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
// COmponent Steps
import GoTeam from "../components/GoTeam/index"
import UserStandUpDetails from "../components/UserStandupDetails/index"

const styles = theme => ({
  root: {
    // width: "90%",
    width: "100%",
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
})

function getSteps() {
  return ["Pre Standup", "Member standup details", "SHOUT IT!"]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div>
          <ul>
            <li>Get any remote users on video conference.</li>
            <li>Make sure the remote users can communicate with the team.</li>
          </ul>
        </div>
      )
    case 1:
      return <UserStandUpDetails />
    case 2:
      return <GoTeam />
    default:
      return "Unknown step"
  }
}

class MorningStandupStepper extends React.Component {
  state = {
    activeStep: 0,
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button
              onClick={this.handleReset}
              className={classes.button}
              color="secondary">
              Reset
            </Button>
          </Paper>
        )}
      </div>
    )
  }
}

MorningStandupStepper.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(MorningStandupStepper)
