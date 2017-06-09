'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css2 = require('antd-mobile/lib/white-space/style/css');

var _whiteSpace = require('antd-mobile/lib/white-space');

var _whiteSpace2 = _interopRequireDefault(_whiteSpace);

var _clone = require('ramda/src/clone');

var _clone2 = _interopRequireDefault(_clone);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _send = require('@boluome/common-lib/lib/send');

var _send2 = _interopRequireDefault(_send);

var _get = require('@boluome/common-lib/lib/get');

var _get2 = _interopRequireDefault(_get);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _css3 = require('antd-mobile/lib/modal/style/css');

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css4 = require('antd-mobile/lib/flex/style/css');

var _flex = require('antd-mobile/lib/flex');

var _flex2 = _interopRequireDefault(_flex);

var _css5 = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oto_saas_web_app_component = require('@boluome/oto_saas_web_app_component');

var _slidePage = require('../slide-page');

var _slidePage2 = _interopRequireDefault(_slidePage);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

var _contactForm = require('../contact-form');

var _contactForm2 = _interopRequireDefault(_contactForm);

var _ic_add = require('./img/ic_add.png');

var _ic_add2 = _interopRequireDefault(_ic_add);

var _ic_gou = require('./img/ic_gou.png');

var _ic_gou2 = _interopRequireDefault(_ic_gou);

var _ic_suc = require('./img/ic_suc.svg');

var _ic_suc2 = _interopRequireDefault(_ic_suc);

var _ic_delete = require('./img/ic_delete.svg');

var _ic_delete2 = _interopRequireDefault(_ic_delete);

var _ic_edit = require('./img/ic_edit.svg');

var _ic_edit2 = _interopRequireDefault(_ic_edit);

var _ic_noChoose = require('./img/ic_noChoose.svg');

var _ic_noChoose2 = _interopRequireDefault(_ic_noChoose);

var _ic_set = require('./img/ic_set.svg');

var _ic_set2 = _interopRequireDefault(_ic_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = _list2.default.Item;
var FlexItem = _flex2.default.Item;
var alert = _modal2.default.alert;

var Tourist = function (_Component) {
  _inherits(Tourist, _Component);

  function Tourist(props) {
    _classCallCheck(this, Tourist);

    var _this = _possibleConstructorReturn(this, (Tourist.__proto__ || Object.getPrototypeOf(Tourist)).call(this, props));

    _this.state = {
      contactList: [],
      bContactFormShow: false,
      editContact: {},
      userId: (0, _getStore2.default)('customerUserId', 'session')
    };
    return _this;
  }

  _createClass(Tourist, [{
    key: 'fetchContact',
    value: function fetchContact() {
      var _this2 = this;

      var handleClose = (0, _loading2.default)();

      var userId = (0, _getStore2.default)('customerUserId', 'session');console.log('userId---', userId);
      (0, _get2.default)('/user/v1/identities', { userId: userId }).then(function (_ref) {
        var code = _ref.code,
            data = _ref.data,
            message = _ref.message;

        // code = 0
        // data = [{"name":"tst","phone":"13812345678","gender":0,"longitude":121.48789949,"latitude":31.24916171,"province":"上海市","provinceId":"310000","city":"上海市","cityId":"310000","county":"闸北区","countyId":"310108","address":"新荟城","detail":"上海市闵行区莲花南路1388号","isDefault":0,"tag":"","status":0,"contactId":"1483087753105","userId":"blm_test"}]
        if (code === 0) {
          console.log('data----', data);
          _this2.setState({
            contactList: data
          });
        }
        handleClose();
      });
    }
  }, {
    key: 'handleToggleContactForm',
    value: function handleToggleContactForm(editContact) {
      // console.log(contact)
      (0, _mask2.default)(_react2.default.createElement(
        _slidePage2.default,
        { target: 'right', type: 'root' },
        _react2.default.createElement(_oto_saas_web_app_component.AddTourist, _extends({ editContact: editContact }, { onSuccess: this.handleFormSuccess.bind(this) }))
      ), { mask: false });
      // this.setState({ bContactFormShow: bShow, editContact: contact })
    }
  }, {
    key: 'handleDeleteContact',
    value: function handleDeleteContact(contact) {
      var _this3 = this;

      alert('删除', '确定删除么?', [{ text: '取消', onPress: function onPress() {
          return console.log('cancel');
        } }, { text: '确定', onPress: function onPress() {
          var identityId = contact.identityId,
              userId = contact.userId;
          console.log(contact);
          var handleClose = (0, _loading2.default)();
          (0, _send2.default)('/user/v1/identity', { identityId: identityId, userId: userId }, 'delete').then(function (_ref2) {
            var code = _ref2.code,
                data = _ref2.data,
                message = _ref2.message;

            if (code === 0) {
              _this3.fetchContact();
            }
            handleClose();
          });
        }, style: { fontWeight: 'bold' } }]);
    }
  }, {
    key: 'handleFormSuccess',
    value: function handleFormSuccess() {
      this.fetchContact();
    }
  }, {
    key: 'handleSetContact',
    value: function handleSetContact(contact) {
      var _this4 = this;

      // 这里是设置默认地址
      (0, _send2.default)('/user/v1/identity', (0, _merge2.default)((0, _clone2.default)(contact), { isDefault: 1 }), 'put').then(function (_ref3) {
        var code = _ref3.code,
            data = _ref3.data,
            message = _ref3.message;

        if (code === 0) {
          alert('ddd');
          _this4.fetchContact();
        }
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchContact();
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(contact) {
      var _props = this.props,
          handleChange = _props.handleChange,
          handleContainerClose = _props.handleContainerClose;

      handleChange(contact);
      handleContainerClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          loading = _state.loading,
          bContactFormShow = _state.bContactFormShow,
          contactList = _state.contactList,
          editContact = _state.editContact,
          handleDefaultChange = _state.handleDefaultChange,
          userId = _state.userId;
      var _props$contact = this.props.contact,
          contact = _props$contact === undefined ? {} : _props$contact;
      var contactId = contact.contactId;
      //console.log('editContact', editContact);

      return _react2.default.createElement(
        'div',
        { className: 'contact-list' },
        _react2.default.createElement(
          _list2.default,
          null,
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement(
              'div',
              { className: 'tcenter black font-x' },
              '\u9009\u62E9\u5E38\u7528\u65C5\u5BA2'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'touch-layer', style: { height: 'calc(100% - 1.9rem)' } },
          contactList.map(function (contact, index) {
            return _react2.default.createElement(
              'div',
              { className: 'listItem', key: 'contact-list-' + index },
              _react2.default.createElement(Contact, _extends({ checked: contact.contactId === contactId }, { index: index, contact: contact }, {
                onChooseContact: function onChooseContact() {
                  return _this5.handleSuccess(contact);
                },
                onDeleteContact: function onDeleteContact() {
                  return _this5.handleDeleteContact(contact);
                },
                onEditContact: function onEditContact() {
                  return _this5.handleToggleContactForm(contact);
                },
                onSetContact: function onSetContact() {
                  return _this5.handleSetContact(contact);
                } }))
            );
          }),
          _react2.default.createElement(_whiteSpace2.default, { size: 'lg' })
        ),
        _react2.default.createElement(
          _list2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'addrNew add-text', onClick: function onClick() {
                return _this5.handleToggleContactForm();
              } },
            '\u65B0\u589E\u5E38\u7528\u65C5\u5BA2'
          )
        )
      );
    }
  }]);

  return Tourist;
}(_react.Component);

exports.default = Tourist;


var Contact = function Contact(_ref4) {
  var contact = _ref4.contact,
      index = _ref4.index,
      checked = _ref4.checked,
      onChooseContact = _ref4.onChooseContact,
      onEditContact = _ref4.onEditContact,
      onDeleteContact = _ref4.onDeleteContact,
      onSetContact = _ref4.onSetContact;
  var name = contact.name,
      id = contact.id,
      phone = contact.phone,
      type = contact.type,
      cardType = contact.cardType,
      idCard = contact.idCard,
      status = contact.status,
      bornDate = contact.bornDate;

  contact.userId = (0, _getStore2.default)('customerUserId', 'session');
  contact.identityId = id;
  console.log('atsss', status);
  return _react2.default.createElement(
    'div',
    { className: 'ListItemWrap' },
    _react2.default.createElement(
      'div',
      { className: 'item', onClick: onChooseContact },
      _react2.default.createElement(
        'div',
        { className: 'info' },
        _react2.default.createElement(
          'span',
          null,
          name
        ),
        _react2.default.createElement(
          'span',
          null,
          phone
        ),
        type == '1' ? _react2.default.createElement(
          'span',
          null,
          type && _react2.default.createElement(
            'span',
            { className: 'tag orange' },
            '\u6210\u4EBA'
          )
        ) : type == '2' ? _react2.default.createElement(
          'span',
          null,
          type && _react2.default.createElement(
            'span',
            { className: 'tag blue' },
            '\u513F\u7AE5'
          )
        ) : type == '3' ? _react2.default.createElement(
          'span',
          null,
          type && _react2.default.createElement(
            'span',
            { className: 'tag green' },
            '\u5A74\u513F'
          )
        ) : ''
      ),
      _react2.default.createElement(_whiteSpace2.default, { size: 'md' }),
      _react2.default.createElement(
        'div',
        { className: 'addr' },
        cardType && _react2.default.createElement(
          'span',
          null,
          cardType
        ),
        idCard && _react2.default.createElement(
          'span',
          null,
          idCard
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'moreBtn' },
      _react2.default.createElement(ContactControl, { onEditContact: onEditContact, onDeleteContact: onDeleteContact, contact: contact, onSetContact: onSetContact })
    )
  );
};

var ContactControl = function ContactControl(_ref5) {
  var onEditContact = _ref5.onEditContact,
      onDeleteContact = _ref5.onDeleteContact,
      contact = _ref5.contact,
      onSetContact = _ref5.onSetContact;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'iconBtn_l', onClick: onSetContact },
      contact.isDefault == '1' ? _react2.default.createElement(_icon2.default, { type: _ic_set2.default, size: 'sm', className: 'gray-4 font-m', style: { margin: '0 .18rem 0 0' } }) : _react2.default.createElement(_icon2.default, { type: _ic_noChoose2.default, size: 'sm', className: 'gray-4 font-m', style: { margin: '0 .18rem 0 0' } }),
      _react2.default.createElement(
        'span',
        { className: 'gray-3 font-m' },
        '\u9ED8\u8BA4\u65C5\u5BA2'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'iconBtn_r' },
      _react2.default.createElement(_icon2.default, { type: _ic_delete2.default, size: 'xxs', className: 'gray-4 font-m' }),
      _react2.default.createElement(
        'span',
        { className: 'gray-3 font-m', style: { margin: '0 .15rem' }, onClick: onDeleteContact },
        '\u5220\u9664'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'iconBtn_r' },
      _react2.default.createElement(_icon2.default, { type: _ic_edit2.default, size: 'xxs', className: 'gray-4 font-m' }),
      _react2.default.createElement(
        'span',
        { className: 'gray-3 font-m', style: { margin: '0 .15rem' }, onClick: onEditContact },
        '\u7F16\u8F91'
      )
    )
  );
};