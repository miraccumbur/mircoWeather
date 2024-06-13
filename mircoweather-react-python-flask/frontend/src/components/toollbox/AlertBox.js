import React from 'react'

function AlertBox({data}) {
  return (
    <p className={data.class}>{data.message}</p>
  )
}

export default AlertBox