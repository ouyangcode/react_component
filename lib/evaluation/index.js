'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slidePage = require('../slide-page');

var _slidePage2 = _interopRequireDefault(_slidePage);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

var _grayStar = require('./img/grayStar.png');

var _grayStar2 = _interopRequireDefault(_grayStar);

var _grayStars = require('./img/grayStars.png');

var _grayStars2 = _interopRequireDefault(_grayStars);

var _yellowStar = require('./img/yellowStar.png');

var _yellowStar2 = _interopRequireDefault(_yellowStar);

var _yellowStars = require('./img/yellowStars.png');

var _yellowStars2 = _interopRequireDefault(_yellowStars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Evaluation = function (_Component) {
  _inherits(Evaluation, _Component);

  function Evaluation(props) {
    _classCallCheck(this, Evaluation);

    var _this = _possibleConstructorReturn(this, (Evaluation.__proto__ || Object.getPrototypeOf(Evaluation)).call(this, props));

    _this.state = {
      count: 5,
      defaultValue: _this.props.defaultValue,
      width: _this.props.width
    };
    return _this;
  }

  _createClass(Evaluation, [{
    key: 'componentWillMount',
    value: function componentWillMount(props) {}
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          count = _state.count,
          defaultValue = _state.defaultValue,
          width = _state.width;

      var grayArr = [];
      var yellArr = [];
      for (var i = 0; i < count; i++) {
        grayArr.push(_grayStar2.default);
      }

      return _react2.default.createElement(
        'div',
        { className: 'evaluationContainer' },
        _react2.default.createElement(
          'div',
          { className: 'grayStarBox' },
          _react2.default.createElement('img', { src: _grayStars2.default, style: { width: width ? width : '' } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'yellowStarBox', style: { width: defaultValue } },
          _react2.default.createElement('img', { src: _yellowStars2.default, style: { width: width ? width : '' } })
        )
      );
    }
  }]);

  return Evaluation;
}(_react.Component);

exports.default = Evaluation;