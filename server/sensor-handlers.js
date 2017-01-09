'use strict'

const math = require('math')

module.exports = {
  handleAccel,
  handleMagnetic,
  handleRotation,
  reduce,
}

const buffer = {
  accel: [],
  magnetic: [],
  rotation: [],
}

const current = {
  accel: {
    x: 0, y: 0, z: 0
  },
  magnetic: {
    x: 0, y: 0, z: 0
  },
  rotation: {
    x: 0, y: 0, z: 0
  },
}

function handleAccel({ threathold = 1, maxLen = 5 }) {
  return ({ acceleration = null }) => {
    if (!acceleration) return
    const buf = buffer.accel
    buf.push(acceleration)
    if (buf.length > maxLen)
      buf.shift()
  }
}

function getAbsolute(x, y, z) {
  return math.sqrt(math.pow(x, 2) + math.pow(y, 2) + math.pow(z, 2))
}

function handleMagnetic({ maxBuf }) {
  return ({ magneticField = null }) => {
    if (!magneticField) return
    const buf = buffer.magneic
    buf.push(magneticField)
    if (buf.length > maxBuf)
      buf.shift()
  }
}

function handleRotation({ maxBuf }) {
  return ({ rotationRate = null }) => {
    if (!rotationRate) return
    const buf = buffer.rotationRate
    buf.push(rotationRate)
    if (buf.length > maxBuf)
      buf.shift()
  }
}

function reduce(stream, { acceleration, magneticField, rotationRate }, cb) {
  handleAccel()({ acceleration })
  handleMagnetic()({ magneticField })
  handleRotation()({ rotationRate })

  // from http://myenigma.hatenablog.com/entry/2016/04/10/211919
  const phai = math.atan(current.accel.y / current.accel.y)
  const psi = math.atan(-current.accel.x / (current.accel.y * math.sin(phai) + current.accel.z * math.cos(phai)))
 //  const theta = math.atan(current.magnetic.z * math.sin(phai) - current.magnetic.y * math.cos(phi) / current.)
  
  cb(null)
}