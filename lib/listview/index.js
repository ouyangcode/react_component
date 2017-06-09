'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.scss');

var _cc = require('./img/cc.gif');

var _cc2 = _interopRequireDefault(_cc);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var startY = void 0;

var Listview = function (_Component) {
  _inherits(Listview, _Component);

  function Listview(props) {
    _classCallCheck(this, Listview);

    var _this = _possibleConstructorReturn(this, (Listview.__proto__ || Object.getPrototypeOf(Listview)).call(this, props));

    _this.state = {
      status: 0, // 当前状态
      pullY: 0, //上拉距离
      canPull: false, //可否上拉
      noOne: false, //无数据
      // loading : true,             //第一次拉取loading
      offset: _this.props.offset, //加载量
      fetchData: _this.props.fetchData,
      dataList: [], // 数据列表
      animate: "",
      overflow: 'auto',
      hideHeight: 0
    };
    return _this;
  }

  // props


  _createClass(Listview, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      //第一次拉取
      var handleClose = (0, _loading2.default)();
      this.handleFetch(0, handleClose);
    }
  }, {
    key: 'handleFetch',
    value: function handleFetch(s, handleClose) {
      var _this2 = this;

      var _state = this.state,
          dataList = _state.dataList,
          animate = _state.animate,
          _state$fetchData = _state.fetchData,
          fetchData = _state$fetchData === undefined ? {} : _state$fetchData,
          offset = _state.offset;
      var _props = this.props,
          onFetch = _props.onFetch,
          limit = _props.limit,
          toBottom = _props.toBottom;

      this.setState({
        status: s
      });

      onFetch && onFetch(limit, offset, fetchData, function (data) {
        handleClose && handleClose();
        if (offset == 0 && data.length == 0) {
          _this2.setState({
            status: 0,
            noOne: true
          });
        } else if (offset == 0 && data.length < limit) {
          _this2.setState({
            dataList: [].concat(_toConsumableArray(data)),
            status: 0,
            canPull: false
          });
        } else if (offset == 0 && data.length == limit) {
          _this2.setState({
            dataList: [].concat(_toConsumableArray(data)),
            status: 0,
            canPull: false
          });
        } else if (data.length > 0) {
          var sT = document.querySelector('.list').scrollTop;
          _this2.setState({
            dataList: [].concat(_toConsumableArray(dataList), _toConsumableArray(data)),
            hideHeight: toBottom
          });
          document.querySelector('.list').scrollTop = sT + toBottom * parseFloat(window.document.documentElement.style.fontSize, 10);

          setTimeout(function () {
            return _this2.setState({
              pullY: 0,
              hideHeight: 0,
              animate: 'all 0.2s ease-in 0s',
              canPull: false
            });
          }, 600);
        } else {
          _this2.setState({
            status: 3
          });
          setTimeout(function () {
            return _this2.setState({
              pullY: 0,
              animate: 'all 0.2s ease-in 0s',
              canPull: true
            });
          }, 600);
        }
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(o) {
      var _state2 = this.state,
          status = _state2.status,
          canPull = _state2.canPull;
      var _props2 = this.props,
          toBottom = _props2.toBottom,
          onFetch = _props2.onFetch,
          limit = _props2.limit,
          offset = _props2.offset;
      var scrollTop = o.scrollTop,
          offsetHeight = o.offsetHeight,
          scrollHeight = o.scrollHeight;
      // 当距离底部toBottom距离，触发onScrollToBottom

      if (scrollTop + offsetHeight == scrollHeight && (status == 1 || status == 0)) {
        this.setState({
          canPull: true
        });
      } else if (canPull) {
        this.setState({
          canPull: false
        });
      }
    }
  }, {
    key: 'handleTouchStar',
    value: function handleTouchStar(e) {
      var _state3 = this.state,
          canPull = _state3.canPull,
          animate = _state3.animate;

      this.setState({
        animate: '',
        status: 1,
        pullY: 0
      });
      if (canPull) {
        startY = e.touches ? e.touches[0].screenY : e.screenY;
      }
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      var _state4 = this.state,
          pullY = _state4.pullY,
          canPull = _state4.canPull;

      if (canPull) {
        var scaleY = this.props.scaleY;

        var eTouchScreenY = e.touches ? e.touches[0].screenY : e.screenY;

        var distance = (eTouchScreenY - startY) * scaleY; // 用scaleY对pull的距离进行缩放
        if (distance < 0) {
          e.preventDefault();
        }
        distance = distance > 0 ? distance * 3 + pullY : distance + pullY;

        if (distance < 0) {
          this.setState({
            overflow: 'hidden',
            pullY: distance
          });
        }
        startY = eTouchScreenY;
      }
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      var _state5 = this.state,
          pullY = _state5.pullY,
          canPull = _state5.canPull,
          animate = _state5.animate;
      var toBottom = this.props.toBottom;

      if (canPull) {
        if (toBottom * -1 > pullY) {
          this.setState({
            overflow: 'auto',
            pullY: toBottom * -1,
            animate: '',
            canPull: false
          });
          this.handleFetch(2);
        } else {
          this.setState({
            overflow: 'auto',
            pullY: 0,
            animate: 'all 0.2s ease-in 0s'
          });
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      //重置
      var offset = nextProps.offset,
          fetchData = nextProps.fetchData;

      if (0 === offset) {
        var handleClose = (0, _loading2.default)();
        this.setState({ dataList: [] }, function () {
          _this3.handleFetch(0, handleClose);
        });
      }
      this.setState({ offset: offset,
        fetchData: fetchData,
        status: 0,
        pullY: 0,
        canPull: false,
        noOne: false,
        animate: "",
        overflow: 'auto',
        hideHeight: 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props,
          _state6 = this.state,
          status = _state6.status,
          dataList = _state6.dataList,
          loading = _state6.loading,
          noOne = _state6.noOne,
          pullY = _state6.pullY,
          animate = _state6.animate,
          overflow = _state6.overflow,
          hideHeight = _state6.hideHeight,
          bottom = _state6.bottom;
      var listItem = props.listItem,
          loadingComponent = props.loadingComponent,
          firstLoadingComponent = props.firstLoadingComponent,
          noOneComponent = props.noOneComponent,
          topComponent = props.topComponent,
          _props$className = props.className,
          className = _props$className === undefined ? '' : _props$className;

      var statusText = [_react2.default.createElement(LoadingP, { txt: '松手加载' }), _react2.default.createElement(LoadingP, { txt: '松手加载' }), _react2.default.createElement(LoadingMore, null), _react2.default.createElement(LoadingP, { txt: '无更多' })]; // 文字对应状态

      return _react2.default.createElement(
        'div',
        { className: 'wrap ' + className },
        _react2.default.createElement(
          'div',
          {
            className: 'list ',
            style: {
              WebkitTransform: 'translateY(' + (hideHeight ? 0 : pullY) + 'rem)',
              WebkitTransition: '' + animate,
              overflowY: '' + overflow,
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch'
            },
            onScroll: function onScroll(e) {
              return _this4.handleScroll(e.target);
            },
            onTouchStart: function onTouchStart(e) {
              return _this4.handleTouchStar(e);
            },
            onTouchMove: function onTouchMove(e) {
              return _this4.handleTouchMove(e);
            },
            onTouchEnd: function onTouchEnd(e) {
              return _this4.handleTouchEnd(e);
            }
          },
          topComponent && _react2.default.cloneElement(topComponent),
          dataList.map(function (o, i) {
            return _react2.default.cloneElement(listItem, { data: o, key: i });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'statusDiv',
            style: {
              WebkitTransform: 'translateY(' + pullY + 'rem)',
              WebkitTransition: '' + animate
            }
          },
          status && status == 2 ? loadingComponent ? _react2.default.cloneElement(loadingComponent) : statusText[status] : statusText[status]
        ),
        _react2.default.createElement(
          'div',
          { className: 'noOne', style: noOne ? { 'display': 'block' } : { 'display': 'none' } },
          noOne && noOneComponent ? _react2.default.cloneElement(noOneComponent) : _react2.default.createElement(
            'p',
            { style: { "height": "1rem", "lineHeight": "1rem", 'textAlign': 'center' } },
            '\u6682\u65E0\u6570\u636E'
          )
        )
      );
    }
  }]);

  return Listview;
}(_react.Component);
// <div className="listopMask" style={loading?{'display':'block'}:{'display':'none'}} >
//   {loading && firstLoadingComponent ? React.cloneElement(firstLoadingComponent):(<div className="listmaskLoadingBox"><img src={img_loading} alt="" /></div>)}
// </div>

Listview.defaultProps = {
  toBottom: 0.8,
  offset: 0,
  limit: 20,
  scaleY: 0.005
};
Listview.propTypes = {
  toBottom: _react.PropTypes.number, //loading组件高度
  limit: _react.PropTypes.number, //单次限量
  offset: _react.PropTypes.number, //初始页乘以单词限量
  onFetch: _react.PropTypes.func, //增量函数
  fetchData: _react.PropTypes.object, //增量函数可能需要的其他参数
  //firstLoadingComponent: PropTypes.node, // 首次加载中显示的组件
  loadingComponent: _react.PropTypes.node, // 加载中显示的组件
  noOneComponent: _react.PropTypes.node, // 无数据显示的组件
  listItem: _react.PropTypes.node, // list中显示的组件
  topComponent: _react.PropTypes.node // list中显示的组件
};
exports.default = Listview;
var LoadingMore = function LoadingMore() {
  return _react2.default.createElement(
    'div',
    { className: 'spinner' },
    _react2.default.createElement('div', { className: 'bounce1' }),
    _react2.default.createElement('div', { className: 'bounce2' }),
    _react2.default.createElement('div', { className: 'bounce3' })
  );
};
var LoadingP = function LoadingP(_ref) {
  var txt = _ref.txt;
  return _react2.default.createElement(
    'p',
    { style: { "height": "0.8rem", "lineHeight": "0.8rem", 'textAlign': 'center' } },
    txt
  );
};