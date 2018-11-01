import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// containers
import MorningStandup from "../containers/MorningStandup"

class MorningStandupPage extends Component {
  render() {
    return (
      <div>
        <MorningStandup />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(MorningStandupPage)
