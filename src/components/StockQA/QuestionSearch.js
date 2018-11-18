import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
import { Search } from "@material-ui/icons"
import Button from "@material-ui/core/Button"
// queries
import { SEARCH_STOCK_QUESTIONS } from "../../queries/SearchQuestions.graphql"
import { SEARCH_STOCK_QUESTIONS_FULL_TEXT } from "../../queries/SearchQuestionsFullText.graphql"
// components
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import SearchResult from "./SearchResult"
import SelectOption from "../Inputs/SelectOption"

const searchOptionTypes = [
  { name: "FullText", value: SEARCH_STOCK_QUESTIONS_FULL_TEXT },
  { name: "Contains", value: SEARCH_STOCK_QUESTIONS },
]

const styles = theme => ({
  root: {},
  searchBar: {
    display: "flex",
    flexWrap: "wrap",
  },
  searchBox: {
    flex: "4 1 0",
    minWidth: 330,
    fontSize: 22,
    // outline: "none",
    outline: "0 0 5px rgba(81, 203, 238, 1)",
    padding: theme.spacing.unit * 3,
    color: theme.palette.primary.main,
    // ":focus": {
    //   "box-shadow": "0 0 5px rgba(81, 203, 238, 1)",
    // },
    "&:focus": {
      outline: `2px solid ${theme.palette.secondary.main}`,
      border: "none",
    },
  },
  searchBtn: {
    flex: "1 1 0",
    borderRadius: 0,
    minWidth: 130,
    width: "100%",
  },
})

class QuestionSearch extends Component {
  state = {
    search: "",
    searchType: SEARCH_STOCK_QUESTIONS_FULL_TEXT,
    questions: [],
  }
  render() {
    const { searchType, search, questions } = this.state
    const { classes } = this.props
    return (
      <div>
        <div className={classes.searchBar}>
          <input
            placeholder="search stock questions"
            className={classes.searchBox}
            value={search}
            onChange={e =>
              this.setState({
                search: e.target.value,
              })
            }
          />
          <Button
            onClick={() => this._searchQuestions(this.state.search)}
            variant="outlined"
            color="secondary"
            className={classes.searchBtn}>
            <Search />
            Search
          </Button>
        </div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Search Options</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SelectOption
              value={searchType}
              options={searchOptionTypes}
              handleChange={v =>
                this.setState({
                  searchType: v,
                })
              }
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {questions &&
          questions.map((question, questionIdx) => (
            <SearchResult key={questionIdx} question={question} />
          ))}
      </div>
    )
  }

  _searchQuestions = async search => {
    const questions = await this.props.client.query({
      query: this.state.searchType,
      variables: {
        search: search,
      },
    })
    if (this.state.searchType === SEARCH_STOCK_QUESTIONS_FULL_TEXT) {
      this.setState({
        questions: questions.data.questionsFullTextSearch,
      })
      return
    }
    if (this.state.searchType === SEARCH_STOCK_QUESTIONS) {
      this.setState({
        questions: questions.data.searchQuestions,
      })
      return
    }
  }
}

QuestionSearch.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withApollo
)(QuestionSearch)
