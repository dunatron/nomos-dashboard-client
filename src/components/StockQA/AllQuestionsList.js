import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo, Query } from "react-apollo"
import { QUESTIONS_PER_PAGE } from "../../constants"

// Queries
import { ALL_TAGS } from "../../queries/AllTags.graphql"
import { QUESTION_FEED } from "../../queries/QuestionFeed.graphql"
// Components
import SuperTable from "../SuperTable/index"
import Button from "@material-ui/core/Button"
import Modal from "../Modal/index"
import EditableQuestionCard from "./EditableQuestionCard"

class AllQuestionsList extends Component {
  state = {
    modalIsOpen: false,
    modalDetailsObj: {},
  }

  _getQueryVariables = () => {
    const skip = 0
    const first = QUESTIONS_PER_PAGE
    const orderBy = "createdAt_DESC"
    return { first, skip, orderBy }
  }

  _fetchMore = (fetchMore, currCount) => {
    fetchMore({
      variables: {
        skip: currCount + 1,
        first: QUESTIONS_PER_PAGE,
        orderBy: "createdAt_DESC",
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          questionFeed: {
            count: fetchMoreResult.questionFeed.count,
            questions: [
              ...prev.questionFeed.questions,
              ...fetchMoreResult.questionFeed.questions,
            ],
            __typename: "QuestionFeed",
            __proto__: Object,
          },
        })
      },
    })
  }

  showDetails = dataObj => {
    this.setState({
      modalDetailsObj: dataObj,
    })
    this.openModal()
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
  }

  renderModalDetails = () => {
    const { modalDetailsObj } = this.state
    // const { id, name, answers, links, notes, tags } = modalDetailsObj
    return (
      <div>
        <h2>I am the details for a modal</h2>
        <EditableQuestionCard question={modalDetailsObj} />
      </div>
    )
  }

  columnHeaders = () => {
    return [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "name",
        show: true,
        tableRenderKey: "th",
        found: "name",
        searchable: true,
      },
      // {
      //   id: "tags",
      //   label: "More Tags",
      //   show: true,
      //   type: "map",
      //   mapKeys: ['name'],
      //   found: "tags",
      // },
      {
        id: "tags",
        label: "More Tags",
        show: true,
        type: "tag",
        tagKey: "name",
        found: "tags",
      },
      {
        id: "showDetails", //votes.id
        numeric: false,
        disablePadding: true,
        label: "Show Details",
        show: true,
        type: "deep",
        icon: (
          <Button color="primary" aria-label="Add to shopping cart">
            Show Details
          </Button>
        ),
        funcName: "showDetails",
        found: "votes",
        tableRenderKey: "th",
      },
    ]
  }

  render() {
    const { modalIsOpen, modalDetailsObj } = this.state
    const {
      data: { loading, error, allTags },
    } = this.props
    console.log("=======this.props.data======== ", this.props.data)
    return (
      <Query query={QUESTION_FEED} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore, fetchMore }) => {
          if (loading && !data.questionFeed) return <div>Fetching</div>
          if (error) return <div>Error</div>

          // this._subscribeToNewSamples(subscribeToMore)
          // this._subscribeToNewVotes(subscribeToMore)

          // console.log("Here is data ", data)

          // const samplesToRender = this._getSamplesToRender(data)
          // const isNewPage = this.props.location.pathname.includes("new")
          // const pageIndex = this.props.match.params.page
          //   ? (this.props.match.params.page - 1) * SAMPLES_PER_PAGE
          //   : 0
          console.log("Data => ", data)
          const { questionFeed } = data
          if (!questionFeed) {
            console.log("No Question Feed => ", data)
            return "No Question Feed"
          }
          const { questions, count } = questionFeed
          console.log("The total count => ", count)
          console.log("What we actually have => ", questions.length)

          if (questions.length < count) {
            // we need to keep fetching
            console.log("wee need to fetch more")
            this._fetchMore(fetchMore, questions.length)
          }

          return (
            <Fragment>
              {modalIsOpen ? (
                <Modal width={800} height={500} close={() => this.closeModal()}>
                  <div onClick={() => this.closeModal()}>Close</div>
                  {this.renderModalDetails()}
                </Modal>
              ) : null}
              <div>
                <SuperTable
                  columnHeaders={this.columnHeaders()}
                  tags={{
                    found: "tags",
                    key: "id",
                    options: allTags
                      ? allTags.map(t => ({ name: t.name, value: t.id }))
                      : [],
                  }}
                  title="Table of Stock questions"
                  data={questions}
                  executeFunc={(funcName, obj) => {
                    this.executeFunctionByName(funcName, obj)
                  }}
                />
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }

  executeFunctionByName = (functionName, dataObj /*, args */) => {
    console.log("The dataObj ", dataObj)
    switch (functionName) {
      case "showDetails":
        this.showDetails(dataObj)
        break
      default:
        alert("No funct specified")
    }
  }
}

// export default compose(withApollo)(AllQuestionsList)

export default compose(
  graphql(ALL_TAGS),
  withApollo
)(AllQuestionsList)
