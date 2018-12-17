import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import CodeKeeperContainer from "../containers/CodeKeeperContainer"

class CodeKeeperPage extends Component {
  render() {
    return (
      <div>
        <CodeKeeperContainer />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(CodeKeeperPage)
