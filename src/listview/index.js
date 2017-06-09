
import React, {Component, PropTypes} from 'react';

import "./style/index.scss"

import img_loading from './img/cc.gif'
import Loading from '../loading'
let startY;

export default class Listview extends Component {
  static defaultProps = {
    toBottom: 0.8,
    offset:0,
    limit:20,
    scaleY:0.005
  };

  // props
  static propTypes = {
    toBottom: PropTypes.number,//loading组件高度
    limit : PropTypes.number,//单次限量
    offset: PropTypes.number,//初始页乘以单词限量
    onFetch: PropTypes.func,//增量函数
    fetchData: PropTypes.object,//增量函数可能需要的其他参数
    //firstLoadingComponent: PropTypes.node, // 首次加载中显示的组件
    loadingComponent: PropTypes.node, // 加载中显示的组件
    noOneComponent: PropTypes.node, // 无数据显示的组件
    listItem: PropTypes.node, // list中显示的组件
    topComponent: PropTypes.node // list中显示的组件
  };


  constructor(props) {
    super(props);
    this.state = {
      status  : 0,                // 当前状态
      pullY   : 0,                //上拉距离
      canPull : false,            //可否上拉
      noOne   : false,            //无数据
      // loading : true,             //第一次拉取loading
      offset  : this.props.offset,//加载量
      fetchData: this.props.fetchData,
      dataList: [],               // 数据列表
      animate:"",
      overflow:'auto',
      hideHeight:0
    };
  }



  componentWillMount() {
    //第一次拉取
    let handleClose = Loading()
    this.handleFetch(0,handleClose)
  }

  handleFetch(s, handleClose) {
    const { dataList, animate, fetchData = {}, offset } = this.state
    const { onFetch, limit, toBottom } = this.props
    this.setState({
      status: s
    })

    onFetch && onFetch(limit, offset, fetchData, data => {
      handleClose && handleClose()
      if(offset == 0 && data.length == 0 ){
          this.setState({
            status: 0,
            noOne : true,
          });
      }else if(offset == 0 && data.length < limit){
          this.setState({
            dataList: [...data],
            status: 0,
            canPull:false
          });
      }else if(offset == 0 && data.length == limit){
          this.setState({
            dataList: [...data],
            status: 0,
            canPull:false
          });
      }else if(data.length > 0){
          const sT = document.querySelector('.list').scrollTop
          this.setState({
            dataList: [...dataList,...data],
            hideHeight: toBottom
          });
          document.querySelector('.list').scrollTop = sT + (toBottom* parseFloat(window.document.documentElement.style.fontSize, 10))

          setTimeout(()=>this.setState({
            pullY:0,
            hideHeight: 0,
            animate:'all 0.2s ease-in 0s',
            canPull:false
          }),600);
      }else{
          this.setState({
            status: 3,
          });
          setTimeout(()=>this.setState({
            pullY:0,
            animate:'all 0.2s ease-in 0s',
            canPull:true
          }),600);
      }

    })

  }

  handleScroll(o) {

    let { status, canPull } = this.state;
    let { toBottom, onFetch, limit, offset } = this.props;
    const { scrollTop, offsetHeight, scrollHeight } = o
    // 当距离底部toBottom距离，触发onScrollToBottom
    if (((scrollTop + offsetHeight) == scrollHeight) && (status == 1 || status == 0)) {
        this.setState({
          canPull : true
        });
    }
    else if(canPull){
        this.setState({
          canPull : false
        });
    }
  }

  handleTouchStar(e){
    let { canPull, animate } = this.state;
    this.setState({
      animate:'',
      status: 1,
      pullY:0,
    });
    if(canPull){
      startY = e.touches ? e.touches[0].screenY : e.screenY;
    }
  }


  handleTouchMove(e) {
    let { pullY, canPull } = this.state;
    if(canPull){
      let { scaleY } = this.props;
      const eTouchScreenY = e.touches ? e.touches[0].screenY : e.screenY;

      let distance = (eTouchScreenY - startY) * scaleY; // 用scaleY对pull的距离进行缩放
      if(distance < 0) {
        e.preventDefault()
      }
      distance = (distance>0)?(distance*3 + pullY):(distance + pullY)

      if(distance < 0){
          this.setState({
            overflow : 'hidden',
            pullY : distance
          });
      }
      startY = eTouchScreenY
    }
  }
  handleTouchEnd(e){
    let { pullY, canPull,animate } = this.state;
    let { toBottom } = this.props;
    if(canPull){
      if( toBottom*(-1) > pullY){
        this.setState({
          overflow:'auto',
          pullY:toBottom*(-1),
          animate:'',
          canPull:false
        });
        this.handleFetch(2)
      }else{
        this.setState({
          overflow:'auto',
          pullY:0,
          animate:'all 0.2s ease-in 0s'
        });
      }
    }
  }


  componentWillReceiveProps(nextProps) {
    //重置
    const { offset, fetchData } = nextProps
    if(0 === offset) {
      let handleClose = Loading()
      this.setState({ dataList: [] }, () => {
        this.handleFetch(0, handleClose)
      })
    }
    this.setState({ offset,
                    fetchData ,
                    status  : 0,
                    pullY   : 0,
                    canPull : false,
                    noOne   : false,
                    animate:"",
                    overflow:'auto',
                    hideHeight:0
                  })
  }


  render() {
    const { props, state: { status, dataList,loading, noOne, pullY, animate, overflow, hideHeight, bottom } } = this;
    const { listItem, loadingComponent, firstLoadingComponent, noOneComponent, topComponent, className='' } = props;
    const statusText = [<LoadingP txt={'松手加载'} />, <LoadingP txt={'松手加载'} />, <LoadingMore />, <LoadingP txt={'无更多'} />] // 文字对应状态

    return (
      <div className={ 'wrap '+ className } >
          <div
            className={ 'list '}
            style={{
              WebkitTransform : `translateY(${hideHeight?0:pullY}rem)`,
              WebkitTransition : `${animate}`,
              overflowY:`${overflow}`,
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
             }}
            onScroll  =  { e => this.handleScroll(e.target) }
            onTouchStart={ e => this.handleTouchStar(e) }
            onTouchMove={ e => this.handleTouchMove(e) }
            onTouchEnd = { e => this.handleTouchEnd(e) }
            >
            {
              topComponent && React.cloneElement(topComponent)
            }
            {
              dataList.map((o, i) => React.cloneElement(listItem, { data: o, key: i }))
            }
          </div>

          <div className="statusDiv"
            style={{
               WebkitTransform : `translateY(${ pullY }rem)`,
               WebkitTransition : `${ animate }`,
             }}
             >
            {status && status==2 ?(loadingComponent ? React.cloneElement(loadingComponent) : statusText[status]):statusText[status] }
          </div>


          <div className="noOne" style={noOne?{'display':'block'}:{'display':'none'}} >
            {noOne && noOneComponent ? React.cloneElement(noOneComponent):(<p style={{"height":"1rem","lineHeight":"1rem",'textAlign':'center'}}>暂无数据</p>)}
          </div>
      </div>
    )
  }
}
// <div className="listopMask" style={loading?{'display':'block'}:{'display':'none'}} >
//   {loading && firstLoadingComponent ? React.cloneElement(firstLoadingComponent):(<div className="listmaskLoadingBox"><img src={img_loading} alt="" /></div>)}
// </div>

const LoadingMore = () => (
  <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
)
const LoadingP = ({txt}) => (
  <p  style={{"height":"0.8rem","lineHeight":"0.8rem",'textAlign':'center'}}>{txt}</p>
)
