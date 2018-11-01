import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, withApollo, compose } from "react-apollo"
import CircularProgress from "@material-ui/core/CircularProgress"

// Queries
// import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
// import DOCUMENT_QUERY from "../queries/Document.graphql"
import { ALL_USERS } from "../../queries/AllUsers.graphql"
// Mutations
// import { POST_SECTION_MUTATION } from "../mutations/postSection"
// import { UPDATE_SECTION_POSITION } from "../mutations/updateSectionPosition"
// Components
import UserList from "./UserList"

class UserStandUpDetails extends Component {
  render() {
    console.log("UserStandUpDetails PROPS => ", this.props)
    const {
      data: {
        allUsers,
        loading,
        error,
        fetchMore,
        refetch,
        startPolling,
        stopPolling,
        subScribeToMore,
        updateQuery,
        variables,
      },
    } = this.props

    if (loading) {
      return (
        <CircularProgress
          style={{ padding: 40 }}
          color="secondary"
          thickness={7}
        />
      )
    }

    if (error) {
      return "an error ocurred"
    }

    return <UserList allUsers={allUsers} />
  }
}

// export default compose(
//   withRouter,
//   withApollo
// )(UserStandUpDetails)

export default compose(
  graphql(ALL_USERS),
  // graphql(POST_SECTION_MUTATION, { name: "postSection" }),
  // graphql(UPDATE_SECTION_POSITION, { name: "updateSectionPosition" }),

  // withStyles(styles),
  withApollo
  // reduxWrapper
)(UserStandUpDetails)
