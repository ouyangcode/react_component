'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window = window,
    _window$BMap = _window.BMap,
    BMap = _window$BMap === undefined ? '' : _window$BMap;

var Bmapshow = function (_Component) {
  _inherits(Bmapshow, _Component);

  function Bmapshow(props) {
    _classCallCheck(this, Bmapshow);

    var _this = _possibleConstructorReturn(this, (Bmapshow.__proto__ || Object.getPrototypeOf(Bmapshow)).call(this, props));

    var geoPoint = (0, _getStore2.default)('geopoint', 'session');
    var _this$props = _this.props,
        longitude = _this$props.longitude,
        latitude = _this$props.latitude,
        addrnameStr = _this$props.addrnameStr,
        addrTitlename = _this$props.addrTitlename;

    if (longitude && latitude) {
      geoPoint = (0, _merge2.default)(geoPoint, { longitude: longitude, latitude: latitude });
    }
    _this.state = {
      geoPoint: geoPoint,
      addrnameStr: addrnameStr,
      addrTitlename: addrTitlename
    };
    _this.mapContainer;
    _this.map;
    console.log('this.state', _this.state);
    return _this;
  }

  _createClass(Bmapshow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var geoPoint = this.state.geoPoint;

      this.handleMapfn(geoPoint);
      console.log(geoPoint);
    }
  }, {
    key: 'handleMapfn',
    value: function handleMapfn(geoPoint) {
      var Point = window.BMap.Point;
      var addrnameStr = this.state.addrnameStr;
      var addrTitlename = this.state.addrTitlename;

      addrTitlename = '<span class="iw_poi_img"></span>' + addrTitlename;
      var map = new BMap.Map(this.mapContainer);
      var point = new Point(geoPoint.longitude, geoPoint.latitude);
      map.centerAndZoom(point, 18);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      var opts = {
        minWidth: 500,
        Height: 'auto',
        title: addrTitlename
      };
      // const str = `<div class="iw_poi_content">地址：${ addrnameStr }<span class="iw_poi_warp" onclick="(${ this.handleCopyData })()"><span class="iw_poi_copy">复制粘贴</span><span class="iw_poi_img"></span></span></div>`
      var str = '<div class="iw_poi_content">\u5730\u5740\uFF1A' + addrnameStr + '</div>';
      var iw = new BMap.InfoWindow(str, opts);
      map.openInfoWindow(iw, point);
      console.log('map-----', addrnameStr, addrTitlename);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // 百度地图API功能
      return _react2.default.createElement(
        'div',
        { className: 'addrBumapWrap' },
        _react2.default.createElement(
          'div',
          { className: 'addrBumapMain' },
          _react2.default.createElement('div', { className: 'pak', ref: function ref(node) {
              return _this2.mapContainer = node;
            }, style: { width: '100%', height: '100%', borderBottom: '1px solid #eee' } })
        )
      );
    }
  }]);

  return Bmapshow;
}(_react.Component);

exports.default = Bmapshow;