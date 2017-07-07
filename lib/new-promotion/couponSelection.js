'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css2 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _css3 = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _newCoupon = require('../new-coupon');

var _newCoupon2 = _interopRequireDefault(_newCoupon);

var _gou = require('./img/gou.png');

var _gou2 = _interopRequireDefault(_gou);

require('./style/couponSelection.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = _list2.default.Item;

var CouponSelection = function (_Component) {
  _inherits(CouponSelection, _Component);

  function CouponSelection(props) {
    _classCallCheck(this, CouponSelection);

    var _this = _possibleConstructorReturn(this, (CouponSelection.__proto__ || Object.getPrototypeOf(CouponSelection)).call(this, props));

    var _props$coupons = props.coupons,
        coupons = _props$coupons === undefined ? [] : _props$coupons,
        selectedCouponIndex = props.selectedCouponIndex,
        handleChooseCoupon = props.handleChooseCoupon;

    _this.handleChooseCoupon = handleChooseCoupon;
    _this.state = {
      is_show: false,
      coupons: coupons,
      selectedCouponIndex: selectedCouponIndex
    };
    return _this;
  }

  _createClass(CouponSelection, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var selectedCouponIndex = nextProps.selectedCouponIndex;

      this.setState({ selectedCouponIndex: selectedCouponIndex });
    }
  }, {
    key: 'handleCouponType',
    value: function handleCouponType(type, discount, value) {
      switch (type) {
        case 2:
          return _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement(
              'span',
              { className: 'price' },
              discount * 10
            ),
            _react2.default.createElement(
              'span',
              { className: 'font-l white' },
              '\u6298'
            )
          );
        default:
          return _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement(
              'span',
              { className: 'font-l white' },
              '\uFFE5'
            ),
            _react2.default.createElement(
              'span',
              { className: 'price' },
              value
            )
          );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          _state$coupons = _state.coupons,
          coupons = _state$coupons === undefined ? [] : _state$coupons,
          selectedCouponIndex = _state.selectedCouponIndex;
      var acitivityMutex = this.props.acitivityMutex;

      console.log('selectedCouponIndex', selectedCouponIndex);
      return _react2.default.createElement(
        'div',
        { className: 'coupon-selection' },
        _react2.default.createElement(
          'ul',
          { className: 'coupon-selection-header' },
          _react2.default.createElement(
            'li',
            { className: 'left', onClick: function onClick() {
                return _popup2.default.hide();
              } },
            '\u53D6\u6D88'
          ),
          _react2.default.createElement(
            'li',
            { className: 'center' },
            '\u9009\u62E9\u7EA2\u5305'
          )
        ),
        coupons.length > 0 ? _react2.default.createElement(
          'div',
          { className: 'coupon-selection-bottom' },
          _react2.default.createElement(Header, { handleChooseCoupon: function handleChooseCoupon() {
              _this2.handleChooseCoupon(-1);
              _popup2.default.hide();
            },
            selectedCouponIndex: selectedCouponIndex
          }),
          _react2.default.createElement(
            'div',
            { className: 'coupon-container touch-layer', style: { height: 'calc(100% - 1.90rem)', overflowY: 'scroll' } },
            coupons.map(function (c, index) {
              return _react2.default.createElement(_newCoupon2.default, _extends({}, c, { acitivityMutex: acitivityMutex, key: 'coupon-selection-' + index, bSelected: selectedCouponIndex == index, handleCouponType: _this2.handleCouponType,
                onClick: function onClick() {
                  if (!!c.deductionPrice && c.mutex === 0) {
                    _this2.handleChooseCoupon(index, c);
                    _popup2.default.hide();
                  }
                } }));
            })
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'no-coupon' },
          _react2.default.createElement('img', { src: require('./img/noCoupon.png'), alt: '\u6CA1\u6709\u7EA2\u5305' }),
          _react2.default.createElement(
            'p',
            null,
            '\u6682\u65E0\u7EA2\u5305'
          )
        )
      );
    }
  }]);

  return CouponSelection;
}(_react.Component);

exports.default = CouponSelection;


var Header = function Header(_ref) {
  var handleChooseCoupon = _ref.handleChooseCoupon,
      selectedCouponIndex = _ref.selectedCouponIndex;

  return _react2.default.createElement(
    'div',
    { className: 'coupon-header', onClick: handleChooseCoupon },
    _react2.default.createElement(
      'p',
      null,
      '\u4E0D\u4F7F\u7528\u7EA2\u5305'
    ),
    selectedCouponIndex === -1 && _react2.default.createElement(_icon2.default, { type: require('../new-coupon/img/check.svg') })
  );
};