// import node module libraries
import { BrowserRouter as Router } from 'react-router-dom';

// import layouts
import ScrollToTop from 'layouts/dashboard/ScrollToTop';
import AllRoutes from 'routes/AllRoutes';

// import required stylesheet
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';

import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import WebFont from 'webfontloader';
import { useEffect } from 'react';
import { ToastContainer } from 'react-bootstrap';

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
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
