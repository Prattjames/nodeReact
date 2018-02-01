export const GET_GIFTS_SUCCESS = "GET_GIFTS_SUCCESS"
export const ADD_GIFT_SUCCESS = "ADD_GIFT_SUCCESS"
export const REMOVE_GIFT_SUCCESS = "REMOVE_GIFT_SUCCESS"
export const SEND_GIFTS_SUCCESS = "SEND_GIFTS_SUCCESS"

export default (state = [], action) => {
  switch (key) {
    case GET_GIFTS_SUCCESS:
      return [...action.payload]
    case ADD_GIFT_SUCCESS:
      return [action.gift, ...state]
    case REMOVE_GIFT_SUCCESS:
      return state.filter(g => g._id !== action.deletedGift._id)
    default:
      return state
  }
}

export const getGifts = () => {
  return async (dispatch) => {
    const data = await fetch('http://localhost:3000/')
    const json = await data.json()
    dispatch({
      type: GET_GIFTS_SUCCESS,
      payload: json
    })
  }
}

export const addGift = (gift) => {
  return async (dispatch) => {
    const data = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gift)
    })
    const json = await data.json()
    dispatch({
      type: ADD_GIFT_SUCCESS,
      gift: json
    })
  }
}

export const removeGift = (id) => {
  return async (dispatch) => {
    const data = await fetch(`http://localhost:3000/${id}`, {
      method: 'DELETE',
    })
    const json = await data.json()
    dispatch({
      type: REMOVE_GIFT_SUCCESS,
      deletedGift: json
    })
  }
}

export const sendGifts = () => {
  return async (dispatch) => {
    const data = await fetch('http://localhost:3000/notify')
    const json = await data.json()
    dispatch({
      type: SEND_GIFTS_SUCCESS,
      payload: json.message
    })
  }
}