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

var MapShow = function (_Component) {
  _inherits(MapShow, _Component);

  function MapShow(props) {
    _classCallCheck(this, MapShow);

    var _this = _possibleConstructorReturn(this, (MapShow.__proto__ || Object.getPrototypeOf(MapShow)).call(this, props));

    var geoPoint = (0, _getStore2.default)('geopoint', 'session');
    var _this$props = _this.props,
        longitude = _this$props.longitude,
        latitude = _this$props.latitude,
        addrnameStr = _this$props.addrnameStr,
        addrTitlename = _this$props.addrTitlename,
        translateFrom = _this$props.translateFrom;
    // const scale = window.devicePixelRatio  // 部分安卓机上没有这个

    var bodyfontSize = document.documentElement.style.fontSize;
    var scale = window.viewportScale;
    if (bodyfontSize === '50px' && scale === 1) {
      scale = 1;
    }
    if (longitude && latitude) {
      geoPoint = (0, _merge2.default)(geoPoint, { longitude: longitude, latitude: latitude });
    }
    _this.state = {
      geoPoint: geoPoint,
      addrnameStr: addrnameStr,
      addrTitlename: addrTitlename,
      scale: scale
    };
    if (translateFrom) {
      var callback = function callback(point) {
        _this.setState({
          geoPoint: point
        });
      };
      _this.transformPoint(geoPoint, callback, translateFrom);
    }
    _this.mapContainer;
    _this.map;
    _this.transformPoint = _this.transformPoint.bind(_this);
    return _this;
  }

  _createClass(MapShow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var geoPoint = this.state.geoPoint;

      this.handleMapfn(geoPoint);
    }
  }, {
    key: 'transformPoint',
    value: function transformPoint(geoPoint, callback, from, to) {
      if (BMap) {
        var longitude = geoPoint.longitude,
            latitude = geoPoint.latitude;
        var Convertor = BMap.Convertor,
            Point = BMap.Point;

        var convertor = new Convertor();
        var baiduPoint = new Point(longitude, latitude);
        convertor.translate([baiduPoint], from, to, function (_ref) {
          var points = _ref.points;

          if (Array.isArray(points) && points.length > 0) {
            var _points$ = points[0],
                lat = _points$.lat,
                lng = _points$.lng;

            callback({ latitude: lat, longitude: lng });
          }
        });
      } else {
        callback('no BMap');
      }
    }
  }, {
    key: 'handleMapfn',
    value: function handleMapfn(geoPoint) {
      var Point = window.BMap.Point;
      var addrnameStr = this.state.addrnameStr;
      var addrTitlename = this.state.addrTitlename;

      addrTitlename = '<span class="iw_poi_img"></span><span class=\'iw_poi_title\'>' + addrTitlename + '</span>';
      var opts = {
        width: 200,
        height: 0,
        title: addrTitlename,
        enableCloseOnClick: false
      };
      var str = '<div class="iw_poi_content">\u5730\u5740\uFF1A' + addrnameStr + '</div>';
      var mapContainer = document.querySelector('.pak');
      var map = new BMap.Map(mapContainer);
      var point = new Point(geoPoint.longitude, geoPoint.latitude);
      var marker = new BMap.Marker(point);
      var iw = new BMap.InfoWindow(str, opts);

      map.centerAndZoom(point, 16);
      // map.disableDragging() // 禁止拖拽
      map.disableDoubleClickZoom(); // 禁止双击放大
      // map.disablePinchToZoom() // 禁止手指缩放
      map.addOverlay(marker);
      map.addEventListener('onclick', function () {
        marker.openInfoWindow(iw, point);
      });
      map.addEventListener('onmoving', function () {
        // marker.setPosition(map.getCenter())
        document.querySelector('.pak').style.overflow = 'visible';
      });
      marker.addEventListener('oninfowindowopen', function () {
        var ratio = window.viewportScale;
        var titleEl = document.querySelector('.BMap_bubble_title');
        var iconEl = document.querySelector('.iw_poi_img');
        var contentEl = document.querySelector('.iw_poi_content');
        if (iconEl) {
          iconEl.style.width = 0.4 / ratio + 'rem';
          iconEl.style.height = 0.4 / ratio + 'rem';
        }
        if (titleEl) {
          titleEl.style.fontSize = 0.30 / ratio + 'rem';
          titleEl.style.padding = 0.15 / ratio + 'rem ' + 0.05 / ratio + 'rem';
        }
        if (contentEl) {
          contentEl.style.fontSize = 0.28 / ratio + 'rem';
        }
      });
      marker.openInfoWindow(iw, point);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var scale = this.state.scale;
      // 百度地图API功能

      return _react2.default.createElement(
        'div',
        { className: 'addrBumapWrap' },
        _react2.default.createElement(
          'div',
          { className: 'addrBumapMain' },
          _react2.default.createElement('div', { className: 'pak', ref: function ref(node) {
              if (node) {
                node.style.width = window.screen.width + 'px';
                node.style.height = window.screen.height + 'px';
                node.style.overflow = 'hidden';
                node.style.transform = 'scale(' + scale + ', ' + scale + ')';
                node.style.transformOrigin = 'top left';

                node.style.WebkitTransform = 'scale(' + scale + ', ' + scale + ')';
                node.style.WebkitTransformOrigin = 'top left';
                var geoPoint = _this2.state.geoPoint;

                _this2.handleMapfn(geoPoint);
              }
            },
            style: { borderBottom: '1px solid #eee' }
          })
        )
      );
    }
  }]);

  return MapShow;
}(_react.Component);

exports.default = MapShow;