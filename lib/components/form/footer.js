'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_Base) {
  (0, _inherits3.default)(Footer, _Base);

  function Footer(props) {
    (0, _classCallCheck3.default)(this, Footer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Base.call(this, props));

    _this.displayName = 'Form.Footer';
    return _this;
  }

  Footer.prototype.render = function render() {
    var props = (0, _extends3.default)({}, this.props);

    var style = (0, _extends3.default)({}, props.style);

    if (this.props.gravity) {
      style.textAlign = this.props.gravity;
    }

    props.style = style;

    return _react2.default.createElement(
      'div',
      props,
      this.props.children
    );
  };

  return Footer;
}(_base2.default);

exports.default = Footer;