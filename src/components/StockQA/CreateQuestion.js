import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { graphql, withApollo, compose } from "react-apollo"
// Mutations
import { CREATE_STOCK_QUESTION } from "../../mutations/CreateQuestion.graphql"

const styles = theme => ({
  root: {},
})

class CreateQuestion extends Component {
  state = {
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
          content
          <input
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
          name
          <input
            placeholder="New Link Name"
            value={link.name}
            onChange={e =>
              this.changeQuestionLink("name", e.target.value, linkIdx)
            }
          />
          url
          <input
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
          response
          <input
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
    return (
      <div>
        <h1>Create Question Page</h1>
        <input
          placeholder="Question being asked"
          value={this.state.name}
          onChange={e =>
            this.setState({
              name: e.target.value,
            })
          }
        />
        <h2>Question Answers</h2>
        {answers.create ? this.renderNewAnswers(answers.create) : null}
        <button onClick={() => this.addAnswer()}>New Answer</button>

        <h2>Question Notes</h2>
        <button onClick={() => this.addQuestionNote()}>New Note</button>
        {notes.create ? this.renderNewQuestionNotes(notes.create) : null}
        <h2>Question Links</h2>
        <button onClick={() => this.addQuestionLink()}>New Link</button>
        {links.create ? this.renderNewQuestionLinks(links.create) : null}
        {creating ? (
          "Creating Question"
        ) : (
          <button onClick={() => this._createQuestion()}>
            SUbmit New Questio/Answers
          </button>
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
      this.setState({
        creating: false,
      })
    }
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
