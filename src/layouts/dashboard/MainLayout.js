import { hide } from 'helpers/toast';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { saveToStore } from 'redux/features/user/userSlice';
import MainNavbar from './navbars/MainNavbar';
import LeftMenuBar from './navbars/LeftMenuBar';

const MainLayout = (props) => {
  const dispatch = useDispatch();
  const { toastDuration, toastType, toastMessage, toastLoading, loadingId } =
    useSelector((state) => state.userStore);

  useEffect(() => {
    if (toastLoading) {
      const loadingId = toast.loading(toastLoading);
      dispatch(saveToStore(['loadingId', loadingId]));
    }
    !toastLoading && loadingId && toast.dismiss(loadingId);
  }, [toastLoading]);

  useEffect(() => {
    if (toastMessage) {
      toastType == 'error'
        ? toast.error(toastMessage, {
            autoClose: toastDuration,
          })
        : toastType == 'warning'
        ? toast.warning(toastMessage, {
            autoClose: toastDuration,
          })
        : toast.success(toastMessage, {
            autoClose: toastDuration,
          });
    }
    toastMessage && hide(dispatch);
  }, [toastMessage]);
  return (
    <Fragment>
      <MainNavbar />
      {props.children}
      <ToastContainer />
    </Fragment>
  );
};

export default MainLayout;
