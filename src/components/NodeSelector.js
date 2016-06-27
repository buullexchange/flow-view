import React, { PropTypes } from 'react'
import ignoreEvent from '../util/ignoreEvent'
import { addNode } from '../actions'

const NodeSelector = ({
  dispatch,
  x, y,
  text,
  show,
  changeText
}) => (
  show ? (
    <foreignObject
      x={x}
      y={y}
      width={120}
      height={20}
      onClick={ignoreEvent}
    >
      <input
        type='text'
        value={text}
        onChange={changeText}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            dispatch(addNode({x, y, text: e.target.value}))
          }
        }}
        ref={(input) => { if (input !== null) input.focus() }}
      />
    </foreignObject>
    )
  : null
)

NodeSelector.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
}

export default NodeSelector
