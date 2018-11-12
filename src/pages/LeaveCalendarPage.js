import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import LeaveCalendar from "../containers/LeaveCalendar"

class LeaveCalendarPage extends Component {
  render() {
    return <LeaveCalendar />
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(LeaveCalendarPage)
