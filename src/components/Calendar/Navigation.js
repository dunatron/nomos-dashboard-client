import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing.unit * 8,
    background: fade(theme.palette.primary.main, 0.5),
  },
  item: {
    flex: "1 1 0",
    textAlign: "center",
  },
})
const Navigation = ({ classes, date, prev, next, changeMonth }) => (
  <div className={classes.root}>
    <button onClick={() => changeMonth(-1)}>{prev}</button>
    {date}
    <button onClick={() => changeMonth(1)}>{next}</button>
  </div>
)

export default withStyles(styles)(Navigation)
