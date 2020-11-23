const countriesReducer = (state, action) => {
    switch (action.type) {
      case 'COUNTRIES_FETCH_INIT':
        return{
          ...state,
          isLoading: true,
          isError: false
        }
      case 'COUNTRIES_FETCH_SUCCESS':
        return{
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        }
      case 'COUNTRIES_FETCH_FAILURE':
        return{
          ...state,
          isLoading: false,
          isError: true
        }
      default:
        throw new Error()
    }
  }

export default countriesReducer