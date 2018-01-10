import * as React from 'react'
import JSONTree from 'react-json-tree';

const Component = (props: {data: any}) => {
  
  const { data } = props
  const parsedData = JSON.parse(data)
  
  return (
    <div>
      <JSONTree
        data={parsedData}
        />
    </div>
  )
}

export default Component