import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose, Query } from "react-apollo"
// Queries
import { ALL_TAGS } from "../../queries/AllTags.graphql"
// Mutations
import { CREATE_TAG } from "../../mutations/CreateTag.graphql"
// Subscriptions
import { NEW_TAG_SUBSCRIPTION } from "../../subscriptions/NewTagSubscription.graphql"
// components
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import SuperTable from "../SuperTable/index"
// icons
import AddIcon from "@material-ui/icons/Add"
const styles = theme => ({
  root: {
    maxWidth: 800,
    marginRight: "auto",
    marginLeft: "auto",
  },
  heading: { fontSize: 18, color: theme.palette.primary.main },
  questionInput: {
    width: "100%",
  },
})

const COLUMN_HEADERS = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "name",
    show: true,
    tableRenderKey: "th",
    found: "name",
  },
]

class CreateTag extends Component {
  defaultState = () => {
    const defaultState = {
      name: "",
    }
    return defaultState
  }
  state = this.defaultState()

  _subscribeToNewTags = async subscribeToMore => {
    subscribeToMore({
      document: NEW_TAG_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("subscriptionData => ", subscriptionData)
        if (!subscriptionData.data) return prev

        // const newTag = subscriptionData.data.newTag.node
        // return Object.assign({}, prev, {
        //   allTags: [newTag, ...prev.allTags],
        // })
        const { node } = subscriptionData.data.newTag
        return Object.assign({}, prev, {
          // allMessages: [node, ...prev.allMessages].slice(0, 20),
          allTags: [node, ...prev.allTags],
        })
      },
    })
  }

  render() {
    const { creating, name } = this.state
    const {
      classes,
      // tags: { allTags, error, loading, updateQuery, subscribeToMore },
    } = this.props
    // console.log("this.props => ", this.props)
    // if (loading) return "Loading Tags"

    // // subscribe to any new Tags
    // this._subscribeToNewTags(subscribeToMore)

    return (
      <div className={classes.root}>
        <TextField
          id="create-tag"
          label="New Tag"
          className={classes.questionInput}
          value={name}
          multiline
          onChange={e =>
            this.setState({
              name: e.target.value,
            })
          }
          margin="normal"
        />
        <Button onClick={() => this._createTag()} variant="outlined">
          Create Tag
        </Button>
        <Query query={ALL_TAGS}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>
            const more = async () =>
              subscribeToMore({
                document: NEW_TAG_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  console.group("subscription")
                  console.log("subscriptionData => ", subscriptionData)
                  console.log("prev => ", prev)
                  console.groupEnd()
                  if (!subscriptionData.data) return prev
                  // const { mutation, node } = subscriptionData.data.Message;
                  // // if (mutation !== 'CREATED') return prev;
                  // return Object.assign({}, prev, {
                  //   allMessages: [node, ...prev.allMessages].slice(0, 20),
                  // });
                  const { node } = subscriptionData.data.newTag
                  return Object.assign({}, prev, {
                    // allMessages: [node, ...prev.allMessages].slice(0, 20),
                    allTags: [node, ...prev.allTags],
                  })
                },
              })
            // return <MessageListView data={data} subscribeToMore={more} />
            return (
              <SuperTable
                columnHeaders={COLUMN_HEADERS}
                subscribeToMore={more}
                title="Table of Tags"
                data={data.allTags}
                executeFunc={(funcName, obj) => {
                  this.executeFunctionByName(funcName, obj)
                }}
              />
            )
          }}
        </Query>
      </div>
    )
  }

  _createTag = async () => {
    // await this.props
    //   .createTag({
    //     variables: {
    //       name: this.state.name,
    //     },
    //   })
    //   .then(res => {
    //     alert("res " + res)
    //   })
    //   .catch(e => {
    //     alert(e)
    //   })
    this.props
      .createTag({
        variables: {
          name: this.state.name,
        },
      })
      .catch(e => {
        alert(e)
      })
  }

  clearComponent() {
    this.setState(this.defaultState())
  }
}

CreateTag.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  // graphql(ALL_TAGS, { name: "tags" }),
  graphql(CREATE_TAG, { name: "createTag" }),
  withApollo
)(CreateTag)

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore()
  }
  render() {
    const { data } = this.props
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.allTags.map((tag, idx) => {
          return <li>{tag.name}</li>
        })}
      </ul>
    )
  }
}
