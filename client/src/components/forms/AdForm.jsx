import React from 'react'

const AdForm = ({ action, type }) => {
  return (
    <div>
      <p>Thi is ad create form</p>
      {action} / {type}
    </div>
  )
}

export default AdForm
