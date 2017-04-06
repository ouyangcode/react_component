//加载服务样式
// import './style/index.scss'
//加载全局公共样式
import '../../styles/index.scss'

import React      from 'react'
import { render } from 'react-dom'
import Root       from './root'

var FastClick = require('../../fastclick.js');
FastClick.attach(document.body);

render(<Root />, document.querySelector('#root'))
