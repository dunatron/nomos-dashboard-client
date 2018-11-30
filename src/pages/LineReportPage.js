import React, { Component } from "react"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import LineReport from "../components/LineReport/index"

const data = [
  {
    columnTitle: "Equipment",
    values: {
      balBegin: 463.38,
      additions: 120,
      interestExpense: 180,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
      depreciation: 65,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
]

const rowProps = [
  {
    name: "ROU ASSET CARRYING VALUE ROLL FORWARD",
    type: "header",
  },
  {
    name: "BALANCE AT THE BEGINNING OF THE PERIOD",
    key: "balBegin",
    type: "h1",
  },
  {
    name: "Additions",
    key: "additions",
    type: "p",
    cellClasses: "missing bold",
    keyClasses: "red",
  },
  {
    type: "hr",
  },
  {
    name: "Interest Expense",
    key: "interestExpense",
    type: "p",
  },
  {
    name: "Depreciation",
    key: "depreciation",
    cellClasses: "red",
    type: "p",
  },
  {
    name: "ROU ASSET CARRYING VALUE ROLL FORWARD",
    type: "header",
  },
  {
    name: "BALANCE AT THE BEGINNING OF THE PERIOD",
    key: "balBegin",
    type: "h1",
  },
  {
    name: "Additions",
    key: "additions",
    type: "p",
    cellClasses: "missing bold",
    keyClasses: "red",
  },
  {
    type: "hr",
  },
  {
    name: "Interest Expense",
    key: "interestExpense",
    type: "p",
  },
  {
    name: "Depreciation",
    key: "depreciation",
    cellClasses: "red",
    type: "p",
  },
]

class LineReportPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>SOme hocus pocus </h1>
          <h1>digery do </h1>
          <h1>Mr Martin </h1>
        </div>
        <LineReport
          data={data}
          rowProps={rowProps}
          reportWidth={1200}
          keyPanelWidth={400}
          colWidth={180}
        />
        <div>
          <h1>SOme hocus pocus </h1>
          <h1>digery do </h1>
          <h1>Mr Martin </h1>
        </div>
        <div>
          <h1>SOme hocus pocus </h1>
          <h1>digery do </h1>
          <h1>Mr Martin </h1>
        </div>
        <div>
          <h1>SOme hocus pocus </h1>
          <h1>digery do </h1>
          <h1>Mr Martin </h1>
        </div>
        <div>
          <h1>SOme hocus pocus </h1>
          <h1>digery do </h1>
          <h1>Mr Martin </h1>
        </div>
      </div>
    )
  }
}

// export default HomePage

export default compose(
  withRouter,
  withApollo
)(LineReportPage)
