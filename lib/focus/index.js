'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ua = navigator.userAgent;
var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
var dpr = window.devicePixelRatio || 1;
if (isIos || !(matches && matches[1] > 534) && !isUCHd) {
  // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
  dpr = 1;
}

var startX = void 0,
    movedX = void 0;

var Focus = function (_Component) {
  _inherits(Focus, _Component);

  function Focus(props) {
    _classCallCheck(this, Focus);

    var _this = _possibleConstructorReturn(this, (Focus.__proto__ || Object.getPrototypeOf(Focus)).call(this, props));

    _this.state = {
      animate: "",
      currentIndex: props.initNum
    };
    _this.pullX = 0;
    _this.focusContainer = null;
    return _this;
  }

  // props


  _createClass(Focus, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          imgTruewidth = _props.imgTruewidth,
          imgMarginwidth = _props.imgMarginwidth,
          initNum = _props.initNum,
          onChange = _props.onChange,
          dataList = _props.dataList;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      onChange && onChange(dataList[initNum]);
      this.setState({
        animate: "transform 0.2s ease-in 0s"
      });
      this.pullX = initNum * imgWidth * -1;
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      startX = e.touches ? e.touches[0].screenX : e.screenX;
      movedX = e.touches ? e.touches[0].screenX : e.screenX;
      this.setState({
        animate: ""
      });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      e.preventDefault();
      var pullX = this.pullX;
      var _props2 = this.props,
          imgTruewidth = _props2.imgTruewidth,
          imgMarginwidth = _props2.imgMarginwidth,
          scaleX = _props2.scaleX,
          dataList = _props2.dataList;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      var moveX = e.touches ? e.touches[0].screenX : e.screenX;
      var distance = (moveX - movedX) / scaleX + pullX;
      if (distance > (dataList.length - 1) * imgWidth * -1 && distance < 0) {
        this.pullX = distance;
        this.focusContainer.style.WebkitTransform = 'translateX(' + this.pullX + 'rem)';
      }
      movedX = moveX;
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      var pullX = this.pullX;
      var _props3 = this.props,
          imgTruewidth = _props3.imgTruewidth,
          imgMarginwidth = _props3.imgMarginwidth,
          onChange = _props3.onChange,
          scaleX = _props3.scaleX,
          dataList = _props3.dataList;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      var endpullX = Math.abs(pullX) % imgWidth > imgWidth / 2 ? Math.ceil(Math.abs(pullX) / imgWidth) : endpullX = Math.floor(Math.abs(pullX) / imgWidth);

      var boolDist = (movedX - startX) / scaleX;
      if (startX !== movedX ? Math.abs(boolDist) > imgWidth / 2 ? true : false : false) {
        onChange && onChange(dataList[endpullX]);
      }
      this.setState({
        currentIndex: endpullX,
        animate: "transform 0.2s ease-in 0s"
      });
      this.pullX = endpullX * imgWidth * -1, this.focusContainer.style.WebkitTransform = 'translateX(' + this.pullX + 'rem)';
    }
  }, {
    key: 'handleClick',
    value: function handleClick(o, i) {
      var pullX = this.pullX;
      var _props4 = this.props,
          imgTruewidth = _props4.imgTruewidth,
          imgMarginwidth = _props4.imgMarginwidth,
          onChange = _props4.onChange;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      if (pullX !== i * imgWidth * -1) {
        onChange && onChange(o);
      }
      this.setState({
        currentIndex: i,
        animate: "transform 0.2s ease-in 0s"
      });
      this.pullX = i * imgWidth * -1, this.focusContainer.style.WebkitTransform = 'translateX(' + this.pullX + 'rem)';
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dataList !== this.props.dataList) {
        var initNum = nextProps.initNum ? nextProps.initNum : 0;
        nextProps.onChange && nextProps.onChange(nextProps.dataList[initNum]);
        this.setState({
          currentIndex: initNum
        });
        var _props5 = this.props,
            imgTruewidth = _props5.imgTruewidth,
            imgMarginwidth = _props5.imgMarginwidth;

        var imgWidth = imgTruewidth + imgMarginwidth * 2;
        this.pullX = initNum * imgWidth * -1;
        this.focusContainer.style.WebkitTransform = 'translateX(' + this.pullX + 'rem)';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          animate = _state.animate,
          _state$currentIndex = _state.currentIndex,
          currentIndex = _state$currentIndex === undefined ? 0 : _state$currentIndex,
          pullX = _state.pullX;
      var _props6 = this.props,
          dataList = _props6.dataList,
          imgTruewidth = _props6.imgTruewidth,
          imgMarginwidth = _props6.imgMarginwidth,
          style = _props6.style;


      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      var picList = dataList.map(function (o, i) {
        return _react2.default.createElement(
          'span',
          { style: {
              width: imgTruewidth + 'rem',
              height: '2.47rem',
              display: 'inline-block',
              margin: '0 ' + imgMarginwidth + 'rem',
              border: '1px solid #fff',
              boxSizing: 'border-box',
              WebkitTransformOrigin: 'center bottom',
              WebkitTransform: 'scale(' + (currentIndex === i ? 1.1 : 1) + ')'
            },
            key: i,
            onClick: function onClick() {
              return _this2.handleClick(o, i);
            } },
          _react2.default.createElement('img', { style: {
              width: '100%',
              height: '100%'
            },
            src: o.pic })
        );
      });
      return _react2.default.createElement(
        'div',
        {
          style: _extends({
            width: '100%',
            overflowX: 'hidden',
            paddingTop: '0.3rem'
          }, style) },
        _react2.default.createElement(
          'p',
          {
            className: 'imgWrap',
            style: {
              width: 'calc(100%  + ' + (dataList.length - 1) * imgWidth + 'rem )',
              height: '2.5rem',
              WebkitTransition: '' + animate,
              whiteSpace: 'nowrap',
              paddingLeft: 'calc(50% - ' + imgWidth / 2 + 'rem )',
              paddingRight: 'calc(50% - ' + imgWidth / 2 + 'rem )',
              boxSizing: 'border-box',
              overflow: 'visible',
              perspective: '1px'
            },
            onTouchStart: function onTouchStart(e) {
              return _this2.handleTouchStart(e);
            },
            onTouchMove: function onTouchMove(e) {
              return _this2.handleTouchMove(e);
            },
            onTouchEnd: function onTouchEnd(e) {
              return _this2.handleTouchEnd(e);
            },
            ref: function ref(node) {
              if (node) {
                _this2.focusContainer = node;
                _this2.focusContainer.style.WebkitTransform = 'translateX(' + _this2.pullX + 'rem)';
              }
            }
          },
          picList
        )
      );
    }
  }]);

  return Focus;
}(_react.Component);

Focus.defaultProps = {
  imgTruewidth: 1.8,
  imgMarginwidth: 0.18,
  initNum: 0,
  scaleX: parseFloat(window.document.documentElement.style.fontSize, 10) / dpr,
  dataList: []
};
Focus.propTypes = {
  imgTruewidth: _react.PropTypes.number, //图片实际宽度
  imgMarginwidth: _react.PropTypes.number, //图片左\右边距
  onChange: _react.PropTypes.func, //图片改变时
  dataList: _react.PropTypes.array };
exports.default = Focus;