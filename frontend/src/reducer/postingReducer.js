const postingReducer = (state, action) => {
    switch (action.type) {
      case 'POST_INIT':
        return{
          ...state,
          isPosting: true,
          isError: false
        }
      case 'POST_SUCCESS':
        return{
          ...state,
          isPosting: false,
          isError: false,
        }
      case 'POST_FAILURE':
        return{
          ...state,
          isPosting: false,
          isError: true
        }
      default:
        throw new Error()
    }
  }

export default postingReducer