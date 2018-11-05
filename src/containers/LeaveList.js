import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { graphql, withApollo, compose } from "react-apollo"
import { withStyles } from "@material-ui/core/styles"

// Redux
import { connect } from "react-redux"

import { ALL_LEAVE } from "../queries/AllLeave.graphql"

const styles = theme => ({
  root: {},
})

class LeaveList extends Component {
  renderLeaveItem = leave => {
    return (
      <div>
        <p>
          User
          <span>{leave.forUser.name}</span>
        </p>
        <p>
          lastDayOfWork
          <span>{leave.lastDayOfWork}</span>
        </p>
        <p>
          firstDayOfLeave
          <span>{leave.firstDayOfLeave}</span>
        </p>
        <p>
          lastDayOfLeave
          <span>{leave.lastDayOfLeave}</span>
        </p>
        <p>
          firstDayOfWork
          <span>{leave.firstDayOfWork}</span>
        </p>
        <p>
          daysOfLeave
          <span>{leave.daysOfLeave}</span>
        </p>
        <p>
          publicHolidays
          <span>{leave.publicHolidays}</span>
        </p>
        <p>
          totalLeaveDays
          <span>{leave.totalLeaveDays}</span>
        </p>
      </div>
    )
  }

  render() {
    const {
      classes,
      allLeave: { loading, error, getAllLeave, fetchMore },
    } = this.props
    console.log("The props of the leave list => ", this.props)

    if (loading) {
      return "Loading the leave list"
    }

    if (error) {
      return "soz an error ran"
    }

    return (
      <div>
        <h1>The Leave list</h1>
        {getAllLeave &&
          getAllLeave.map(leave => {
            console.log("Al leave item => ", leave)
            return this.renderLeaveItem(leave)
          })}
      </div>
    )

    // return <div className={classes.root} />
  }
}

LeaveList.propTypes = {
  classes: PropTypes.object,
}

const reduxWrapper = connect(state => ({
  user: state.user,
}))

export default compose(
  graphql(ALL_LEAVE, { name: "allLeave" }),
  withApollo,
  withStyles(styles),
  reduxWrapper
)(LeaveList)
