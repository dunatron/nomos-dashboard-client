import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { graphql, compose, withApollo, Query } from "react-apollo"

// Queries
// import { QUESTION_FEED } from "../../queries/QuestionFeed.graphql"
// Mutations
import { UPDATE_QUESTION } from "../../mutations/UpdateQuestion.graphql"

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})
class EditableQuestionCard extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   editing: false,
    //   canUpdate: false,
    //   ...props.question,
    // }
    this.state = {
      editing: false,
      canUpdate: false,
      id: props.question.id,
      name: props.question.name,
      answers: {
        update: props.question.answers.map((answer, aIdx) => {
          return {
            where: {
              id: answer.id,
            },
            data: {
              response: answer.response,
            },
          }
        }),
        create: [],
      },
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state && this.state.canUpdate === false) {
      this.setState({
        canUpdate: true,
      })
    }
  }

  _update = async () => {
    try {
      const res = await this.props.updateStockQuestion({
        variables: {
          id: this.state.id,
          data: {
            name: this.state.name,
            answers: { ...this.state.answers },
            // notes: this.state.notes,
            // links: this.state.links,
          },
        },
      })
      alert("Question   has been updated => " + JSON.stringify(res))
    } catch (e) {
      alert(e)
    } finally {
      // this.clearComponent()
      this.setState({
        canUpdate: false,
      })
    }
  }

  toggleEditing = bool => {
    this.setState({
      editing: bool,
    })
  }
  updateName = v => {
    this.setState({
      name: v,
    })
  }
  updateAnswer = (val, answerIdx) => {
    const answers = this.state.answers
    answers[answerIdx].response = val
    this.setState({
      answers: answers,
    })
  }
  render() {
    const { classes } = this.props
    const {
      editing,
      canUpdate,
      id,
      name,
      answers,
      links,
      notes,
      tags,
    } = this.state
    return (
      <Card className={classes.card}>
        <Switch
          onChange={() => this.toggleEditing(!this.state.editing)}
          checked={this.state.editing}
        />

        <CardContent>
          {this.renderName(name, editing)}
          {this.renderKnownAnswers(answers.update, editing)}
          {this.renderCreateAnswers(answers.create, editing)}
          {editing && (
            <Button onClick={() => this.addAnswer()}>Add answer</Button>
          )}
        </CardContent>
        <CardActions>
          {canUpdate && (
            <Button size="small" onClick={() => this._update()}>
              Update
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }

  renderName = (name, editing) => {
    const { classes } = this.props
    if (editing) {
      return (
        <TextField
          label="Question"
          multiline
          value={name}
          onChange={e => this.updateName(e.target.value)}
        />
      )
    }
    return (
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {name}
      </Typography>
    )
  }

  addAnswer = () => {
    const answers = this.state.answers
    answers.create.push({ response: "" })
    this.setState({
      answers: answers,
    })
  }

  updateKnownAnswer = (val, idx) => {
    const answers = this.state.answers
    answers.update[idx].data.response = val
    this.setState({
      answers: answers,
    })
  }

  updateCreateAnswer = (val, idx) => {
    const answers = this.state.answers
    answers.create[idx].response = val
    this.setState({
      answers: answers,
    })
  }

  renderKnownAnswers = (answers, editing) => {
    return answers.map((answer, idx) => {
      if (editing) {
        return (
          <Fragment>
            <TextField
              label={`Answer ${idx + 1}`}
              multiline
              value={answer.data.response}
              onChange={e => this.updateKnownAnswer(e.target.value, idx)}
            />
          </Fragment>
        )
      }
      return (
        <ul>
          <li>response{answer.data.response}</li>
        </ul>
      )
    })
  }

  renderCreateAnswers = (answers, editing) => {
    return answers.map((answer, idx) => {
      if (editing) {
        return (
          <Fragment>
            <TextField
              label={`Answer ${idx + 1}`}
              multiline
              value={answer.response}
              onChange={e => this.updateCreateAnswer(e.target.value, idx)}
            />
          </Fragment>
        )
      }
      return (
        <ul>
          <li>response{answer.response}</li>
        </ul>
      )
    })
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  graphql(UPDATE_QUESTION, { name: "updateStockQuestion" }),
  withApollo
)(EditableQuestionCard)
