import postingReducer from './postingReducer'
import { postInit, postSuccess, postFailure } from '../actions/postingActions'

const initialState = {
  isPosting: false,
  isError: false,
}

const postingState = {
  isPosting: true,
  isError: false,
}

describe('postingReducer', () => {
  it('sets isPosting true on initialisation and leaves isError untouched', () => {
    const newState = postingReducer(initialState, {
      type: postInit,
    })
    expect(newState.isPosting).toBe(true)
    expect(newState.isError).toBe(initialState.isError)
  })

  it('sets isPosting false on error and sets isError true', () => {
    const newState = postingReducer(postingState, {
      type: postFailure,
    })
    expect(newState.isPosting).toBe(false)
    expect(newState.isError).toBe(true)
  })

  it('sets isPosting false on success and sets isError false', () => {
    const newState = postingReducer(postingState, {
      type: postSuccess,
    })
    expect(newState.isPosting).toBe(false)
    expect(newState.isError).toBe(false)
  })
})
