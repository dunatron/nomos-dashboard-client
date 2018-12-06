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
const REPORT_ROW_PROPS = [
  {
    name: "ROU ASSET CARRYING VALUE ROLL FORWARD",
    type: "header",
  },
  {
    name: "BALANCE AT THE BEGINNING OF THE PERIOD",
    key: "rouStartBalance",
    type: "h1",
    emptyVal: 0,
  },
  {
    name: "Additions",
    key: "rouAdditions",
    type: "p",
    cellClasses: "missing bold",
    keyClasses: "red",
    emptyVal: 0,
  },
  {
    name: "deprication",
    key: "rouDepreciation",
    type: "p",
    emptyVal: 0,
  },
]

<LineReport data={data} rowProps={rowProps} colWidth={180} />

```

## IMPORTANT NOTE

sometimes the backend is incosistent in it's data or how it expects the front end to display it.
For example the MATURITY ANALYSIS - CONTRACTUAL UNDISCOUNTED CASH FLOWS Report.
Instead of dynamically creating the columns we have specific columns(Low value, short Term, etc).

I will think about how to explain/write this clean later for now.
Sometimes data sent back has a different key than we would expect i.e it could be one of these. We can handle that too.
Instead of using `key` prop in your `REPORT_ROW_PROPS` you should use `keys` which is an array.

###### NOTE:

this will use the first key found for the cell value.if none are found it will use `emptyVal` prop.

```js
const EXEMPT_ROW_PROPS = [
  {
    name: "MATURITY ANALYSIS - CONTRACTUAL UNDISCOUNTED CASH FLOWS",
    type: "header",
  },
  {
    name: "Less than 3 months",
    keys: ["maMonths2", "maSTMonths2", "maLVMonths2"],
    type: "p",
    emptyVal: 0,
  },
```

###### LineExportButton example

```js
<LineExportButton
  name="CSV - Maturity Analysis Report"
  icon="csv"
  onClick={() =>
    disclosureReport
      ? LineCsvExport(
          EXEMPT_ROW_PROPS,
          mobx.toJS(exemptReport),
          "CSV - Maturity Analysis Report"
        )
      : alert("Generate report first")
  }
/>
```
