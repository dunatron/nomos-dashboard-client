import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
// Mutations
import { CREATE_STOCK_QUESTION } from "../../mutations/CreateQuestion.graphql"
// components
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
// icons
import AddIcon from "@material-ui/icons/Add"
const styles = theme => ({
  root: {
    maxWidth: 800,
    marginRight: "auto",
    marginLeft: "auto",
  },
  heading: { fontSize: 18, color: theme.palette.primary.main },
  questionInput: {
    width: "100%",
  },
})

class CreateQuestion extends Component {
  defaultState = () => {
    const defaultState = {
      creating: false,
      name: "",
      answers: {
        create: [],
        connect: [],
      },
      notes: {
        create: [],
        connect: [],
      },
      links: {
        create: [],
        connect: [],
      },
    }
    return defaultState
  }
  state = this.defaultState()

  addQuestionNote = () => {
    const createNotes = this.state.notes.create
    createNotes.push({ content: "" })
    this.setState({
      notes: {
        ...this.state.notes,
        create: createNotes,
      },
    })
  }

  addAnswer = () => {
    const createAnswers = this.state.answers.create
    createAnswers.push({ response: "" })
    this.setState({
      answers: {
        ...this.state.answers,
        create: createAnswers,
      },
    })
  }

  addQuestionLink = () => {
    const createLinks = this.state.links.create
    createLinks.push({ name: "", url: "" })
    this.setState({
      links: {
        ...this.state.links,
        create: createLinks,
      },
    })
  }

  changeAnswer = (v, idx) => {
    const createAnswers = this.state.answers.create
    createAnswers[idx].response = v
    this.setState({
      answers: {
        ...this.state.answers,
        create: createAnswers,
      },
    })
  }

  changeQuestionNote = (v, idx) => {
    const createNotes = this.state.notes.create
    createNotes[idx].content = v
    this.setState({
      notes: {
        ...this.state.notes,
        create: createNotes,
      },
    })
  }

  changeQuestionLink = (variableName, v, idx) => {
    const createLinks = this.state.links.create
    createLinks[idx][variableName] = v
    this.setState({
      notes: {
        ...this.state.links,
        create: createLinks,
      },
    })
  }

  renderNewQuestionNotes = questions => {
    return questions.map((question, questionIdx) => {
      return (
        <div>
          <TextField
            placeholder="New Question Note"
            value={question.content}
            onChange={e => this.changeQuestionNote(e.target.value, questionIdx)}
          />
        </div>
      )
    })
  }

  renderNewQuestionLinks = links => {
    return links.map((link, linkIdx) => {
      return (
        <div>
          <TextField
            placeholder="New Link Name"
            value={link.name}
            onChange={e =>
              this.changeQuestionLink("name", e.target.value, linkIdx)
            }
          />
          <TextField
            placeholder="New Link URL"
            value={link.url}
            onChange={e =>
              this.changeQuestionLink("url", e.target.value, linkIdx)
            }
          />
        </div>
      )
    })
  }

  renderNewAnswers = answers => {
    return answers.map((answer, answerIdx) => {
      return (
        <div>
          <TextField
            placeholder="New Answer"
            value={answer.response}
            onChange={e => this.changeAnswer(e.target.value, answerIdx)}
          />
        </div>
      )
    })
  }

  render() {
    const { creating, name, answers, notes, links } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <TextField
          id="create-stock-question-input"
          label="New Stock Question"
          className={classes.questionInput}
          value={this.state.name}
          multiline
          onChange={e =>
            this.setState({
              name: e.target.value,
            })
          }
          margin="normal"
        />
        <Typography className={classes.heading}>Answers</Typography>
        {answers.create ? this.renderNewAnswers(answers.create) : null}
        <Button color="secondary" size="small" onClick={() => this.addAnswer()}>
          <AddIcon /> New Answer
        </Button>
        <Typography className={classes.heading}>Notes</Typography>
        <Button
          color="secondary"
          size="small"
          onClick={() => this.addQuestionNote()}>
          <AddIcon />
          New Note
        </Button>
        {notes.create ? this.renderNewQuestionNotes(notes.create) : null}
        <Typography className={classes.heading}>Links</Typography>
        <Button
          color="secondary"
          size="small"
          onClick={() => this.addQuestionLink()}>
          <AddIcon />
          New Link
        </Button>
        {links.create ? this.renderNewQuestionLinks(links.create) : null}
        <hr />
        {creating ? (
          "Creating Question"
        ) : (
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => this._createQuestion()}>
            Submit New Question/Answers
          </Button>
        )}
      </div>
    )
  }

  _createQuestion = async () => {
    this.setState({
      creating: true,
    })
    try {
      const res = await this.props.createStockQuestion({
        variables: {
          data: {
            name: this.state.name,
            answers: this.state.answers,
            notes: this.state.notes,
            links: this.state.links,
          },
        },
      })
      alert("New Question has been created => " + JSON.stringify(res))
    } catch (e) {
      alert(e)
    } finally {
      this.clearComponent()
    }
  }

  clearComponent() {
    this.setState(this.defaultState())
  }
}

CreateQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  graphql(CREATE_STOCK_QUESTION, { name: "createStockQuestion" }),
  withApollo
)(CreateQuestion)
