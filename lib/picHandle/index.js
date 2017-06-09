'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pichandle = function (_Component) {
  _inherits(Pichandle, _Component);

  function Pichandle(props) {
    _classCallCheck(this, Pichandle);

    // console.log('props==pic',props);
    var _this = _possibleConstructorReturn(this, (Pichandle.__proto__ || Object.getPrototypeOf(Pichandle)).call(this, props));

    var picSrc = props.picSrc,
        sw = props.sw,
        sh = props.sh;

    var imgw = '200'; //sw
    var imgh = '300'; //sh
    _this.state = {
      picSrc: picSrc,
      sh: sh,
      sw: sw,
      imgh: imgh,
      imgw: imgw,
      marginLeft: 0,
      marginTop: 0
    };
    _this.setImgSize(picSrc, sw, sh, imgw, imgh);
    _this.resetImgSizeWH = _this.resetImgSizeWH.bind(_this);
    return _this;
  }

  _createClass(Pichandle, [{
    key: 'setImgSize',
    value: function setImgSize(picSrc, sw, sh, imgw, imgh) {
      var image = new Image();
      var that = this;
      image.src = picSrc;
      // console.log('image', image);
      var w = void 0;
      var h = void 0;
      image.onload = function () {
        w = image.width;
        h = image.height;
        that.resetImgSizeWH(picSrc, w, h, sw, sh, imgw, imgh);
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          picSrc = _props.picSrc,
          sw = _props.sw,
          sh = _props.sh;

      this.setImgSize(picSrc, sw, sh, '200', '100');
    }
  }, {
    key: 'resetImgSizeWH',
    value: function resetImgSizeWH(picSrc, w, h, sw, sh, imgw, imgh) {
      var swh = sw / sh;
      var wh = w / h;
      var marginLeft = void 0;
      var marginTop = void 0;
      var bodyfontSize = document.documentElement.style.fontSize;
      var bi = parseInt(bodyfontSize) / 100;
      // console.log('swh----',swh,wh);
      if (swh > wh) {
        // alert('if')
        imgw = sw;
        imgh = imgw / w * h;
        imgh = imgh * bi;
        imgw = imgw * bi;
      } else if (swh < wh) {
        // alert('else if')
        imgh = sh;
        imgw = imgh / h * w;
        imgh = imgh * bi;
        imgw = imgw * bi;
        marginLeft = -(imgw / bi - sw) / 2;
        marginTop = -(imgh / bi - sh) / 2;
      } else {
        imgh = h;
        imgw = w;
      }
      this.setState({
        imgh: imgh,
        imgw: imgw,
        marginLeft: marginLeft,
        marginTop: 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          picSrc = _state.picSrc,
          sw = _state.sw,
          sh = _state.sh,
          imgw = _state.imgw,
          imgh = _state.imgh,
          marginTop = _state.marginTop,
          marginLeft = _state.marginLeft;

      return _react2.default.createElement(
        'div',
        { className: 'picHandleWrap' },
        _react2.default.createElement(
          'div',
          { className: 'picItem' },
          _react2.default.createElement('img', { alt: '', src: picSrc, style: { width: imgw + 'px', height: imgh + 'px', marginTop: marginTop, marginLeft: marginLeft } })
        )
      );
    }
  }]);

  return Pichandle;
}(_react.Component);

exports.default = Pichandle;