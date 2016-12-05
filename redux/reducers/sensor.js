/**
 * @flow
 */

export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SENSOR':
      return {
        ...state,
        sensorValue: {
          x: action.payload.x,
          y: action.payload.y,
          z: action.payload.z,
        }
      }
    default:
      return state
  }
}