'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _createChainedFunction = require('../../helpers/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one needle
 * @param {string|array} of haystack
 * @return {boolean} value
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

var triggerType = _react2.default.PropTypes.oneOf(['click', 'hover', 'focus']);

var propTypes = (0, _extends3.default)({}, _base2.default.propTypes, {

  /**
   * Specify which action or actions trigger Overlay visibility
   */
  trigger: _react2.default.PropTypes.oneOfType([triggerType, _react2.default.PropTypes.arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: _react2.default.PropTypes.number,
  /**
   * A millisecond delay amount before showing the Overlay once triggered.
   */
  delayShow: _react2.default.PropTypes.number,
  /**
   * A millisecond delay amount before hiding the Overlay once triggered.
   */
  delayHide: _react2.default.PropTypes.number,

  // FIXME: This should be `defaultShow`.
  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultOverlayShown: _react2.default.PropTypes.bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: _react2.default.PropTypes.node.isRequired,

  /**
   * @private
   */
  onBlur: _react2.default.PropTypes.func,
  /**
   * @private
   */
  onClick: _react2.default.PropTypes.func,
  /**
   * @private
   */
  onFocus: _react2.default.PropTypes.func,
  /**
   * @private
   */
  onMouseOut: _react2.default.PropTypes.func,
  /**
   * @private
   */
  onMouseOver: _react2.default.PropTypes.func,

  // Overridden props from `<Overlay>`.
  /**
   * @private
   */
  target: _react2.default.PropTypes.oneOf([null]),
  /**
   * @private
   */
  onHide: _react2.default.PropTypes.oneOf([null]),
  /**
   * @private
   */
  show: _react2.default.PropTypes.oneOf([null])
});

var defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
};

var OverlayTrigger = function (_React$Component) {
  (0, _inherits3.default)(OverlayTrigger, _React$Component);

  function OverlayTrigger(props, context) {
    (0, _classCallCheck3.default)(this, OverlayTrigger);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props, context));

    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.handleDelayedShow = _this.handleDelayedShow.bind(_this);
    _this.handleDelayedHide = _this.handleDelayedHide.bind(_this);
    _this.handleHide = _this.handleHide.bind(_this);

    _this.handleMouseOver = function (e) {
      return _this.handleMouseOverOut(_this.handleDelayedShow, e);
    };

    _this.handleMouseOut = function (e) {
      return _this.handleMouseOverOut(_this.handleDelayedHide, e);
    };

    _this._mountNode = null;

    _this.state = {
      show: props.defaultOverlayShown
    };
    return _this;
  }

  OverlayTrigger.prototype.componentDidMount = function componentDidMount() {
    this._mountNode = document.createElement('div');
    this.renderOverlay();
  };

  OverlayTrigger.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderOverlay();
  };

  OverlayTrigger.prototype.componentWillUnmount = function componentWillUnmount() {
    _reactDom2.default.unmountComponentAtNode(this._mountNode);
    this._mountNode = null;

    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  };

  OverlayTrigger.prototype.handleToggle = function handleToggle() {
    if (this.state.show) {
      this.hide();
    } else {
      this.show();
    }
  };

  OverlayTrigger.prototype.handleDelayedShow = function handleDelayedShow() {
    var _this2 = this;

    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.show || this._hoverShowDelay != null) {
      return;
    }

    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(function () {
      _this2._hoverShowDelay = null;
      _this2.show();
    }, delay);
  };

  OverlayTrigger.prototype.handleDelayedHide = function handleDelayedHide() {
    var _this3 = this;

    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.show || this._hoverHideDelay != null) {
      return;
    }

    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(function () {
      _this3._hoverHideDelay = null;
      _this3.hide();
    }, delay);
  };

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.


  OverlayTrigger.prototype.handleMouseOverOut = function handleMouseOverOut(handler, e) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent.toElement;

    if (!related || related !== target && !(0, _contains2.default)(target, related)) {
      handler(e);
    }
  };

  OverlayTrigger.prototype.handleHide = function handleHide() {
    this.hide();
  };

  OverlayTrigger.prototype.show = function show() {
    this.setState({ show: true });
  };

  OverlayTrigger.prototype.hide = function hide() {
    this.setState({ show: false });
  };

  OverlayTrigger.prototype.makeOverlay = function makeOverlay(overlay, props) {
    return _react2.default.createElement(
      _base2.default,
      (0, _extends3.default)({}, props, {
        show: this.state.show,
        onHide: this.handleHide,
        target: this
      }),
      overlay
    );
  };

  OverlayTrigger.prototype.renderOverlay = function renderOverlay() {
    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this._overlay, this._mountNode);
  };

  OverlayTrigger.prototype.render = function render() {
    var _props = this.props;
    var trigger = _props.trigger;
    var overlay = _props.overlay;
    var children = _props.children;
    var onBlur = _props.onBlur;
    var onClick = _props.onClick;
    var onFocus = _props.onFocus;
    var onMouseOut = _props.onMouseOut;
    var onMouseOver = _props.onMouseOver;
    var props = (0, _objectWithoutProperties3.default)(_props, ['trigger', 'overlay', 'children', 'onBlur', 'onClick', 'onFocus', 'onMouseOut', 'onMouseOver']);


    delete props.delay;
    delete props.delayShow;
    delete props.delayHide;
    delete props.defaultOverlayShown;

    var child = _react2.default.Children.only(children);
    var childProps = child.props;

    var triggerProps = {
      'aria-describedby': overlay.props.id
    };

    // FIXME: The logic here for passing through handlers on this component is
    // inconsistent. We shouldn't be passing any of these props through.

    triggerProps.onClick = (0, _createChainedFunction2.default)(childProps.onClick, onClick);

    if (isOneOf('click', trigger)) {
      triggerProps.onClick = (0, _createChainedFunction2.default)(triggerProps.onClick, this.handleToggle);
    }

    if (isOneOf('hover', trigger)) {
      (0, _warning2.default)(!(trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.');

      triggerProps.onMouseOver = (0, _createChainedFunction2.default)(childProps.onMouseOver, onMouseOver, this.handleMouseOver);

      triggerProps.onMouseOut = (0, _createChainedFunction2.default)(childProps.onMouseOut, onMouseOut, this.handleMouseOut);
    }

    if (isOneOf('focus', trigger)) {
      triggerProps.onFocus = (0, _createChainedFunction2.default)(childProps.onFocus, onFocus, this.handleDelayedShow);

      triggerProps.onBlur = (0, _createChainedFunction2.default)(childProps.onBlur, onBlur, this.handleDelayedHide);
    }

    this._overlay = this.makeOverlay(overlay, props);

    return (0, _react.cloneElement)(child, triggerProps);
  };

  return OverlayTrigger;
}(_react2.default.Component);

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;

exports.default = OverlayTrigger;