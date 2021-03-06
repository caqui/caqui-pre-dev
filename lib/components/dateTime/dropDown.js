'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _system = require('./system');

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _row = require('../row');

var _row2 = _interopRequireDefault(_row);

var _column = require('../column');

var _column2 = _interopRequireDefault(_column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDown = function (_React$Component) {
  (0, _inherits3.default)(DropDown, _React$Component);

  function DropDown(props) {
    (0, _classCallCheck3.default)(this, DropDown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.displayName = 'DateTime(DropDown)';

    _this.prevMonth = _this.prevMonth.bind(_this);
    _this.nextMonth = _this.nextMonth.bind(_this);
    _this.pickADate = _this.pickADate.bind(_this);

    _this.addHour = _this.addHour.bind(_this);
    _this.subHour = _this.subHour.bind(_this);
    _this.addMinute = _this.addMinute.bind(_this);
    _this.subMinute = _this.subMinute.bind(_this);

    _this.setMinute = _this.setMinute.bind(_this);
    _this.setHour = _this.setHour.bind(_this);

    _this.close = _this.close.bind(_this);
    return _this;
  }

  DropDown.prototype.componentWillMount = function componentWillMount() {
    document.documentElement.className = document.documentElement.className.split(' ').concat('caqui-scroll-disabled').join(' ');
  };

  DropDown.prototype.componentWillUnmount = function componentWillUnmount() {
    document.documentElement.className = document.documentElement.className.split(' ').filter(function (e) {
      return e != 'caqui-scroll-disabled';
    }).join(' ');
  };

  DropDown.prototype.prevMonth = function prevMonth() {
    var _props$store = this.props.store;
    var dispatch = _props$store.dispatch;
    var actions = _props$store.actions;


    dispatch(actions.prevMonth());
  };

  DropDown.prototype.nextMonth = function nextMonth() {
    var _props$store2 = this.props.store;
    var dispatch = _props$store2.dispatch;
    var actions = _props$store2.actions;


    dispatch(actions.nextMonth());
  };

  DropDown.prototype.addMinute = function addMinute() {
    var _props$store3 = this.props.store;
    var dispatch = _props$store3.dispatch;
    var actions = _props$store3.actions;


    dispatch(actions.addMinute());

    this.timeChanged();
  };

  DropDown.prototype.subMinute = function subMinute() {
    var _props$store4 = this.props.store;
    var dispatch = _props$store4.dispatch;
    var actions = _props$store4.actions;


    dispatch(actions.subMinute());

    this.timeChanged();
  };

  DropDown.prototype.addHour = function addHour() {
    var _props$store5 = this.props.store;
    var dispatch = _props$store5.dispatch;
    var actions = _props$store5.actions;


    dispatch(actions.addHour());

    this.timeChanged();
  };

  DropDown.prototype.subHour = function subHour() {
    var _props$store6 = this.props.store;
    var dispatch = _props$store6.dispatch;
    var actions = _props$store6.actions;


    dispatch(actions.subHour());

    this.timeChanged();
  };

  DropDown.prototype.timeChanged = function timeChanged() {
    var getState = this.props.store.getState;


    this.props.onTimeChanged && this.props.onTimeChanged(getState().value);
  };

  DropDown.prototype.setMinute = function setMinute(minute) {
    var _props$store7 = this.props.store;
    var dispatch = _props$store7.dispatch;
    var actions = _props$store7.actions;


    dispatch(actions.setMinute(minute));

    this.timeChanged();
  };

  DropDown.prototype.setHour = function setHour(hour) {
    var _props$store8 = this.props.store;
    var dispatch = _props$store8.dispatch;
    var actions = _props$store8.actions;


    dispatch(actions.setHour(hour));

    this.timeChanged();
  };

  DropDown.prototype.pickADate = function pickADate(evt) {
    this.props.onDatePicked(evt);
  };

  DropDown.prototype.close = function close() {
    var _props$store9 = this.props.store;
    var dispatch = _props$store9.dispatch;
    var actions = _props$store9.actions;


    dispatch(actions.close());
  };

  // TODO: shrink, split, etc.


  DropDown.prototype.render = function render() {
    var _this2 = this;

    var state = this.props.store.getState();
    var current = state.current;


    var value = state.value || current.clone();

    //if(!this.props.visible) {
    //  return null
    //}

    var calendar = (0, _system.buildCalendar)(current);

    // TODO: remove?
    var weekDaysTitles = _moment2.default.weekdaysShort().map(function (day) {
      return _react2.default.createElement(
        'th',
        {
          key: day,
          className: 'caqui-datetime-dropdown-weekday-title' },
        _react2.default.createElement(
          'b',
          null,
          day
        )
      );
    });

    var days = function days(week) {
      return week.map(function (day, weekDay) {
        if (!day) {
          return _react2.default.createElement('td', {
            key: weekDay,
            className: 'caqui-datetime-dropdown-day' });
        }

        return _react2.default.createElement(
          'td',
          {
            key: weekDay,
            className: 'caqui-datetime-dropdown-day' },
          _react2.default.createElement(_day2.default, {
            day: day,
            value: value,
            onPick: _this2.pickADate })
        );
      });
    };

    var time = this.props.showTime ? _react2.default.createElement(
      _column2.default,
      { size: _column2.default.from(6, 6, 12, 12) },
      _react2.default.createElement(_footer2.default, {
        current: current,
        addHour: this.addHour,
        subHour: this.subHour,
        addMinute: this.addMinute,
        subMinute: this.subMinute,
        setHour: this.setHour,
        setMinute: this.setMinute })
    ) : null;

    var calendarRows = calendar.map(function (week, which) {
      return _react2.default.createElement(
        'tr',
        { key: which },
        days(week)
      );
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { className: 'caqui-datetime-dropdown-backdrop' }),
      _react2.default.createElement(
        'div',
        { className: 'caqui-datetime-dropdown-holder' },
        _react2.default.createElement(
          'div',
          {
            className: 'caqui-datetime-dropdown',
            tabIndex: '0' },
          _react2.default.createElement(
            'div',
            { className: 'caqui-datetime-dropdown-container' },
            _react2.default.createElement(_header2.default, {
              current: current,
              prevMonth: this.prevMonth,
              nextMonth: this.nextMonth }),
            _react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                _column2.default,
                { size: _column2.default.from(time ? 6 : 12, time ? 6 : 12, 12, 12) },
                _react2.default.createElement(
                  'table',
                  { className: 'caqui-table caqui-table-bordered caqui-datetime-table' },
                  _react2.default.createElement(
                    'thead',
                    { className: 'caqui-datetime-table-header' },
                    _react2.default.createElement(
                      'tr',
                      null,
                      weekDaysTitles
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    { className: 'caqui-datetime-table-body' },
                    calendarRows
                  )
                )
              ),
              time
            )
          ),
          _react2.default.createElement(
            'a',
            {
              href: 'javascript:',
              onClick: this.close,
              className: 'caqui-datetime-close' },
            'Fechar'
          )
        )
      )
    );
  };

  return DropDown;
}(_react2.default.Component);

DropDown.propTypes = {
  onDatePicked: _react.PropTypes.func
};
exports.default = DropDown;