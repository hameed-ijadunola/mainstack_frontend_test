import { errorMessageFormat } from 'helper/formatText';
import { hideLoading, show, showLoading } from 'helper/toast';

export const customFetchQuery = async ({
  api,
  apiProps = {},
  dispatch,
  loadingMessage,
  handleSuccess = () => {},
  handleError = () => {},
  showSuccess,
  showError = true,
  defaultSuccess = 'Successful',
  defaultError = 'Something went wrong',
}) => {
  showLoading(dispatch, loadingMessage || 'Loading...');
  const res = await api(apiProps);
  hideLoading(dispatch);
  if (res?.data?.status === 'success') {
    showSuccess &&
      show(dispatch, res?.data?.message || defaultSuccess, {
        type: 'success',
        placement: 'top',
        duration: 7000,
      });
    handleSuccess(res?.data);
    console.log(res?.data);
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
