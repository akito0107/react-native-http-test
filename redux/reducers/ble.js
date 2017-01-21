/**
 * @flow
 */

const Buffer = Buffer || require('buffer/').Buffer

export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'BLUENINJA_DISCOVERED':
      console.log(`BLUENINJA DISCOVERED ${payload.id}`)
      return {
        ...state,
        blueninja: payload
      }
    case 'UPDATE_BLUENINJA':
      console.log('UPDATE: ', payload)
      
      const str = payload.value
  
      const head = Buffer.from(str.slice(0, str.length / 2))
      const tail = Buffer.from(str.slice(str.length / 2, str.length))
  
      const parse = (buf) => {
        const result = []
        for (let c = 0; c < buf.length; c+= 2)
          result.push(buf.readInt16LE(c))
        
        return result
      }
     
      return {
        ...state,
        updatedDevice: {
          first: parse(head).join(', '),
          second: parse(tail).join(', ')
        },
      }
    default:
      return state
  }
}

function bufTest(str) {
  const buf = Buffer.from(str)
  console.log(`le test: ${buf.toString('utf16le')}`)
}

function tou8(buf) {
  if (!buf) return undefined;
  if (buf.constructor.name === 'Uint8Array'
    || buf.constructor === Uint8Array) {
    return buf;
  }
  if (typeof buf === 'string') buf = Buffer(buf);
  var a = new Uint8Array(buf.length);
  for (var i = 0; i < buf.length; i++) a[i] = buf[i];
  return a;
};

function hexToBytes(hex) {
  let buf = ''
  
  for (let c = 0; c < hex.length; c += 2) {
    buf += hex[c + 1] + hex[c]
  }
  hex = buf;
  
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

