import React from 'react'
import { List, Icon } from 'antd-mobile'
import { getStore, setStore } from '@boluome/common-lib'
import { AddressSearch, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const AddressSearchDemo = () => {
  const point = getStore('geopoint') || mockPoint

  const handleSuccess = local => {
    const { point } = local
    console.log(local)
    setStore('geopoint', { longitude: point.lng, latitude: point.lat  }, 'session')
  }

  return (
    <Item arrow='horizontal' onClick={ () =>
        Mask(
          <SlidePage target='right' >
            <AddressSearch { ...point } onSuccess={ handleSuccess }/>
          </SlidePage>
        , { mask: false, style: { position: 'absolute' } })
      } >
      地址搜索
    </Item>
  )
}

const mockPoint = {
  longitude: "121.48789949",
  latitude : "31.24916171"
}
