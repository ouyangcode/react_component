
'use strict';
import React, {Component} from 'react';
import { Icon } from 'antd-mobile'
import { render } from 'react-dom';
import { get, setStore, getStore } from '@boluome/common-lib'
import { Search } from '@boluome/oto_saas_web_app_component'
import Loading from '../loading'
import './style.scss'


export default class CitySearch extends React.Component {
    constructor(props) {
        super(props);
        const citySelectedHistory = getStore(`citySelectedHistory_${ this.props.categoryCode }`)
                                  ? getStore(`citySelectedHistory_${ this.props.categoryCode }`).citySelectedHistory
                                  : []
                                  console.log('props1111111', props);
        this.state = {
            citySelectedHistory,
            searchList: [],
            cityList: [],
            searchText: '',
            showCityList: true,  //是否显示城市列表，当显示搜索列表时，隐藏城市列表,城市索引
            localCity: props.localCity.replace(/['省', '市', '区', '县']/, ''),
            localInList: ''
        }
        const getReqData = this.getReqData.bind(this)
        this.chose.bind(this)
        this.handleCityIndexClick = this.handleCityIndexClick.bind(this)
    }
    componentDidMount() {
      this.getReqData()
    }

    getReqData(){
      const {api} = this.props;
      if(typeof(api) == 'string'){
        const handleClose = Loading()
        get(api).then(({ code, data, message }) => {
          if(code === 0){
            this.getReq(data)
          }
          handleClose()
        }).catch(err => handleClose())
      }
      if(Array.isArray(api)){ //当传入的api是数据是对象形式或是
        this.getReq(api)
      }
    }
    render() {
      let { localInList, localCity, showCityList, formatCityList, citySelectedHistory, cityList } = this.state
      const { showCancel = true } = this.props
      if(!localInList.name){    //当城市列表中没有当前城市，仅使用定位城市名作为返回的定位地址
        localInList = {name: localCity}
      }


      // 搜索请求通过组件方式传入
      const search = (searchKey, cb) => {
        const handleLoadingClose = Loading()
        if(searchKey){
          let cityList = [];
          for (let i = 0; i < this.state.cityList.length; i++) {  //遍历请求回的城市信息
            if (this.state.cityList[i].name.indexOf(searchKey) > -1 || this.state.cityList[i].py.indexOf(searchKey) == 0) { //当搜索框内容符合城市名的汉字或拼音时，将当前城市保存到搜索到的城市列表中
              cityList.push(this.state.cityList[i]);
            }
          }
          cb(null, cityList)
          handleLoadingClose()
        } else {
          cb('searchKey is undefined')
        }
      }

      const ListItem = (list, index, searchKey) => {
        const result = list.data
        return (
          <p className = 'city-search-results-item'>{result.name || result}</p>
        )
      }



      const Content = () => {
        let cityIndex = []
        return (
          <div className='citySearch'>
            <div className='cityLeft'>
              <div className='local-city' id='cityLocation'>
                <span>定位</span>
                <p onClick = {() => this.chose(localInList)}>{ localInList.name }</p>
                {
                  ['1'].map((item) => {
                    cityIndex.push('Location')
                  })
                }
              </div>
              {
                citySelectedHistory.length > 0 ?
                (<div key='city-key-citySelectedHistory' style={{ display: showCityList ? 'block' : 'none' }} id='cityHistory' className='cityContainer'>
                    <div className='cityKey'>
                    <span>历史</span></div>
                    <ul>
                      {
                        ['1'].map((item) => {
                          cityIndex.push('History')
                        })
                      }
                      {
                        citySelectedHistory.map((city, idx) => (
                          <li style={ (idx + 1) % 3 === 0 ? { marginRight: '0' } : {}  } key={ `city-${ idx }` } onClick={ () => this.chose(city) } >
                            { city.name }
                          </li>
                        ))
                      }
                    </ul>
                </div>)
                : ''
              }
              { cityList.length > 0
                ? (
                  <div className = 'cityList' style={{ display: showCityList ? 'block' : 'none' }}>
                    {
                      formatCityList.map(({ key, data }, idx) => {
                        cityIndex.push(key)
                        const letter = key
                        return (
                          <div key={ `city-key-${ idx }` } id={ `city${ letter }` } className='cityContainer'>
                            <div className='cityKey'>
                            <span>{ letter }</span></div>
                            <ul>
                              {
                                data.map((city, idx) => (
                                  <li style={ (idx + 1) % 3 === 0 ? { marginRight: '0' } : {}  } key={ `city-${ idx }` } onClick={ () => this.chose(city) } >
                                    { city.name }
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        )
                      })
                    }
                   </div>
                )
                : ''
              }
            </div>
            <ul className='cityIndex' style={{ display: showCityList ? 'block' : 'none' }}>
              { cityIndex.map( (item, index) => {
                return (
                <li key={ index }>
                    <span onClick={ () => this.handleCityIndexClick(item) }>{ item==='Location' ? '定位' : item==='History' ? '历史' : item }</span>
                </li>
              )}) }
            </ul>
          </div>)}

      const Cancel = () => {
        const { handleContainerClose } = this.props
        return (
          <span className='cancel' onClick={ () =>  handleContainerClose()  }>取消</span>
        )
      }

      return (
        <Search
           inputPlaceholder={ '请输入搜索内容' }
           content={ <Content /> }
           listItem={ <ListItem /> }
           noResult={ <div className='no-result'><p>没有结果</p></div> }
           onFeach = { search }
           handleResult={ result => this.chose(result) }
           timing={ 0 }
           rightComponent={ showCancel && <Cancel /> }
         />
      )
    }

    handleCityIndexClick(cityIndex) {
      document.getElementById(`city${ cityIndex }`).scrollIntoView()
    }

    chose(result) {
      const { handleCityData, handleContainerClose } = this.props;
      document.getElementById('searchInput').value = '';
      this.search();
      this.setCityHistory(result)
      handleCityData(result);
      if(handleContainerClose){
        handleContainerClose()
      }
    }

    setCityHistory(cityObj){  //将当前选择的城市保存到session中
      let citySelectedHistory = this.state.citySelectedHistory
      citySelectedHistory = citySelectedHistory.filter( item => item.name != cityObj.name )
      citySelectedHistory.unshift(cityObj)
      setStore(`citySelectedHistory_${ this.props.categoryCode }`, { citySelectedHistory : citySelectedHistory })
    }

    getReq (data) {
        // 将返回的城市列表中的每个城市信息对象中的键名都改成{name: , py: , id: }的形式
        let reply = []
        let index = 0
        let mapedData = data.reduce((nameMap, current) => {
          //获取拼音
          let { py } = current
          //取拼音中的第一个并转成大写字母
          let char = py.substr(0, 1).toUpperCase()
          //如果nameMap中有就往数组里添加一个
          if(nameMap[char]) {
            nameMap[char].push(current)
          }
          //如果nameMap中没有就新建一个数组
          else {
            nameMap[char] = [ current ]
          }
          return nameMap
        }, {})
        //mapedData格式： { A: [{ name:'上海', py: 'shanghai' }], B: [...] }

        //转换mapedData
        for(let k in mapedData) {
          reply[index++] = {
            key : k,
            data: mapedData[k]
          }
        }

        // 对reply会的城市名，按a, b, c, d, 进行排序
        reply.sort((a, b) => a.key.charCodeAt(0) - b.key.charCodeAt(0))

        //reply格式： [{ key: 'A', data: [{ name:'上海', py: 'shanghai' }] }, ...]
        // 遍历请求回的城市列表，将定位城市改变对应的城市对象
        const cityName = this.state.localCity
        let cityObj = {}
        data.forEach((item) => {
          if(cityName == item.name){
            cityObj = item
            return
          }
        })
        this.setState({
            cityList: data,
            formatCityList: reply,
            localInList: cityObj
        });
    }
    search() {  //定义搜索事件
        let val = document.getElementById('searchInput').value, t = this;
        if (val === '') {
            return this.setState({searchList: [], searchText: val, showCityList: true});
        }
        let cityList = [];
        for (let i = 0; i < this.state.cityList.length; i++) {  //遍历请求回的城市信息
            if (this.state.cityList[i].name.indexOf(val) > -1 || this.state.cityList[i].py.indexOf(val) == 0) { //当搜索框内容符合城市名的汉字或拼音时，将当前城市保存到搜索到的城市列表中
                cityList.push(this.state.cityList[i]);
            }
        }
        this.setState({
            searchList: cityList,
            searchText: val,
            showCityList: false
        });
    }
};
