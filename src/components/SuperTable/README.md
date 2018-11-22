## The Super Table Component

This table will accept an array of objects. the columns are set by giving the SuperTable a config.

```
<SuperTable
  columnHeaders={this.columnHeaders()}
  tags={{
  found: "tags",
  key: "id",
  options: allTags
  	? allTags.map(t => ({ name: t.name, value: t.id }))
    : [],
  }}
  title="Table of Stock questions"
  data={questions}
  executeFunc={(funcName, obj) => {
  this.executeFunctionByName(funcName, obj)
  }}
/>
```

```
{
    id: "showDetails", //votes.id
    numeric: false,
    disablePadding: true,
    label: "Show Details",
    show: true,
    type: "btnFunc",
    icon: (
      <Button color="primary" aria-label="Add to shopping cart">
        Show Details
      </Button>
    ),
    funcName: "showDetails",
    found: "votes",
    tableRenderKey: "th",
  },
```

`type => enum(btnFunc,numberOfObj,deep)`
This is what the cell will process
`show => true/false`
the column is visible by default

they utilise => found
