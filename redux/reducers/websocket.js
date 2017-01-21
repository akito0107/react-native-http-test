/**
 * @flow
 * */

export default (state = {}, { type, payload }) => {
  // console.log(payload)
  switch (type) {
    case 'WS_RECV_MESSAGE':
      if (payload.event === 'onMessage') {
        return {
          ...state,
          event: payload.event,
          data: payload.data
        }
      }
  }
  return state
}