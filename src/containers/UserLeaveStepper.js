import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { graphql, withApollo, compose } from "react-apollo"
import moment from "moment"
import { withStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import StepContent from "@material-ui/core/StepContent"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
// COmponent Steps
import LeaveTypeStep from "../components/LeaveSteps/LeaveType"
import LeaveDatesStep from "../components/LeaveSteps/LeaveDates"
import LeaveDaysStep from "../components/LeaveSteps/LeaveDays"

// Redux
import { connect } from "react-redux"

// import { ALL_USERS } from "../queries/AllUsers.graphql"
import { CREATE_LEAVE } from "../mutations/CreateLeave.graphql"

const DEFAULT_LEAVE_DATES = {
  lastDayOfWork: moment().format("YYYY-MM-DD"),
  firstDayOfLeave: moment().format("YYYY-MM-DD hh:mm a"),
  lastDayOfLeave: moment().format("YYYY-MM-DD hh:mm a"),
  firstDayOfWork: moment().format("YYYY-MM-DD hh:mm a"),
}

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
  return ["Leave Type", "Leave Dates", "Leave Days", "Finish"]
}

class UserLeaveStepper extends Component {
  state = {
    activeStep: 0,
    uploading: false,
    ...DEFAULT_LEAVE_DATES,
    daysOfLeave: 0,
    publicHolidays: 0,
    type: "SICK_LEAVE",
  }

  handleInputChange = (type, val) => {
    this.setState({
      [type]: val,
    })
  }

  handleDateChange = (date, type) => {
    const formattedDate = moment(date).format("YYYY-MM-DD hh:mm a")
    this.setState({
      [type]: formattedDate,
    })
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <LeaveTypeStep
            setLeaveType={v => this.handleInputChange("type", v)}
            type={this.state.type}
          />
        )
      case 1:
        return (
          <LeaveDatesStep
            lastDayOfWork={this.state.lastDayOfWork}
            firstDayOfLeave={this.state.firstDayOfLeave}
            lastDayOfLeave={this.state.lastDayOfLeave}
            firstDayOfWork={this.state.firstDayOfWork}
            handleDateChange={(date, type) => this.handleDateChange(date, type)}
          />
        )
      case 2:
        return (
          <LeaveDaysStep
            daysOfLeave={this.state.daysOfLeave}
            publicHolidays={this.state.publicHolidays}
            handleChange={(t, v) => this.handleInputChange(t, v)}
          />
        )
      case 3:
        return (
          <Typography>
            All steps have been completed, use the process button below to
            request leave
          </Typography>
        )
      default:
        return "Unknown step"
    }
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

  handleFinish = async () => {
    this.setState({
      uploading: true,
    })
    await this.props.createLeave({
      variables: {
        userId: this.props.user.id,
        lastDayOfWork: moment(this.state.lastDayOfWork).format(),
        firstDayOfLeave: moment(this.state.firstDayOfLeave).format(),
        lastDayOfLeave: moment(this.state.lastDayOfLeave).format(),
        firstDayOfWork: moment(this.state.firstDayOfWork).format(),
        daysOfLeave: parseInt(this.state.daysOfLeave),
        publicHolidays: parseInt(this.state.publicHolidays),
        type: this.state.type,
      },
      // 25 Mar 2015
    })
    this.setState(state => ({
      uploading: false,
      activeStep: state.activeStep + 1,
    }))
  }

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep, uploading } = this.state

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      {uploading ? (
                        <Fragment>
                          <Typography>Requesting leave please wait</Typography>
                          <CircularProgress
                            style={{ padding: 40 }}
                            color="secondary"
                            thickness={7}
                          />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}>
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={
                              activeStep === steps.length - 1
                                ? this.handleFinish
                                : this.handleNext
                            }
                            className={classes.button}>
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </Fragment>
                      )}
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

UserLeaveStepper.propTypes = {
  classes: PropTypes.object,
}

const reduxWrapper = connect(state => ({
  user: state.user,
}))

export default compose(
  graphql(CREATE_LEAVE, { name: "createLeave" }),
  withApollo,
  withStyles(styles),
  reduxWrapper
)(UserLeaveStepper)
