import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const styles = theme => ({
  root: {},
  question: {
    fontSize: 18,
    color: theme.palette.primary.main,
  },
  answersList: {
    padding: 20,
  },
})

class SearchResult extends Component {
  render() {
    const {
      classes,
      question: { name, answers, links, notes },
    } = this.props
    console.log("result => ", this.props)
    return (
      <div>
        <h2 className={classes.question}>{name}</h2>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Answers ({answers.length})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {answers &&
                answers.map((answer, answerIdx) => {
                  return (
                    <Typography key={answerIdx}>{answer.response}</Typography>
                  )
                })}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Notes ({notes.length})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {notes
                ? notes.map((note, noteIdx) => {
                    return <div key={noteIdx}>{note.content}</div>
                  })
                : "No Notes"}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Links ({links.length})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {links
                ? links.map((link, linkIdx) => {
                    return (
                      <div key={linkIdx}>
                        <a target="__blank" href={link.url}>
                          {link.name}
                        </a>
                      </div>
                    )
                  })
                : "No Notes"}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchResult)
