import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import UserLeaveStepper from "../containers/UserLeaveStepper"

class LeavePage extends Component {
  render() {
    return <UserLeaveStepper />
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(LeavePage)
