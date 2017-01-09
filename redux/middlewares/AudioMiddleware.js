/**
 * @flow
 */

import {AudioRecorder, AudioUtils} from 'react-native-audio'

export default function ({filePath, AudioRecorderOptions}) {
  return ({ dispatch }) => (next) => (action) => {
    
    if (action.type !== 'AUDIO') {
    }
    
  }
}
