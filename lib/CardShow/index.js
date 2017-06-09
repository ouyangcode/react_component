'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _list2.default.Item;

var CardShow = function (_Component) {
  _inherits(CardShow, _Component);

  function CardShow(props) {
    _classCallCheck(this, CardShow);

    var _this = _possibleConstructorReturn(this, (CardShow.__proto__ || Object.getPrototypeOf(CardShow)).call(this, props));

    var _this$props = _this.props,
        openCard = _this$props.openCard,
        onChange = _this$props.onChange;

    _this.state = {
      openCard: openCard,
      onChange: onChange
    };
    _this.handleGoaddrMap = _this.handleGoaddrMap.bind(_this);
    return _this;
  }

  _createClass(CardShow, [{
    key: 'handleGoaddrMap',
    value: function handleGoaddrMap() {
      var onChange = this.props.onChange;

      onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state$openCard = this.state.openCard,
          _state$openCard$nameT = _state$openCard.nameTitle,
          nameTitle = _state$openCard$nameT === undefined ? '' : _state$openCard$nameT,
          _state$openCard$start = _state$openCard.startTime,
          startTime = _state$openCard$start === undefined ? '' : _state$openCard$start,
          _state$openCard$durat = _state$openCard.durationTime,
          durationTime = _state$openCard$durat === undefined ? '' : _state$openCard$durat,
          _state$openCard$endTi = _state$openCard.endTime,
          endTime = _state$openCard$endTi === undefined ? '' : _state$openCard$endTi,
          _state$openCard$textA = _state$openCard.textArr,
          textArr = _state$openCard$textA === undefined ? [] : _state$openCard$textA,
          _state$openCard$start2 = _state$openCard.startDate,
          startDate = _state$openCard$start2 === undefined ? '' : _state$openCard$start2,
          _state$openCard$endDa = _state$openCard.endDate,
          endDate = _state$openCard$endDa === undefined ? '' : _state$openCard$endDa,
          _state$openCard$imgIc = _state$openCard.imgIcon,
          imgIcon = _state$openCard$imgIc === undefined ? '' : _state$openCard$imgIc,
          _state$openCard$addre = _state$openCard.addressStr,
          addressStr = _state$openCard$addre === undefined ? '' : _state$openCard$addre;

      return _react2.default.createElement(
        'div',
        { className: 'CardShowComponent' },
        _react2.default.createElement(
          'div',
          { className: 'orderCard' },
          _react2.default.createElement(
            Item,
            { className: 'ordertitle' },
            nameTitle
          ),
          _react2.default.createElement('div', { className: 'line' }),
          _react2.default.createElement(
            'div',
            { className: 'ordertime' },
            _react2.default.createElement(
              'div',
              { className: 'timest timeoto' },
              _react2.default.createElement(
                'span',
                { className: 'time' },
                startTime ? startTime : '暂无'
              ),
              _react2.default.createElement(
                'span',
                { className: 'text' },
                textArr[0]
              ),
              _react2.default.createElement(
                'span',
                { className: 'day' },
                startDate
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'jobtime' },
              _react2.default.createElement('img', { alt: '\u52A0\u8F7D\u4E2D', src: imgIcon }),
              _react2.default.createElement(
                'span',
                null,
                durationTime ? '\u8425\u4E1A\u65F6\u95F4\u957F, ' + durationTime : '商家暂未提供具体时间'
              ),
              durationTime ? _react2.default.createElement(
                'span',
                { style: { color: '#fff' } },
                '\u4E0D\u8BB8\u53BB\u6389'
              ) : _react2.default.createElement(
                'span',
                null,
                '\u8BF7\u8054\u7CFB\uFF1A10106060'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'timend timeoto' },
              _react2.default.createElement(
                'span',
                { className: 'time' },
                endTime ? endTime : '暂无'
              ),
              _react2.default.createElement(
                'span',
                { className: 'text' },
                textArr[1]
              ),
              _react2.default.createElement(
                'span',
                { className: 'day' },
                endDate
              )
            )
          ),
          _react2.default.createElement(
            Item,
            { extra: textArr[3] },
            textArr[2]
          ),
          _react2.default.createElement('div', { className: 'line', style: { height: '1px' } }),
          _react2.default.createElement(
            Item,
            { wrap: 'true', arrow: 'horizontal', className: 'orderaddr', onClick: function onClick() {
                return _this2.handleGoaddrMap();
              } },
            textArr[4],
            ' ',
            addressStr
          )
        )
      );
    }
  }]);

  return CardShow;
}(_react.Component);

exports.default = CardShow;