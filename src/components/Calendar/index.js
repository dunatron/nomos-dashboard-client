import React, { Component, Fragment } from "react"
import moment from "moment"
// components
import Navigation from "./Navigation"
import Header from "./Header"
import Week from "./Week"

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment(),
    }
  }

  changeMonth = val => {
    this.setState({
      date: this.state.date.add(val, "months"),
    })
  }

  renderWeeks(currentDate) {
    let weeks = [],
      done = false,
      date = moment(currentDate)
        .startOf("month")
        .day("Sunday"),
      monthIndex = date.month(),
      count = 0

    while (!done) {
      const weeksEvents = []

      let startWeek = moment(date)
        .startOf("week")
        .format()
      let endOfWeek = moment(date)
        .endOf("week")
        .format()

      // weeks.push(
      //   <div>I am a week</div>
      // )
      weeks.push(
        <Week
          WeekNumber={count + 1}
          data={this.props.data.filter(d => d.date.isSame(date, "month"))}
          startWeek={startWeek}
          endWeek={endOfWeek}
          key={date.toString()}
          date={date.clone()}
          month={this.state.date}
          select={this.select}
          selected={this.props.selected}
          eventClick={this.props.eventClick}
        />
      )

      //date.add(1, "w");
      Object.assign({}, date, date.add(1, "w"))
      done = count++ > 2 && monthIndex !== date.month()
      monthIndex = date.month()
    }

    return weeks
  }

  render() {
    const { date } = this.state
    const nextMonth = moment(date)
      .add(1, "months")
      .format("MMMM")
    const prevMonth = moment(date)
      .add(-1, "months")
      .format("MMMM")
    return (
      <Fragment>
        <Navigation
          date={date.format("MMMM YYYY")}
          prev={prevMonth}
          next={nextMonth}
          changeMonth={val => this.changeMonth(val)}
        />
        <Header />
        <div style={{ height: "550px" }}>
          {this.renderWeeks(this.state.date)}
        </div>
      </Fragment>
    )
  }
}

export default Calendar
