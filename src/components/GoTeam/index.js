import React, { Component } from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

const goRhymes = [
  "Bio",
  "Blow",
  "Bo",
  "Bow",
  "Bro",
  "Bros",
  "Crow",
  "Crowe",
  "Doh",
  "Dough",
  "Faux",
  "Flow",
  "Foe",
  "Glow",
  "Grow",
  "Hoe",
  "Jo",
  "Joe",
  "Know",
  "Low",
  "Moe",
  "Mow",
  "No",
  "Oh",
  "Pro",
  "Row",
  "Schmoe",
  "Sew",
  "Show",
  "Slow",
  "Snow",
  "So",
  "Sow",
  "Stow",
  "Though",
  "Throw",
  "Toe",
  "Tow",
  "Whoa",
  "Woe",
  "Yo",
]

const teamRhymes = [
  "Beam",
  "Bream",
  "Cream",
  "Creme",
  "Dream",
  "Gleam",
  "Ream",
  "Scheme",
  "Scream",
  "Seam",
  "Seem",
  "Steam",
  "Stream",
  "Theme",
]

export default class App extends Component {
  constructor() {
    super()
    this.state = { show: false }
  }

  render() {
    const goRnd = Math.floor(Math.random() * (goRhymes.length - 1))
    const teamRnd = Math.floor(Math.random() * (teamRhymes.length - 1))
    const phrase =
      (goRnd === -1 && "") || `${goRhymes[goRnd]} ${teamRhymes[teamRnd]}`
    if (!this.state.show)
      return <button onClick={() => this.setState({ show: true })}>GO!</button>
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnter={false}
        transitionLeave={false}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <span style={{ marginTop: 200, fontSize: "100px", maxWidth: "50%" }}>
            {phrase}
          </span>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
