## The Super Table Component

This table will accept an array of objects. the columns are set by giving the SuperTable a config.

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
btnFunc
numberOfObj
deep


they utilise => found