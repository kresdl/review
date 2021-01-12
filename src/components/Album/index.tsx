import React, { useState } from 'react'
import Header from './Header'
import Photos from './Photos'

const Album: React.FC = () => {
  const [deleteMode, setDeleteMode] = useState(false)

  return (
    <>
      <Header setDeleteMode={setDeleteMode} />
      <Photos deleteMode={deleteMode} />
    </>
  )
}

export default Album