import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo } from "react-apollo"
import { Query } from "react-apollo"
import { withStyles } from "@material-ui/core/styles"
// components
import ActionBar from "../components/CodeKeeper/ActionBar"
import Search from "../components/CodeKeeper/Search"
import ResultsFilter from "../components/CodeKeeper/ResultsFilter"
import ResultsList from "../components/CodeKeeper/ResultsList"
// Queries
import ALL_CODE_TAGS from "../queries/AllCodeTags.graphql"
import SEARCH_CODE_SNIPPETS from "../queries/SearchCode.graphql"

const styles = theme => ({
  root: {},
  header: {
    maxWidth: 800,
    marginRight: "auto",
    marginLeft: "auto",
  },
})
class CodeKeeperContainer extends Component {
  state = {
    search: "",
    searching: false,
    snippets: [],
    localSearch: "",
    localTags: [],
  }
  render() {
    const { search, searching, snippets, localTags } = this.state
    const {
      classes,
      allCodeTags: { error, allCodeTags, loading },
    } = this.props
    console.log("CodeKeeper Container Props => ", this.props)
    console.log("allCodeTags => ", allCodeTags)
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <ActionBar
            config={[
              {
                name: "Create Code Snippet",
                action: () => this._burnThisCity(),
                color: "primary",
              },
              {
                name: "Create Code Tag",
                action: () => this._burnThisCity(),
                color: "secondary",
              },
            ]}
          />
          <Search executeSearch={s => this._searchCodeSnippets(s)} />
          {snippets.length >= 1 && (
            <ResultsFilter
              selectedTags={localTags}
              tagOptions={
                loading
                  ? []
                  : allCodeTags.map(t => ({ name: t.name, value: t.name }))
              }
              // tags={loading ? [] : allCodeTags.map(t => t.name)}
              updateSearch={s => this.setState({ localSearch: s })}
              updateTags={tags => this.setState({ localTags: tags })}
            />
          )}
        </div>
        {searching ? (
          "Searching"
        ) : (
          <Fragment>
            <ResultsList results={this._getCodeSnippets()} />
          </Fragment>
        )}
      </div>
    )
  }

  _getCodeSnippets = () => {
    let { snippets, localSearch, localTags } = this.state
    if (localSearch.length > 0) {
      snippets = this._find(snippets, localSearch)
    }
    if (localTags.length > 0) {
      snippets = snippets.filter(snip =>
        this._find(snip.tags, localTags.join(" "))
      )
    }
    return snippets
  }

  _find = (items, text) => {
    if (items.length === 0) return false
    text = text.split(" ")
    return items.filter(function(item) {
      return text.every(function(el) {
        return item.name.toLowerCase().indexOf(el) > -1
      })
    })
  }

  _burnThisCity = () => {
    alert("Stop playing I have this cannon in my hand")
  }

  _searchCodeSnippets = async search => {
    const codecs = await this.props.client.query({
      query: SEARCH_CODE_SNIPPETS,
      variables: {
        search: search,
      },
    })
    this.setState({
      snippets: codecs.data.codeSearch,
    })
  }
}

export default compose(
  graphql(ALL_CODE_TAGS, { name: "allCodeTags" }),
  withStyles(styles),
  withApollo
)(CodeKeeperContainer)
