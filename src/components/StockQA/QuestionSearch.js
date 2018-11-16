import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
import { Search } from "@material-ui/icons"
// queries
import { SEARCH_STOCK_QUESTIONS } from "../../queries/SearchQuestions.graphql"
// components
import SearchResult from "./SearchResult"

const styles = theme => ({
  root: {},
})

class QuestionSearch extends Component {
  state = {
    search: "",
    questions: [],
  }
  render() {
    const { search, questions } = this.state
    return (
      <div>
        <h1>Search for stock questions</h1>
        <input
          placeholder="search"
          value={search}
          onChange={e =>
            this.setState({
              search: e.target.value,
            })
          }
        />
        <button onClick={() => this._searchQuestions(this.state.search)}>
          <Search />
          GO
        </button>
        {questions &&
          questions.map((question, questionIdx) => (
            <SearchResult key={questionIdx} question={question} />
          ))}
      </div>
    )
  }

  _searchQuestions = async search => {
    const questions = await this.props.client.query({
      query: SEARCH_STOCK_QUESTIONS,
      variables: {
        search: search,
      },
    })
    this.setState({
      questions: questions.data.searchQuestions,
    })
  }
}

QuestionSearch.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withApollo
)(QuestionSearch)
