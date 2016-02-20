'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;
exports.buildCalendar = exports.plug = exports.newWeek = exports.first = exports.last = exports.today = exports.range = undefined;

var _memoizee = require('memoizee');

var _memoizee2 = _interopRequireDefault(_memoizee);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var range = exports.range = function range(from, to) {
  return Array.apply(null, Array(to)).map(function (_, i) {
    return from + i;
  });
};

var today = exports.today = (0, _moment2.default)();

var last = exports.last = function last(array) {
  return array[array.length - 1];
};
var first = exports.first = function first(array) {
  return array[0];
};

var newWeek = exports.newWeek = function newWeek() {
  return range(0, 7);
};

var plug = exports.plug = function plug(condition, def, overwrite) {
  if (condition) {
    return _extends({}, def, overwrite);
  } else {
    return def;
  }
};

// TODO: beautify
var buildCalendar = exports.buildCalendar = (0, _memoizee2.default)(function (base) {
  var anchor = base.clone();
  var year = anchor.year();
  var month = anchor.month();

  var daysInMonth = anchor.daysInMonth();

  var days = range(1, daysInMonth).map(function (x) {
    return anchor.clone().date(x);
  });

  var firstDay = first(days),
      lastDay = last(days);

  // TODO: verify
  // added 1 plus week that may be removed after calendar build
  // to avoid weird calculations and quantic formulaes
  var weeksInMonth = Math.ceil((lastDay.date() - firstDay.date()) / 7) + 1;

  // TODO: WHAT I'M DOING???
  // the filter is because of the possible last empty week.
  return range(0, weeksInMonth).map(function (x) {
    return newWeek();
  }).map(function (week) {
    return week.map(function (n) {
      var nextDay = first(days);

      if (!nextDay) {
        return null;
      }

      if (n === nextDay.day()) {
        return days.shift();
      } else {
        return null;
      }
    });
  }).filter(function (w) {
    return w.reduce(function (r, x) {
      return r || !!x;
    }, false);
  });
});