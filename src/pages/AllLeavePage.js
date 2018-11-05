import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// containers
import LeaveList from "../containers/LeaveList"

class AllLeavePage extends Component {
  render() {
    return (
      <div>
        <h1>This is the all leave page!</h1>
        <LeaveList />
      </div>
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(AllLeavePage)
