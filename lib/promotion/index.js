'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _send = require('@boluome/common-lib/lib/send');

var _send2 = _interopRequireDefault(_send);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _css = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slidePage = require('../slide-page');

var _slidePage2 = _interopRequireDefault(_slidePage);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _couponSelection = require('./couponSelection');

var _couponSelection2 = _interopRequireDefault(_couponSelection);

var _choose = require('./img/choose.png');

var _choose2 = _interopRequireDefault(_choose);

var _nochoose = require('./img/nochoose.png');

var _nochoose2 = _interopRequireDefault(_nochoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//正式使用需要设成false
var usingMockData = false;

var ListItem = _list2.default.Item;

var activityQueryData = {};

var Promotion = function (_Component) {
  _inherits(Promotion, _Component);

  function Promotion(props) {
    _classCallCheck(this, Promotion);

    var _this = _possibleConstructorReturn(this, (Promotion.__proto__ || Object.getPrototypeOf(Promotion)).call(this, props));

    _this.state = {
      amount: 0,
      count: 1
    };
    return _this;
  }

  _createClass(Promotion, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          orderType = _props.orderType,
          channel = _props.channel,
          amount = _props.amount,
          _props$count = _props.count,
          count = _props$count === undefined ? 1 : _props$count;

      this.fetchActivity({
        userId: (0, _getStore2.default)('customerUserId', 'session'),
        orderType: orderType,
        channel: channel,
        amount: amount,
        target: 'platform',
        count: count
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var _props2 = this.props,
          orderType = _props2.orderType,
          channel = _props2.channel,
          amount = _props2.amount,
          _props2$count = _props2.count,
          count = _props2$count === undefined ? 1 : _props2$count;

      if (this.state.amount !== amount || this.state.count !== count) {
        this.setState({ amount: amount, count: count });
        this.fetchActivity({
          userId: (0, _getStore2.default)('customerUserId', 'session'),
          orderType: orderType,
          channel: channel,
          amount: amount,
          target: 'platform',
          count: count
        });
      }
    }
  }, {
    key: 'fetchActivity',
    value: function fetchActivity(data) {
      var _this2 = this;

      var couponId = data.couponId,
          amount = data.amount,
          _data$count = data.count,
          count = _data$count === undefined ? 1 : _data$count;

      activityQueryData = (0, _merge2.default)(activityQueryData, data);
      var postData = activityQueryData;
      if (!couponId) {
        delete postData.couponId;
      }

      (0, _send2.default)('/promotion/query_promotions', postData, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (_ref) {
        var code = _ref.code,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? {} : _ref$data,
            message = _ref.message;

        if (usingMockData) {
          code = 0;
          data = mockData;
        }

        if (code === 0) {
          var _data = data,
              target = _data.target,
              coupons = _data.coupons,
              activity = _data.activity;

          _this2.setState({ activityType: target, activity: activity, coupons: coupons, amount: amount, count: count });
        } else {
          console.log(message);
        }
        _this2.processing();
      });
    }
  }, {
    key: 'processing',
    value: function processing() {
      var _state = this.state,
          activityType = _state.activityType,
          _state$coupons = _state.coupons,
          coupons = _state$coupons === undefined ? [] : _state$coupons,
          _state$activity = _state.activity,
          activity = _state$activity === undefined ? {} : _state$activity,
          _state$selectedCoupon = _state.selectedCouponIndex,
          selectedCouponIndex = _state$selectedCoupon === undefined ? 0 : _state$selectedCoupon;
      var handleChange = this.props.handleChange;
      var deductionPrice = activity.deductionPrice;

      var discountPrice = 0;

      var couponText = '无可用红包';
      var currentCoupon = void 0;
      var bActivityUnavailable = !!!deductionPrice;

      if (activityType === 'platform' || activityType === 'mixed') {
        discountPrice += activity.deductionPrice;
      }

      if (coupons.length > 0) {
        if (activityType == 'coupon' || activityType === 'mixed') {
          currentCoupon = coupons[selectedCouponIndex];
          if (selectedCouponIndex === -1) {
            couponText = '\u6709' + coupons.filter(function (item) {
              return item.deductionPrice > 0;
            }).length + '\u4E2A\u53EF\u7528\u7EA2\u5305';
          } else if (currentCoupon.deductionPrice > 0) {
            discountPrice += currentCoupon.deductionPrice;
            couponText = '\u4F18\u60E0\u51CF\u514D \uFFE5' + currentCoupon.deductionPrice;
          }
        } else if (activityType === 'unavailable') {
          // couponText = `有${ coupons.length }个可用红包`
        } else {
          couponText = '红包不可与活动同时使用';
        }
      }
      var bActivityEffective = activityType === 'platform' || activityType === 'mixed';

      var changeData = {
        discount: discountPrice
      };

      if (currentCoupon) {
        changeData.coupon = currentCoupon;
      }
      if (bActivityEffective && !bActivityUnavailable) {
        changeData.activity = activity;
      }

      this.setState({ couponText: couponText, bActivityEffective: bActivityEffective, bActivityUnavailable: bActivityUnavailable, discountPrice: discountPrice, selectedCouponIndex: selectedCouponIndex });
      handleChange(changeData);
    }
  }, {
    key: 'handleChooseCoupon',
    value: function handleChooseCoupon(index) {
      var coupon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var id = coupon.id;

      this.fetchActivity({ couponId: id });
      this.setState({ selectedCouponIndex: index >= 0 ? 0 : -1, currentCoupon: coupon, bSlideShow: false, slideChildren: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          _state2$couponText = _state2.couponText,
          couponText = _state2$couponText === undefined ? '' : _state2$couponText,
          bActivityEffective = _state2.bActivityEffective,
          _state2$bActivityUnav = _state2.bActivityUnavailable,
          bActivityUnavailable = _state2$bActivityUnav === undefined ? true : _state2$bActivityUnav,
          discountPrice = _state2.discountPrice,
          coupons = _state2.coupons,
          activity = _state2.activity,
          bSlideShow = _state2.bSlideShow,
          slideChildren = _state2.slideChildren,
          _state2$selectedCoupo = _state2.selectedCouponIndex,
          selectedCouponIndex = _state2$selectedCoupo === undefined ? 0 : _state2$selectedCoupo;


      return _react2.default.createElement(
        _list2.default,
        null,
        _react2.default.createElement(
          ListItem,
          { arrow: 'horizontal', extra: couponText, className: 'no-border',
            onClick: function onClick() {
              return (0, _mask2.default)(_react2.default.createElement(
                _slidePage2.default,
                { target: 'right', type: 'root' },
                _react2.default.createElement(_couponSelection2.default, { coupons: coupons, selectedCouponIndex: selectedCouponIndex, handleChooseCoupon: _this3.handleChooseCoupon.bind(_this3) })
              ), { mask: false });
            } },
          _react2.default.createElement(
            'span',
            { className: 'gray-1' },
            '\u7EA2\u5305'
          )
        ),
        activity && _react2.default.createElement(
          ListItem,
          { onClick: function onClick() {
              return _this3.fetchActivity({ couponId: '' });
            },
            style: { backgroundColor: '#fff2df', height: !bActivityEffective || bActivityUnavailable ? '.45rem' : '.30rem' },
            extra: bActivityUnavailable ? '' : _react2.default.createElement('img', { src: bActivityEffective ? _choose2.default : _nochoose2.default,
              style: { height: '.36rem', width: '.36rem' } }) },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'brand-color font-m' },
              activity.title
            ),
            !bActivityEffective || bActivityUnavailable ? _react2.default.createElement(
              'div',
              { className: 'gray-1', style: { fontSize: '.22rem', lineHeight: '.36rem' } },
              bActivityUnavailable ? '未满足活动优惠条件' : !bActivityEffective ? '不可与红包同时使用' : ''
            ) : ''
          )
        )
      );
    }
  }]);

  return Promotion;
}(_react.Component);

exports.default = Promotion;

//测试数据，修改target看效果

var mockData = {

  'couponNum': 0,
  'payPrice': 32.0,
  'target': 'coupon',
  'activity': {
    'mutex': 1,
    'deductionPrice': 10,
    'subtitle': null,
    'id': '584a0b1f18d2462600e3e6bd',
    'title': '\u6EE125\u7ACB\u51CF10\u5143'
  },
  coupons: [{
    'discount': 1,
    'deductionPrice': 12,
    'subtitle': '\u6EE125\u5143\u53EF\u7528',
    'title': '12\u5143\u5916\u5356\u4F18\u60E0\u5238',
    'threshold': 25,
    'mutex': 1,
    'ets': 1480608000.0,
    'type': 1,
    'id': '100000042926',
    'value': 12
  }, {
    'discount': 1,
    'deductionPrice': 0,
    'subtitle': '\u6EE125\u5143\u53EF\u7528',
    'title': '12\u5143\u5916\u5356\u4F18\u60E0\u5238',
    'threshold': 25,
    'mutex': 1,
    'ets': 1480608000.0,
    'type': 1,
    'id': '100000042927',
    'value': 12
  }, {
    'discount': 1,
    'deductionPrice': 12,
    'subtitle': '\u6EE125\u5143\u53EF\u7528',
    'title': '12\u5143\u5916\u5356\u4F18\u60E0\u5238',
    'threshold': 25,
    'mutex': 1,
    'ets': 1480608000.0,
    'type': 1, // price - deducationPrice
    'id': '100000042931',
    'value': 12
  }]
};