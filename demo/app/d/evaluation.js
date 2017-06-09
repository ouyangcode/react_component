import React from 'react'
import { List } from 'antd-mobile'
import { Evaluation, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const EvaluationDemo = () => {
  let randoms = Math.random().toFixed(2)*100
  return (
    <Item arrow='horizontal' onClick={ () =>
      Mask(
        <SlidePage target='right' type='root' >
          <div>
            <div>0</div>
            <Evaluation defaultValue={ '0%' } width={ '300px' } />
            <div>33%</div>
            <Evaluation defaultValue={ '33%' } width={ '300px' } />
            <div>50%</div>
            <Evaluation defaultValue={ '50%' } width={ '300px' } />
            <div>75%</div>
            <Evaluation defaultValue={ '75%' } width={ '300px' } />
            <div>100%</div>
            <Evaluation defaultValue={ '100%' } width={ '300px' } />
            <div>随机数:{ randoms }%</div>
            <Evaluation defaultValue={  randoms+ '%' } width={ '300px' } />
          </div>
        </SlidePage>
        , { mask: false }
      )
    }>
      星级评价
    </Item>
  )
}
