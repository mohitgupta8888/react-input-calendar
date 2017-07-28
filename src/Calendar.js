import React from 'react'
import onClickOutside from 'react-onclickoutside'

import cs from 'classnames'
import moment from 'moment'
import 'moment-range'

import DaysView from './day-view'
import MonthsView from './month-view'
import YearsView from './year-view'
import Util from './util'

class Calendar extends React.Component {
    constructor(props, context) {
        super(props, context)
        const date = props.date ? moment(props.date, props.format) : null
        const minDate = props.minDate ? moment(Util.toDate(props.minDate)) : null
        const maxDate = props.maxDate ? moment(Util.toDate(props.maxDate)) : null
        const format = props.format || 'MM-DD-YYYY'
        const minView = parseInt(props.minView, 10) || 0
        const strictDateParsing = props.strictDateParsing || false
        const parsingFormat = props.parsingFormat || format

        this.state = {
            date,
            minDate,
            maxDate,
            format,
            views: ['days', 'months', 'years'],
            minView,
            currentView: minView || 0,
            strictDateParsing,
            parsingFormat
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown)
    }


    componentWillReceiveProps(nextProps) {
        let newState = {
            date: nextProps.date ? moment(nextProps.date, nextProps.format) : this.state.date
        }

        this.setState(newState);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown)
    }

    checkIfDateDisabled(date) {
        return date && this.state.minDate && date.isBefore(this.state.minDate, 'day')
            || date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day')
    }

    keyDown = e => {
        Util.keyDownActions.call(this, e.keyCode)
    }

    nextView = () => {
        if (this.checkIfDateDisabled(this.state.date))
            return;

        this.setState({ currentView: ++this.state.currentView })
    }

    prevView = date => {
        let newDate = date
        if (this.state.minDate && date.isBefore(this.state.minDate, 'day')) {
            newDate = this.state.minDate.clone()
        }

        if (this.state.maxDate && date.isAfter(this.state.maxDate, 'day')) {
            newDate = this.state.maxDate.clone()
        }

        if (this.state.currentView === this.state.minView) {
            this.setState({
                date: newDate
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(date.format(this.state.format))
                }
            });
        } else {
            this.setState({
                date,
                currentView: --this.state.currentView
            })
        }
    }

    setDate = (date, isDayView = false) => {
        if (this.checkIfDateDisabled(date))
            return;

        this.setState({ date })

        if (isDayView && this.props.onChange) {
            this.props.onChange(date.format(this.state.format))
        }
    }

    calendarClick = () => {
        this.setState({ isCalendar: true })
    }

    todayClick = () => {
        const today = moment().startOf('day')

        if (this.checkIfDateDisabled(today)) return

        this.setState({
            date: today,
            currentView: this.state.minView
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(today.format(this.state.format))
            }
        });
    }

    handleClickOutside(evt) {
        // ..handling code goes here...
        if (this.props.onOutsideClick)
            this.props.onOutsideClick(evt.target)

    }

    render() {
        // its ok for this.state.date to be null, but we should never
        // pass null for the date into the calendar pop up, as we want
        // it to just start on todays date if there is no date set
        let calendarDate = this.state.date || moment()
        let view

        switch (this.state.currentView) {
            case 0:
                view = (<DaysView
                    date={calendarDate}
                    nextView={this.nextView}
                    maxDate={this.state.maxDate}
                    minDate={this.state.minDate}
                    setDate={this.setDate}
                />)
                break
            case 1:
                view = (<MonthsView
                    date={calendarDate}
                    nextView={this.nextView}
                    maxDate={this.state.maxDate}
                    minDate={this.state.minDate}
                    prevView={this.prevView}
                    setDate={this.setDate}
                />)
                break
            case 2:
                view = (<YearsView
                    date={calendarDate}
                    maxDate={this.state.maxDate}
                    minDate={this.state.minDate}
                    prevView={this.prevView}
                    setDate={this.setDate}
                />)
                break
            default:
                view = (<DaysView
                    date={calendarDate}
                    nextView={this.nextView}
                    maxDate={this.state.maxDate}
                    minDate={this.state.minDate}
                    setDate={this.setDate}
                />)
        }

        var todayButton;
        if (this.props.showToday) {
            let todayText = this.props.todayText || (moment.locale() === 'de' ? 'Heute' : 'Today')
            todayButton = (<span
                className={
                    `today-btn${this.checkIfDateDisabled(moment().startOf('day')) ? ' disabled' : ''}`
                }
                onClick={this.todayClick}>
                {todayText}
            </span>)
        }
        let calendarClass = cs({
            'input-calendar-wrapper': true,
            'icon-hidden': this.props.hideIcon
        })

        let calendar = !this.props.open ? '' :
            <div className={calendarClass} onClick={this.calendarClick}>
                {view}
                {todayButton}
            </div>

        let readOnly = false

        if (this.props.hideTouchKeyboard) {
            // do not break server side rendering:
            try {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                    .test(navigator.userAgent)) {
                    readOnly = true
                }
            } catch (e) {
                console.warn(e) //eslint-disable-line
            }
        }

        return (
            <div className="input-calendar">
                {calendar}
            </div>
        )
    }
}

Calendar.propTypes = {
    closeOnSelect: React.PropTypes.bool,
    computableFormat: React.PropTypes.string,
    strictDateParsing: React.PropTypes.bool,
    parsingFormat: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    date: React.PropTypes.any,
    minDate: React.PropTypes.any,
    maxDate: React.PropTypes.any,
    format: React.PropTypes.string,
    minView: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    openOnInputFocus: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    hideTouchKeyboard: React.PropTypes.bool,
    hideIcon: React.PropTypes.bool,
    customIcon: React.PropTypes.string,
    todayText: React.PropTypes.string,
}

export default onClickOutside(Calendar)
