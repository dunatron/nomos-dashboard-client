import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { compose, withApollo } from "react-apollo"
// Components
import WizardRoutes from "../components/WizardRoutes/index"

class WizardContainer extends Component {
  render() {
    return (
      <div>
        <h1>This is the Admin Container</h1>
        <WizardRoutes />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(WizardContainer)
