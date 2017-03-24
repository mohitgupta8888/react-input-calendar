import React from 'react'
import Calendar from './Calendar'

class CalendarInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { date: '01/01/2016', openCalendar: false }
    }

    setToday(){
        this.setState({ date: "17/03/2017" })
    }

    onSelect(selectedDate) {
        this.setState({ date: selectedDate })
    }

    onFocus() {
        this.setState({ openCalendar: true })
    }

    changeDate(e) { //eslint-disable-line
        this.setState({ inputValue: e.target.value })
    }

    onClose(){
        this.setState({ openCalendar: false })
    }

    render() {
        var calendar = !this.state.openCalendar ? null : <Calendar
            format="DD/MM/YYYY"
            computableFormat = "DD/MM/YYYY"
            date={this.state.date}
            open={true}
            onChange={this.onSelect.bind(this)}
            onClose={this.onClose.bind(this)}
            inputRef={this.inputRef} />

        return (
            <div>
                <input
                    type="text"
                    onFocus={this.onFocus.bind(this) }
                    value={this.state.date}
                    onChange={this.changeDate.bind(this)}
                    ref={(iRef) => {this.inputRef = iRef}}
                    />
                <span className="icon-wrapper calendar-icon" onClick={this.setToday.bind(this)} >
                    <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M5 6h2v2h-2zM8 6h2v2h-2zM11 6h2v2h-2zM2 12h2v2h-2zM5
              12h2v2h-2zM8 12h2v2h-2zM5 9h2v2h-2zM8 9h2v2h-2zM11 9h2v2h-2zM2
                        9h2v2h-2zM13 0v1h-2v-1h-7v1h-2v-1h-2v16h15v-16h-2zM14
                        15h-13v-11h13v11z"
                        />
                    </svg>
                </span>
                <span className="icon-wrapper calendar-icon" onClick={this.onFocus.bind(this)} >
                    <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M5 6h2v2h-2zM8 6h2v2h-2zM11 6h2v2h-2zM2 12h2v2h-2zM5
              12h2v2h-2zM8 12h2v2h-2zM5 9h2v2h-2zM8 9h2v2h-2zM11 9h2v2h-2zM2
                        9h2v2h-2zM13 0v1h-2v-1h-7v1h-2v-1h-2v16h15v-16h-2zM14
                        15h-13v-11h13v11z"
                        />
                    </svg>
                </span>
                {calendar}
            </div>
        )
    }
}

export default CalendarInput