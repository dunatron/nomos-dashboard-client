import React, { Component, Fragment } from "react"
import { graphql, compose, withApollo } from "react-apollo"
import { Query } from "react-apollo"
import { withStyles } from "@material-ui/core/styles"
import moment from "moment"
// components
import SuperTable from "../components/SuperTable/index"
import Calendar from "../components/Calendar/index"

// queries
import { ALL_LEAVE } from "../queries/AllLeave.graphql"
import { LEAVE_FEED } from "../queries/LeaveFeed.graphql"
// mutations
import { ACCEPT_LEAVE } from "../mutations/AcceptLeave.graphql"
// subscriptions
import { NEW_LEAVES_SUBSCRIPTION } from "../subscriptions/NewLeaveSubscription.graphql"

const COLUMN_HEADERS = [
  {
    id: "daysOfLeave",
    numeric: false,
    disablePadding: true,
    label: "daysOfLeave",
    show: true,
    tableRenderKey: "th",
    found: "daysOfLeave",
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
    id: "lastDayOfLeave",
    numeric: false,
    disablePadding: true,
    label: "lastDayOfLeave",
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
    show: true,
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
    id: "forUser.name",
    numeric: false,
    disablePadding: true,
    label: "User",
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

const styles = theme => ({
  root: {},
})
class LeaveList extends Component {
  acceptLeave = async ({ id }) => {
    // 1. actually only need first step, cache seems to update...
    const acceptedLeave = await this.props.acceptLeave({
      variables: {
        id: id,
      },
    })
    /**
    // 2. ready leaveData and store in variable
    const leaveData = this.props.client.readQuery({
      query: LEAVE_FEED,
    })
    // 3. get item that we will mutate
    const cachedLeaveItem = leaveData.getAllLeave.find(leave => leave.id === id)
    // 4. mutate this item
    cachedLeaveItem.status = acceptedLeave.data.acceptLeave.status
    // 5. usually have to write query back into the cached store.  Note: wasn't working
     */
  }

  _subscribeToNewLeave = async subscribeToMore => {
    subscribeToMore({
      document: NEW_LEAVES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("subscriptionData => ", subscriptionData)
        if (!subscriptionData.data) return prev
        const newLeave = subscriptionData.data.newLeave.node

        console.log(" prev => ", prev)

        return Object.assign({}, prev, {
          leaveFeed: {
            leaves: [newLeave, ...prev.leaveFeed.leaves],
            count: prev.leaveFeed.leaves.length + 1,
            __typename: prev.leaveFeed.__typename,
          },
        })
      },
    })
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

  helloWorld = () => {
    alert("HELLO WORLD!")
  }

  render() {
    return (
      <Query query={LEAVE_FEED}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLeave(subscribeToMore)

          const { leaveFeed } = data
          const { count, leaves } = leaveFeed

          console.log("Here is data ", data)
          console.log("Here is leavesToRender ", leaveFeed)

          // const calendarData = leaveFeed.leaves
          //   .filter(l => l.status === "PENDING")
          //   .map(l => {
          //     let dates = []
          //     const firstDay = moment(l.firstDayOfLeave)
          //     const lastDay = moment(l.lastDayOfLeave)
          //     const numberOfDays = lastDay.diff(firstDay, "days")
          //     let objDate = moment(l.firstDayOfLeave)
          // for (let i = 0; i < numberOfDays; i++) {
          //   dates.push({
          //     name: l.forUser.name,
          //     created: l.createdAt,
          //     details: "some details about this piece of data",
          //     date: objDate,
          //   })
          //   objDate.add(1, "days")
          // }
          //     return dates
          //     console.group("Leave Dates")
          //     console.log("l.firstDayofLeave => ", l.firstDayOfLeave)
          //     console.log("l.lastDayOfLeave => ", l.lastDayOfLeave)
          //     console.log("l.createdAt => ", l.createdAt)
          //     console.log("numberOfDays => ", numberOfDays)
          //     console.groupEnd()
          //     return {
          //       name: l.forUser.name,
          //       created: l.createdAt,
          //       details: "some details about this piece of data",
          //       date: moment(),
          //     }
          //   })
          const calendarData = leaveFeed.leaves
            // .filter(l => l.status === "PENDING")
            .reduce((acc, leave) => {
              let dates = []
              const firstDay = moment(leave.firstDayOfLeave)
              const lastDay = moment(leave.lastDayOfLeave)
              const numberOfDays = lastDay.diff(firstDay, "days") + 1
              let objDate = moment(leave.firstDayOfLeave)
              for (let i = 0; i < numberOfDays; i++) {
                dates.push({
                  name: leave.forUser.name,
                  created: leave.createdAt,
                  details: "some details about this piece of data",
                  // date: objDate.format("DD/MM/YYYY"),
                  date: objDate,
                  prettyDate: objDate.format("dddd Do MMMM"),
                })
                objDate.add(1, "days")
              }
              // return dates
              return acc.concat(dates)
            }, [])

          console.log("calendarData ", calendarData)

          return (
            <Fragment>
              <h1>Employee leave</h1>
              <Calendar data={calendarData} />
              <SuperTable
                columnHeaders={COLUMN_HEADERS}
                title="Table of leave"
                data={leaves}
                executeFunc={(funcName, obj) => {
                  this.executeFunctionByName(funcName, obj)
                }}
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  graphql(ACCEPT_LEAVE, { name: "acceptLeave" }),
  withStyles(styles),
  withApollo
)(LeaveList)
