/**
 * @flow
 */

export default (state = {}, { type, payload }) => {
  return state
  
  switch (type) {
    case 'ON_SCAN':
      return {
        ...state,
        ble: {
          device: payload
        },
      }
    case 'ON_CONNECT':
      return {
        ...state,
        ble: {
          device: payload
        }
      }
    default:
      return state
  }
}