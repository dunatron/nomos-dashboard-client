import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"
import ReactDOM from "react-dom"
const modalRoot = document.getElementById("modal-root")

const styles = theme => ({
  root: {
    display: "flex",
    position: "fixed",
    top: 0,
    // background: fade(theme.palette.primary.main, 0.2),
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    // height: 100,
    // width: 100,
    background: "#FFF",
    overflow: "auto",
    zIndex: 9000,
    height: "100%",
    width: "100%",
  },
  overlay: {
    position: "fixed",
    top: 0,
    background: fade(theme.palette.primary.main, 0.2),
    height: "100%",
    width: "100%",
    zIndex: 1000,
  },
})

class Modal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    const { classes } = this.props
    return ReactDOM.createPortal(
      <div className={classes.root}>
        <div
          className={classes.content}
          style={{
            maxWidth: `${this.props.width}px`,
            maxHeight: `${this.props.height}px`,
          }}>
          <h1>I am the modal</h1>
          {this.props.children}
        </div>
        <div className={classes.overlay} onClick={() => this.props.close()}>
          Overlay
        </div>
      </div>,
      this.el
    )
  }
}

export default withStyles(styles)(Modal)
