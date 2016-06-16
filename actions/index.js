export const ADD_NODE = 'ADD_NODE'

export const addNode = (node) => ({
  type: ADD_NODE,
  node
})

export const ADD_LINK = 'ADD_LINK'

export const addLink = (link, previousDraggingPoint) => ({
  type: ADD_LINK,
  link,
  previousDraggingPoint
})

export const DEL_NODE = 'DEL_NODE'

export const delNode = (id) => ({
  type: DEL_NODE,
  id
})

export const DELETE_LINK = 'DELETE_LINK'

export const deleteLink = (id) => ({
  type: DELETE_LINK,
  id
})

export const DRAG_ITEMS = 'DRAG_ITEMS'

export const dragItems = (previousDraggingPoint, draggingDelta) => ({
  type: DRAG_ITEMS,
  previousDraggingPoint,
  draggingDelta
})

export const DRAG_LINK = 'DRAG_LINK'

export const dragLink = (previousDraggingPoint, draggingDelta) => ({
  type: DRAG_LINK,
  previousDraggingPoint,
  draggingDelta
})

export const END_DRAGGING_ITEMS = 'END_DRAGGING_ITEMS'

export const endDraggingItems = () => ({
  type: END_DRAGGING_ITEMS
})

export const END_DRAGGING_LINK = 'END_DRAGGING_LINK'

export const endDraggingLink = (id, link) => ({
  type: END_DRAGGING_LINK,
  id,
  link
})

export const HIDE_NODE_SELECTOR = 'HIDE_NODE_SELECTOR'

export const hideNodeSelector = () => ({
  type: HIDE_NODE_SELECTOR
})

export const SELECT_ITEM = 'SELECT_ITEM'

export const selectItem = ({id, x, y}) => ({
  type: SELECT_ITEM,
  id,
  x,
  y
})

export const SET_NODE_SELECTOR_TEXT = 'SET_NODE_SELECTOR_TEXT'

export const setNodeSelectorText = (text) => ({
  type: SET_NODE_SELECTOR_TEXT,
  text
})

export const SET_NUM_INS = 'SET_NUM_INS'

export const setNumIns = ({ nodeid, num }) => ({
  type: SET_NUM_INS,
  nodeid,
  num
})

export const SET_NUM_OUTS = 'SET_NUM_OUTS'

export const setNumOuts = ({ nodeid, num }) => ({
  type: SET_NUM_OUTS,
  nodeid,
  num
})

export const SHOW_NODE_SELECTOR = 'SHOW_NODE_SELECTOR'

export const showNodeSelector = ({x, y}) => ({
  type: SHOW_NODE_SELECTOR,
  x,
  y
})
