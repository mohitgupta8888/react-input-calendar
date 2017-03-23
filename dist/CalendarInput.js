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

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarInput = function (_React$Component) {
    (0, _inherits3.default)(CalendarInput, _React$Component);

    function CalendarInput(props, context) {
        (0, _classCallCheck3.default)(this, CalendarInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CalendarInput.__proto__ || (0, _getPrototypeOf2.default)(CalendarInput)).call(this, props, context));

        _this.state = { date: '01/01/2016', openCalendar: false };
        return _this;
    }

    (0, _createClass3.default)(CalendarInput, [{
        key: 'setToday',
        value: function setToday() {
            this.setState({ date: "17/03/2017" });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(selectedDate) {
            this.setState({ date: selectedDate });
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.setState({ openCalendar: true });
        }
    }, {
        key: 'changeDate',
        value: function changeDate(e) {
            //eslint-disable-line
            this.setState({ inputValue: e.target.value });
        }
    }, {
        key: 'onClose',
        value: function onClose() {
            this.setState({ openCalendar: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var calendar = !this.state.openCalendar ? null : _react2.default.createElement(_index2.default, {
                format: 'DD/MM/YYYY',
                computableFormat: 'DD/MM/YYYY',
                date: this.state.date,
                open: true,
                onChange: this.onSelect.bind(this),
                onClose: this.onClose.bind(this) });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                    type: 'text',
                    onFocus: this.onFocus.bind(this),
                    value: this.state.date,
                    onChange: this.changeDate.bind(this)
                }),
                _react2.default.createElement(
                    'span',
                    { className: 'icon-wrapper calendar-icon', onClick: this.setToday.bind(this) },
                    _react2.default.createElement(
                        'svg',
                        { width: '16', height: '16', viewBox: '0 0 16 16' },
                        _react2.default.createElement('path', { d: 'M5 6h2v2h-2zM8 6h2v2h-2zM11 6h2v2h-2zM2 12h2v2h-2zM5\r 12h2v2h-2zM8 12h2v2h-2zM5 9h2v2h-2zM8 9h2v2h-2zM11 9h2v2h-2zM2\r 9h2v2h-2zM13 0v1h-2v-1h-7v1h-2v-1h-2v16h15v-16h-2zM14\r 15h-13v-11h13v11z'
                        })
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'icon-wrapper calendar-icon', onClick: this.onFocus.bind(this) },
                    _react2.default.createElement(
                        'svg',
                        { width: '16', height: '16', viewBox: '0 0 16 16' },
                        _react2.default.createElement('path', { d: 'M5 6h2v2h-2zM8 6h2v2h-2zM11 6h2v2h-2zM2 12h2v2h-2zM5\r 12h2v2h-2zM8 12h2v2h-2zM5 9h2v2h-2zM8 9h2v2h-2zM11 9h2v2h-2zM2\r 9h2v2h-2zM13 0v1h-2v-1h-7v1h-2v-1h-2v16h15v-16h-2zM14\r 15h-13v-11h13v11z'
                        })
                    )
                ),
                calendar
            );
        }
    }]);
    return CalendarInput;
}(_react2.default.Component);

exports.default = CalendarInput;