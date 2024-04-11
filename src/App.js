// import node module libraries
import { BrowserRouter as Router } from 'react-router-dom';

// import layouts
import ScrollToTop from 'layouts/dashboard/ScrollToTop';
import AllRoutes from 'routes/AllRoutes';

// import required stylesheet
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'redux/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Router>
          <div className="App">
            <ScrollToTop />
            <AllRoutes />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
