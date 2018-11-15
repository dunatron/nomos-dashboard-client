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
  constructor(props) {
    super(props)
    this.state = {
      date: moment(),
      betweenFilter: this.generateFilterDates(moment()),
    }
  }

  generateFilterDates = date => {
    const betweenFilter = [
      moment(date)
        .add(-2, "month")
        .startOf("month")
        .format(),
      moment(date)
        .add(2, "month")
        .endOf("month")
        .format(),
    ]
    return betweenFilter
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

  _fetchMoreLeave = async (filterProps, fetchMore, data) => {
    await this.setState({
      betweenFilter: this.generateFilterDates(filterProps.date),
    })
    console.group("_fetchMoreLeave")
    console.log("filterProps => ", filterProps)
    console.log("fetchMore => ", fetchMore)
    console.log("data => ", data)
    console.groupEnd()
    const qVars = this._getQueryVariables()
    fetchMore({
      variables: { ...qVars },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.group("updateQuery")
        console.log("prev => ", prev)
        console.log("fetchMoreResult => ", fetchMoreResult)
        console.groupEnd()
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          leaveFeed: [...prev.leaveFeed, ...fetchMoreResult.leaveFeed],
        })
      },
    })
  }

  _getQueryVariables = () => {
    const first = 100
    const skip = 0
    const betweenFilter = this.state.betweenFilter
    const orderBy = "lastDayOfWork_ASC"
    return { first, skip, betweenFilter, orderBy }
  }

  render() {
    console.log("Leave Calendar props => ", this.props)
    return (
      <Query
        query={LEAVE_FEED}
        variables={this._getQueryVariables()}
        fetchPolicy="cache-and-network">
        {({ loading, error, data, subscribeToMore, fetchMore }) => {
          if (loading)
            return (
              <Calendar
                loading={loading}
                initDate={this.state.date}
                // data={calendarData}
                fetchMoreData={props =>
                  this._fetchMoreLeave(props, fetchMore, data)
                }
              />
            )
          // if (loading) return <div>Loading</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLeave(subscribeToMore)

          const { leaveFeed } = data
          const { count, leaves } = leaveFeed

          console.group("leaveFeed")
          console.log("leaveFeed => ", leaveFeed)
          console.log("count => ", count)
          console.log("leaves => ", leaves)
          console.groupEnd()

          const calendarData = leaveFeed.leaves
            // .filter(l => l.status === "ACCEPTED")
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

          return (
            <Calendar
              initDate={this.state.date}
              data={calendarData}
              fetchMoreData={props =>
                this._fetchMoreLeave(props, fetchMore, data)
              }
            />
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
