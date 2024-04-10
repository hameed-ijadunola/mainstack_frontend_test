import { saveToStore } from 'redux/features/user/userSlice';

export const show = (dispatch, message, options) => {
  options?.duration &&
    dispatch(saveToStore(['toastDuration', options?.duration]));
  options?.type && dispatch(saveToStore(['toastType', options?.type]));
  dispatch(saveToStore(['toastMessage', message]));
};

export const hide = (dispatch) => {
  dispatch(saveToStore(['toastMessage', null]));
};

export const showLoading = (dispatch, message) => {
  dispatch(saveToStore(['toastLoading', message || 'Loading...']));
};

export const hideLoading = (dispatch) => {
  dispatch(saveToStore(['toastLoading', null]));
};

const toast = [show, hide, showLoading, hideLoading];

export default toast;
