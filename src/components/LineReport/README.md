## Line Report

This is the straight line reporting reusable component.

#### Props

`data`
`rowProps`
`colWidth`

#### Usage

```js
const data = [
  {
    columnTitle: "Equipment",
    values: {
      balBegin: 463.38,
      additions: 120,
      interestExpense: 180,
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
  },
  {
    name: "Interest Expense",
    key: "interestExpense",
    type: "p",
  },
  {
    name: "Depreciation",
    key: "depreciation",
    type: "p",
  },
]

<LineReport data={data} rowProps={rowProps} colWidth={180} />

```
