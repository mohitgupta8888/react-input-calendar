'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment-range');

var _dayView = require('./day-view');

var _dayView2 = _interopRequireDefault(_dayView);

var _monthView = require('./month-view');

var _monthView2 = _interopRequireDefault(_monthView);

var _yearView = require('./year-view');

var _yearView2 = _interopRequireDefault(_yearView);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = function (_React$Component) {
  (0, _inherits3.default)(Calendar, _React$Component);

  function Calendar(props, context) {
    (0, _classCallCheck3.default)(this, Calendar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this, props, context));

    _initialiseProps.call(_this);

    var date = props.date ? (0, _moment2.default)(props.date, props.format) : null;
    var minDate = props.minDate ? (0, _moment2.default)(_util2.default.toDate(props.minDate)) : null;
    var maxDate = props.maxDate ? (0, _moment2.default)(_util2.default.toDate(props.maxDate)) : null;
    var format = props.format || 'MM-DD-YYYY';
    var minView = parseInt(props.minView, 10) || 0;
    var strictDateParsing = props.strictDateParsing || false;
    var parsingFormat = props.parsingFormat || format;

    _this.state = {
      date: date,
      minDate: minDate,
      maxDate: maxDate,
      format: format,
      views: ['days', 'months', 'years'],
      minView: minView,
      currentView: minView || 0,
      strictDateParsing: strictDateParsing,
      parsingFormat: parsingFormat
    };
    return _this;
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //document.addEventListener('click', this.documentClick)
      document.addEventListener('keydown', this.keyDown);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newState = {
        date: nextProps.date ? (0, _moment2.default)(nextProps.date, nextProps.format) : this.state.date
      };

      this.setState(newState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      //document.removeEventListener('click', this.documentClick)
      document.removeEventListener('keydown', this.keyDown);
    }
  }, {
    key: 'checkIfDateDisabled',
    value: function checkIfDateDisabled(date) {
      return date && this.state.minDate && date.isBefore(this.state.minDate, 'day') || date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day');
    }

    // documentClick = e => {
    //   if (!this.state.isCalendar) {
    //     this.setVisibility(false)
    //   }
    //   this.setState({ isCalendar: false })
    // }

  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(evt) {
      // ..handling code goes here...
      // if (this.props.inputRef && evt.target.isSameNode(this.props.inputRef))
      //   return;

      if (this.props.onOutsideClick) this.props.onOutsideClick(evt.target);

      // this.close();
    }

    // close = () => {
    //   if (this.props.onClose)
    //     this.props.onClose();
    // }

  }, {
    key: 'render',
    value: function render() {
      // its ok for this.state.date to be null, but we should never
      // pass null for the date into the calendar pop up, as we want
      // it to just start on todays date if there is no date set
      var calendarDate = this.state.date || (0, _moment2.default)();
      var view = void 0;

      switch (this.state.currentView) {
        case 0:
          view = _react2.default.createElement(_dayView2.default, {
            date: calendarDate,
            nextView: this.nextView,
            maxDate: this.state.maxDate,
            minDate: this.state.minDate,
            setDate: this.setDate
          });
          break;
        case 1:
          view = _react2.default.createElement(_monthView2.default, {
            date: calendarDate,
            nextView: this.nextView,
            maxDate: this.state.maxDate,
            minDate: this.state.minDate,
            prevView: this.prevView,
            setDate: this.setDate
          });
          break;
        case 2:
          view = _react2.default.createElement(_yearView2.default, {
            date: calendarDate,
            maxDate: this.state.maxDate,
            minDate: this.state.minDate,
            prevView: this.prevView,
            setDate: this.setDate
          });
          break;
        default:
          view = _react2.default.createElement(_dayView2.default, {
            date: calendarDate,
            nextView: this.nextView,
            maxDate: this.state.maxDate,
            minDate: this.state.minDate,
            setDate: this.setDate
          });
      }

      var todayButton;
      if (this.props.showToday) {
        var todayText = this.props.todayText || (_moment2.default.locale() === 'de' ? 'Heute' : 'Today');
        todayButton = _react2.default.createElement(
          'span',
          {
            className: 'today-btn' + (this.checkIfDateDisabled((0, _moment2.default)().startOf('day')) ? ' disabled' : ''),
            onClick: this.todayClick },
          todayText
        );
      }
      var calendarClass = (0, _classnames2.default)({
        'input-calendar-wrapper': true,
        'icon-hidden': this.props.hideIcon
      });

      var calendar = !this.props.open ? '' : _react2.default.createElement(
        'div',
        { className: calendarClass, onClick: this.calendarClick },
        view,
        todayButton
      );

      var readOnly = false;

      if (this.props.hideTouchKeyboard) {
        // do not break server side rendering:
        try {
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            readOnly = true;
          }
        } catch (e) {
          console.warn(e); //eslint-disable-line
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'input-calendar' },
        calendar
      );
    }
  }]);
  return Calendar;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.keyDown = function (e) {
    _util2.default.keyDownActions.call(_this2, e.keyCode);
  };

  this.nextView = function () {
    if (_this2.checkIfDateDisabled(_this2.state.date)) return;
    _this2.setState({ currentView: ++_this2.state.currentView });
  };

  this.prevView = function (date) {
    var newDate = date;
    if (_this2.state.minDate && date.isBefore(_this2.state.minDate, 'day')) {
      newDate = _this2.state.minDate.clone();
    }

    if (_this2.state.maxDate && date.isAfter(_this2.state.maxDate, 'day')) {
      newDate = _this2.state.maxDate.clone();
    }

    if (_this2.state.currentView === _this2.state.minView) {
      _this2.setState({
        date: newDate
      });
      if (_this2.props.onChange) {
        _this2.props.onChange(date.format(_this2.state.format));
      }
      // if (this.props.onClose) {
      //   this.props.onClose()
      // }
    } else {
      _this2.setState({
        date: date,
        currentView: --_this2.state.currentView
      });
    }
  };

  this.setDate = function (date) {
    var isDayView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (_this2.checkIfDateDisabled(date)) return;

    _this2.setState({ date: date });

    if (isDayView && _this2.props.onChange) {
      _this2.props.onChange(date.format(_this2.state.format));
    }

    // if (this.props.closeOnSelect !== false && isDayView && this.props.onClose) {
    //   this.props.onClose();
    // }
  };

  this.calendarClick = function () {
    _this2.setState({ isCalendar: true });
  };

  this.todayClick = function () {
    var today = (0, _moment2.default)().startOf('day');

    if (_this2.checkIfDateDisabled(today)) return;

    _this2.setState({
      date: today,
      currentView: _this2.state.minView
    });

    if (_this2.props.onChange) {
      _this2.props.onChange(today.format(_this2.state.format));
    }
    // if (this.props.onClose) {
    //   this.props.onClose()
    // }
  };
};

Calendar.propTypes = {
  closeOnSelect: _react2.default.PropTypes.bool,
  computableFormat: _react2.default.PropTypes.string,
  strictDateParsing: _react2.default.PropTypes.bool,
  parsingFormat: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
  date: _react2.default.PropTypes.any,
  minDate: _react2.default.PropTypes.any,
  maxDate: _react2.default.PropTypes.any,
  format: _react2.default.PropTypes.string,
  minView: _react2.default.PropTypes.number,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  openOnInputFocus: _react2.default.PropTypes.bool,
  placeholder: _react2.default.PropTypes.string,
  hideTouchKeyboard: _react2.default.PropTypes.bool,
  hideIcon: _react2.default.PropTypes.bool,
  customIcon: _react2.default.PropTypes.string,
  todayText: _react2.default.PropTypes.string
};

exports.default = (0, _reactOnclickoutside2.default)(Calendar);