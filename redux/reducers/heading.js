/**
 * @flow
 */

export default (state = {}, {type, payload}) => {
  switch (type) {
    case 'UPDATE_HEADING':
      return {
        ...state,
        heading: payload.heading
      }
      break
    default: 
      return state
  }
}