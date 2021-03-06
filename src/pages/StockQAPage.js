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
    // margin: `${theme.spacing.unit * 2}px 0`,
  },
  button: {
    // margin: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
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
            className={classes.button}
            onClick={() => this.handlePageChange("/stock-qa/create-question")}
            variant="outlined"
            color="secondary">
            Create Question
          </Button>
          <Button
            className={classes.button}
            onClick={() => this.handlePageChange("/stock-qa/create-tag")}
            variant="outlined"
            color="secondary">
            Create Tag
          </Button>
          <Button
            className={classes.button}
            onClick={() => this.handlePageChange("/stock-qa/all-questions")}
            variant="outlined"
            color="secondary">
            All Questions
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
