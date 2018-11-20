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
      name: props.question.name,
      answers: {
        // update: [
        //   // map over answers here
        //   {
        //     where: {
        //       id: "answerID",
        //       data: {
        //         response: "Here is the answer",
        //       },
        //     },
        //     create: [],
        //   },
        // ],
        update: props.question.answers.map((answer, aIdx) => {
          return {
            where: {
              id: answer.id,
              data: {
                response: answer.response,
              },
            },
          }
        }),
      },
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps !== this.props) {
    //   alert("Ummmm Our props have changed?")
    // }
    console.log("prevState => ", prevState)
    console.log("this.state => ", this.state)
    if (prevState !== this.state && this.state.canUpdate === false) {
      this.setState({
        canUpdate: true,
      })
    }
  }

  _update = async () => {
    alert("_update")
    console.log("this.state.name => ", this.state.name)
    console.log("this.props.question.name => ", this.props.question.name)
    if (this.state.name !== this.props.question.name) {
      alert("The name should update")
    }

    try {
      const res = await this.props.updateStockQuestion({
        variables: {
          id: this.state.id,
          data: {
            name: this.state.name,
            // answers: this.state.answers,
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
        {answers.update.map((answer, aIdx) => {
          return <div>{answer.where.data.response}</div>
        })}
        {this.renderKnownAnswers(answers.update, editing)}
        {/* <CardContent>
          <Switch
            onChange={() => this.toggleEditing(!this.state.editing)}
            checked={this.state.editing}
          />
          {editing ? (
            <TextField
              label="Question"
              multiline
              value={name}
              onChange={e => this.updateName(e.target.value)}
            />
          ) : (
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom>
              {name}
            </Typography>
          )}
          {this.renderAnswers(answers, editing)}
        </CardContent>
        <CardActions>
          {canUpdate && (
            <Button size="small" onClick={() => this._update()}>
              Update
            </Button>
          )}
        </CardActions> */}
      </Card>
    )
  }

  renderKnownAnswers = (answers, editing) => {
    return answers.map((answer, answerIdx) => {
      if (editing) {
        return (
          <TextField
            label={`Answer ${answerIdx + 1}`}
            multiline
            value={answer.response}
            onChange={e => this.updateKnownAnswer(e.target.value, answerIdx)}
          />
        )
      }
      return (
        <ul>
          <li>response{answer.where.data.response}</li>
        </ul>
      )
    })
  }

  renderAnswers = (answers, editing) => {
    return answers.map((answer, answerIdx) => {
      if (editing) {
        return (
          <TextField
            label={`Answer ${answerIdx + 1}`}
            multiline
            value={answer.response}
            onChange={e => this.updateAnswer(e.target.value, answerIdx)}
          />
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
