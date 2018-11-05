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

import { ALL_LEAVE } from "../queries/AllLeave.graphql"

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
  withApollo,
  withStyles(styles),
  reduxWrapper
)(LeaveList)
