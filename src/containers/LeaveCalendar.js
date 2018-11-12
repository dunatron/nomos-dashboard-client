import React, { Component } from "react"
import { graphql, compose, withApollo } from "react-apollo"
import { Query } from "react-apollo"
import { withStyles } from "@material-ui/core/styles"
import moment from "moment"
// components
import Calendar from "../components/Calendar/index"
// queries
import { LEAVE_FEED } from "../queries/LeaveFeed.graphql"
// mutations
import { ACCEPT_LEAVE } from "../mutations/AcceptLeave.graphql"
// subscriptions
import { NEW_LEAVES_SUBSCRIPTION } from "../subscriptions/NewLeaveSubscription.graphql"

const styles = theme => ({
  root: {},
})
class LeaveList extends Component {
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

  render() {
    return (
      <Query query={LEAVE_FEED}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLeave(subscribeToMore)

          const { leaveFeed } = data
          const { count, leaves } = leaveFeed

          const calendarData = leaveFeed.leaves
            .filter(l => l.status === "ACCEPTED")
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
                  date: objDate,
                  prettyDate: objDate.format("dddd Do MMMM"),
                })
                objDate.add(1, "days")
              }
              // return dates
              return acc.concat(dates)
            }, [])

          return <Calendar data={calendarData} />
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
