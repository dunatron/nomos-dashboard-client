import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { graphql, withApollo, compose } from "react-apollo"
import { withStyles } from "@material-ui/core/styles"

import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import ThumbUpSharpIcon from "@material-ui/icons/ThumbUpSharp"

// components
import SuperTable from "../components/SuperTable/index"

// Redux
import { connect } from "react-redux"
// queries
import { ALL_LEAVE } from "../queries/AllLeave.graphql"
// mutations
import { ACCEPT_LEAVE } from "../mutations/AcceptLeave.graphql"

const styles = theme => ({
  root: {},
})

const COLUMN_HEADERS = [
  {
    id: "daysOfLeave",
    numeric: false,
    disablePadding: true,
    label: "daysOfLeave",
    show: true,
    tableRenderKey: "th",
  },
  {
    id: "firstDayOfLeave",
    numeric: false,
    disablePadding: true,
    label: "firstDayOfLeave",
    show: true,
    tableRenderKey: "th",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "status",
    show: true,
    tableRenderKey: "th",
  },
  {
    id: "acceptLeave", //votes.id
    numeric: false,
    disablePadding: true,
    label: "Accept leave ",
    show: false,
    type: "btnFunc",
    // icon: (
    //   <IconButton color="primary" aria-label="Add to shopping cart">
    //     <ThumbUpSharpIcon />
    //   </IconButton>
    // ),
    funcName: "acceptLeave",
    found: "votes",
    tableRenderKey: "th",
  },
  // {
  //   id: "name", //votes.id
  //   numeric: false,
  //   disablePadding: true,
  //   label: "User name ",
  //   show: true,
  //   type: "numberOfObj",
  //   found: "forUser",
  //   tableRenderKey: "th",
  // },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "posted by",
    show: true,
    type: "deep",
    found: "forUser.name",
    tableRenderKey: "th",
  },
  // {
  //   id: "forUser.name",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "User name",
  //   show: true,
  //   tableRenderKey: "th",
  // },
  // {
  //   id: "url",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "url",
  //   show: true,
  //   tableRenderKey: "th",
  // },
  // {
  //   id: "createdAt",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "created at ",
  //   show: true,
  //   tableRenderKey: "th",
  // },
  // // {
  // //   id: "postedBy",
  // //   numeric: false,
  // //   disablePadding: true,
  // //   label: "posted by",
  // //   show: true,
  // //   type: "object",
  // //   tableRenderKey: "th",
  // // },

  // {
  //   id: "postedBy",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "posted by",
  //   show: true,
  //   type: "deep",
  //   found: "postedBy.name",
  //   tableRenderKey: "th",
  // },

  // {
  //   id: "votes", //votes.id
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Votes ",
  //   show: true,
  //   type: "numberOfObj",
  //   found: "votes",
  //   tableRenderKey: "th",
  // },

  // {
  //   id: "upVote", //votes.id
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Upvote ",
  //   show: false,
  //   type: "btnFunc",
  //   icon: (
  //     <IconButton color="primary" aria-label="Add to shopping cart">
  //       <ThumbUpSharpIcon />
  //     </IconButton>
  //   ),
  //   funcName: "upVote",
  //   found: "votes",
  //   tableRenderKey: "th",
  // },

  // { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  // { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
]

class LeaveList extends Component {
  renderLeaveItem = leave => {
    return (
      <div>
        <p>
          User
          <span>{leave.forUser.name}</span>
        </p>
        <p>
          lastDayOfWork
          <span>{leave.lastDayOfWork}</span>
        </p>
        <p>
          firstDayOfLeave
          <span>{leave.firstDayOfLeave}</span>
        </p>
        <p>
          lastDayOfLeave
          <span>{leave.lastDayOfLeave}</span>
        </p>
        <p>
          firstDayOfWork
          <span>{leave.firstDayOfWork}</span>
        </p>
        <p>
          daysOfLeave
          <span>{leave.daysOfLeave}</span>
        </p>
        <p>
          publicHolidays
          <span>{leave.publicHolidays}</span>
        </p>
        <p>
          totalLeaveDays
          <span>{leave.totalLeaveDays}</span>
        </p>
      </div>
    )
  }

  acceptLeave = async ({ id }) => {
    console.log("trying to accept leave")
    const acceptedLeave = await this.props.acceptLeave({
      variables: {
        id: id,
      },
    })

    const leaveData = this.props.store.readQuery({
      ALL_LEAVE,
    })
    console.log("Our Leave Data => ", leaveData)

    // // const data = store.readQuery({
    // //   query: FEED_QUERY,
    // //   variables: { first, skip, orderBy },
    // // })

    // // const votedSample = data.feed.samples.find(sample => sample.id === sampleId)
    // // votedSample.votes = createVote.sample.votes
    // // store.writeQuery({ query: FEED_QUERY, data })
    // acceptedLeave.then(res => {
    //   console.log("Our result to update the cache with => ", res)

    // })
    console.log("acceptedLeave returned Obj => ", acceptedLeave)
    alert("Accept leave")
    // 1. create an acceptLeave mutation. it will accept an id, and send email, update status
  }

  executeFunctionByName = (functionName, dataObj /*, args */) => {
    console.log("The dataObj ", dataObj)
    switch (functionName) {
      case "acceptLeave":
        this.acceptLeave(dataObj)
        break
      case "helloWorld":
        this.helloWorld()
        break
      case "upVote":
        this.upVote(dataObj.id)
        break
      default:
        alert("No funct specified")
    }
  }

  render() {
    const {
      classes,
      allLeave: { loading, error, getAllLeave, fetchMore },
    } = this.props
    console.log("The props of the leave list => ", this.props)

    if (loading) {
      return "Loading the leave list"
    }

    if (error) {
      return "soz an error ran"
    }

    return (
      <div>
        <h1>The Leave list</h1>
        <SuperTable
          columnHeaders={COLUMN_HEADERS}
          title="Table of Code Samples"
          data={getAllLeave}
          executeFunc={(funcName, obj) => {
            this.executeFunctionByName(funcName, obj)
          }}
        />
        {getAllLeave &&
          getAllLeave.map(leave => {
            console.log("Al leave item => ", leave)
            return this.renderLeaveItem(leave)
          })}
      </div>
    )

    // return <div className={classes.root} />
  }
}

LeaveList.propTypes = {
  classes: PropTypes.object,
}

const reduxWrapper = connect(state => ({
  user: state.user,
}))

export default compose(
  graphql(ALL_LEAVE, { name: "allLeave" }),
  graphql(ACCEPT_LEAVE, { name: "acceptLeave" }),
  withApollo,
  withStyles(styles),
  reduxWrapper
)(LeaveList)
