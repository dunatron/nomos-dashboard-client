import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
// components
import QuestionSearch from "../components/StockQA/QuestionSearch"

class StockQAPage extends Component {
  handlePageChange = url => {
    this.props.history.push(url)
  }
  render() {
    return (
      <div>
        <h1>This is the stock Q and A Page</h1>
        <button
          onClick={() => this.handlePageChange("/stock-qa/create-question")}>
          Create Question
        </button>
        <QuestionSearch />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(StockQAPage)
