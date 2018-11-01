import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import DoneIcon from "@material-ui/icons/Done"

const styles = theme => ({
  card: {
    minWidth: 275,
    borderRadius: 0,
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,

    // flexGrow: 1,
  },
  doneStrip: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.unit * 2,
  },
  doneText: {
    padding: theme.spacing.unit,
  },
})

class UserCard extends Component {
  state = {
    notes: null,
    finished: false,
    talkTime: 0,
  }

  handleNotesChange = val => {
    this.setState({
      notes: val,
    })
  }

  _updateUserStandup = () => {
    this.setState({
      finished: true,
    })
  }

  render() {
    const {
      classes,
      handleClick,
      user: { id, name, email, role },
    } = this.props
    const { notes, finished, talkTime } = this.state

    if (finished) {
      return (
        <Card className={classes.card}>
          <div className={classes.doneStrip}>
            <DoneIcon color="secondary" />
            <span className={classes.doneText}>
              {name} - {talkTime} - {notes}
            </span>
          </div>
        </Card>
      )
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <h1>{name}</h1>
          <p>{id}</p>
          <p>{email}</p>
          <p>{role}</p>
          <Button size="small" onClick={handleClick} color={"primary"}>
            Start Timer
          </Button>
          <div>
            NOTES:{" "}
            <input
              value={notes}
              onChange={e => this.handleNotesChange(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          {finished ? (
            <div>
              <DoneIcon />
            </div>
          ) : (
            <Button
              size="small"
              onClick={() => this._updateUserStandup()}
              color={"primary"}>
              Finish Rant
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserCard)

// const timer = () => {}

// const UserCard = ({
// classes,
// handleClick,
// user: { id, name, email, role },
// }) => {
//   return (
// <Card className={classes.card}>
//   <CardContent>
//     <h1>{name}</h1>
//     <p>{id}</p>
//     <p>{email}</p>
//     <p>{role}</p>
//     <Button size="small" onClick={handleClick} color={"primary"}>
//       Start Timer
//     </Button>
//     <div>
//       NOTES: <input />
//     </div>
//   </CardContent>
//   <CardActions>
//     <Button size="small" onClick={handleClick} color={"primary"}>
//       Finish Rant
//     </Button>
//   </CardActions>
// </Card>
//   )
// }

// UserCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// }

// export default withStyles(styles)(UserCard)
