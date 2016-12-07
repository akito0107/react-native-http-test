/**
 * @flow
 */

export default (state = {}, { type, payload}) => {
  switch (type) {
    case 'UPDATE_SENSOR':
      return {
        ...state,
        sensorValue: {
          x: payload.acceleration.x,
          y: payload.acceleration.y,
          z: payload.acceleration.z,
        }
      }
    default:
      return state
  }
}