import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"

//components
import UserCard from "./UserCard"

const styles = theme => ({
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "320px",
    padding: `${theme.spacing.unit * 3}px`,
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    color: theme.palette.primary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
})

class UserList extends Component {
  render() {
    const { allUsers } = this.props
    return (
      <div>
        <h1>User Stand Up Details</h1>
        {allUsers && allUsers.map(user => <UserCard user={user} />)}
      </div>
    )
  }
}

export default withStyles(styles)(UserList)
