/**
 * @flow
 */

export default (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_TEXT':
      return {
        ...state,
        textValue: action.payload
      }
    case 'SUBMIT_TEXT':
      console.log(action.payload)
      return {
        ...state,
        textValue: '',
      }
    default:
      return state
  }
}