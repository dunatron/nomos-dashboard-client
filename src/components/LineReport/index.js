import React, { Component } from "react"

class LineReport extends Component {
  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.state = {
      affix: false,
      topDist: 0,
      scrollLeftVal: 0,
    }
  }
  // state = {
  //   affix: false,
  //   topDist: 0,
  // }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll)
    var el = document.querySelector("#top-scroll-bar")
    el.addEventListener("scroll", this.handleTopScroll)
    this.wrapperRef.addEventListener("scroll", this.handleBottomScroll)
    // console.log("Will this work? ", el)
    // window.addEventListener("scroll", this.handleTopScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll)
  }

  componentWillUpdate() {
    // console.log("Update => this.wrapperRef ", this.wrapperRef)
    if (
      this.wrapperRef &&
      this.wrapperRef.scrollLeft !== this.state.scrollLeftVal
    ) {
      this.setState({
        scrollLeftVal: this.wrapperRef.scrollLeft,
      })
    }
  }

  setWrapperRef(node) {
    // console.log("Setting wrapper ref ", node)
    this.wrapperRef = node
  }

  handleTopScroll = () => {
    // console.log("FUck a nigga up in my chucks")
    var el = document.querySelector("#top-scroll-bar")
    const leftVal = el.scrollLeft
    this.wrapperRef.scrollLeft = leftVal
  }

  handleBottomScroll = () => {
    const leftVal = this.wrapperRef.scrollLeft
    var el = document.querySelector("#top-scroll-bar")
    el.scrollLeft = leftVal
  }

  handleScroll = event => {
    var el = document.querySelector("#affix-target")
    const { affix } = this.state
    if (el.getBoundingClientRect().y < 0) {
      this.setState({
        affix: true,
        topDist: Math.abs(el.getBoundingClientRect().y),
      })
    } else if (el.getBoundingClientRect().y > 0) {
      this.setState({
        affix: false,
        topDist: 0,
      })
    }
  }

  render() {
    const {
      data,
      rowProps,
      columnProps,
      reportWidth,
      keyPanelWidth,
      colWidth,
    } = this.props
    const colPanelWidth = reportWidth - keyPanelWidth
    const { affix } = this.state
    let affixTopScrollBar = {
      top: affix ? `${this.state.topDist + 30}px` : "30px",
    }
    return (
      <div id="affix-target" className="lineReport">
        <div className="rowKeyPanel">
          <div className="columnTitle" />
          {rowProps.map((rowProp, rIdx) => this.renderRowKey(rowProp, rIdx))}
        </div>

        <div
          id="top-scroll-bar"
          style={{
            ...affixTopScrollBar,
            width: `${colPanelWidth}px`,
            marginLeft: `${keyPanelWidth}px`,
          }}>
          <div style={{ width: `${colWidth * data.length}px` }}>
            <div style={{ visibility: "hidden" }}>
              You can't see me. But I see you. Lord{" "}
            </div>
          </div>
        </div>
        <div className="columnPanels" ref={this.setWrapperRef}>
          {/* {affix && <div id="top-scroll-bar">I should be a scrollbar</div>} */}
          {/* <div id="top-scroll-bar" style={{ width: `${colPanelWidth}px` }}>
            <div style={{ width: `${colWidth * data.length}px` }}>
              I should be a scrollbar hmmm
            </div>
          </div> */}
          {data.map((dataColumn, cIdx) => this.renderColumn(dataColumn, cIdx))}
        </div>
      </div>
    )
  }

  renderRowKey = ({ name, key, type, keyClasses }) => {
    switch (type) {
      case "header":
        return <div className={`typeHeader ${keyClasses}`}>{name}</div>
      case "p":
        return <div className={`typeP ${keyClasses}`}>{name}</div>
      case "h1":
        return <div className={`typeH1 ${keyClasses}`}>{name}</div>
      case "hr":
        return <hr className={`typeHr ${keyClasses}`} />
      default:
        return
    }
  }

  zebraStyleOnAffix = (affix, cIdx) => {
    if (!affix) {
      return "transparent"
    }
    // return Math.abs(cIdx % 2) === 1 ? "rgb(242, 242, 242)" : "#FCFCFC" // same
    return Math.abs(cIdx % 2) === 1 ? "rgb(242, 242, 242)" : "#FCFCFC" // same
  }

  renderColumn = ({ columnTitle, values }, cIdx) => {
    // const columnColor = cIdx % 2 === 0 ? "#ffffff" : "#f2f2f2"
    const columnColor =
      cIdx % 2 === 0 ? "rgba(187, 184, 184, 0.043)" : "#f2f2f2"

    const { rowProps } = this.props
    const { affix } = this.state
    let affixStyle = {
      position: "relative",
      color: "#444545",
      fontWeight: "bold",
      top: `${this.state.topDist}px`,
      zIndex: 1,
      textAlign: "center",
      background: this.zebraStyleOnAffix(affix, cIdx),
    }
    return (
      <div
        className="columnPanel"
        style={{
          backgroundColor: columnColor,
          minWidth: `${this.props.colWidth}px`,
        }}>
        <p className="columnTitle" style={affixStyle}>
          {columnTitle}
        </p>
        {rowProps.map((rowProp, rIdx) => {
          const { name, key, type, cellClasses } = rowProp
          const cellValue = values[key]
          return this.renderCellType(rowProp, cellValue)
        })}
      </div>
    )
  }

  renderCellType = ({ name, key, type, cellClasses }, val) => {
    switch (type) {
      case "p": {
        return (
          <div className={`typeP flex-end ${cellClasses}`}>
            {this.getCellValue(val)}
          </div>
        )
      }
      case "h1": {
        return (
          <div className={`typeH1 flex-end ${cellClasses}`}>
            {this.getCellValue(val)}
          </div>
        )
      }
      case "header":
        return (
          <div className={`typeHeader flex-end ${cellClasses}`}>
            {this.getCellValue(val)}
          </div>
        )
      case "hr":
        return <hr className={`typeHr ${cellClasses}`} />
      default:
        return
    }
  }

  getCellValue = val => {
    switch (val) {
      case undefined:
        return ""
      default:
        return val
    }
  }
}

export default LineReport
