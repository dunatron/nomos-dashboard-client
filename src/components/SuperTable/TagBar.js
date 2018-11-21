import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import CheckBoxSelection from "../Inputs/CheckBoxSelection"
import MultiSelect from "../Inputs/MultiSelect"

const styles = theme => ({
  root: {},
})

const TagBar = props => {
  const contentClasses = [props.classes.content]
  props.open
    ? contentClasses.push(props.classes.open)
    : contentClasses.push(props.classes.closed)
  return (
    <div className={contentClasses.join(" ")}>
      <MultiSelect
        values={props.values}
        selectID="TAGS-SELECTOR"
        label={"TAGS"}
        options={props.options}
        handleChange={values => props.updateTags(values)}
      />
    </div>
  )
}

export default withStyles(styles)(TagBar)
