'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var startX = void 0,
    movedX = void 0;

var Focus = function (_Component) {
  _inherits(Focus, _Component);

  function Focus(props) {
    _classCallCheck(this, Focus);

    var _this = _possibleConstructorReturn(this, (Focus.__proto__ || Object.getPrototypeOf(Focus)).call(this, props));

    _this.state = {
      pullX: 0,
      animate: ""
    };
    return _this;
  }

  // props


  _createClass(Focus, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var pullX = this.state.pullX;
      var _props = this.props,
          imgTruewidth = _props.imgTruewidth,
          imgMarginwidth = _props.imgMarginwidth,
          initNum = _props.initNum,
          onChange = _props.onChange,
          dataList = _props.dataList;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      onChange && onChange(dataList[initNum]);
      this.setState({
        pullX: initNum * imgWidth * -1,
        animate: "all 0.2s ease-in 0s"
      });
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
      var pullX = this.state.pullX;
      var _props2 = this.props,
          imgTruewidth = _props2.imgTruewidth,
          imgMarginwidth = _props2.imgMarginwidth,
          scaleX = _props2.scaleX,
          dataList = _props2.dataList;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      var moveX = e.touches ? e.touches[0].screenX : e.screenX;
      var distance = (moveX - movedX) / scaleX + pullX;
      if (distance > (dataList.length - 1) * imgWidth * -1 && distance < 0) {
        this.setState({
          pullX: distance
        });
      }
      movedX = moveX;
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      var pullX = this.state.pullX;
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
        pullX: endpullX * imgWidth * -1,
        animate: "all 0.2s ease-in 0s"
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(o, i) {
      var pullX = this.state.pullX;
      var _props4 = this.props,
          imgTruewidth = _props4.imgTruewidth,
          imgMarginwidth = _props4.imgMarginwidth,
          onChange = _props4.onChange;

      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      if (pullX !== i * imgWidth * -1) {
        onChange && onChange(o);
      }
      this.setState({
        pullX: i * imgWidth * -1,
        animate: "all 0.2s ease-in 0s"
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dataList !== this.props.dataList) {
        var initNum = nextProps.initNum ? nextProps.initNum : 0;
        nextProps.onChange && nextProps.onChange(nextProps.dataList[initNum]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          pullX = _state.pullX,
          animate = _state.animate;
      var _props5 = this.props,
          dataList = _props5.dataList,
          imgTruewidth = _props5.imgTruewidth,
          imgMarginwidth = _props5.imgMarginwidth;


      var imgWidth = imgTruewidth + imgMarginwidth * 2;
      var picList = dataList.map(function (o, i) {
        return _react2.default.createElement('img', { style: { width: imgTruewidth + 'rem', margin: '0 ' + imgMarginwidth + 'rem' }, src: o.pic, key: i, onClick: function onClick() {
            return _this2.handleClick(o, i);
          } });
      });
      return _react2.default.createElement(
        'div',
        {
          style: {
            width: '100%',
            overflow: 'hidden'
          } },
        _react2.default.createElement(
          'p',
          {
            className: 'imgWrap',
            style: {
              width: 'calc(100%  + ' + (dataList.length - 1) * imgWidth + 'rem )',
              WebkitTransform: 'translateX(' + pullX + 'rem)',
              WebkitTransition: '' + animate,
              whiteSpace: 'nowrap',
              paddingLeft: 'calc(50% - ' + imgWidth / 2 + 'rem )',
              paddingRight: 'calc(50% - ' + imgWidth / 2 + 'rem )',
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
  scaleX: parseFloat(window.document.documentElement.style.fontSize, 10),
  dataList: []
};
Focus.propTypes = {
  imgTruewidth: _react.PropTypes.number, //图片实际宽度
  imgMarginwidth: _react.PropTypes.number, //图片左\右边距
  onChange: _react.PropTypes.func, //图片改变时
  dataList: _react.PropTypes.array };
exports.default = Focus;