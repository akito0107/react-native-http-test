/**
 * @flow
 */

export function open({ handlerAction }) {
  return {
    type: 'WS',
    payload: {
      operation: 'open',
      handlerAction
    }
  }
}

export function send({ message }) {
  return {
    type: 'WS',
    payload: {
      operation: 'send',
      message
    }
  }
}

export function message() {
  return {
    type: 'WS',
    payload: {
      operation: 'message'
    }
  }
}

export function error(error) {
  return {
    type: 'WS',
    payload: {
      operation: 'error',
      error
    }
  }
}

export function onClose(data) {
  return {
    type: 'WS',
    payload: {
      operation: 'close',
      data
    }
  }
}

export default function WSMiddleware({ host, port = 80, path, protocol = 'ws' }) {
  let ws
  let handler
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'WS') {
      return next(action)
    }
    
    switch (action.payload.operation) {
      case 'open':
        ws = new WebSocket(`${protocol}://${host}:${port}/${path}`)
        ws.onopen = () => {
          console.log('ws open')
          dispatch(action.payload.handlerAction({
            event: 'onOpen',
            data: {}
          }))
        }
        ws.onmessage = (e) => {
          console.log(`ws recv message: ${e}`)
          dispatch(action.payload.handlerAction({
            event: 'onMessage',
            data: e
          }))
        }
        ws.onerror = (e) => {
          console.log(`ws caught error: ${e}`)
          dispatch(action.payload.handlerAction({
            event: 'onError',
            data: e
          }))
          throw e
        }
        ws.onerror = (e) => {
          console.log(`ws close: ${e}`)
          dispatch(action.payload.handlerAction({
            event: 'onClose',
            data: e
          }))
        }
        break
      case 'send':
        if (ws && ws.readyState == ws.OPEN)
          ws.send(JSON.stringify(action.payload))
        break
      default:
        return next(action)
    }
    next(action)
  }
}