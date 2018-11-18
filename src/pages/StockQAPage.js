import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import { withStyles } from "@material-ui/core/styles"
// components
import Button from "@material-ui/core/Button"
import QuestionSearch from "../components/StockQA/QuestionSearch"
const styles = theme => ({
  root: {
    maxWidth: 800,
    marginRight: "auto",
    marginLeft: "auto",
  },
  actionBar: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
})
class StockQAPage extends Component {
  handlePageChange = url => {
    this.props.history.push(url)
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.actionBar}>
          <Button
            onClick={() => this.handlePageChange("/stock-qa/create-question")}
            variant="outlined"
            color="secondary"
            className={classes.searchBtn}>
            Create Question
          </Button>
        </div>

        <QuestionSearch />
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  withApollo
)(StockQAPage)
