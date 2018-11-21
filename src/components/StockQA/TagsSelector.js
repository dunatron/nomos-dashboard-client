import React, { Component } from "react"
import MultiSelect from "../Inputs/MultiSelect"
const TagsSelector = ({ options, values, handleChange }) => {
  return (
    <MultiSelect
      label="Tags"
      options={options}
      values={values}
      handleChange={values => handleChange(values)}
    />
  )
}

export default TagsSelector
