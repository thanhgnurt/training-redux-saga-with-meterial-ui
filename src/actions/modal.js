import * as modalTypes from "./../constants/modal";

export const showModal = () => ({
  type: modalTypes.SHOW_MODAL,
});
export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});
export const changeModalTittle = (tittle) => ({
  type: modalTypes.CHANGE_MODAL_TITTLE,
  payload: {
    tittle,
  },
});
export const changeModalContent = (component) => ({
  type: modalTypes.CHANGE_MODAL_CONTENT,
  payload: {
    component,
  },
});
