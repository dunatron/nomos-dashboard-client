import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, withApollo, compose } from "react-apollo"

// Queries
// import { SINGLE_DOCUMENT_QUERY } from "../queries/singleDocument"
// import DOCUMENT_QUERY from "../queries/Document.graphql"
import { ALL_USERS } from "../../queries/AllUsers.graphql"
// Mutations
// import { POST_SECTION_MUTATION } from "../mutations/postSection"
// import { UPDATE_SECTION_POSITION } from "../mutations/updateSectionPosition"

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
      return "Loading User Data"
    }

    if (error) {
      return "an error ocurred"
    }

    return (
      <div>
        <h1>User Stand Up Details</h1>
        {allUsers &&
          allUsers.map(user => {
            return (
              <div>
                <h1>{user.name}</h1>
                <p>id: {user.role}</p>
                <p>id: {user.id}</p>
                <p>
                  A big component card to record some details and on save do its
                  thing
                </p>
              </div>
            )
          })}
      </div>
    )
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
