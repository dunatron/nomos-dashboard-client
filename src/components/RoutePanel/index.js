import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"

const styles = theme => ({
  card: {
    position: "relative",
    minWidth: 275,
    borderRadius: 0,
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,

    // flexGrow: 1,
  },
  underLay: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  cardInner: {
    position: "relative",
    zIndex: 500,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
})

const RoutePanel = ({ classes, handleClick, route: { title, url, icon } }) => {
  return (
    <Card className={classes.card}>
      {icon && (
        <div className={classes.underLay}>
          <Icon fontSize={"72px"}>{icon}</Icon>
          <span>I will be an icon overlay</span>
          <span>I will be an icon overlay</span>
          <span>I will be an icon overlay</span>
          <span>I will be an icon overlay</span>
        </div>
      )}
      <div className={classes.cardInner}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick} color={"primary"}>
            Launch
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}

RoutePanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RoutePanel)
