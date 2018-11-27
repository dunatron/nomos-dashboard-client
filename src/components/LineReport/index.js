import React, { Component } from "react"

class LineReport extends Component {
  state = {
    affix: false,
    topDist: 0,
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll)
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
    const { data, rowProps, columnProps } = this.props
    return (
      <div id="affix-target" className="lineReport">
        <div className="rowKeyPanel">
          <div className="columnTitle" />
          {rowProps.map((rowProp, rIdx) => this.renderRowKey(rowProp, rIdx))}
        </div>

        <div className="columnPanels">
          {data.map((dataColumn, cIdx) => this.renderColumn(dataColumn, cIdx))}
        </div>
      </div>
    )
  }

  renderRowKey = ({ name, key, type }) => {
    switch (type) {
      case "header":
        return <div className="typeHeader">{name}</div>
      case "p":
        return <div className="type">{name}</div>
      case "h1":
        return <div className="typeH1">{name}</div>
      default:
        return
    }
  }

  renderColumn = ({ columnTitle, values }, cIdx) => {
    const columnColor = cIdx % 2 === 0 ? "#ffffff" : "#f2f2f2"
    const { rowProps } = this.props
    let affixStyle = {
      position: "relative",
      // width: `${panelWidth}px`,
      color: "#444545",
      fontWeight: "bold",
      top: `${this.state.topDist}px`,
      zIndex: 1,
      textAlign: "center",
      // background: this.zebraStyleOnAffix(affix, colIndex),
    }
    return (
      <div
        className="columnPanel"
        style={{
          backgroundColor: columnColor,
          width: `${this.props.colWidth}px`,
        }}>
        <p className="columnTitle" style={affixStyle}>
          {columnTitle}
        </p>
        {rowProps.map((rowProp, rIdx) => {
          const { name, key, type } = rowProp
          const cellValue = values[key]
          return this.renderCellType(rowProp, cellValue)
        })}
      </div>
    )
  }

  renderCellType = ({ name, key, type }, val) => {
    switch (type) {
      case "p": {
        return <div className="typeP">{this.getCellValue(val)}</div>
      }
      case "h1": {
        return <div className="typeH1">{this.getCellValue(val)}</div>
      }
      case "header":
        return <div className="typeHeader">{this.getCellValue(val)}</div>
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
