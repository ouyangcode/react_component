'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _numToChinese = require('@boluome/common-lib/lib/num-to-chinese');

var _numToChinese2 = _interopRequireDefault(_numToChinese);

var _css = require('antd-mobile/lib/accordion/style/css');

var _accordion = require('antd-mobile/lib/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _send = require('@boluome/common-lib/lib/send');

var _send2 = _interopRequireDefault(_send);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _css2 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _css3 = require('antd-mobile/lib/list/style/css');

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

require('./style/promotion.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//正式使用需要设成false
var usingMockData = false;

var ListItem = _list2.default.Item;

var activityQueryData = {};

var NewPromotion = function (_Component) {
  _inherits(NewPromotion, _Component);

  function NewPromotion(props) {
    _classCallCheck(this, NewPromotion);

    var _this = _possibleConstructorReturn(this, (NewPromotion.__proto__ || Object.getPrototypeOf(NewPromotion)).call(this, props));

    var _props$count = props.count,
        count = _props$count === undefined ? 1 : _props$count;

    _this.state = {
      couponText: '',
      acitivityMutex: false,
      count: count
    };
    _this.fetchactivity = _this.fetchactivity.bind(_this);
    _this.processing = _this.processing.bind(_this);
    return _this;
  }

  _createClass(NewPromotion, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          orderType = _props.orderType,
          channel = _props.channel,
          amount = _props.amount,
          _props$count2 = _props.count,
          count = _props$count2 === undefined ? 1 : _props$count2;

      this.fetchactivity({
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
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props,
          orderType = _props2.orderType,
          channel = _props2.channel,
          amount = _props2.amount,
          _props2$count = _props2.count,
          count = _props2$count === undefined ? 1 : _props2$count;
      var _ref = [nextProps.amount, nextProps.count],
          nextAmount = _ref[0],
          nextCount = _ref[1];

      if (nextAmount && amount !== nextAmount) {
        this.setState({ amount: nextAmount, count: nextCount });
        this.fetchactivity({
          userId: (0, _getStore2.default)('customerUserId', 'session'),
          orderType: orderType,
          channel: channel,
          amount: nextAmount,
          target: 'platform',
          count: nextCount
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _popup2.default.hide();
    }
  }, {
    key: 'fetchactivity',
    value: function fetchactivity(data) {
      var _this2 = this;

      var couponId = data.couponId,
          amount = data.amount;

      activityQueryData = (0, _merge2.default)(activityQueryData, data);
      var postData = activityQueryData;
      if (!couponId) {
        delete postData.couponId;
      }

      // 测试的url：https://dev-api.otosaas.com/test/promotion/query_promotions,  并添加, { appCode: 'blm' }
      (0, _send2.default)('/promotion/v2/query_promotions', postData, { appCode: 'blm' }).then(function (_ref2) {
        var code = _ref2.code,
            _ref2$data = _ref2.data,
            data = _ref2$data === undefined ? {} : _ref2$data,
            message = _ref2.message;

        if (usingMockData) {
          code = 0;
          data = mockData;
        }

        if (code === 0) {
          var _data = data,
              target = _data.target,
              coupons = _data.coupons,
              activities = _data.activities,
              activity = _data.activity;

          if (activity) activities = [activity];
          _this2.setState({ activityType: target, activities: activities, coupons: coupons, amount: amount });
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
          _state$activities = _state.activities,
          activities = _state$activities === undefined ? [{}] : _state$activities,
          _state$selectedCoupon = _state.selectedCouponIndex,
          selectedCouponIndex = _state$selectedCoupon === undefined ? 0 : _state$selectedCoupon;
      var amount = this.props.amount;
      var handleChange = this.props.handleChange;
      var deductionPrice = activities[0].deductionPrice;

      var discountPrice = 0;

      var couponText = _react2.default.createElement(
        'p',
        { style: { color: '#ccc' } },
        '\u65E0\u53EF\u7528\u7EA2\u5305'
      );
      var currentCoupon = void 0;
      var bactivityUnavailable = !!!deductionPrice;

      if (activityType === 'platform' || activityType === 'mixed') {
        discountPrice += activities[0].deductionPrice;
        if (activities[0].mutex === 1) this.setState({ acitivityMutex: true }); //当活动类型为platForm且当前选中活动与红包是互斥的，那么所有的红包都显示与活动不可同享，通过acitivityMutex
      }

      if (coupons.length > 0) {
        if (activityType == 'coupon' || activityType === 'mixed') {
          currentCoupon = coupons[selectedCouponIndex];
          if (selectedCouponIndex === -1) {
            couponText = _react2.default.createElement(
              'p',
              { style: { color: '#fff', background: '#ff4848', borderRadius: '4px', width: '1.80rem', height: '.5rem', textAlign: 'center', float: 'right', lineHeight: '.5rem' } },
              coupons.filter(function (item) {
                return item.deductionPrice > 0;
              }).length,
              '\u4E2A\u7EA2\u5305\u53EF\u7528'
            );
          } else {
            var _currentCoupon = currentCoupon,
                _deductionPrice = _currentCoupon.deductionPrice;

            if (_deductionPrice) {
              discountPrice += _deductionPrice;
              couponText = _react2.default.createElement(
                'p',
                { style: { color: '#ff4848' } },
                '- \uFFE5 ' + _deductionPrice
              );
            }
          }
        } else {
          couponText = _react2.default.createElement(
            'p',
            { style: { color: '#fff', background: '#ff4848', borderRadius: '4px', width: '1.80rem', height: '.5rem', textAlign: 'center', float: 'right', lineHeight: '.5rem' } },
            coupons.filter(function (item) {
              return item.deductionPrice > 0;
            }).length,
            '\u4E2A\u7EA2\u5305\u53EF\u7528'
          );
        }
      }
      var bactivityEffective = activityType === 'platform' || activityType === 'mixed';

      var changeData = {
        discount: discountPrice
      };

      if (currentCoupon) {
        changeData.coupon = currentCoupon;
      }
      if (bactivityEffective && !bactivityUnavailable) {
        changeData.activities = activities[0];
      }

      this.setState({ couponText: couponText, bactivityEffective: bactivityEffective, bactivityUnavailable: bactivityUnavailable, discountPrice: discountPrice, selectedCouponIndex: selectedCouponIndex });
      handleChange(changeData);
    }
  }, {
    key: 'handleChooseCoupon',
    value: function handleChooseCoupon(index) {
      var coupon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var id = coupon.id;

      this.fetchactivity({ couponId: id });
      this.setState({ selectedCouponIndex: index >= 0 ? 0 : -1, currentCoupon: coupon, bSlideShow: false, slideChildren: '', acitivityMutex: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          couponText = _state2.couponText,
          bactivityEffective = _state2.bactivityEffective,
          _state2$bactivityUnav = _state2.bactivityUnavailable,
          bactivityUnavailable = _state2$bactivityUnav === undefined ? true : _state2$bactivityUnav,
          acitivityMutex = _state2.acitivityMutex,
          activityType = _state2.activityType,
          discountPrice = _state2.discountPrice,
          coupons = _state2.coupons,
          activities = _state2.activities,
          bSlideShow = _state2.bSlideShow,
          slideChildren = _state2.slideChildren,
          _state2$selectedCoupo = _state2.selectedCouponIndex,
          selectedCouponIndex = _state2$selectedCoupo === undefined ? 0 : _state2$selectedCoupo,
          count = _state2.count;
      var amount = this.props.amount;

      return _react2.default.createElement(
        _list2.default,
        { className: 's-promotion' },
        _react2.default.createElement(
          ListItem,
          { extra: '\xA5 ' + amount.toFixed(2), className: 's-order-price' },
          '\u8BA2\u5355\u603B\u989D'
        ),
        activities && activities.length > 0 ? activities.length > 1 ? _react2.default.createElement(
          _accordion2.default,
          { defaultActiveKey: '1', className: 'activity', onChange: this.onChange },
          _react2.default.createElement(
            _accordion2.default.Panel,
            { header: _react2.default.createElement(ActivityItem, { activityInfo: activities[0], availability: bactivityEffective, amount: amount, count: count, isFirst: true, activityType: activityType }) },
            _react2.default.createElement(
              _list2.default,
              { className: 'my-list' },
              activities.map(function (item, index) {
                var title = item.title,
                    deductionPrice = item.deductionPrice,
                    threshold = item.threshold,
                    mutex = item.mutex;

                var bIndex = 1; //下面的展示的就从第二个索引处开始
                if (index >= bIndex) {
                  return _react2.default.createElement(
                    ListItem,
                    { key: index },
                    _react2.default.createElement(ActivityItem, { activityInfo: item, availability: false, amount: amount, count: count, activityType: activityType })
                  );
                }
              })
            )
          )
        ) : _react2.default.createElement(
          ListItem,
          null,
          _react2.default.createElement(ActivityItem, { activityInfo: activities[0], availability: bactivityEffective, amount: amount, count: count, isFirst: true, activityType: activityType })
        ) : '',
        _react2.default.createElement(
          ListItem,
          { arrow: 'horizontal', extra: couponText, className: 'coupon',
            onClick: function onClick() {
              return _popup2.default.show(_react2.default.createElement(_couponSelection2.default, { coupons: coupons, selectedCouponIndex: selectedCouponIndex, acitivityMutex: acitivityMutex, handleChooseCoupon: _this3.handleChooseCoupon.bind(_this3) }), { animationType: 'slide-up' });
            } },
          _react2.default.createElement(
            'span',
            null,
            '\u7EA2\u5305\u62B5\u6263\uFF0F\u5151\u6362\u7EA2\u5305'
          )
        )
      );
    }
  }]);

  return NewPromotion;
}(_react.Component);

exports.default = NewPromotion;

var ActivityItem = function (_React$Component) {
  _inherits(ActivityItem, _React$Component);

  function ActivityItem(props) {
    _classCallCheck(this, ActivityItem);

    return _possibleConstructorReturn(this, (ActivityItem.__proto__ || Object.getPrototypeOf(ActivityItem)).call(this, props));
  }

  _createClass(ActivityItem, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          activityInfo = _props3.activityInfo,
          availability = _props3.availability,
          amount = _props3.amount,
          count = _props3.count,
          _props3$isFirst = _props3.isFirst,
          isFirst = _props3$isFirst === undefined ? false : _props3$isFirst,
          activityType = _props3.activityType;
      var _activityInfo$title = activityInfo.title,
          title = _activityInfo$title === undefined ? '' : _activityInfo$title,
          _activityInfo$deducti = activityInfo.deductionPrice,
          deductionPrice = _activityInfo$deducti === undefined ? '' : _activityInfo$deducti,
          _activityInfo$thresho = activityInfo.threshold,
          threshold = _activityInfo$thresho === undefined ? 0 : _activityInfo$thresho,
          _activityInfo$mutex = activityInfo.mutex,
          mutex = _activityInfo$mutex === undefined ? '0' : _activityInfo$mutex,
          _activityInfo$discoun = activityInfo.discountoff,
          discountoff = _activityInfo$discoun === undefined ? '' : _activityInfo$discoun,
          type = activityInfo.type;

      // rightInfo表示右侧需要显示的文字

      var rightInfo = '';
      if (threshold > amount) {
        if (type === 1 || type === 2) rightInfo = '\u8FD8\u5DEE' + (threshold - amount).toFixed(2) + '\u5143';
        if (type === 3 || type === 4) rightInfo = '\u8FD8\u5DEE' + (0, _numToChinese2.default)((threshold - count).toFixed(0)) + '\u4EF6';
      } else {
        if (activityType === 'coupon') {
          if (isFirst) {
            rightInfo = '与红包不可同享';
          } else {
            if (deductionPrice) rightInfo = '\u5DF2\u6EE1' + threshold + '\u53EF\u51CF' + deductionPrice; //不能在availability的判断下面，因为活动可用时，rightInfo就使用这一种写法了
            if (discountoff) rightInfo = '\u5DF2\u6EE1' + threshold + '\u53EF\u6253' + discountoff * 10 + '\u6298'; //不能在availability的判断下面，因为活动可用时，rightInfo就使用这一种写法了
          }
        } else {
          if (deductionPrice) rightInfo = '- \xA5 ' + deductionPrice;
        }
      }
      return _react2.default.createElement(
        'ul',
        { className: 'activity-item' },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'p',
            { className: availability ? '' : 'unavailable' },
            '\u51CF'
          ),
          _react2.default.createElement('span', null)
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: availability ? 'left' : 'unavailable left' },
            title
          ),
          _react2.default.createElement(
            'p',
            { className: availability ? 'right' : 'unavailable right' },
            rightInfo
          )
        )
      );
    }
  }]);

  return ActivityItem;
}(_react2.default.Component);

//测试数据，修改target看效果


var mockData = {
  activities: [{
    discount: 1,
    id: "667",
    mutex: 0,
    subtitle: null,
    threshold: 500,
    title: "满阿斯顿计分卡监考老师的风景啊善良的看法将阿里；世纪东方卡拉斯京地方500-10",
    type: 1,
    value: 10
  }, {
    discount: 1,
    id: "667",
    mutex: 0,
    subtitle: null,
    threshold: 600,
    title: "满600-10",
    type: 1,
    value: 10
  }, {
    discount: 1,
    id: "667",
    mutex: 0,
    subtitle: null,
    threshold: 700,
    title: "满700-10",
    type: 1,
    value: 10
  }],
  coupons: [{
    deductionPrice: 0,
    discount: 0.99,
    discountoff: 0.01,
    ets: 1496073600,
    id: "11540494",
    mutex: 0,
    subtitle: "1",
    threshold: 0,
    title: "任意金额99折",
    type: 2,
    value: 30
  }, {
    discount: 0.99,
    discountoff: 0.01,
    ets: 1496073600,
    id: "11540474",
    mutex: 0,
    subtitle: "测试不可用",
    threshold: 1000,
    title: "满1000可用券",
    type: 2,
    value: 100
  }, {
    deductionPrice: 90.99,
    discount: 1,
    discountoff: 0,
    ets: 1496073600,
    id: "11540652",
    mutex: 0,
    subtitle: "3",
    threshold: 20,
    title: "满20-5",
    type: 1,
    value: 99.99
  }],
  payPrice: 0.01,
  target: "coupon"
};

//
//
// {
//
//   'couponNum': 0,
//   'payPrice': 32.0,
//   'target': 'mixed',
//   'activities': [
//     {
//       'mutex': 1,
//       'subtitle': null,
//       'deductionPrice': 10,
//       'threshold': 25,
//       'id': '584a0b1f18d2462600e3e6bd',
//       'title': '\u6ee125\u7acb\u51cf10\u5143'
//     },
//     {
//       'mutex': 0,
//       'subtitle': null,
//       'id': '584a0b1f18d2462600e3e6bd',
//       'title': '\u6ee125\u7acb\u51cf10\u5143',
//       threshold: '10000'
//     },
//     {
//       'mutex': 1,
//       'deductionPrice': 10,
//       'subtitle': null,
//       'id': '584a0b1f18d2462600e3e6bd',
//       'title': '\u6ee125\u7acb\u51cf10\u5143'
//     }
//   ],
//   coupons: [
//     {
//           'discount': 1,
//           'deductionPrice': 6,
//           'subtitle': '\u6ee125\u5143\u53ef\u7528',
//           'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
//           'threshold': 25,
//           'mutex': 1,
//           'ets': 1480608000.0,
//           'type': 1,
//           'id': '100000042927',
//           'value': 7
//       }, {
//           'discount': 1,
//           'deductionPrice': 0,
//           'subtitle': '\u6ee125\u5143\u53ef\u7528',
//           'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
//           'threshold': 25,
//           'mutex': 1,
//           'ets': 1480608000.0,
//           'type': 1,
//           'id': '100000042927',
//           'value': 12
//       }, {
//           'discount': 1,
//           'deductionPrice': 12,
//           'subtitle': '\u6ee125\u5143\u53ef\u7528',
//           'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
//           'threshold': 25,
//           'mutex': 1,
//           'ets': 1480608000.0,
//           'type': 1,   // price - deducationPrice
//           'id': '100000042931',
//           'value': 12
//       }]
// }