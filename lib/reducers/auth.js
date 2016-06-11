'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var data = action.data;
  var type = action.type;


  switch (type) {
    case constants.USER_FIRST_FETCH:
      return (0, _extends3.default)({}, state, {
        firstFetch: true
      });
    case constants.USER_LOGOUT:
      return (0, _extends3.default)({}, state, {
        authenticated: false,
        user: null
      });

    case constants.USER_FETCH_SUCCEEDED:
      return (0, _extends3.default)({}, state, {
        authenticated: true,
        user: data
      });

    case constants.TOKEN_DELETE_FAILED:
      return (0, _extends3.default)({}, state, {
        authenticated: false
      });

    default:
      return state;
  }
};

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  authenticated: false,
  user: null,
  firstFetch: false
};