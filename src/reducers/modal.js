import * as modalTypes from './../constants/modal';

const initialState = {
  showModal : false,
  tittle : '',
  component : null

}


const reducer =(state=initialState, action)=>{
  switch (action.type) {
    case modalTypes.SHOW_MODAL:
    return {
      ...state,
      showModal : true
    }
    case modalTypes.HIDE_MODAL:
    return {
      ...state,
      showModal : false,
      tittle : '',
      component : null
    }
    case modalTypes.CHANGE_MODAL_TITTLE:
      const {tittle}= action.payload
    return {
      ...state,
      tittle
    }
    case modalTypes.CHANGE_MODAL_CONTENT:
      const {component}= action.payload
    return {
      ...state,
      component
    }


    default:
      return {...state}
  }
}

export default reducer
