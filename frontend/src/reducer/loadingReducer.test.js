import loadingReducer from './loadingReducer'
import { fetchInit, fetchSuccess, fetchFailure } from '../actions/loadingActions'

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
}

const loadingState = {
  data: [],
  isLoading: true,
  isError: false,
}

const dummyData = [1, 2]

describe('loadingReducer', () => {
  it('sets loading to true on initialisation and leaves data untouched', () => {
    const newState = loadingReducer(initialState, {
      type: fetchInit,
      payload: initialState.data,
    })
    expect(newState.isLoading).toBe(true)
    expect(newState.data).toEqual(initialState.data)
  })
  it('sets loading to false on success and fills data', () => {
    const newState = loadingReducer(loadingState, {
      type: fetchSuccess,
      payload: dummyData,
    })
    expect(newState.isLoading).toBe(false)
    expect(newState.data).toBe(dummyData)
  })
  it('sets loading to false and error to true on failure and leaves data untouched', () => {
    const newState = loadingReducer(loadingState, {
      type: fetchFailure,
      payload: initialState.data,
    })
    expect(newState.isLoading).toBe(false)
    expect(newState.isError).toBe(true)
    expect(newState.data).toEqual(initialState.data)
  })
})
