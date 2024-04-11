import { errorMessageFormat } from 'helpers/formatText';
import { hideLoading, show, showLoading } from 'helpers/toast';

export const customFetchQuery = async ({
  api,
  apiProps = {},
  dispatch,
  loadingMessage,
  showLoadingMessage,
  handleSuccess = () => {},
  handleError = () => {},
  showSuccess,
  showError = true,
  defaultSuccess = 'Successful',
  defaultError = 'Something went wrong',
}) => {
  showLoadingMessage && showLoading(dispatch, loadingMessage || 'Loading...');
  const res = await api(apiProps);
  hideLoading(dispatch);
  if (res?.data) {
    showSuccess &&
      show(dispatch, res?.data?.message || defaultSuccess, {
        type: 'success',
        placement: 'top',
        duration: 7000,
      });
    handleSuccess(res?.data);
  } else {
    showError &&
      show(dispatch, errorMessageFormat(res, defaultError), {
        type: 'error',
        placement: 'top',
        duration: 4000,
      });
    handleError(res?.error);
  }
};
